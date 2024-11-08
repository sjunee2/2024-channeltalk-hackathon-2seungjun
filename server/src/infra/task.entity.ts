import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { CommonEntity } from './common.entity';
import { TaskStatus } from './task-status.enum';
import { TaskUserMapEntity } from 'src/infra/task-user-map.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ChannelEntity } from 'src/infra/channel.entity';

@Entity('task')
export class TaskEntity extends CommonEntity {
  @ApiProperty({ type: 'number', description: 'Task 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: 'string', description: 'Task 상태' })
  @Column()
  taskStatus: TaskStatus;

  @ApiProperty({ type: 'string', description: 'Task 제목' })
  @Column('varchar')
  title: string;

  @ApiProperty({ type: 'string', description: 'Task 내용' })
  @Column('varchar')
  contents: string;

  @ApiProperty({ type: 'string', description: '시작일' })
  @Column('timestamp')
  startDate: Date;

  @ApiProperty({ type: 'string', description: '종료일' })
  @Column('timestamp')
  endDate: Date;

  @ManyToOne(() => ChannelEntity, (channel) => channel.tasks)
  channel: ChannelEntity;

  @RelationId((task: TaskEntity) => task.channel)
  @Column()
  channelId: number;

  @ApiProperty({ type: [TaskUserMapEntity] })
  @OneToMany(() => TaskUserMapEntity, (taskUserMap) => taskUserMap.task)
  taskUserMaps: Promise<TaskUserMapEntity[]>;
}
