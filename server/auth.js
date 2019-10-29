import { AuthenticationError, ForbiddenError } from "apollo-server-express";

export const checkLoggedIn = function(req) {
  if (!req.session.userId) {
    throw new AuthenticationError("You are not logged in!");
  }
};

export const checkAlreadyLoggedIn = function(req) {
  if (req.session.userId) {
    throw new ForbiddenError("You are already logged in!");
  }
};
