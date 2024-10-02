import { Router } from "express";
import Food from "../models/foodModel.js";

const router = Router();

router.get("/foods", async (req, res) => {
  try {
    const page = isNaN(parseInt(req.query.page))
      ? 0
      : parseInt(req.query.page) - 1;
    const limit = isNaN(parseInt(req.query.limit))
      ? 5
      : parseInt(req.query.limit);
    const search = req.query.search || ""; // Search by name
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null; // Filter by max price
    const category = req.query.category || ""; // Filter by category
    let sort = req.query.sort || "category";

    // Ensure that the sort field is valid and exists in the Food model
    if (!["name", "category", "price"].includes(sort)) {
      sort = "category"; // Default sorting if sort param is invalid
    }

    // Construct the query object
    const query = {
      name: { $regex: search, $options: "i" }, // Search by name
    };

    // Add max price condition if provided
    if (maxPrice !== null) {
      query.price = { $lt: maxPrice }; // Less than maxPrice
    }

    // Add category condition if provided
    if (category) {
      query.category = category; // Filter by category
    }

    // Fetch the filtered, sorted, paginated foods
    const foods = await Food.find(query)
      .sort({ [sort]: 1 }) // Sort in ascending order based on the sort field
      .skip(page * limit)
      .limit(limit);

    // Count the total number of documents matching the search criteria
    const total = await Food.countDocuments(query);

    // Create the response
    const response = {
      error: false,
      total,
      page: page + 1, // Page is 0-based, so add 1 for client-friendly display
      limit,
      foods,
    };

    // Send the response
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching foods:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

export default router;
