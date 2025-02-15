import express from "express";
import Fruit from "../models/Fruit.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 6, search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    //search filter
    const searchQuery = search ? { name: { $regex: `^${search}`, $options: "i" } } : {};
    const fruits = await Fruit.find(searchQuery).skip((page - 1) * limit).limit(limit);
    const totalFruits  = await Fruit.countDocuments(searchQuery);

    res.json({fruits, totalFruits});
  }
  catch (error) {
    res.status(500).json({ error: "Error fetching fruits" });
  }
})
router.post("/bulk", async (req, res) => {
  console.log("req", req);
  try {
    const fruits = await Fruit.insertMany(req.body);
    res.status(201).json({ message: "Fruits added successfully", data: fruits });
  } catch (error) {
    res.status(500).json({ error: "Error inserting fruits" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const results = await Fruit.deleteMany({});
    if (results.deletedCount > 0) {
      res.status(200).json({ message: "delete fruits successfully" })
    }
    else {
      res.status(200).json({ message: "no fruits found to delete" })
    }
  }
  catch (error) {
    res.status(500).json({ error: "Error delete fruits" })
  }
})

export default router;