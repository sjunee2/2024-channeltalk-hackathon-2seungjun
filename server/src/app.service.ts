import { Injectable } from '@nestjs/common';
import { GetUserInfoResponseDto, HandleTaskRequestDto } from './task/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './infra/task.entity';
import { Repository } from 'typeorm';
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
    const id = body.id ? Number(body.id) : undefined;
    const newTask = this.taskRepository.create({
      id: id,
      taskStatus: body.taskStatus,
      title: body.title,
      contents: body.contents,
      startDate: body.startDate,
      endDate: body.endDate,
      deletedAt: body.deletedAt,
      channelId: Number(body.channelId),
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
    return this.taskRepository.find({
      where: { channelId: Number(channelId) },
      relations: {
        taskUserMaps: {
          user: true,
        },
      },
    });
  }

  async getUserInfo(userId: string): Promise<GetUserInfoResponseDto> {
    const tasks = await this.taskUserMapRepository.find({
      where: { user: { id: Number(userId) } },
      relations: ['task'],
    });

    const user = await this.userRepository.findOne({
      where: { id: Number(userId) },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const completedTasks = tasks.filter(
      (taskUserMap) => taskUserMap.task.taskStatus === 'DONE',
    ).length;
    const totalTasks = tasks.length;

    return {
      id: user.id.toString(),
      name: user.name,
      role: user.role,
      completedTasks: completedTasks,
      totalTasks: totalTasks,
      avatarUrl: user.avatarUrl,
    };
  }

  async getAllUserInfo(): Promise<GetUserInfoResponseDto[]> {
    const users = await this.userRepository.find();
    const userInfoList: GetUserInfoResponseDto[] = [];

    for (const user of users) {
      const tasks = await this.taskUserMapRepository.find({
        where: { user: { id: user.id } },
        relations: ['task'],
      });

      const completedTasks = tasks.filter(
        (taskUserMap) => taskUserMap.task.taskStatus === 'DONE',
      ).length;
      const totalTasks = tasks.length;

      userInfoList.push({
        id: user.id.toString(),
        name: user.name,
        role: user.role,
        completedTasks: completedTasks,
        totalTasks: totalTasks,
        avatarUrl: user.avatarUrl,
      });
    }

    return userInfoList;
  }
}
