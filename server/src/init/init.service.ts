import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelApiService } from 'src/channel-api/channelApi.service';
import { Command } from 'src/common/interfaces/command';
import { BaseFunctionRequest } from 'src/common/interfaces/function.interface';
import { HandlerService } from 'src/common/service/handler.service';
import { ChannelEntity } from 'src/infra/channel.entity';
import { UserEntity } from 'src/infra/user.entity';
import { TaskInput, TaskOutput } from 'src/task/task.dto';
import { TASK } from 'src/task/task.service';
import { Repository } from 'typeorm';

export const INIT = 'init';
@Injectable()
export class InitService
  implements HandlerService<TaskInput, TaskOutput>, OnModuleInit
{
  private readonly logger = new Logger(InitService.name);
  private readonly appId = process.env.CHANNEL_APPLICATION_ID;
  // 레포레이어 쪼개지 말고 걍 만들기!
  @InjectRepository(UserEntity)
  private readonly usersRepository: Repository<UserEntity>;

  @InjectRepository(ChannelEntity)
  private readonly channelsRepository: Repository<ChannelEntity>;

  constructor(private readonly apiService: ChannelApiService) {}

  async onModuleInit() {
    try {
      await this.apiService.waitForInitialization();
    } catch (error) {
      this.logger.error('Failed to initialize TaskService', error.stack);
      throw error;
    }
  }

  /**
   * 실제 로직 처리
   */
  async execute(body: BaseFunctionRequest<TaskInput>): Promise<TaskOutput> {
    const newRequest = BaseFunctionRequest.createNew(body);
    newRequest.setMethod('getChannel');
    newRequest.addParams({
      channelId: body.context.channel.id,
    });
    const result = await this.apiService.useNativeFunction(newRequest);
    const channelInfo = result.data.result.channel;
    console.log(channelInfo);
    const channel = await this.channelsRepository.save({
      id: parseInt(channelInfo.id),
      groupId: parseInt(body.params.chat.id),
    });
    console.log(channel);
    const newreq = BaseFunctionRequest.createNew(body);
    newreq.setMethod('writeGroupMessage');
    newreq.addParams({
      channelId: body.context.channel.id,
      groupId: body.params.chat.id,
      rootMessageId: undefined,
      dto: {
        plainText: '채널 등록을 성공하였습니다! 이제 태스크를 등록해보세요!',
        botName: '캘린이',
      },
    });
    await this.apiService.useNativeFunction(newreq);

    return {
      result: { hello: result.data.result },
    };
  }

  /**
   * 외부 채널에 `tutorial` 커맨드를 등록하는 메서드
   */
  get command(): Command {
    const commandForInit: Command = {
      name: INIT,
      scope: 'desk',
      description: '채널 등록을 시작합니다!',
      actionFunctionName: INIT,
      alfMode: 'disable',
      enabledByDefault: true,
    };
    return commandForInit;
    // await this.apiService.registerCommandToChannel([commandForTask]);
  }
}
