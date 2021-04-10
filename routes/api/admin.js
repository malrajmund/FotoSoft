const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../../models/Admin");
/*
router.post(
  "/",
  [check("password", "Haslo jest wymagane!").exists()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      let admin = await Admin.findOne({ name: "Admin" });
      console.log(admin, password);
      if (!admin) {
        return res.status(400).json({ errors: [{ msg: "Złe dane!" }] });
      }

      const isMatch = () => (password === admin.password ? true : false);

      if (!isMatch()) {
        return res.status(400).json({ errors: [{ msg: "Złe hasło!" }] });
      }

      const payload = {
        user: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
*/
module.exports = router;
