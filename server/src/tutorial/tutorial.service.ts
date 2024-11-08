import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ChannelApiService } from 'src/channel-api/channelApi.service';
import { Command } from 'src/common/interfaces/command';
import { BaseFunctionRequest } from 'src/common/interfaces/function.interface';
import { HandlerService } from 'src/common/service/handler.service';
import { TutorialOutput } from 'src/tutorial/tutorial.dto';
import { TutorialInput } from 'src/tutorial/tutorial.dto';

export const TUTORIAL = 'tutorial';
@Injectable()
export class TutorialService
  implements HandlerService<TutorialInput, TutorialOutput>, OnModuleInit
{
  private readonly logger = new Logger(TutorialService.name);

  constructor(private readonly apiService: ChannelApiService) {}

  async onModuleInit() {
    try {
      await this.apiService.waitForInitialization();
    } catch (error) {
      this.logger.error('Failed to initialize TutorialService', error.stack);
      throw error;
    }
  }

  /**
   * 실제 로직 처리
   */
  async execute(
    body: BaseFunctionRequest<TutorialInput>,
  ): Promise<TutorialOutput> {
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
    console.log(newRequest);
    const result = await this.apiService.useNativeFunction(newRequest);
    return {
      result: {
        hello: result.data.result,
      },
    };
  }

  /**
   * 외부 채널에 `tutorial` 커맨드를 등록하는 메서드
   */
  get command(): Command {
    const commandForTutorial: Command = {
      name: TUTORIAL,
      scope: 'desk',
      description: 'This is a desk command of App-tutorial',
      actionFunctionName: TUTORIAL,
      alfMode: 'disable',
      enabledByDefault: true,
    };
    return commandForTutorial;
    // await this.apiService.registerCommandToChannel([commandForTutorial]);
  }
}
