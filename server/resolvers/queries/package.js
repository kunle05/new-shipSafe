const jwt = require('jsonwebtoken');
const { hasPermission } = require('../utils');

const Query = {
  weeklyPackages: async (_, args, ctx, info) => {
    if (!ctx.req.userId) {
      throw new Error('Log in is required');
    }
    const { origin } = args;

    return ctx.Package.find({
      origin,
      createdAt: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) },
    }).sort('-createdAt');
  },
  outBoundPackages: async (_, args, ctx, info) => {
    if (!ctx.req.userId) {
      throw new Error('Log in is required');
    }
    const { origin } = args;
    return ctx.Package.find({
      origin,
      'items.status.action': 'Shipped',
    })
      .populate({
        path: 'destination',
      })
      .sort('destination');
  },
  count: async (_, args, ctx, info) => {
    return ctx.Package.countDocuments();
  },
};

module.exports = Query;
