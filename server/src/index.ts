import { Hono } from "hono";
import { env } from "hono/adapter";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./routers/index";
import { createContext } from "./lib/context";

type Bindings = {
  FOO: string;
};

const app = new Hono<{
  Bindings: Bindings;
}>();

app.use(
  "/*",
  cors({
    origin: "http://localhost:3001",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_opts, hono) => {
      return createContext({ hono });
    },
  }),
);

app.get("/healthCheck", (c) => {
  return c.text("OK");
});

export default app;
