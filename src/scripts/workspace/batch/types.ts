export interface BatchItem {
  id: string;
  index: number;
  original: string;
  processed?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
  selected: boolean;
}

export interface BatchOptions {
  skipEmpty: boolean;
  removeDuplicates: boolean;
  trimWhitespace: boolean;
  preserveOrdering: boolean;
}

export interface BatchStats {
  total: number;
  processed: number;
  successful: number;
  errors: number;
  remaining: number;
  startTime?: number;
  estimatedTimeRemainingMs?: number;
}
