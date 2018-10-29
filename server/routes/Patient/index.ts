import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { PatientService } from '../../libs/PatientService';

export class PatientRoute {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      handler: this.getPatients,
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
      url: '/patient/getPatients'
    });

    fastify.route({
      handler: this.getPatient,
      method: 'GET',
      schema: {
        querystring: {
          properties: {
            uid: {
              description: 'Patient ID',
              type: 'number'
            }
          },
          required: ['id'],
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
      url: '/patient/getPatient'
    });
  }

  private async getPatients(
    request: FastifyRequest<IncomingMessage>,
    reply: FastifyReply<ServerResponse>
  ) {
    try {
      const { uid } = request.query;

      const patients = await new PatientService().getPatients(uid);

      reply.code(200).send({
        data: { patients },
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
  };

  private async getPatient(
    request: FastifyRequest<IncomingMessage>,
    reply: FastifyReply<ServerResponse>
  ) {
    try {
      const { id } = request.query;

      const patient = await new PatientService().getPatient(id);

      reply.code(200).send({
        data: { patient },
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

