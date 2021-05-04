const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Admin = require("../../models/Admin");

router.get("/", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post(
  "/",
  [check("password", "Haslo jest wymagane!").exists()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }

    const { login, password } = req.body;

    try {
      let admin = await Admin.findOne({ name: login });
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

module.exports = router;
