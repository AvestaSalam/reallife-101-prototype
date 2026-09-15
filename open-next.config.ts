import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig({
  // All routes in this app are static (no ISR / revalidate / tag-based
  // revalidation), so the default on-demand cache is sufficient.
  // To enable ISR/tag caching on Cloudflare later, follow:
  // https://opennext.js.org/cloudflare/caching
});

// Cloudflare Workers Builds runs `npm run build`, which is
// `opennextjs-cloudflare build`. By default that command runs the package.json
// build script (`npm run build`) again for the Next.js step, which would
// recurse infinitely. Point the inner build directly at `next build`.
config.buildCommand = "next build";

export default config;
