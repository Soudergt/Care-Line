import * as Fastify from 'fastify';

const main = async () => {
  const fastify = Fastify();

  try {
    fastify.after(() => {

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

