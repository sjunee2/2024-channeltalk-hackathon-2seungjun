import { TaskEntity } from 'src/infra/task.entity';
import { UserEntity } from 'src/infra/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task_user_map')
export class TaskUserMapEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => TaskEntity, (task) => task.id)
  task: TaskEntity;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
