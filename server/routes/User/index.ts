import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from '../../libs/UserService';

export class UserRoute {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      handler: this.getUsers,
      url: '/user/getUsers',
      method: 'GET',
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
      handler: this.getUser,
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
              data: { 
                additionalProperties: true,
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
      handler: this.addUser,
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

  private async getUsers(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const users = await new UserService().getUsers();
      
      reply.code(200).send({
        data: { users },
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

  private async getUser(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { uid } = request.query;
      request.log.info('user: ' + request);

      const user = await new UserService().getUser(uid);
      
      request.log.info('user: ' + user);
      
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

  private async addUser(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { newUser } = request.query;
      
      reply.code(200).send({
        data: { newUser },
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
