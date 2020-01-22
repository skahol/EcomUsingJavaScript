const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());


// routes
const Post = require('./models/log');			// model/log***

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/signup.html');
});

app.get('/login.html',(req,res)=>{
	res.sendFile(__dirname+'/login.html');
});
app.get('/myproduct.html',(req,res)=>{
	res.sendFile(__dirname+'/myproduct.html');
});
app.get('/myproductscript.js',(req,res)=>{
	res.sendFile(__dirname+'/myproductscript.js');
});
app.get('/viewProduct.html',(req,res)=>{
	res.sendFile(__dirname+'/viewProduct.html');
});
app.get('/viewProductscript.js',(req,res)=>{
	res.sendFile(__dirname+'/viewProductscript.js');
});
app.get('/cart.html',(req,res)=>{
	res.sendFile(__dirname+'/cart.html');
});
app.get('/cartscript.js',(req,res)=>{
	res.sendFile(__dirname+'/cartscript.js');
});
app.post('/', async (req,res)=>{
	const post = new Post({
		uname : req.body.fname,
		email : req.body.email,
		pwd : req.body.password
	});
	try{
		const savedPost = await post.save() 
		res.json(savedPost);
	}
	catch(err){
		res.json({message: err});
	}
});
	
	
// middlewares funct execute when routes are hit
// can use middleware for authentication








// connect to db
mongoose.connect(process.env.DB_CONNECTION,
//{ useNewUrlParser: true },
{ useUnifiedTopology: true , useNewUrlParser: true } ,
()=> console.log('Connected to DB!')
);

	
	
/// how we start listening to server
app.listen(3000);