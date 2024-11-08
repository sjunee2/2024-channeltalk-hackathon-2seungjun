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
import { GetUserInfoResponseDto, HandleTaskRequestDto } from './task/task.dto';
import { AppService } from './app.service';
import { TaskEntity } from './infra/task.entity';
import { UserEntity } from './infra/user.entity';

@Controller()
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
  @Put('functions')
  async handleFunction(
    @Body() body: BaseFunctionRequest<BaseFunctionInput>,
  ): Promise<BaseFunctionOutput> {
    try {
      return await this.handlerRegistry.executeHandler(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({
    summary: 'Task 생성',
  })
  @ApiResponse({
    status: 201,
    type: HandleTaskRequestDto,
  })
  @Put('functions/task')
  async createTask(@Body() body: HandleTaskRequestDto): Promise<void> {
    try {
      await this.appService.createTask(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({
    summary: '특정 채널의 Task 조회',
  })
  @ApiResponse({
    status: 200,
    type: TaskEntity,
    isArray: true,
  })
  @Get('functions/task/:channelId')
  async getTaskAll(
    @Param('channelId') channelId: string,
  ): Promise<TaskEntity[]> {
    try {
      return await this.appService.getTaskAll(channelId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({
    summary: '특정 유저 정보 조회',
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @Get('functions/task/user/:userId')
  async getUserInfo(
    @Param('userId') userId: string,
  ): Promise<GetUserInfoResponseDto> {
    try {
      return await this.appService.getUserInfo(userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  @ApiOperation({
    summary: '모든 유저 정보 조회',
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    isArray: true,
  })
  @Get('functions/task/all-user')
  async getAllUserInfo(): Promise<GetUserInfoResponseDto[]> {
    try {
      return await this.appService.getAllUserInfo();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
