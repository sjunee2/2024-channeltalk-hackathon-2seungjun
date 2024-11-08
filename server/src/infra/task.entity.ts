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
import { ApiProperty } from '@nestjs/swagger';

@Entity('task')
export class TaskEntity extends CommonEntity {
  @ApiProperty({ description: 'Task 아이디' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: 'Task 상태' })
  @Column()
  taskStatus: TaskStatus;

  @ApiProperty({ description: 'Task 제목' })
  @Column('varchar')
  title: string;

  @ApiProperty({ description: 'Task 내용' })
  @Column('varchar')
  contents: string;

  @ApiProperty({ description: '역할' })
  @Column('varchar')
  role: string;

  @ApiProperty({ description: '시작일' })
  @Column('timestamp')
  startDate: Timestamp;

  @ApiProperty({ description: '종료일' })
  @Column('timestamp')
  endDate: Timestamp;

  @ApiProperty({ type: [TaskUserMapEntity] })
  @OneToMany(() => TaskUserMapEntity, (taskUserMap) => taskUserMap.task)
  taskUserMaps: TaskUserMapEntity[];
}
