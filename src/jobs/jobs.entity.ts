import { Company } from '../companies/companies.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'job', schema: 'workclass_takehome' })
export class Job {
  @ApiProperty({ name: 'id', type: 'number', example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    name: 'company',
    type: Company,
    example: {
      id: 1,
      name: 'JobStudio',
      createdAt: '2021-01-05T03:46:35Z',
      updatedAt: '2021-01-05T03:46:35Z',
    },
  })
  @ManyToOne(() => Company, (company) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  company: string;

  @ApiProperty({ name: 'companyId', type: 'number', example: 1 })
  @Column({ name: 'company_id', nullable: true })
  companyId: number;

  @ApiProperty({
    name: 'jobTitle',
    type: 'string',
    example: 'Production Technician',
  })
  @Column({ name: 'job_title', type: 'varchar', length: 1000 })
  jobTitle: string;

  @ApiProperty({
    name: 'logoUrl',
    type: 'string',
    example:
      'https://workclass-static.s3-ap-southeast-1.amazonaws.com/LD-IYAB93YJbrFOQzA3b0Q/YRDTqQRNqsrL-LPpGJYvlYGhpmxJFXUGDcqL1z-2dfg.png',
  })
  @Column({ name: 'logo_url', type: 'varchar', length: 1000 })
  logoUrl: string;

  @ApiProperty({
    name: 'date',
    type: 'string',
    example: '2021-01-05T03:46:35Z',
  })
  @Column({ type: 'timestamp' })
  date: Date;

  @ApiProperty({
    name: 'createdAt',
    type: 'string',
    example: '2021-01-05T03:46:35Z',
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    type: 'string',
    example: '2021-01-05T03:46:35Z',
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
