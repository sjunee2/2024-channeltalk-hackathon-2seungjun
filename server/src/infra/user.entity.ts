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
  @Column({ type: 'bigint' })
  @ManyToOne(() => ChannelEntity, (channel) => channel.id)
  channel: ChannelEntity;

  @ApiProperty({ description: 'Channel id' })
  @RelationId((user: UserEntity) => user.channel)
  @Column({ type: 'bigint', name: 'channel_id' })
  channelId: number;

  @ApiProperty({ description: 'User avatar url' })
  @Column()
  avatarUrl: string;

  @ApiProperty({ type: [TaskUserMapEntity] })
  @OneToMany(() => TaskUserMapEntity, (taskUserMap) => taskUserMap.user)
  taskUserMaps: TaskUserMapEntity[];
}
