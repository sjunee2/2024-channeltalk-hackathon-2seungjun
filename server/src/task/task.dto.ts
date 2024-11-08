import { ApiProperty } from '@nestjs/swagger';
import {
  BaseFunctionInput,
  BaseFunctionOutput,
} from 'src/common/interfaces/function.interface';
import { TaskStatus } from 'src/infra/task-status.enum';
import { Column, Timestamp } from 'typeorm';

export class TaskInput extends BaseFunctionInput {}

export class TaskOutput extends BaseFunctionOutput {}

export class HandleTaskRequestDto {
  @ApiProperty({ description: 'Task 아이디' })
  id: string;

  @ApiProperty({ description: '채널 아이디' })
  channelId: string;

  @ApiProperty({ description: 'Task 상태', enum: TaskStatus })
  taskStatus: TaskStatus;

  @ApiProperty({ description: 'Task 제목' })
  title: string;

  @ApiProperty({ description: 'Task 내용' })
  contents: string;

  @ApiProperty({ type: 'string', description: '역할' })
  role: string;

  @ApiProperty({ type: 'string', description: '시작일' })
  startDate: Timestamp;

  @ApiProperty({ type: 'string', description: '종료일' })
  endDate: Timestamp;

  @ApiProperty({ description: '배정 대상 유저들 id' })
  userIds: number[];

  @ApiProperty({ type: 'string', description: '삭제일자' })
  deletedAt: Timestamp | null;
}

export class GetUserInfoResponseDto {
  @ApiProperty({ description: 'Task 아이디' })
  id: string;

  @ApiProperty({ description: '이름' })
  name: string;

  @ApiProperty({ description: '역할' })
  role: string;

  @ApiProperty({ description: 'Completed tasks' })
  completedTasks: number;

  @ApiProperty({ description: 'Total tasks' })
  totalTasks: number;

  @ApiProperty({ description: 'Avatar url' })
  avatarUrl: string;
}
