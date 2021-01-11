import { ApiProperty } from '@nestjs/swagger';
import { Job } from './jobs.entity';

export class JobsSearchResult {
  @ApiProperty({ name: 'count', type: 'number', example: 20 })
  count: number;

  @ApiProperty({ name: 'jobx', isArray: true, type: Job })
  jobs: Job[];
}
