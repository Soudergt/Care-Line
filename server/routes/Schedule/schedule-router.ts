import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { ScheduleService } from '../../libs/ScheduleService';

export class ScheduleRouter {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      handler: this.addEvent,
      url: '/user/addUser',
      method: 'POST',
      schema: {
        response: {
          200: {
            properties: {
              data: { type: 'object' },
              message: { type: 'string' },
              statusCode: { type: 'integer' }
            },
            type: 'object'
          },
          400: {
            properties: {
              data: { type: 'object' },
              message: { type: 'string' },
              statusCode: { type: 'integer' }
            },
            type: 'object'
          }
        }
      }
    });
  }

  private async addEvent(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { newEvent } = request.query;

      const scheduleEvent = await new ScheduleService().addEvent(newEvent);
      
      reply.code(200).send({
        data: { scheduleEvent: scheduleEvent },
        message: 'SUCCESS',
        statusCode: 200
      });
    } catch (error) {
      reply.code(400).send({
        data: {},
        message: 'ERROR',
        statusCode: 400
      });
    }
  }
}