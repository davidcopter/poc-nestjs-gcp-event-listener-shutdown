import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventCreatedEvent } from 'src/event/event-created.event';

@Injectable()
export class EventCreatedListener {
  private readonly logger = new Logger(EventCreatedListener.name, {
    timestamp: true,
  });

  @OnEvent('event.created')
  async handleOrderCreatedEvent(event: EventCreatedEvent) {
    console.log(event);
    const time = event.event_delay;
    this.logger.warn(`Start holding request for ${time}s`);
    await new Promise((resolve) => setTimeout(resolve, time));
    this.logger.warn(`Finish holding request for ${time}s `);
  }
}
