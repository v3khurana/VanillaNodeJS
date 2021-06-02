//Controller deals with whatever routes have to execute

const Product = require("../models/productModel");
const { getPostData } = require("../utils");

async function getProducts(req, res) {
  await Product.findAll()
    .then((products) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(products));
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getProduct(req, res, id) {
  await Product.findById(id)
    .then((product) => {
      if (!product) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Product not found" }));
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    })
    .catch((err) => {
      console.log(err);
    });
}

async function createProduct(req, res) {
  /* const newProduct = {
        "name":"Bread",
        "description":"Fresh Amul Bread small packet",
        "price":15
    } */

  const body = await getPostData(req);

  //getPostData(req).then(async (body) => {
  const { name, description, price } = JSON.parse(body);

  const newProduct = {
    name,
    description,
    price,
  };

  await Product.create(newProduct)
    .then((product) => {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    })
    .catch((err) => {
      console.log(err);
    });
  //});
}

async function updateProduct(req, res, id) {
  const product = await Product.findById(id);
  if (product) {
    const body = await getPostData(req);
    const { name, description, price } = JSON.parse(body);
    const productData = {
      name: name || product.name,
      description: description || product.description ,
      price: price || product.price,
    };
  
    await Product.update(productData, id).then((updatedProduct) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedProduct));
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product does not exist" }));
  }
}

async function deleteProduct(req, res, id) {
    const product = await Product.findById(id);
    console.log(product)
    if (product) {
      await Product.remove(id).then(() => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({message:`Product with id ${id} deleted successfully`}));
      });
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product does not exist" }));
    }
  }

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
