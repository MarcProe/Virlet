import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig);

export const getServerSession = () => NextAuth(authConfig).getServerSession;
