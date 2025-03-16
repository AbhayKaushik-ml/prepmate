import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_cDfPdw7Wk8pV@ep-muddy-heart-a8cqctcn-pooler.eastus2.azure.neon.tech/AI-Study-Material-Generator?sslmode=require'
}
});
