import type { FastifyInstance } from "fastify";
import { getFaviconRequestSchema } from "./schemas/favicon.api.get.schema.js";
import { FaviconProvider } from "./services/favicon.provider.js";
import type { GetFaviconRequestRoute } from "./types/favicon.api.get.type.js";

export class ApiController {
  constructor(private readonly app: FastifyInstance) {}

  register() {
    this.app.get<GetFaviconRequestRoute>(
      "/api/favicon",
      getFaviconRequestSchema,
      async (request, reply) => {
        const faviconProvider = new FaviconProvider();

        const { url, ...options } = request.query;
        const response = await faviconProvider.grab(url, options);

        reply.send(response);
      },
    );
  }
}
