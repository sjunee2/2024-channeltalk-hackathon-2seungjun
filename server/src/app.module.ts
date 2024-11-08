import { Module, OnModuleInit, Logger } from '@nestjs/common';

import { AppService } from './app.service';
import { HandlerRegistry } from 'src/common/handler/handler.registry';
import { TUTORIAL, TutorialService } from 'src/tutorial/tutorial.service';
import { AppController } from 'src/app.controller';
import { ChannelApiService } from 'src/channel-api/channelApi.service';
import { TokenService } from 'src/token/token.service';
import { RedisClientOptions } from 'redis';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigs } from 'src/infra/config';
import { ConfigModule } from '@nestjs/config';
import { TASK, TaskService } from 'src/task/task.service';
import { TaskEntity } from 'src/infra/task.entity';
import { UserEntity } from 'src/infra/user.entity';
import { TaskUserMapEntity } from 'src/infra/task-user-map.entity';
import { INIT, InitService } from 'src/init/init.service';
import { ChannelEntity } from 'src/infra/channel.entity';
import { TaskScheduler } from 'src/task/task.scheduler';
import { ScheduleModule } from '@nestjs/schedule';
import { MY_TASK, MyTaskService } from 'src/myTasks/myTask.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev'],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'wam', 'dist'), // 프론트엔드 빌드 경로
      exclude: ['/functions*'], // '/api'로 시작하는 경로는 정적 파일 제공에서 제외
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: async () => ({
        store: await redisStore({
          database: parseInt(process.env.REDIS_CACHE_DB),
          ttl: 60 * 60 * 24 * 30,
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT),
          },
        }),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigs,
    }),
    TypeOrmModule.forFeature([
      TaskEntity,
      UserEntity,
      TaskUserMapEntity,
      ChannelEntity,
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HandlerRegistry,
    TokenService,
    ChannelApiService,
    TutorialService,
    TaskService,
    InitService,
    TaskScheduler,
    MyTaskService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: HttpInterceptorService,
    // },
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    private readonly handlerRegistry: HandlerRegistry,
    private readonly channelApiService: ChannelApiService,
    private readonly tutorialService: TutorialService,
    private readonly taskService: TaskService,
    private readonly initService: InitService,
    private readonly myTaskService: MyTaskService,
  ) {}

  async onModuleInit() {
    try {
      this.logger.log('Registering TutorialService handler...');
      this.handlerRegistry.registerHandler(TUTORIAL, this.tutorialService);
      this.handlerRegistry.registerHandler(TASK, this.taskService);
      this.handlerRegistry.registerHandler(INIT, this.initService);
      this.handlerRegistry.registerHandler(MY_TASK, this.myTaskService);

      if (process.env.SYNCHO_COMMAND === 'true') {
        await this.channelApiService.registerCommandToChannel([
          this.tutorialService.command,
          this.taskService.command,
          this.initService.command,
          this.myTaskService.command,
        ]);
      }
    } catch (error) {
      this.logger.error('Failed to initialize module', error.stack);
      throw error;
    }
  }
}
