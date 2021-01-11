import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Job } from '../jobs/jobs.entity';
import {
  CompaniesByIdParamDto,
  CompaniesSearchQueryParamDto,
} from './companies.dto';
import { CompaniesSearchResult } from './companies.interface';
import { CompaniesService } from './companies.service';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiQuery({
    type: CompaniesSearchQueryParamDto,
  })
  @ApiOkResponse({
    status: 200,
    description: 'The searched records',
    type: CompaniesSearchResult,
  })
  @Get('search')
  async searchCompanies(@Query() query: CompaniesSearchQueryParamDto) {
    return this.companiesService.searchCompanies(query);
  }

  @ApiParam({
    name: 'id',
    example: '1',
    description: 'The Company ID that is a number',
  })
  @ApiOkResponse({
    status: 200,
    description: 'The company job records',
    type: Job,
    isArray: true,
  })
  @ApiNotFoundResponse({ status: 404, description: 'Not found' })
  @Get(':id/jobs')
  async getCompanyJobsById(@Param() param: CompaniesByIdParamDto) {
    return this.companiesService.findCompanyJobsById(param.id);
  }
}
