import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // All routes in this app are static (no ISR / revalidate / tag-based
  // revalidation), so the default on-demand cache is sufficient.
  // To enable ISR/tag caching on Cloudflare later, follow:
  // https://opennext.js.org/cloudflare/caching
});
