import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from 'src/infra/task.entity';
import { UserEntity } from 'src/infra/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task_user_map')
export class TaskUserMapEntity {
  @ApiProperty({ description: 'Task User Map 아이디' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Task' })
  @JoinColumn({ name: 'taskId' })
  @ManyToOne(() => TaskEntity, (task) => task.id)
  task: TaskEntity;

  @ApiProperty({ description: 'User' })
  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;
}
