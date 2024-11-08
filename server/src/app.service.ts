import { Injectable } from '@nestjs/common';
import { HandleTaskRequestDto } from './task/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './infra/task.entity';
import { In, Repository } from 'typeorm';
import { TaskUserMapEntity } from './infra/task-user-map.entity';

@Injectable()
export class AppService {
  @InjectRepository(TaskEntity)
  private readonly taskRepository: Repository<TaskEntity>;
  @InjectRepository(TaskUserMapEntity)
  private readonly taskUserMapRepository: Repository<TaskUserMapEntity>;

  getHello(): string {
    return 'Hello World!';
  }

  async createTask(body: HandleTaskRequestDto): Promise<void> {
    const newTask = this.taskRepository.create({
      id: Number(body.id),
      taskStatus: body.taskStatus,
      title: body.title,
      contents: body.contents,
      role: body.role,
      startDate: body.startDate,
      endDate: body.endDate,
      deletedAt: body.deletedAt,
    });

    const savedTask = await this.taskRepository.save(newTask);

    await this.taskUserMapRepository.delete({ task: savedTask });

    const taskUserMaps = body.userIds.map((userId) => {
      return this.taskUserMapRepository.create({
        task: savedTask,
        user: { id: userId },
      });
    });

    await this.taskUserMapRepository.save(taskUserMaps);
  }

  async getTaskAll(channelId: string): Promise<TaskEntity[]> {
    const taskUserMaps = await this.taskUserMapRepository.find({
      relations: ['task'],
      where: { user: { channel: { id: Number(channelId) } } },
    });

    const taskIds = taskUserMaps.map((taskUserMap) => taskUserMap.task.id);

    return this.taskRepository.find({
      where: { id: In(taskIds) },
    });
  }
}
