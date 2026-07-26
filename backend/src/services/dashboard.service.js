"use strict";

const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Ticket = require("../models/Ticket");

async function getDashboard() {
  const [
    totalUsers,
    activeUsers,
    bannedUsers,

    totalProducts,
    activeProducts,

    totalOrders,
    paidOrders,
    pendingOrders,

    openTickets,
    closedTickets,

    revenue,

    recentUsers,
    recentOrders,
    recentTickets,
  ] = await Promise.all([

    User.countDocuments(),

    User.countDocuments({
      status: "active",
    }),

    User.countDocuments({
      status: "banned",
    }),

    Product.countDocuments(),

    Product.countDocuments({
      active: true,
    }),

    Order.countDocuments(),

    Order.countDocuments({
      paymentStatus: "paid",
    }),

    Order.countDocuments({
      paymentStatus: "pending",
    }),

    Ticket.countDocuments({
      status: {
        $in: ["open", "waiting"],
      },
    }),

    Ticket.countDocuments({
      status: "closed",
    }),

    Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]),

    User.find()
      .sort({
        createdAt: -1,
      })
      .limit(5),

    Order.find()
      .populate("user", "minecraftUsername email")
      .sort({
        createdAt: -1,
      })
      .limit(5),

    Ticket.find()
      .populate("user", "minecraftUsername")
      .sort({
        createdAt: -1,
      })
      .limit(5),
  ]);

  return {
    statistics: {
      users: {
        total: totalUsers,
        active: activeUsers,
        banned: bannedUsers,
      },

      store: {
        products: totalProducts,
        activeProducts,
      },

      orders: {
        total: totalOrders,
        paid: paidOrders,
        pending: pendingOrders,
      },

      tickets: {
        open: openTickets,
        closed: closedTickets,
      },

      revenue: revenue.length
        ? revenue[0].total
        : 0,
    },

    recent: {
      users: recentUsers.map((u) =>
        u.toPublicJSON()
      ),

      orders: recentOrders.map((o) =>
        o.toPublicJSON()
      ),

      tickets: recentTickets.map((t) =>
        t.toPublicJSON()
      ),
    },
  };
}

module.exports = {
  getDashboard,
};