import { Request, Response } from "express";
import { Product, products } from "../data/products";


export function getProducts(req: Request, res: Response) {
    const { category, minPrice, maxPrice } = req.query;

    let result = [...products];


    if (category) {
        result = result.filter(p => p.category === String(category));
    }

    if (minPrice) {
        if (isNaN(Number(minPrice))) {
            return res.status(400).json({ error: "minPrice must be numeric" });
        }
        result = result.filter(p => p.price >= Number(minPrice));
    }


    if (maxPrice) {
        if (isNaN(Number(maxPrice))) {
            return res.status(400).json({ error: "maxPrice must be numeric" });
        }
        result = result.filter(p => p.price <= Number(maxPrice));
    }

    return res.json(result);
}


export function getProductById(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID must be numeric" });
    }

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    return res.json(product);
}


export function createProduct(req: Request, res: Response) {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({ error: "name, price and category are required" });
    }

    const newProduct: Product = {
        id: products.length + 1,
        name,
        price,
        category
    };

    products.push(newProduct);
    return res.status(201).json(newProduct);
}


export const updateProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID must be numeric" });
    }

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    const { name, price, category } = req.body;

    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (category !== undefined) product.category = category;

    return res.json(product);
};


export function deleteProduct(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID must be numeric" });
    }

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Product not found" });
    }

    products.splice(index, 1);

    return res.json({ message: "Product deleted successfully" });
}
