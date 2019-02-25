import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { ScheduleService } from '../../libs/ScheduleService';

export class ScheduleRouter {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      handler: this.getEvents,
      url: '/schedule/getEvents/:date',
      method: 'GET',
      schema: {
        querystring: {
          date: {
            description: 'Selected Date',
            type: 'Date'
          }
        },
        response: {
          200: {
            properties: {
              user: { 
                type: 'object' 
              },
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

    fastify.route({
      handler: this.addEvent,
      url: '/schedule/addEvent',
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

    fastify.route({
      handler: this.editEvent,
      url: '/schedule/editEvent',
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

    fastify.route({
      handler: this.deleteEvent,
      url: '/schedule/deleteEvent',
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

  private async getEvents(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { selectedDate } = request.query;

      const scheduleEvent = await new ScheduleService().getEvents(selectedDate);
      
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

  private async editEvent(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { selectedEvent } = request.query;

      const scheduleEvent = await new ScheduleService().editEvent(selectedEvent);
      
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

  private async deleteEvent(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { eventID } = request.query;

      const scheduleEvent = await new ScheduleService().deleteEvent(eventID);
      
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