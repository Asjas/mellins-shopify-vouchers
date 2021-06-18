import fastify from "fastify";
import shopifyGraphQLProxy from "fastify-shopify-graphql-proxy";

const { ACCESS_TOKEN } = process.env;

async function createServer() {
  const server = fastify({
    logger: {
      prettyPrint: true,
    },
  });

  await server.register(import("fastify-favicon"));

  // @ts-ignore
  await server.register(shopifyGraphQLProxy, {
    shop: "https://online-mellins.myshopify.com",
    password: ACCESS_TOKEN,
  });

  return server;
}

export default createServer;
