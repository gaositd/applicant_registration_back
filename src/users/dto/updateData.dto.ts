import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  mail: string;
}

export class UpdateDocumentDTO {
  @IsOptional()
  @IsString({ each: true })
  observaciones: string[];
}

enum Operation {
  'approve' = 'approve',
  'reject' = 'reject',
}

export type OperationType = `${Operation}`;

export class ParamDocumentUpdateDTO {
  @IsEnum(Operation)
  operation: OperationType;
}
