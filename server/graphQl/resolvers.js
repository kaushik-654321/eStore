import Category from "../models/Category.js";
import Fruit from "../models/Fruit.js";

export const resolvers = {
    Query: {
        getFruits: async (_, { category, priceRange, search, page = 1, limit = 10, sort }) => {
            const query = {};

            if (category) {
                const categoryData = await Category.findOne({ name: category });
                if (categoryData) query.category = categoryData._id;
            }

            if (search) query.name = { $regex: search, $options: "i" };

            if (priceRange) {
                const [min, max] = priceRange.split("-");
                query.price = { $gte: Number(min), $lte: Number(max) };
            }

            const sortOptions = {};
            if (sort === "priceAsc") sortOptions.price = 1;
            if (sort === "priceDesc") sortOptions.price = -1;

            const total = await Fruit.countDocuments(query);
            const fruits = await Fruit.find(query)
                .populate("category")
                .sort(sortOptions)
                .skip((page - 1) * limit)
                .limit(limit);

            return { fruits, total, page, totalPages: Math.ceil(total / limit) };
        },

        getCategories: async () => {
            return await Category.find(); // Fetch all categories
        }
    }
};
