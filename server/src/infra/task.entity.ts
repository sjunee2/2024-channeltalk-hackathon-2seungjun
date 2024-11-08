import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { TaskStatus } from './task-status.enum';

@Entity('task')
export class TaskEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  taskStatus: TaskStatus;

  @Column('varchar')
  contents: string;

  @Column('varchar')
  role: string;
}
