import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JobsByIdParamDto, JobsSearchQueryParamDto } from './jobs.dto';
import { Job } from './jobs.entity';
import { JobsSearchResult } from './jobs.interface';
import { JobsService } from './jobs.service';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiQuery({
    type: JobsSearchQueryParamDto,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The searched records',
    type: JobsSearchResult,
  })
  @Get('search')
  async searchJobs(@Query() query: JobsSearchQueryParamDto) {
    return this.jobsService.searchJobs(query);
  }

  @ApiParam({
    name: 'id',
    example: '1',
    description: 'The Job ID that is a number',
  })
  @ApiOkResponse({
    status: 200,
    description: 'The job record',
    type: Job,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get(':id')
  async getAllJobs(@Param() param: JobsByIdParamDto) {
    const intId = parseInt(param.id, 10);
    return this.jobsService.findJobById(intId);
  }
}
