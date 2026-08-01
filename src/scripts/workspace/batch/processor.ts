import type { BatchItem, BatchStats } from './types';

export type TransformFunction = (input: string) => string | Promise<string>;

export class BatchProcessor {
  private items: BatchItem[] = [];
  private transformFn: TransformFunction;
  private isProcessing: boolean = false;
  private isPaused: boolean = false;
  private isCancelled: boolean = false;
  private currentIndex: number = 0;
  private chunkSize: number = 50; // Process 50 items per chunk
  private onProgressCallback?: (stats: BatchStats, currentItems: BatchItem[]) => void;
  private onCompleteCallback?: (stats: BatchStats, currentItems: BatchItem[]) => void;
  private startTime: number = 0;

  constructor(items: BatchItem[], transformFn: TransformFunction) {
    this.items = items;
    this.transformFn = transformFn;
  }

  public onProgress(cb: (stats: BatchStats, currentItems: BatchItem[]) => void) {
    this.onProgressCallback = cb;
  }

  public onComplete(cb: (stats: BatchStats, currentItems: BatchItem[]) => void) {
    this.onCompleteCallback = cb;
  }

  public start() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.isPaused = false;
    this.isCancelled = false;
    this.startTime = Date.now();
    this.processNextChunk();
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    if (!this.isProcessing || !this.isPaused) return;
    this.isPaused = false;
    this.processNextChunk();
  }

  public cancel() {
    this.isCancelled = true;
    this.isProcessing = false;
    this.isPaused = false;
    this.notifyProgress();
  }

  public getStats(): BatchStats {
    const total = this.items.length;
    const completed = this.items.filter(i => i.status === 'completed');
    const errors = this.items.filter(i => i.status === 'error');
    const processed = completed.length + errors.length;
    const remaining = total - processed;

    let estimatedTimeRemainingMs = 0;
    if (processed > 0 && remaining > 0 && this.startTime > 0) {
      const elapsed = Date.now() - this.startTime;
      const rateMsPerItem = elapsed / processed;
      estimatedTimeRemainingMs = Math.round(rateMsPerItem * remaining);
    }

    return {
      total,
      processed,
      successful: completed.length,
      errors: errors.length,
      remaining,
      startTime: this.startTime,
      estimatedTimeRemainingMs
    };
  }

  private processNextChunk() {
    if (this.isCancelled || this.isPaused) return;

    if (this.currentIndex >= this.items.length) {
      this.isProcessing = false;
      if (this.onCompleteCallback) {
        this.onCompleteCallback(this.getStats(), this.items);
      }
      return;
    }

    const endIdx = Math.min(this.currentIndex + this.chunkSize, this.items.length);
    const chunkPromises: Promise<void>[] = [];

    for (let i = this.currentIndex; i < endIdx; i++) {
      const item = this.items[i];
      if (!item.selected) {
        item.status = 'completed';
        item.processed = item.original;
        continue;
      }

      item.status = 'processing';
      const promise = (async () => {
        try {
          const res = await this.transformFn(item.original);
          item.processed = res;
          item.status = 'completed';
        } catch (err: any) {
          item.status = 'error';
          item.error = err?.message || 'Processing failed';
        }
      })();
      chunkPromises.push(promise);
    }

    Promise.all(chunkPromises).then(() => {
      this.currentIndex = endIdx;
      this.notifyProgress();

      // Schedule next chunk without blocking UI main thread
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => this.processNextChunk(), { timeout: 100 });
      } else {
        setTimeout(() => this.processNextChunk(), 10);
      }
    });
  }

  private notifyProgress() {
    if (this.onProgressCallback) {
      this.onProgressCallback(this.getStats(), this.items);
    }
  }
}
