import { Job } from '../jobs/jobs.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'company', schema: 'workclass_takehome' })
export class Company {
  @ApiProperty({ name: 'id', type: 'number', example: 1 })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ name: 'name', type: 'string', example: 'RecruitHome' })
  @Column({ type: 'varchar', length: 1000 })
  name: string;

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[];

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
