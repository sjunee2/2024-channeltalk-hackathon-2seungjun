import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  Timestamp,
} from 'typeorm';
import { CommonEntity } from './common.entity';
import { TaskStatus } from './task-status.enum';
import { TaskUserMapEntity } from 'src/infra/task-user-map.entity';
import { ChannelEntity } from 'src/infra/channel.entity';

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

  @ManyToOne(() => ChannelEntity, (channel) => channel.tasks)
  channel: ChannelEntity;

  @RelationId((task: TaskEntity) => task.channel)
  @Column({ type: 'bigint', name: 'channel_id' })
  channelId: number;

  @OneToMany(() => TaskUserMapEntity, (taskUserMap) => taskUserMap.task)
  taskUserMaps: TaskUserMapEntity[];
}
