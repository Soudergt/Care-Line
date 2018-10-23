import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from '../../libs/UserService';

export class UserRoute {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      handler: this.getUser,
      method: 'GET',
      schema: {
        querystring: {
          properties: {
            uid: {
              description: 'User ID',
              type: 'number'
            }
          },
          required: ['uid'],
          type: 'object'
        },
        response: {
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
      url: '/user/getUser'
    });
  }

  private async getUser(
    request: FastifyRequest<IncomingMessage>,
    reply: FastifyReply<ServerResponse>
  ) {
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
