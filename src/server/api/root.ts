import { adminRouter } from "~/server/api/routers/admin";
import { router } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
