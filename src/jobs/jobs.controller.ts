import { Controller, Get, Param, Query } from '@nestjs/common';
import { JobsByIdParamDto, JobsSearchQueryParamDto } from './jobs.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('search')
  async searchJobs(@Query() query: JobsSearchQueryParamDto) {
    return this.jobsService.searchJobs(query);
  }

  @Get(':id')
  async getAllJobs(@Param() param: JobsByIdParamDto) {
    const intId = parseInt(param.id, 10);
    return this.jobsService.findJobById(intId);
  }
}
