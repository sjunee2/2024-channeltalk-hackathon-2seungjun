import { ApiProperty } from '@nestjs/swagger';

export const CallerTypes = {
  USER: 'user',
  MANAGER: 'manager',
  APP: 'app',
} as const;

export type CallerType = (typeof CallerTypes)[keyof typeof CallerTypes];

export class Channel {
  @ApiProperty()
  id: string;
}

export class Caller {
  @ApiProperty({ enum: CallerTypes })
  type: CallerType;

  @ApiProperty()
  id: string;
}

export class Context {
  @ApiProperty({ type: () => Channel })
  channel: Channel;

  @ApiProperty({ type: () => Caller })
  caller: Caller;
}

// 기본 파라미터 인터페이스
export interface BaseParams {
  chat?: {
    type: string;
    id: string;
    [key: string]: any; // 다른 최상위 객체들도 자유롭게 추가 가능
  };
  trigger?: {
    type: string;
    attributes: object;
    [key: string]: any; // 다른 최상위 객체들도 자유롭게 추가 가능
  };
  input?: any;
  [key: string]: any; // 다른 최상위 객체들도 자유롭게 추가 가능
}

export class BaseFunctionRequest<T = any> {
  private constructor() {}

  static createNew(body: BaseFunctionRequest): BaseFunctionRequest {
    const newRequest = new BaseFunctionRequest();
    newRequest.context = body.context;
    newRequest.params = body.params;
    return newRequest;
  }

  public addParams(params: BaseParams) {
    this.params = { ...this.params, ...params };
  }

  public addContext(context: Context) {
    this.context = { ...this.context, ...context };
  }

  public setMethod(method: string) {
    this.method = method;
  }

  @ApiProperty()
  method?: string;

  @ApiProperty({ type: () => Object })
  params?: BaseParams & T; // 기본 파라미터와 제네릭 타입을 합침

  @ApiProperty({ type: () => Context, required: false })
  context?: Context;
}

export class BaseFunctionInput {}

export class BaseFunctionError {
  @ApiProperty()
  type: string;

  @ApiProperty()
  message: string;
}

export class BaseFunctionOutput {}
export class GeneralFunctionOutput extends BaseFunctionOutput {
  @ApiProperty({ example: {} })
  result?: object;

  @ApiProperty({ type: () => BaseFunctionError })
  error?: BaseFunctionError;
}

export class WamAttributes {
  @ApiProperty({ description: 'app-tutorial의 app id' })
  appId: string;

  @ApiProperty({ description: 'client id' })
  clientId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'object', properties: {} })
  wamArgs: { [key: string]: any };
}

export class WamFunctionResult {
  @ApiProperty({ example: 'wam' })
  type: 'wam';

  @ApiProperty({ type: () => WamAttributes })
  attributes: WamAttributes;
}

export class WamFunctionOutput extends BaseFunctionOutput {
  @ApiProperty({ type: () => WamFunctionResult })
  result?: WamFunctionResult;

  @ApiProperty({ type: () => BaseFunctionError })
  error?: BaseFunctionError;
}
