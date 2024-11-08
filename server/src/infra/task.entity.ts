import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';
import { CommonEntity } from './common.entity';
import { TaskStatus } from './task-status.enum';
import { TaskUserMapEntity } from 'src/infra/task-user-map.entity';

@Entity('task')
export class TaskEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  taskStatus: TaskStatus;

  @Column('varchar')
  title: string;

  @Column('varchar')
  contents: string;

  @Column('varchar')
  role: string;

  @Column('timestamp')
  startDate: Timestamp;

  @Column('timestamp')
  endDate: Timestamp;

  @OneToMany(() => TaskUserMapEntity, (taskUserMap) => taskUserMap.task)
  taskUserMaps: TaskUserMapEntity[];
}
