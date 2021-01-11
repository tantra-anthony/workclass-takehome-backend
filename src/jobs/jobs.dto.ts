import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class JobsSearchQueryParamDto {
  @ApiPropertyOptional({
    name: 'keyword',
    description: 'Searches name of jobs and companies that match',
    example: 'recruit',
  })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiPropertyOptional({
    name: 'limit',
    description: 'Determines the number of records returned',
    example: '50',
  })
  @IsNumberString()
  @IsOptional()
  limit?: string;

  @ApiPropertyOptional({
    name: 'offset',
    description: 'Determines the offset of the results returned',
    example: '0',
  })
  @IsNumberString()
  @IsOptional()
  offset?: string;
}

export class JobsByIdParamDto {
  @ApiProperty({ name: 'id', example: '1' })
  @IsNumberString()
  id: string;
}
