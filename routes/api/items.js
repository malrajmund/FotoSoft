const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Item = require("../../models/Item");

//Dodanie nowego itemu
router.post(
  "/addItem",
  [
    auth,
    [
      check("name", "Wpisz nazwę!").exists(),
      check("EAN", "Wpisz kod EAN!").exists(),
      check("price", "Wpisz cenę!").exists(),
      check("quantity", "Podaj dostępność(ilość)!").exists(),
      check("minOrder", "Podaj minimalne zamówienie!").exists(),
      check("deliveryTime", "Podaj przybliżony czas wysyłki!").exists(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newItem = new Item({
        name: req.body.name,
        category: req.body.category.toLowerCase(),
        EAN: req.body.EAN,
        price: req.body.price,
        quantity: req.body.quantity,
        minOrder: req.body.minOrder,
        deliveryTime: req.body.deliveryTime,
        isActive: req.body.isActive,
        isDiscount: req.body.isDiscount,
        updatedAt:
          new Date().toLocaleDateString("pl") +
          "," +
          new Date().toLocaleTimeString("pl"),
      });

      const item = await newItem.save();
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//Get wszystie itemy
router.get("/allItems", async (req, res) => {
  try {
    const item = await Item.find({});
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get wszystkie aktywne itemy
router.get("/", async (req, res) => {
  try {
    const item = await Item.find({ isActive: true });
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get 1 item po id
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }
    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }
    await item.remove();
    const items = await Item.find({});
    res.json(items);
    //res.json({ msg: "Pozycja usunięta!" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put(
  "/:id",
  [
    auth,
    [
      check("name", "Wpisz nazwę!").exists(),
      check("EAN", "Wpisz kod EAN!").exists(),
      check("price", "Wpisz cenę!").exists(),
      check("quantity", "Podaj dostępność(ilość)!").exists(),
      check("minOrder", "Podaj minimalne zamówienie!").exists(),
      check("deliveryTime", "Podaj przybliżony czas wysyłki!").exists(),
    ],
  ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      var item = await Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: req.body.category.toLowerCase(),
        EAN: req.body.EAN,
        price: req.body.price,
        quantity: req.body.quantity,
        minOrder: req.body.minOrder,
        deliveryTime: req.body.deliveryTime,
        isDiscount: req.body.isDiscount,
        isActive: req.body.isActive,
        updatedAt:
          new Date().toLocaleDateString("pl") +
          "," +
          new Date().toLocaleTimeString("pl"),
      });
      item.save();
      const items = await Item.find({});
      res.json(items);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/getDate/last", async (req, res) => {
  try {
    //const item = await Item.find({ isActive: true });
    const item = await Item.findOne().sort({ updatedAt: -1 });
    if (!item) {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }
    res.json(item);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Nie znaleziono oferty" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
