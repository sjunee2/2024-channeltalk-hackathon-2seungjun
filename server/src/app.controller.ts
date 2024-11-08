import {
  Controller,
  Body,
  BadRequestException,
  Put,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HandlerRegistry } from 'src/common/handler/handler.registry';
import {
  BaseFunctionInput,
  BaseFunctionOutput,
  BaseFunctionRequest,
  GeneralFunctionOutput,
  WamFunctionOutput,
} from 'src/common/interfaces/function.interface';
import { HandleTaskRequestDto } from './task/task.dto';
import { AppService } from './app.service';
import { TaskEntity } from './infra/task.entity';

@Controller('functions')
export class AppController {
  constructor(
    private readonly handlerRegistry: HandlerRegistry,
    private readonly appService: AppService,
  ) {}

  @ApiOperation({
    summary: '채널톡 API 엔드포인트',
    description: '채널톡 API를 받는 엔드포인트입니다.',
  })
  @ApiResponse({
    status: '해커톤 화이팅' as unknown as number,
    type: GeneralFunctionOutput,
    description: 'WAM을 쓰지않는 BASE API 응답입니다.',
  })
  @ApiResponse({
    status: '오 이게 되네' as unknown as number,
    type: WamFunctionOutput,
    description: 'WAM을 쓰는 BASE API 응답입니다.',
  })
  @Put()
  async handleFunction(
    @Body() body: BaseFunctionRequest<BaseFunctionInput>,
  ): Promise<BaseFunctionOutput> {
    try {
      return await this.handlerRegistry.executeHandler(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('task')
  async createTask(@Body() body: HandleTaskRequestDto): Promise<void> {
    try {
      await this.appService.createTask(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('task/:channelId')
  async getTaskAll(
    @Param('channelId') channelId: string,
  ): Promise<TaskEntity[]> {
    try {
      return await this.appService.getTaskAll(channelId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
