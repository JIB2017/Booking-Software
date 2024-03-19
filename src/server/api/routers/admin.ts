import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "../trpc";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { getJwtSecretKey } from "~/lib/auth";
import cookie from "cookie";
import { TRPCError } from "@trpc/server";

export const adminRouter = router({
  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { res } = ctx;
      const { email, password } = input;
      const secret = new TextEncoder().encode(getJwtSecretKey());

      if (input.email === email && input.password === password) {
        const token = await new SignJWT({})
          .setProtectedHeader({ alg: "HS256" })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime("2h")
          .sign(secret);

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("user-token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          }),
        );

        return { success: true };
      }

      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }),
  
  sensitive: adminProcedure.mutation(() => {
    return "sensitive"
  })
});
