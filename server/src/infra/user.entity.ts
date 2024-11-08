import { TaskUserMapEntity } from 'src/infra/task-user-map.entity';
import { UserType } from 'src/infra/user.enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'enum', enum: UserType })
  type: UserType;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => TaskUserMapEntity, (taskUserMap) => taskUserMap.user)
  taskUserMaps: TaskUserMapEntity[];
}
