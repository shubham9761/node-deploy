const fs = require('fs');
const model = require('../model/product');
const Product = model.Product;
const mongoose = require('mongoose');


// const index = fs.readFileSync('index.html', 'utf-8');
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const products = data.products;


//MVC : Model View Controller
exports.createProduct = (req, res) => {  
    const product = new Product(req.body);
    product.save()
        .then(savedProduct => {
            res.status(201).json(savedProduct);
            console.log(savedProduct);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
            console.log(error);
        }); 
}    

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

exports.getProduct= async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json(product);  
}
exports.replaceProduct = async (req, res) => {
    const id = req.params.id;
    const doc= await Product.findOneAndReplace({ _id: id }, req.body);
    res.status(201).json(doc);
}
exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const doc = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(201).json(doc);
    }
    catch (err) {
        console.log(err); 
        res.status(400).json(err); 
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    
    try {
        const product = await Product.findById(id)
        const doc = await Product.findOneAndDelete({ _id: id });
        res.status(200).json(product);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    
}