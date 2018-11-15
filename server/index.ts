import * as fastify from 'fastify';
import * as cors from 'cors';
import * as http from 'http';
import routes from './routes/index';

const main = async () => {
  const server = fastify({
    logger: true
  });


  try {
    const opts = {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              hello: {
                type: 'string'
              }
            }
          }
        }
      }
    }
    
    function getHelloHandler (req: fastify.FastifyRequest<http.IncomingMessage>,
        reply: fastify.FastifyReply<http.ServerResponse>) {
      reply.header('Content-Type', 'application/json').code(200)
      reply.send({ hello: 'world' })
    }

    server.use(cors());
    server.get('/', opts, getHelloHandler);


    // server.after(() => {
    //   routes.forEach(Route => new Route(server));
    // });
    
    server.listen(3000, err => {
      if (err) throw err
      console.log(`server listening on ${server.server.address().port}`)
    });
  } catch (err) {
    server.log.info('Failed to start server');

    process.exit(1);
  }
};
main();

