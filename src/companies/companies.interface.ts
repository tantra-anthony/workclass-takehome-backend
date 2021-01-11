import { ApiProperty } from '@nestjs/swagger';
import { classToPlain } from 'class-transformer';
import { Company } from './companies.entity';

export class CompaniesSearchResult {
  @ApiProperty({ name: 'count', type: 'number', example: 20 })
  count: number;

  @ApiProperty({ name: 'companies', isArray: true, type: Company })
  companies: Company[];
}
