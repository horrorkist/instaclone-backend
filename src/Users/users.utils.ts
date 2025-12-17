import jwt from "jsonwebtoken";
import client from "../client";
import { QueryResponse, Resolver } from "../types.js";

interface Token {
  id: number;
  iat: number;
}

export async function getUserWithToken(token) {
  try {
    // 1. 토큰이 없으면 에러를 던진다.
    if (!token) {
      return null;
    }
    // 2. 토큰을 해독한다.
    const { id } = (await jwt.verify(token, process.env.SECRET_KEY)) as Token;
    // 3. 해독한 토큰을 통해 유저를 찾는다.
    const user = await client.user.findUnique({ where: { id } });
    // 4. 유저가 존재하지 않으면 에러를 던진다.
    if (!user) {
      return null;
    }
    // 5. 유저가 존재하면 유저를 리턴한다.
    return user;
  } catch {
    return null;
  }
}

export function protectedResolver(resolver: Resolver): any {
  return function (root, args, context, info) {
    // 1. 로그인이 되어있는지 확인한다.
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    // 2. 로그인이 되어있으면 resolver를 실행한다.
    return resolver(root, args, context, info);
  };
}
