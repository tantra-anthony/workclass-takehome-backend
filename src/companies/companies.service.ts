import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../jobs/jobs.entity';
import { Repository } from 'typeorm';
import { CompaniesSearchQueryParamDto } from './companies.dto';
import { Company } from './companies.entity';
import { CompaniesSearchResult } from './companies.interface';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async searchCompanies(
    query: CompaniesSearchQueryParamDto,
  ): Promise<CompaniesSearchResult> {
    const qb = this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.jobs', 'jobs')
      .where('company.id IS NOT NULL');

    if (query.keyword) {
      qb.andWhere('company.name ILIKE :keyword', {
        keyword: `%${query.keyword}%`,
      });
    }

    const limit = query.limit ? parseInt(query.limit, 10) : 50;
    const offset = query.offset ? parseInt(query.offset, 10) : 0;
    qb.take(limit).skip(offset);

    const [companies, count] = await qb.getManyAndCount();

    return {
      count,
      companies,
    };
  }

  async findCompanyJobsById(id: string): Promise<Job[]> {
    const company = await this.companyRepository
      .createQueryBuilder('company')
      .where('company.id = :id', { id })
      .leftJoinAndSelect('company.jobs', 'job')
      .getOne();

    if (!company) {
      throw new NotFoundException();
    }

    return company.jobs;
  }
}
