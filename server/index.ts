import * as Fastify from 'fastify';
import * as fastifyCORS from 'fastify-cors';
import * as config from 'config';
import "reflect-metadata";
import routes from './routes';

const main = async () => {
  const server = Fastify({
    logger: true
  });

  const options = {
    'origin': true,
    'methods': [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'OPTIONS'
    ]
  }

  server.register(fastifyCORS, options);

  try {
    server.after(() => {
      routes.forEach(Route => {
        const options: any = {};

        options.prefix = '/backend';

        server.register((f, opts, next) => {
          const r = new Route(f);
          next();
        }, options);
      });
    });
    
    server.listen(3000, err => {
      if (err) throw err
      server.log.info(`server listening on ${server.server.address().port}`);
    });
  } catch (err) {
    server.log.info('Failed to start server');

    process.exit(1);
  }
};
main();

