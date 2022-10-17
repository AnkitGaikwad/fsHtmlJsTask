
const http = require('http');
const filePath = "testFile.txt";
const { readFile,writeFileSync } = require('fs');

const server = http.createServer((req, res) => {
    console.log("User hit the server");
    const url = req.url;
    if (url === '/') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write("<h1>Home Page</h1>");
        readFile(filePath, "utf8",(err, data) => {
            if (err) {
                console.log("Error is " + err);
            }
            //console.log(data);
            res.end(data);
        });
        
    } else if (url === '/editFile') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write("<h1>Edit File Page</h1>");
        const chunks = [];
        var stringData = "";
        req.on("data", (chunk) => {
            chunks.push(chunk);
        });
        req.on("end", () => {
            const data = Buffer.concat(chunks);
            stringData = data.toString();
            //console.log(stringData);
            //Write the file
            writeFileSync(filePath, stringData, {encoding: "utf8", flag: "a+"});
        });
        readFile(filePath, "utf8",(err, data) => {
            if (err) {
                console.log("Error is " + err);
            }
            //console.log(data);
            res.write(`${data}`);
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write("<h1>404 Not Found</h1>");
        res.end();
    }
}).listen(3000);
