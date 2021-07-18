const { json } = require("body-parser");
const dbConnection = require("../db");

exports.getUserById = (req, res, next, id) => {
  const query = `select user_id,user_name,user_email,user_role from users where user_id=${id}`;
  dbConnection.query(query, function (error, results) {
    if (error) {
      return res.json(error);
    } else {
      req.profile = {
        user_id: results[0].user_id,
        user_name: results[0].user_name,
        user_email: results[0].user_email,
        user_role: results[0].user_role,
      };
      next();
    }
  });
};
