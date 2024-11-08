import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelApiService } from 'src/channel-api/channelApi.service';
import { Command } from 'src/common/interfaces/command';
import { BaseFunctionRequest } from 'src/common/interfaces/function.interface';
import { HandlerService } from 'src/common/service/handler.service';
import { UserEntity } from 'src/infra/user.entity';
import { TaskInput, TaskOutput } from 'src/task/task.dto';
import { Repository } from 'typeorm';

export const TASK = 'task';
@Injectable()
export class TaskService
  implements HandlerService<TaskInput, TaskOutput>, OnModuleInit
{
  private readonly logger = new Logger(TaskService.name);
  private readonly appId = process.env.CHANNEL_APPLICATION_ID;
  // 레포레이어 쪼개지 말고 걍 만들기!
  @InjectRepository(UserEntity)
  private readonly usersRepository: Repository<UserEntity>;

  constructor(private readonly apiService: ChannelApiService) {}

  async onModuleInit() {
    try {
      await this.apiService.waitForInitialization();
      await this.registerCommand();
    } catch (error) {
      this.logger.error('Failed to initialize TaskService', error.stack);
      throw error;
    }
  }

  /**
   * 실제 로직 처리
   */
  async execute(body: BaseFunctionRequest<TaskInput>): Promise<TaskOutput> {
    console.log(body);
    const newRequest = BaseFunctionRequest.createNew(body);
    newRequest.setMethod('getUser');
    newRequest.addParams({
      channelId: body.context.channel.id,
      userId: body.context.caller.id,
    });
    const result = await this.apiService.useNativeFunction(newRequest);
    const userInfo = result.data.result.user;

    const existingUser: UserEntity = await this.usersRepository.findOne({
      where: {
        id: parseInt(body.context.caller.id),
      },
    });
    if (!existingUser) {
      await this.usersRepository.save({
        id: parseInt(userInfo.id),
        type: userInfo.type,
        name: userInfo.name,
      });
    }
    return {
      result: {
        type: 'wam',
        attributes: {
          clientId: body.context.caller.id,
          appId: this.appId,
          name: 'task',
          wamArgs: {},
        },
      },
    };
  }

  /**
   * 외부 채널에 `tutorial` 커맨드를 등록하는 메서드
   */
  private async registerCommand() {
    const commandForTask: Command = {
      name: TASK,
      scope: 'desk',
      description: '⭐🌟2승준의 특별한 캘린더 열기⭐🌟',
      actionFunctionName: TASK,
      alfMode: 'disable',
      enabledByDefault: true,
    };

    await this.apiService.registerCommandToChannel([commandForTask]);
  }
}
