import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from '../../libs/UserService';

export class UserRoute {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      url: '/user/getUser/:uid',
      method: 'GET',
      schema: {
        querystring: {
          properties: {
            uid: {
              description: 'User ID',
              type: 'string'
            }
          },
          required: ['uid'],
          type: 'object'
        },
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
      },
      handler: this.getUser,
    });
  }

  private async getUser(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { uid } = request.query;

      const user = await new UserService().getUser(uid);
      
      reply.code(200).send({
        data: { user },
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
