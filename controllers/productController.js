const dbConnection = require("../db");

exports.addProduct = (req, res) => {
  const { product_name, product_price, product_description } = req.body;

  const query = `insert into product (product_name,product_price,product_description) values ('${product_name}',${product_price},'${product_description}')`;

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

exports.getAllProduct = (req, res) => {
  const query = `select * from product`;

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

exports.orderProduct = (req, res) => {
  const user_id = req.profile.user_id;
  let { product_id } = req.body;
  product_id = JSON.stringify(product_id);

  const query = `insert into orderedproduct (user_id,product_id) values(${user_id},${product_id})`;

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
