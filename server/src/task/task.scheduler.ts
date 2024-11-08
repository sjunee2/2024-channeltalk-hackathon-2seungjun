import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class TaskScheduler {
  constructor(private readonly appService: AppService) {}

  @Cron("0 0 * * * *")
  constructor() {}
}
