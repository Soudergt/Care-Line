import * as Fastify from 'fastify';
import * as fastifyCORS from 'fastify-cors';
import routes from './routes/index';

const main = async () => {
  const fastify = Fastify({
    logger: true
  });

  fastify.use(require('cors')());

  try {
    fastify.after(() => {
      routes.forEach(Route => new Route(fastify));
    });
    
    fastify.listen(3000, '0.0.0.0', (err?: Error) => {
      if (err) {
        fastify.log.error(err);

        return process.exit(1);
      }

      fastify.log.info('Server is listening on port 3000');
    });
  } catch (err) {
    fastify.log.info('Failed to start server');

    process.exit(1);
  }
};
main();

