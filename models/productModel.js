//Models deal with data - GET data, Create data, Update data, Delete data

let products = require("../data/products");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id == id);
    resolve(product);
  });
}

function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}

function update(productData, id) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id == id);
    products[index] = { id, ...productData };
    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    console.log(id)
    products = products.filter((p) => 
      p.id != id
    );
    writeDataToFile("./data/products.json", products);
    resolve();
  });
}

module.exports = { findAll, findById, create, update, remove };
