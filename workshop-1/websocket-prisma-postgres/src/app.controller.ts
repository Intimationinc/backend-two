import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/chat')
  @Render('chat') // This renders the 'views/chat.ejs' template
  getChat() {
    return {};
  }
}
