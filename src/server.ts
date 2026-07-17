import path from "node:path";
import { fileURLToPath } from "node:url";
import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import { ApiController } from "./api.controller.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = Fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
});

const apiController = new ApiController(app);
apiController.register();

const port = Number(process.env.PORT) || 2324;

app.listen({ port, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
