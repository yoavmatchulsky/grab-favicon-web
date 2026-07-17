import type { FastifyInstance } from "fastify";
import { getFavIconRequestSchema } from "./schemas/favicon.api.get.schema.js";
import type { GetFaviconRequestRoute } from "./types/favicon.api.get.type.js";

export class ApiController {
  constructor(private readonly app: FastifyInstance) {}

  register() {
    this.app.get<GetFaviconRequestRoute>(
      "/api/favicon",
      getFavIconRequestSchema,
      async (request, reply) => {
        const { url } = request.query;

        reply.send({ url });
      },
    );
  }
}
