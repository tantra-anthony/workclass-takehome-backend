import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobsSearchQueryParamDto } from './jobs.dto';
import { Job } from './jobs.entity';
import { JobsSearchResult } from './jobs.interface';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async searchJobs(query: JobsSearchQueryParamDto): Promise<JobsSearchResult> {
    const qb = this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .where('job.id IS NOT NULL');

    if (query.keyword) {
    }

    const limit = query.limit ? parseInt(query.limit, 10) : 50;
    const offset = query.offset ? parseInt(query.offset, 10) : 0;
    qb.take(limit).skip(offset);

    const [jobs, count] = await qb.getManyAndCount();

    return {
      count,
      jobs,
    };
  }

  async findJobById(id: number): Promise<Job> {
    const job = await this.jobRepository.findOne({
      where: {
        id,
      },
      relations: ['company'],
    });

    if (!job) {
      throw new NotFoundException();
    }

    return job;
  }
}
