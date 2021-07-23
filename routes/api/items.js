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
      const lastItem = await Item.findOne({}).sort({ index: -1 }).limit(1);

      if (!lastItem) {
        const newItem = new Item({
          name: req.body.name,
          category: req.body.category.toLowerCase(),
          EAN: req.body.EAN ? req.body.EAN : "",
          price: req.body.price,
          priceEUR: req.body.priceEUR,
          quantity: req.body.quantity,
          minOrder: req.body.minOrder,
          deliveryTime: req.body.deliveryTime,
          isActive: req.body.isActive,
          isDiscount: req.body.isDiscount,
          index: 0,
          updatedAt: new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 19)
            .replace("T", ","),
        });
        const item = await newItem.save();
        res.json(item);
      } else {
        const newItem = new Item({
          name: req.body.name,
          category: req.body.category.toLowerCase(),
          EAN: req.body.EAN ? req.body.EAN : "",
          price: req.body.price,
          priceEUR: req.body.priceEUR,
          quantity: req.body.quantity,
          minOrder: req.body.minOrder,
          deliveryTime: req.body.deliveryTime,
          isActive: req.body.isActive,
          isDiscount: req.body.isDiscount,
          index: lastItem.index + 1,
          updatedAt: new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 19)
            .replace("T", ","),
        });
        const item = await newItem.save();
        res.json(item);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//Get wszystie itemy
router.get("/allItems", async (req, res) => {
  try {
    const item = await Item.find({}).sort("index");
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
      var date = new Date();
      var item = await Item.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: req.body.category.toLowerCase(),
        EAN: req.body.EAN ? req.body.EAN : "",
        price: req.body.price,
        priceEUR: req.body.priceEUR,
        quantity: req.body.quantity,
        minOrder: req.body.minOrder,
        deliveryTime: req.body.deliveryTime,
        isDiscount: req.body.isDiscount,
        isActive: req.body.isActive,
        updatedAt: new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 19)
          .replace("T", ","),
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

router.post("/swapUp/:index", async (req, res) => {
  try {
    var item = await Item.find({ index: req.params.index });
    var itemUp = await Item.find({ index: req.params.index - 1 });
    var newIndex;
    var i = 1;
    while (itemUp.length === 0 || itemUp[0].category !== item[0].category) {
      itemUp = await Item.find({ index: req.params.index - (1 + i) });
      i++;
      if (req.params.index - (1 + i) < 0) {
        break;
      }
    }
    if (itemUp.length > 0) {
      newIndex = itemUp[0].index;

      const newItem = await Item.findOne({ index: req.params.index });

      const newItemUp = await Item.findOne({ index: newIndex });

      newItem.index = newIndex;
      newItemUp.index = req.params.index;

      await newItem.save();
      await newItemUp.save();
    }

    const items = await Item.find({}).sort("index");
    res.json(items);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/swapDown/:index", async (req, res) => {
  try {
    console.log("1");
    var item = await Item.find({ index: req.params.index });
    var newIndex = +req.params.index + 1;
    var itemUp = await Item.find({ index: newIndex });
    var i = 1;
    console.log("2");
    while (
      itemUp[0].category !== item[0].category ||
      itemUp[0].index === item[0].index
    ) {
      itemUp = await Item.find({ index: +req.params.index + (1 + i) });
      i++;
      if (itemUp.length === 0) {
        itemUp = [];
        break;
      }
    }
    console.log("3");
    if (itemUp.length > 0) {
      newIndex = itemUp[0].index;

      const newItem = await Item.findOne({ index: req.params.index });

      const newItemUp = await Item.findOne({ index: newIndex });

      newItem.index = newIndex;
      newItemUp.index = req.params.index;

      await newItem.save();
      await newItemUp.save();
    }
    console.log("3,5");
    const items = await Item.find({}).sort("index");
    console.log("4");
    res.json(items);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
