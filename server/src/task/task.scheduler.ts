import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { TaskEntity } from 'src/infra/task.entity';
import { TaskStatus } from 'src/infra/task-status.enum';

@Injectable()
export class TaskScheduler {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  @Cron('*/30 * * * * *')
  async handleCron() {
    const tasks = await this.taskRepository.find({
      //   where: { taskStatus: TaskStatus. },
    });
    console.log(tasks);
  }

  @Cron('0 */3 * * * *')
  async overallMessage() {
    const tasks = await this.taskRepository.find({
      where: { taskStatus: Not(TaskStatus.DONE) },
    });
  }
}
