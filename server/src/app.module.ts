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

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HandlerRegistry,
    TokenService,
    ChannelApiService,
    TutorialService,
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
  ) {}

  async onModuleInit() {
    try {
      this.logger.log('Registering TutorialService handler...');
      this.handlerRegistry.registerHandler(TUTORIAL, this.tutorialService);
    } catch (error) {
      this.logger.error('Failed to initialize module', error.stack);
      throw error;
    }
  }
}
