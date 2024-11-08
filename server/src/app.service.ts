import { Injectable } from '@nestjs/common';
import { HandleTaskRequestDto } from './task/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './infra/task.entity';
import { In, Repository } from 'typeorm';
import { TaskUserMapEntity } from './infra/task-user-map.entity';
import { UserEntity } from './infra/user.entity';

@Injectable()
export class AppService {
  @InjectRepository(TaskEntity)
  private readonly taskRepository: Repository<TaskEntity>;
  @InjectRepository(TaskUserMapEntity)
  private readonly taskUserMapRepository: Repository<TaskUserMapEntity>;
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

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
        task: Promise.resolve(savedTask),
        user: Promise.resolve({ id: userId } as UserEntity),
      });
    });
    await this.taskUserMapRepository.save(taskUserMaps);

    await Promise.all(
      body.userIds.map(async (userId) => {
        await this.userRepository.increment({ id: userId }, 'totalTasks', 1);
      }),
    );
  }

  async getTaskAll(channelId: string): Promise<TaskEntity[]> {
    return this.taskRepository.find({
      where: { channelId: Number(channelId) },
      relations: {
        taskUserMaps: {
          user: true,
        },
      },
    });
  }

  async getUserInfo(userId: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id: Number(userId) },
    });
  }

  async getAllUserInfo(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
