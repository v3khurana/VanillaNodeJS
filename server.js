const http = require("http");
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("./controllers/productController");

const server = http.createServer((req, res) => {
  console.log("Request URL " + req.url);

  if(req.url === '/'){
    res.writeHead(200,{"Content-Type":"text/html"})
    res.end("<h1>This is the only html page</h1>")
  } else if (req.url === "/api/products" && req.method == "GET") {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method == "GET"
  ) {
    const id = req.url.split("/")[3];
    console.log(id);
    getProduct(req, res, id);
  } else if (
    req.url === "/api/products" &&
    req.method == "POST"
  ) {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method == "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method == "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("Sorry!! Incorrect way of requesting resource");
  }

  //Alternate way to writeHead method
  //res.statusCode = 200
  //res.setHeader('Content-Type', 'text/html')

  //In case of sending html as response
  //res.writeHead(200,{"Content-Type":"text/html"})
  //res.write('<h1>Something in Node</h1>')

  //Alternate way to res.end with string argument
  //res.write(JSON.stringify(products))
  //res.end()
});

let PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
