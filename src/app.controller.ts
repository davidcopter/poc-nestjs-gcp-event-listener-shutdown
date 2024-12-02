import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('event')
  async postEvent(@Body() createEventDto: CreateEventDto): Promise<string> {
    return await this.appService.postEvent(createEventDto);
  }
}
