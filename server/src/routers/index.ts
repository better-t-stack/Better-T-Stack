import { router, publicProcedure } from "../lib/trpc";
import { z } from "zod";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
});

export type AppRouter = typeof appRouter;
