import express from "express";
import { Product } from "../models/Product.js";
import { admin, auth } from "../middleWares/protected.js";
export const productRouter = express.Router();

// upload product
productRouter.post("/", auth, async(req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            colors,
            sizes,
            collections,
            material,
            gender,
            isFeatured,
            isPublished,
            images,
            tages,
            dimensions,
            weight,
        } = req.body;
        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            colors,
            sizes,
            collections,
            material,
            gender,
            isFeatured,
            isPublished,
            images,
            dimensions,
            weight,
            tages,
            user: req.user._id,
        });

        const createProduct = await product.save();
        res.json(createProduct);
    } catch (error) {
        console.log(error);
    }
});

// update product
productRouter.patch("/:id", auth, admin, async(req, res) => {
    const { id } = req.params;
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            brand,
            colors,
            sizes,
            collections,
            material,
            gender,
            isFeatured,
            isPublished,
            images,
            tages,
            dimensions,
            weight,
        } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res
                .status(404)
                .json({ suceess: false, msg: "Product Not Foound" });
        }
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.discountPrice = discountPrice || product.discountPrice;
        product.countInStock = countInStock || product.countInStock;
        product.sku = sku || product.sku;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.colors = colors || product.colors;
        product.sizes = sizes || product.sizes;
        product.collections = collections || product.collections;
        product.material = material || product.material;
        product.isFeatured =
            isFeatured !== undefined ? isFeatured : product.isFeatured;
        product.gender = gender || product.gender;
        product.isPublished =
            isPublished !== undefined ? isPublished : product.isPublished;
        product.images = images || product.images;
        product.tages = tages || product.tages;
        product.dimensions = dimensions || product.dimensions;
        product.weight = weight || product.weight;

        const updatedProduct = await product.save();
        // const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
        //   new: true,
        //   runValidators: true,
        // });
        res.status(200).json({ success: true, updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});

// delete a product
productRouter.delete("/:id", auth, async(req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, msg: "Product Not Found" });
        }
        res.status(200).json({ success: true, product, msg: "deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});

// get all product by filtering with there property
productRouter.get("/", async(req, res) => {
    try {
        const {
            collection,
            size,
            color,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            limit,
        } = req.query;
        let query = {};
        if (collection && collection.toLowerCase() !== "all") {
            query.collection = collection;
        }
        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }

        if (material) {
            query.material = { $in: material.split(",") };
        }
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }
        if (size) {
            query.size = { $in: size.split(",") };
        }
        if (color) {
            query.color = { $in: color.split(",") };
        }
        if (gender) {
            query.gender = gender;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        let sort = {};
        const sortOptions = {
            priceAsc: { price: 1 },
            priceDesc: { price: -1 },
            popularity: { rating: -1 },
        };

        sort = sortOptions[sortBy] || {};
        let products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) || 0);
        if (!products) {
            return res.status(404).json({ success: false, msg: "No Products Found" });
        }
        res.json({ legth: products.length, products: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});

// best seller products
productRouter.get("/best-seller", async(req, res) => {
    try {
        const bestSellerProduct = await Product.findOne({}).sort({ rating: -1 });

        if (!bestSellerProduct) {
            return res
                .status(404)
                .json({ success: false, msg: "No Best seller Product Found Found" });
        }

        res.status(200).json({ success: false, bestSellerProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: true, msg: "Server Error" });
    }
});

// new arriveable product

productRouter.get("/new-arrival", async(req, res) => {
    try {
        const newArivaleProducts = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json({
            newArivaleProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});
// get single product
productRouter.get("/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ succcess: false, msg: "No Product Found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});

// get similar product
productRouter.get("/similar/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ succcess: false, msg: "No Product Found" });
        }

        const similarProduct = await Product.find({
            _id: { $ne: id },
            gender: product.gender,
            category: product.category,
        }).limit(4);
        res
            .status(200)
            .json({ success: true, length: similarProduct.length, similarProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
});