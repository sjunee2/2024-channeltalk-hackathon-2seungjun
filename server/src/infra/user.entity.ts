import { ApiProperty } from '@nestjs/swagger';
import { ChannelEntity } from 'src/infra/channel.entity';
import { TaskUserMapEntity } from 'src/infra/task-user-map.entity';
import { UserType } from 'src/infra/user.enums';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @ApiProperty({ description: 'User id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: 'User type' })
  @Column({ type: 'enum', enum: UserType })
  type: UserType;

  @ApiProperty({ description: 'User name' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ type: ChannelEntity })
  @ManyToOne(() => ChannelEntity, (channel) => channel.id)
  channel: ChannelEntity;

  @ApiProperty({ description: 'Channel id' })
  @RelationId((user: UserEntity) => user.channel)
  @Column()
  channelId: number;

  @ApiProperty({ description: 'User avatar url' })
  @Column()
  avatarUrl: string;

  @ApiProperty({ description: 'Completed tasks' })
  @Column({ type: 'int', default: 0 })
  completedTasks: number;

  @ApiProperty({ description: 'Total tasks' })
  @Column({ type: 'int', default: 0 })
  totalTasks: number;

  @ApiProperty({ type: [TaskUserMapEntity] })
  @OneToMany(() => TaskUserMapEntity, (taskUserMap) => taskUserMap.user)
  taskUserMaps: TaskUserMapEntity[];
}
