const fs = require("fs");

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req){
    return new Promise((resolve,reject)=>{
        let body =''
        req.on('data',(chunk)=>{
            body+=chunk
        })
        req.on('end',()=>{
            resolve(body)
        })
    })
}

module.exports = { writeDataToFile, getPostData };
