import { ApiProperty } from '@nestjs/swagger';

export class NamesResponseDto {
  @ApiProperty({
    example: ['Alice', 'Bob', 'Charlie'],
    description: 'List of names',
  })
  names: string[];
}
