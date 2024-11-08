import { ApiProperty } from '@nestjs/swagger';
import {
  BaseFunctionInput,
  BaseFunctionOutput,
} from 'src/common/interfaces/function.interface';
import { TaskStatus } from 'src/infra/task-status.enum';
import { Timestamp } from 'typeorm';

export class TaskInput extends BaseFunctionInput {}

export class TaskOutput extends BaseFunctionOutput {}

export class CreateTaskRequestDto {
  @ApiProperty({ description: 'Task 아이디' })
  id: string;

  @ApiProperty({ description: '채널 아이디' })
  channelId: string;

  @ApiProperty({ description: 'Task 상태' })
  taskStatus: TaskStatus;

  @ApiProperty({ description: 'Task 제목' })
  title: string;

  @ApiProperty({ description: 'Task 내용' })
  contents: string;

  @ApiProperty({ description: '역할' })
  role: string;

  @ApiProperty({ description: '시작일' })
  startDate: Timestamp;

  @ApiProperty({ description: '종료일' })
  endDate: Timestamp;

  @ApiProperty({ description: '배정 대상 유저들 id' })
  userIds: number[];
}
