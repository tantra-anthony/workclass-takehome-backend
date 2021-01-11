import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  CompaniesByIdParamDto,
  CompaniesSearchQueryParamDto,
} from './companies.dto';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get('search')
  async searchCompanies(@Query() query: CompaniesSearchQueryParamDto) {
    return this.companiesService.searchCompanies(query);
  }

  @Get(':id/jobs')
  async getCompanyJobsById(@Param() param: CompaniesByIdParamDto) {
    return this.companiesService.findCompanyJobsById(param.id);
  }
}
