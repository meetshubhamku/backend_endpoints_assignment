const dbConnection = require("../db");
const { v4: uuidv4 } = require("uuid");
const { createHmac } = require("crypto");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
require("dotenv").config();

// signup module
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }

  let { name, role, password, email } = req.body;
  const salt = uuidv4();
  password = pass_encryptor(password, salt); //Encrypting password

  //defining query
  const query = `insert into users (user_name,user_email,user_role,user_password,user_salt) values ('${name}','${email}',${role},'${password}','${salt}')`;

  dbConnection.query(query, function (error, results, fields) {
    if (error) {
      return res.json(error);
    } else {
      return res.json({
        result: results,
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }

  const query = `select * from users where user_email = '${email}'`;
  dbConnection.query(query, function (error, results) {
    if (error) {
      return res.json(error);
    } else {
      if (
        results[0].user_password ===
        pass_encryptor(password, results[0].user_salt)
      ) {
        const token = jwt.sign({ id: results[0].user_id }, process.env.SECRET);
        res.cookie("testAssignmentToken", token, { expire: new Date() + 9999 });
        let { user_id, user_name, user_email, user_role } = results[0];
        return res.json({
          token,
          user: {
            user_id,
            user_name,
            user_email,
            user_role,
          },
        });
      } else {
        return res.json({
          error: "Invalid User",
        });
      }
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("testAssignmentToken");
  res.send("Signout Successful");
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  const checker = req.profile && req.auth && req.profile.user_id == req.auth.id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied. Please Login",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.user_role == 0) {
    return res.status(403).json({
      error: "Not an ADMIN, Access DENIED",
    });
  }
  next();
};

const pass_encryptor = (plainPassword, salt) => {
  return createHmac("sha256", salt).update(plainPassword).digest("hex");
};
