import express from "express";
import Fruit from "../models/Fruit.js";
import Category from "../models/Category.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 6, search = "", id: categoryId, sort, maxPrice=Infinity  } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    maxPrice = parseFloat(maxPrice);
    let searchQuery = {};

    if (search) {
      searchQuery.name = { $regex: `^${search}`, $options: "i" };
    }

    if (categoryId) {
      searchQuery.category = categoryId;
    }
    if(maxPrice >0){
      searchQuery.price = {$gte:0, $lte: maxPrice}
    }

    let sortQuery = {};
    if (sort) {
      sortQuery.sort = -1;
    }

    const fruits = await Fruit.find(searchQuery).sort(sortQuery).skip((page - 1) * limit).limit(limit);
    const totalFruits = await Fruit.countDocuments(searchQuery);

    res.json({ fruits, totalFruits });
  }
  catch (error) {
    res.status(500).json({ error: "Error fetching fruits" });
  }
})
router.post("/bulk", async (req, res) => {
  try {
    const fruitsData = req.body;

    const fruitsWithCategory = await Promise.all(
      fruitsData.map(async (fruit) => {
        let category = await Category.findOne({ name: fruit?.category });
        if (!category) {
          category = new Category({ name: fruit?.category });
          await category.save();
        }
        return { ...fruit, category: category._id };
      })
    );

    const fruits = await Fruit.insertMany(fruitsWithCategory);
    res.status(201).json({ message: "Items added successfully", data: fruits });
  } catch (error) {
    res.status(500).json({ message: error, error: "Error inserting items" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const results = await Fruit.deleteMany({});
    if (results.deletedCount > 0) {
      res.status(200).json({ message: "delete items successfully" })
    }
    else {
      res.status(200).json({ message: "no items found to delete" })
    }
  }
  catch (error) {
    res.status(500).json({ error: "Error delete items" })
  }
})

export default router;