export const getFavIconRequestSchema = {
  schema: {
    querystring: {
      type: "object",
      required: ["url"],
      properties: {
        url: { type: "string" },
      },
    },
  },
};
