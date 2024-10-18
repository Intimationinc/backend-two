import { Injectable } from '@nestjs/common';
import NAMES from './data/names.json';

@Injectable()
export class AppService {
  getNames(): string[] {
    return NAMES;
  }
}
