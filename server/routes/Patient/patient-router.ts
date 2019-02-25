import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { PatientService } from '../../libs/PatientService';

export class PatientRouter {
  constructor(fastify: FastifyInstance) {
    fastify.route({
      handler: this.getPatients,
      url: '/patient/getPatients/:uid',
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
    });

    fastify.route({
      handler: this.getPatient,
      url: '/patient/getPatient/:id',
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
    });

    fastify.route({
      handler: this.addPatient,
      url: '/patient/addPatient',
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
      handler: this.editPatient,
      url: '/patient/editPatient',
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
      handler: this.deletePatient,
      url: '/patient/deletePatient',
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

  private async getPatients(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
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

  private async getPatient(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
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

  private async addPatient(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { newPatient } = request.query;

      const patient = await new PatientService().addPatient(newPatient);
      
      reply.code(200).send({
        data: { patient: patient },
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

  private async editPatient(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { selectedPatient } = request.query;

      const patient = await new PatientService().editPatient(selectedPatient);
      
      reply.code(200).send({
        data: { patient: patient },
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

  private async deletePatient(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) {
    try {
      const { patientID } = request.query;

      const patient = await new PatientService().deletePatient(patientID);
      
      reply.code(200).send({
        data: { patient: patient },
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

