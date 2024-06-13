import { Elysia } from "elysia";
import cors from "@elysiajs/cors";
import authRoutes from "./routers/auth.routes";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .use(authRoutes)
  .listen(3100);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
