import { Company } from './companies.entity';

export interface CompaniesSearchResult {
  count: number;
  companies: Company[];
}
