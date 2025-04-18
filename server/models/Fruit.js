import mongoose from "mongoose";

const fruitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, 
    popularity : {type: Number, required: true},
    organic: {type: Boolean, required: true},
    rating: {type: Number, required: true},
});

const Fruit = mongoose.model("Fruit", fruitSchema);
export default Fruit;