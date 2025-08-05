import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';
const assetManifest = JSON.parse(manifestJSON);

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    try {
      return await getAssetFromKV(
        {
          request,
          waitUntil: ctx.waitUntil.bind(ctx),
        },
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        }
      );
    } catch (e) {
      // If the asset is not found, return the index.html for SPA routing
      const url = new URL(request.url);
      if (url.pathname.indexOf('.') === -1) {
        return await getAssetFromKV(
          {
            request: new Request(url.origin + '/index.html', request),
            waitUntil: ctx.waitUntil.bind(ctx),
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: assetManifest,
          }
        );
      }
      // Otherwise, return a 404 response
      return new Response('Not Found', { status: 404 });
    }
  },
};