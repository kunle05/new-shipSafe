const jwt = require('jsonwebtoken');
const { hasPermission } = require('../utils');

const Query = {
  users: async (_, args, ctx, info) => {
    if (!ctx.req.userId) {
      throw new Error('Log in is required');
    }
    const admin = await ctx.User.findById(ctx.req.userId);
    if (!hasPermission(admin)) {
      throw new Error('You do not have the required permission to view this page');
    }
    return ctx.User.find()
      .populate({
        path: 'location',
      })
      .skip(args.skip)
      .limit(args.limit)
      .sort('username');
  },
  user: async (_, args, ctx, info) => {
    if (!ctx.req.userId) {
      throw new Error('Log in is required');
    }
    const admin = await ctx.User.findById(ctx.req.userId);
    if (!hasPermission(admin)) {
      throw new Error('You do not have the required permission to view this page');
    }
    return ctx.User.findById(args._id).populate({
      path: 'location',
    });
  },
  me: async (_, args, ctx, info) => {
    if (!ctx.req.userId) {
      return null;
    }
    return ctx.User.findById(ctx.req.userId).populate({
      path: 'location',
    });
  },
  userCount: async (_, args, ctx, info) => {
    return ctx.User.countDocuments();
  },
};

module.exports = Query;
