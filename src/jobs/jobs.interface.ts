import { Job } from './jobs.entity';

export interface JobsSearchResult {
  count: number;
  jobs: Job[];
}
