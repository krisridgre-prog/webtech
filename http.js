const http = require('http');
const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text-plain'});
    res.end("how are you?");
});
server.listen(3000,()=>{
    console.log("Running server at http://localhost:3002");
})