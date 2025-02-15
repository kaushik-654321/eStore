import mongoose from "mongoose";

const fruitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: { type: String, default: "Fruits" },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }, 
});

const Fruit = mongoose.model("Fruit", fruitSchema);
export default Fruit;