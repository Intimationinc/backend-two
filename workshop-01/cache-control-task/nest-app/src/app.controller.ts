import { Controller, Get, Header, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { NamesResponseDto } from './names.dto';
import * as crypto from 'crypto';
import { Request, Response } from 'express';

@ApiTags('names')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('names')
  @Header('Cache-Control', 'public, max-age=10')
  @ApiOperation({ summary: 'Get a list of names' })
  @ApiResponse({
    status: 200,
    description: 'List of names retrieved successfully.',
    type: NamesResponseDto,
  })
  getNames(
    @Req() req: Request,
    @Res() res: Response,
  ): Response<NamesResponseDto> {
    // log the request with random id
    console.log(`Request with random id: ${Math.random()}`);
    return res.json({ names: this.appService.getNames() });
  }
  // generate etag
  generateEtag(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}
