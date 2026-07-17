import { type GetFaviconOptions, getFavicon } from "grab-favicon";

export class FaviconProvider {
  async grab(url: string, options: Partial<GetFaviconOptions>) {
    return await getFavicon(url, {
      grabImage: !!options.grabImage,
      fast: !!options.fast,
    });
  }
}
