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

@Entity({ name: 'job', schema: 'workclass_takehome' })
export class Job {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Company, (company) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  company: string;

  @Column({ name: 'company_id', nullable: true })
  companyId: number;

  @Column({ name: 'job_title', type: 'varchar', length: 1000 })
  jobTitle: string;

  @Column({ name: 'logo_url', type: 'varchar', length: 1000 })
  logoUrl: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
