import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ChannelApiService } from 'src/channel-api/channelApi.service';
import { Command } from 'src/common/interfaces/command';
import { BaseFunctionRequest } from 'src/common/interfaces/function.interface';
import { HandlerService } from 'src/common/service/handler.service';
import { TaskInput, TaskOutput } from 'src/task/task.dto';

export const TASK = 'task';
@Injectable()
export class TaskService
  implements HandlerService<TaskInput, TaskOutput>, OnModuleInit
{
  private readonly logger = new Logger(TaskService.name);
  private readonly appId = process.env.CHANNEL_APPLICATION_ID;

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
    newRequest.setMethod('writeGroupMessage');
    newRequest.addParams({
      channelId: body.context.channel.id,
      groupId: body.params.chat.id,
      rootMessageId: undefined,
      dto: {
        plainText: '하이하이',
        botName: '이승준',
      },
    });
    const result = await this.apiService.useNativeFunction(newRequest);
    return {
      result: {
        type: 'wam',
        attributes: {
          clientId: body.context.caller.id.toString(),
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
