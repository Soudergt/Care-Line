import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { UserService } from '../../services/User/user-service';

export class UserRouter {
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
      url: '/user/getUser',
      method: 'GET',
      schema: {
        querystring: {
          uid: {
            description: 'User ID',
            type: 'integer'
          },
          required: ['uid'],
          type: 'object'
        },
        response: {
          200: {
            properties: {
              data: {
                properties: {
                  user: { 
                    additionalProperties: true,
                    type: 'object' 
                  }
                },
                type: "object"
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
      handler: this.getCaretaker,
      url: '/user/getCaretaker/:id',
      method: 'GET',
      schema: {
        querystring: {
          properties: {
            id: {
              description: 'Caretaker ID',
              type: 'number'
            }
          },
          required: ['id'],
          type: 'object'
        },
        response: {
          200: {
            properties: {
              data: {
                caretaker: {
                  additionalProperties: true, 
                  type: 'object' 
                },
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

    fastify.route({
      handler: this.editUser,
      url: '/user/editUser',
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
      handler: this.deleteUser,
      url: '/user/deleteUser',
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
        data: { users: users },
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

      const user = await new UserService().getUser(uid);
            
      reply.code(200).send({
        data: { user },
        message: 'SUCCESS',
        statusCode: 200
      });
    } catch (error) {
      reply.code(400).send({
        message: 'ERROR',
        statusCode: 400
      });
    }
  }

  private async getCaretaker(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { id } = request.query;

      const caretaker = await new UserService().getCaretaker(id);
      request.log.info('user: ' + caretaker);
            
      reply.code(200).send({
        data: { caretaker },
        message: 'SUCCESS',
        statusCode: 200
      });
    } catch (error) {
      reply.code(400).send({
        message: 'ERROR',
        statusCode: 400
      });
    }
  }

  private async addUser(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { newUser } = request.query;

      const user = await new UserService().addUser(newUser);
      
      reply.code(200).send({
        data: { user: user },
        message: 'SUCCESS',
        statusCode: 200
      });
    } catch (error) {
      reply.code(400).send({
        message: 'ERROR',
        statusCode: 400
      });
    }
  }

  private async editUser(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { selectedUser } = request.query;

      const user = await new UserService().editUser(selectedUser);
      
      reply.code(200).send({
        data: { user: user },
        message: 'SUCCESS',
        statusCode: 200
      });
    } catch (error) {
      reply.code(400).send({
        message: 'ERROR',
        statusCode: 400
      });
    }
  }

  private async deleteUser(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { userID } = request.query;

      const user = await new UserService().deleteUser(userID);
      
      reply.code(200).send({
        data: { user: user },
        message: 'SUCCESS',
        statusCode: 200
      });
    } catch (error) {
      reply.code(400).send({
        message: 'ERROR',
        statusCode: 400
      });
    }
  }
}
