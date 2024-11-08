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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.dev'],
      isGlobal: true,
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

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'wam', 'dist'),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigs,
    }),
    TypeOrmModule.forFeature([TaskEntity, UserEntity, TaskUserMapEntity]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HandlerRegistry,
    TokenService,
    ChannelApiService,
    TutorialService,
    TaskService,
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
  ) {}

  async onModuleInit() {
    try {
      this.logger.log('Registering TutorialService handler...');
      this.handlerRegistry.registerHandler(TUTORIAL, this.tutorialService);
      this.handlerRegistry.registerHandler(TASK, this.taskService);
      if (process.env.SYNCHO_COMMAND === 'true') {
        await this.channelApiService.registerCommandToChannel([
          this.tutorialService.command,
          this.taskService.command,
        ]);
      }
    } catch (error) {
      this.logger.error('Failed to initialize module', error.stack);
      throw error;
    }
  }
}
