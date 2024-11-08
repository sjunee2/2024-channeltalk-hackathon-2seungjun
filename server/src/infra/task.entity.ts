import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  contents: string;

  @Column('varchar')
  role: string;

  @OneToMany(() => TaskUserMapEntity, (taskUserMap) => taskUserMap.task)
  taskUserMaps: TaskUserMapEntity[];
}
