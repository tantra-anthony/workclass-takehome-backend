import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class JobsSearchQueryParamDto {
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

export class JobsByIdParamDto {
  @IsNumberString()
  id: string;
}
