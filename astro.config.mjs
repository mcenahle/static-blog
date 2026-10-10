import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  site: "https://static.blog.mcenahle.page",
  output: "static",
  trailingSlash: "always",
  integrations: [icon()],
});
