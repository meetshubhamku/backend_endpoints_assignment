const dbConnection = require("../db");

exports.orderProduct = (req, res) => {
  const user_id = req.profile.user_id;
  let { product_id } = req.body;

  let query = `insert into orders (user_id) values (${user_id})`;
  dbConnection.query(query, function (error, results) {
    if (error) {
      return res.json(error);
    } else {
      const last_order_id = results.insertId; //provides the last inserted id
      query = `insert into ordered_products (order_no,product_id) values `;
      //creating a multiple insert query using map function
      product_id.map((pid) => {
        query = query + `(${last_order_id},${pid}),`;
      });
      query = query.substring(",", query.length - 1); //removing the last comma

      dbConnection.query(query, function (error, results) {
        if (error) {
          return res.json(error);
        } else {
          return res.json({
            result: results,
          });
        }
      });
    }
  });
};

exports.viewOrder = (req, res) => {
  const user_id = req.profile.user_id;
  const query = `select o.order_no,o.user_id,u.user_name,o.created_at,count(op.product_id) as 'total_poducts_ordered' from orders as o join ordered_products as op join users as u where o.user_id=${user_id} and o.user_id=u.user_id and o.order_no = op.order_no `;
  dbConnection.query(query, function (error, results) {
    if (error) {
      return res.json(error);
    } else {
      return res.json({
        result: results,
      });
    }
  });
};

exports.viewOrderAdmin = (req, res) => {
  const query = `select o.order_no,o.user_id, count(op.product_id) as 'ordered_products' from orders as o join ordered_products as op on o.order_no=op.order_no GROUP BY op.order_no`;
  dbConnection.query(query, function (error, results) {
    if (error) {
      return res.json(error);
    } else {
      return res.json({
        result: results,
      });
    }
  });
};
