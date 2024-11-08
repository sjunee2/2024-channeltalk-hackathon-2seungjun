import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelApiService } from 'src/channel-api/channelApi.service';
import { Command } from 'src/common/interfaces/command';
import {
  BaseFunctionInput,
  BaseFunctionOutput,
  BaseFunctionRequest,
} from 'src/common/interfaces/function.interface';
import { HandlerService } from 'src/common/service/handler.service';
import { TaskUserMapEntity } from 'src/infra/task-user-map.entity';
import { UserEntity } from 'src/infra/user.entity';
import { TaskInput, TaskOutput } from 'src/task/task.dto';
import { Repository } from 'typeorm';

export const MY_TASK = 'myTask';
export class MyTaskInput extends BaseFunctionInput {}

export class MyTaskOutput extends BaseFunctionOutput {}

@Injectable()
export class MyTaskService
  implements HandlerService<MyTaskInput, MyTaskOutput>, OnModuleInit
{
  private readonly logger = new Logger(MyTaskService.name);
  private readonly appId = process.env.CHANNEL_APPLICATION_ID;
  // 레포레이어 쪼개지 말고 걍 만들기!
  @InjectRepository(UserEntity)
  private readonly usersRepository: Repository<UserEntity>;

  @InjectRepository(TaskUserMapEntity)
  private readonly taskUserMapRepository: Repository<TaskUserMapEntity>;

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
    console.log(body);
    const user: UserEntity = await this.usersRepository.findOne({
      where: {
        id: parseInt(body.context.caller.id),
      },
    });
    const tasks = await this.taskUserMapRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['task'],
    });
    let method;
    if (body.params.chat.type === 'userChat') {
      method = 'writeUserChatMessage';
    } else {
      method = 'writeGroupMessage';
    }

    const request2 = BaseFunctionRequest.createNew(body);
    request2.setMethod(method);
    request2.addParams({
      channelId: body.context.channel.id,
      groupId: body.params.chat.id,
      userChatId: body.params.chat.id,
      rootMessageId: undefined,
      dto: {
        plainText: `👋 안녕하세요 ${user.name}님!
📝 남은 할 일 목록을 알려드립니다
${tasks.length === 0 ? '오늘 할 일이 없습니다.' : tasks.map((task) => `• ${task.task.title} (마감: ${task.task.endDate.getFullYear()}년 ${task.task.endDate.getMonth() + 1}월 ${task.task.endDate.getDate()}일까지!)`).join('\n')}

✨ 오늘도 힘내세요! 화이팅! 💪`,
        botName: '캘린이',
      },
    });
    await this.apiService.useNativeFunction(request2);

    return {
      result: {},
    };
  }

  /**
   * 외부 채널에 `tutorial` 커맨드를 등록하는 메서드
   */
  get command(): Command {
    const commandForTask: Command = {
      name: MY_TASK,
      scope: 'desk',
      description: '내 할일 보기',
      actionFunctionName: MY_TASK,
      alfMode: 'disable',
      enabledByDefault: true,
    };
    return commandForTask;
    // await this.apiService.registerCommandToChannel([commandForTask]);
  }
}
