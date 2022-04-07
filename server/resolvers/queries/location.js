const jwt = require('jsonwebtoken');
const { hasPermission } = require('../utils');

const Query = {
  locations: async (_, args, ctx, info) => {
    const { active, skip, limit } = args;
    if (active) {
      return ctx.Location.find({ active });
    }
    return ctx.Location.find().skip(skip).limit(limit);
  },
  location: async (_, args, ctx, info) => {
    if (!ctx.req.userId) {
      throw new Error('Log in is required');
    }
    const admin = await ctx.User.findById(ctx.req.userId);
    if (!hasPermission(admin)) {
      throw new Error('You do not have the required permission to view this page');
    }
    return ctx.Location.findById(args._id);
  },
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
  count: async (_, args, ctx, info) => {
    return ctx.Location.countDocuments();
  },
};

module.exports = Query;
