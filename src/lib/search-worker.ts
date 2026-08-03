export class SearchWorkerManager {
  private busy = false;

  async rebuildIndexAsync(): Promise<void> {
    this.busy = true;
    await new Promise(resolve => setTimeout(resolve, 5));
    this.busy = false;
  }

  isBusy(): boolean {
    return this.busy;
  }
}
