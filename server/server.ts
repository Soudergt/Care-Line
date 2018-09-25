import * as Fastify from "fastify";

const main = async () => {
  const fastify = Fastify({
    logger: true
  });

  // fastify.register(fastifySwagger, {
  //   exposeRoute: true,
  //   swagger: {
  //     consumes: ['application/json'],
  //     info: {
  //       description: 'Documentation for the AlwaysEducation Common API',
  //       title: 'AlwaysEducation Common API',
  //       version: '1.0.0'
  //     },
  //     produces: ['application/json'],
  //     schemes: ['http'],
  //   },
  // });

  try {
    // fastify.after(() => {
    //   routes.forEach(Route => new Route(fastify));
    // });

    fastify.listen(3000, "0.0.0.0", (err?: Error) => {
      if (err) {
        fastify.log.error(err);

        return process.exit(1);
      }

      fastify.log.info(
        `Server is listening on port 3000`
      );
    });
  } catch (err) {
    fastify.log.info("Failed to start server");

    if (process.env.NODE_ENV !== "production") {
      fastify.log.error(err);
    }

    process.exit(1);
  }
};

main();