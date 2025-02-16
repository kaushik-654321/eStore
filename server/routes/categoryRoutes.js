import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categoriesWithCount  = await Category.aggregate([
      {
        $lookup:{
          from:"fruits",
          localField:"_id",
          foreignField: "category",
          as:"fruits"
        }
      },
      {
        $project :{
          name:1,
          fruitCount: { $size:"$fruits"}
        }
      }
    ]);
    res.status(200).json(categoriesWithCount)
  }
  catch (error) {
    res.status(500).json({ error: "Error fetching categories", details: error.message })
  }

})

router.post("/", async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: "Input should be an array of categories" });
    }
    const categories = await Category.insertMany(req.body);
    res.status(201).json({ message: "Category added successfully", data: categories });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;