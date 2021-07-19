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
