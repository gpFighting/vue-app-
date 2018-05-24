const express = require('express');
const app = express();
const result = require('./data.json')
// app.use(express.static('data'))
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/', (req,res)=>{
	res.send(result)
})


app.listen(4200,()=>{
	console.log('running')
})