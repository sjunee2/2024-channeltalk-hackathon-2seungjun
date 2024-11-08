import { ApiProperty } from '@nestjs/swagger';
import {
  BaseFunctionInput,
  WamFunctionOutput,
} from 'src/common/interfaces/function.interface';
import { TaskStatus } from 'src/infra/task-status.enum';
import { TaskUserMapEntity } from 'src/infra/task-user-map.entity';
import { UserEntity } from 'src/infra/user.entity';
import { Timestamp } from 'typeorm';

export class TaskInput extends BaseFunctionInput {}

export class TaskOutput extends WamFunctionOutput {}

export class HandleTaskRequestDto {
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

  @ApiProperty({ description: '삭제일자' })
  deletedAt: Timestamp | null;
}
