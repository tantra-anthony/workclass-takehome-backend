import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CompaniesSearchQueryParamDto {
  @IsString()
  @IsOptional()
  keyword?: string;

  @IsNumberString()
  @IsOptional()
  limit?: string;

  @IsNumberString()
  @IsOptional()
  offset?: string;
}

export class CompaniesByIdParamDto {
  @IsNumberString()
  id: string;
}
