const { AuthenticationError } = require('apollo-server');

const authenticated = next => (root, args, ctx, info) => {
  console.log(root, args, ctx, info, 'auth resolver');
  if (!ctx.currentUser) {
    throw new AuthenticationError();
  }
  return next(root, args, ctx, info);
};

module.exports = {
  Query: {
    me: authenticated((root, args, ctx) => {
      console.log(ctx.currentUser);
      return ctx.currentUser;
    }),
  },
};
