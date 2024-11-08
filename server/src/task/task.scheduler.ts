import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { TaskEntity } from 'src/infra/task.entity';
import { TaskStatus } from 'src/infra/task-status.enum';
import { ChannelApiService } from 'src/channel-api/channelApi.service';
import { ChannelEntity } from 'src/infra/channel.entity';
import { BaseFunctionRequest } from 'src/common/interfaces/function.interface';

@Injectable()
export class TaskScheduler {
  private readonly appId = process.env.CHANNEL_APPLICATION_ID;
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly apiService: ChannelApiService,
    @InjectRepository(ChannelEntity)
    private readonly channelRepository: Repository<ChannelEntity>,
  ) {}

  // @Cron('*/10 * * * * *')
  // async handleCron() {
  //   const tasks = await this.taskRepository.find({
  //     //   where: { taskStatus: TaskStatus. },
  //   });
  //   console.log(tasks);
  // }

  @Cron('*/5 * * * *')
  // @Cron('*/10 * * * * *')
  async overallMessage() {
    const channels = await this.channelRepository.find();
    for (const channel of channels) {
      const tasks = await this.taskRepository.find({
        where: {
          taskStatus: Not(TaskStatus.DONE),
          deletedAt: null,
          channelId: channel.id,
        },
        relations: {
          taskUserMaps: {
            user: true,
          },
        },
      });
      console.log(tasks);

      const now = new Date();
      const ONE_DAY = 24 * 60 * 60 * 1000;
      // 1일 이내 남은 일
      const oneDayTasks = tasks.filter((task) => {
        const endDate = task.endDate;
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / ONE_DAY);
        return diffDays <= 1;
      });

      // 1일~3일 남은 일
      const threeDayTasks = tasks.filter((task) => {
        const endDate = task.endDate;
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / ONE_DAY);
        return diffDays > 1 && diffDays <= 3;
      });

      // 1주 이상 남은 일
      const oneWeekTasks = tasks.filter((task) => {
        const endDate = task.endDate;
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / ONE_DAY);
        return diffDays >= 7;
      });

      const request = BaseFunctionRequest.createNew({
        context: {
          channel: {
            id: String(channel.id),
          },
          caller: {
            id: String(channel.groupId),
            type: 'user',
          },
        },
      } as BaseFunctionRequest<any>);
      request.setMethod('writeGroupMessage');
      request.addParams({
        channelId: channel.id,
        groupId: channel.groupId,
        rootMessageId: undefined,
        dto: {
          plainText: `📅 ${channel.name}의 ${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월 ${new Date().getDate()}일 할 일 현황을 알려드립니다 📅

🚨 긴급 처리가 필요한 일정 (1일 이내 마감)
${
  oneDayTasks.length === 0
    ? '긴급한 일정이 없네요! 잘 하고 계십니다 👍'
    : `현재 긴급하게 처리해야 할 일정이 ${oneDayTasks.length}개 있습니다. 서둘러 확인해주세요!\n${oneDayTasks
        .map(
          (task) =>
            `- ${task.title} (${task.taskUserMaps.map((map) => map.user.name).join(', ')})`,
        )
        .join('\n')}`
}

⚠️ 주의가 필요한 일정 (3일 이내 마감)
${
  threeDayTasks.length === 0
    ? '3일 이내 마감되는 일정이 없습니다. 여유있게 일하세요! 🎉'
    : `앞으로 3일 안에 처리해야 할 일정이 ${threeDayTasks.length}개 있습니다. 미리미리 준비해주세요.\n${threeDayTasks
        .map(
          (task) =>
            `- ${task.title} (${task.taskUserMaps.map((map) => map.user.name).join(', ')})`,
        )
        .join('\n')}`
}

📌 장기 프로젝트 (1주일 이상)
${
  oneWeekTasks.length === 0
    ? '장기 프로젝트가 없습니다. 새로운 도전을 시작해보세요! 💪'
    : `장기적으로 진행해야 할 프로젝트가 ${oneWeekTasks.length}개 있습니다. 계획적으로 진행해주세요!\n${oneWeekTasks
        .map(
          (task) =>
            `- ${task.title} (${task.taskUserMaps.map((map) => map.user.name).join(', ')})`,
        )
        .join('\n')}`
}`,
          botName: '캘린이',
          buttons: [
            {
              title: '캘린더 바로가기',
              colorVariant: 'COLOR_VARIANT_COBALT',
              action: {
                wamAction: {
                  attributes: {
                    appId: this.appId,
                    clientId: channel.groupId,
                    name: '/',
                    params: {},
                  },
                },
              },
            },
          ],
        },
      });
      console.log(request);
      await this.apiService.useNativeFunction(request);
    }
  }
}
