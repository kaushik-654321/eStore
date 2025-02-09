import express from "express";
import Fruit from "../models/Fruit.js";

const router = express.Router();


router.get("/", async(req,res)=>{
    try{
        const fruits = await Fruit.find();
        res.json(fruits);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching fruits" });
      }
})
router.post("/bulk", async (req, res) => {
    console.log("req",req);
    try {
      const fruits = await Fruit.insertMany(req.body);
      res.status(201).json({ message: "Fruits added successfully", data: fruits });
    } catch (error) {
      res.status(500).json({ error: "Error inserting fruits" });
    }
  });

  export default router;