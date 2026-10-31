import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import client from "./mongodb";

export const auth = betterAuth({  
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(client.db("booknookDB"), {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  plugins: [jwt()],

  trustedOrigins: ["http://localhost:3000"],
});