const Order = require("../../model/orders.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const systemConfig = require("../../config/system");
const Account = require("../../model/accounts.model");
const Role = require("../../model/roles.model");
const Product = require("../../model/products.model");

// [GET] /admin/orders
module.exports.index = async (req, res) => {
    try {
        // Pagination
        const countOrders = await Order.countDocuments({
        });
        const pagination = paginationHelper(
            {
                currentPage: 1,
                limitItems: 5
            },
            req.query,
            countOrders
        );
        // End Pagination

        const orders = await Order.find({
        })
        .skip(pagination.skip)
        .limit(pagination.limitItems);

        // Tính tổng tiền cho mỗi đơn hàng
        for (const order of orders) {
            let total = 0;
            for (const item of order.products) {
                const price = item.price * (1 - item.discountPercentage / 100);
                total += price * item.quantity;
            }
            order.total = total;
        }

        res.render("admin/page/orders/index", {
            pageTitle: "Danh sách đơn hàng",
            orders: orders,
            pagination: pagination
        });
    } catch (error) {
        console.error(error);
        res.redirect("back");
    }
};