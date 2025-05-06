import express from "express";
import Fruit from "../models/Fruit.js";
import Category from "../models/Category.js";
import mongoose from "mongoose";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 6, search = "", id: categoryId, sort, maxPrice = Infinity } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    maxPrice = parseFloat(maxPrice);
    let searchQuery = {};

    if (search) {
      searchQuery.name = { $regex: `^${search}`, $options: "i" };
    }

    if (categoryId) {
      searchQuery.category = new mongoose.Types.ObjectId(categoryId);
    }
    if (maxPrice > 0) {
      searchQuery.price = { $gte: 0, $lte: maxPrice }
    }

    let sortQuery = {};


    // const fruits = await Fruit.find(searchQuery).sort(sortQuery).skip((page - 1) * limit).limit(limit);
    const aggregationPipeline = [
      { $match: searchQuery },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: "categoryDetails"
        }
      },
      { $unwind: "$categoryDetails" }
    ]

    if (sort) {
      sortQuery = { [sort]: -1 };
      aggregationPipeline.push({ $sort: sortQuery });
    }

    aggregationPipeline.push({ $skip: (page - 1) * limit });

    aggregationPipeline.push({ $limit: limit });

    const fruits = await Fruit.aggregate(aggregationPipeline);

    const totalFruits = await Fruit.countDocuments(searchQuery);
    res.json({ fruits, totalFruits });
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
})

router.get("/group", async (req, res) => {
  try {
    const result = await Fruit.aggregate([
      {
        $lookup: {
          from: 'categories', localField: 'category', foreignField: "_id",
          as: "categoryDetails"
        }
      },
      { $unwind: "$categoryDetails" },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          image: 1,
          description: 1,
          category: "$categoryDetails.name"
        }
      }

    ]);
    res.status(200).send({ fruits: result });
  }
  catch (error) {
    res.status(500).send({ error })
  }
});


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