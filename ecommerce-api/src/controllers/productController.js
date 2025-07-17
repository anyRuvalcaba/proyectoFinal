import Product from '../models/product.js';

//const getProducts = async (req,res)=>{} misma funcion, dif sintaxis

async function getProducts(req, res) {
    try {
        const products = await Product.find().sort({name:1});
        res.json(products);
    } catch (error) {
        res.status(500).send({ error });
    }
};

async function getProductById(req, res) {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({error: 'Product not found'});
        }
        res.json(product);
    } catch (error) {
        res.status(500).send({ error });
    }
};

async function getProductByCategory(req, res) {
    try {
        const id = req.params.id;
        const products = await Product.find({category: id}).sort({name:1});
        if(!products){
            return res.status(404).json({error: 'Product by category not found'});
        }
        res.json(products);
    } catch (error) {
        res.status(500).send({ error });
    }
};

async function createProduct(req, res) {
    try {
        const { name, description, price, stock, imageURL, category } = req.body;
        if(!name||!description||!price||!stock||!imageURL||!category){
            return res.status(400).json({error: 'All fields are required'});
        }
        const newProduct = await Product.create({name, description, price, stock, imageURL, category});
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send({ error });
    }
};

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, stock, imageURL, category } = req.body;
        if(!name||!description||!price||!stock||!imageURL||!category){
            return res.status(400).json({error: 'All fields are required'});
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, name, description, price, stock, imageURL, category);
        if (updatedProduct) {
            return res.status(200).json(updatedProduct);
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct) {
            return res.status(204);
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = { getProducts, getProductById, getProductByCategory, createProduct, updateProduct, deleteProduct };