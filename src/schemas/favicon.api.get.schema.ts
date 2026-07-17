export const getFaviconRequestSchema = {
  schema: {
    querystring: {
      type: "object",
      required: ["url"],
      properties: {
        url: { type: "string" },
        grabImage: { type: "boolean" },
        fast: { type: "boolean" },
      },
    },
  },
};
