export interface GetFaviconRequestRoute {
  Querystring: {
    url: string;
    grabImage?: boolean;
    fast?: boolean;
  };
}
