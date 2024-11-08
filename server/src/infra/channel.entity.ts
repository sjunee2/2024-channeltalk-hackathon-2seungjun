import { TaskEntity } from 'src/infra/task.entity';
import { UserEntity } from 'src/infra/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'channel' })
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'group_id' })
  groupId: number;

  @OneToMany(() => UserEntity, (user) => user.channel)
  users: UserEntity[];

  @OneToMany(() => TaskEntity, (task) => task.channel)
  tasks: TaskEntity[];
}
