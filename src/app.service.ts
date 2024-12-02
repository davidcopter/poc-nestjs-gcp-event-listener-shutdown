import { Injectable, Logger } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventCreatedEvent } from './event/event-created.event';

@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}

  private readonly logger = new Logger(AppService.name, { timestamp: true });

  getHello(): string {
    return 'Hello World!';
  }

  async postEvent(data: CreateEventDto): Promise<string> {
    const time = 1000 * data.before_event;
    this.logger.warn(`Start holding request for ${time}s`);
    await new Promise((resolve) => setTimeout(resolve, time));
    this.logger.warn(`Finish holding request for ${time}s`);

    if (data.before_event > 0) {
      const payload = new EventCreatedEvent();
      payload.message = data.message;
      payload.event_delay = 1000 * data.after_event;
      this.eventEmitter.emit('event.created', payload);
    }

    return 'OK';
  }
}
