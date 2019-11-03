import jwt from "jsonwebtoken";
import UserModel from "./models/user";
import { CONFIG } from "./config";
import { AuthenticationError, ForbiddenError } from "apollo-server-express";
import { request } from "https";

// return user object from database if user is authenticated succesfully
export const authenticate = async function(req, fromRefeshTokenCookie = false) {
  // extract token from cookie/authorization header
  let token = null;
  if (fromRefeshTokenCookie) {
    // extract jwt refresh token from refresh token cookie
    token = req.cookies[CONFIG.JWT_REFRESH_COOKIE_NAME];
    if (!token)
      throw new AuthenticationError("Auth error: Refresh token not found!");
  } else {
    // extract jwt access token from HTTP header
    const authorization = req.headers["authorization"];
    if (!authorization)
      throw new AuthenticationError(
        "Auth error: Missing authorization header!"
      );

    token = authorization.split(" ")[1];
    if (!token)
      throw new AuthenticationError(
        "Auth error: Invalid authorization header!"
      );
  }

  // veryfy jwt access token
  let payload = null;
  try {
    const secret =
      fromRefeshTokenCookie === true
        ? CONFIG.JWT_REFRESH_TOKEN_SECRET
        : CONFIG.JWT_ACCESS_TOKEN_SECRET;
    payload = jwt.verify(token, secret);
  } catch {
    throw new AuthenticationError("Auth error: invalid jwt!");
  }

  // verify if user was found in database
  const user = await UserModel.findById(payload.id);
  if (!user)
    throw new AuthenticationError("Auth error: user id does not exist!");

  // verify tokenVersion from payload agains tokenVersion from user database
  if (payload.tokenVersion !== user.tokenVersion) {
    throw new AuthenticationError("Auth error: invalid auth token version!");
  }
  // if everything is ok return the authenticated user from database
  return user;
};

export const createAccessToken = function(user) {
  return jwt.sign(
    {
      id: user.id,
      tokenVersion: user.tokenVersion
    },
    CONFIG.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: CONFIG.JWT_ACCESS_TOKEN_EXPIRE
    }
  );
};

export const createRefreshTokenCookie = function(res, user) {
  const refreshToken = jwt.sign(
    { id: user.id, tokenVersion: user.tokenVersion },
    CONFIG.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: CONFIG.JWT_REFRESH_TOKEN_EXPIRE
    }
  );

  res.cookie(CONFIG.JWT_REFRESH_COOKIE_NAME, refreshToken, {
    path: "/",
    httpOnly: true,
    maxAge: parseInt(CONFIG.JWT_REFRESH_COOKIE_EXPIRE)
  });
};

export const refreshTokens = async function(req, res) {
  try {
    const user = await authenticate(req, true);
    const accessToken = createAccessToken(user);
    createRefreshTokenCookie(res, user);
    res.json({ accessToken });
  } catch (e) {
    res.status(401);
    res.json({ error: e.message, accessToken: null });
  }
};
