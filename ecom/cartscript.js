var products = [];				// admin added products 
var productId = 1;
var arrCart = [];				// array of products addedto cart
var divCartList = document.getElementById("divCartList");
var checkout  = document.getElementById("checkout");
var continuebtn = document.getElementById("continue");



continuebtn.addEventListener("click",function(){
			location.href = '/viewProduct.html';
			}
		);

checkout.addEventListener("click",function(){
			alert("Order is Confirmed");
			// clearing array
			//arrCart.length=0;
			deleteCurrCart();
			storeCartProducts(arrCart);
			location.reload();
			}
		);
	
function deleteCurrCart(){
		//var j=0;
		for(var i=0;i<arrCart.length;){
			if(arrCart[i].mail == localStorage.getItem('currEmail')){
				arrCart.splice(i,1);					// productCart is local storage where cart product is saved!
			}
			else i++;
		}
}

function getStoredProducts(){
		if(!localStorage.products){
			localStorage.products = JSON.stringify([]);
		}
		else {
			products = JSON.parse(localStorage.products);
		}
}	

function getStoredCartProducts(){				// get cart products
	if(!localStorage.productCart){
		// default to empty array
		localStorage.productCart = JSON.stringify([]);
	}	
	else{
		arrCart = JSON.parse(localStorage.productCart); // string converted into object array
		for(var i=0;i<arrCart.length;i++){
			if(arrCart[i].mail == localStorage.getItem('currEmail')){
				viewCartProducttoDOM(arrCart[i]);	// passing array objects one by one
			}
			productId++;
		}
	}
}

function storeCartProducts(arrCart){			// storing cart products
	localStorage.productCart = JSON.stringify(arrCart);
}

function storeProducts(products){				// store 
	localStorage.products = JSON.stringify(products);
}

function insertBlankLine(targetElement)
{
    var br = document.createElement("br");
    targetElement.appendChild(br);
}

function insertPipe(targetElement){
	var pipe = document.createElement("label");
	pipe.innerHTML = "|";
	targetElement.appendChild(pipe);
}

function viewCartProducttoDOM(objProduct){
	var divView = document.createElement("div");
	divView.setAttribute("id",objProduct.Id);
	divCartList.appendChild(divView);

	var lblProductId = document.createElement("label");	
	lblProductId.innerHTML = "<b>P_id</b> : "+objProduct.Id;
	divCartList.appendChild(lblProductId);
	insertPipe(divCartList);
	var lblProductName = document.createElement("label");	
	lblProductName.innerHTML = "<b>P_name</b> : "+objProduct.Name;
	divCartList.appendChild(lblProductName);
	
	insertPipe(divCartList);
	
	var lblProductDesc = document.createElement("label");		
	lblProductDesc.innerHTML = "<b>P_desc</b> : "+objProduct.Desc;
	divCartList.appendChild(lblProductDesc);
	
	insertPipe(divCartList);

	var lblProductPrice = document.createElement("label");	
	lblProductPrice.innerHTML = "<b>P_price</b> : "+objProduct.Price;
	divCartList.appendChild(lblProductPrice);
	
	insertPipe(divCartList);

	var lblProductQty = document.createElement("label");	
	lblProductQty.innerHTML = "<b>P_quantity</b> : "+objProduct.Quantity;
	divCartList.appendChild(lblProductQty);
	
	insertPipe(divCartList);
	
	var btnDelete = document.createElement("button");
	btnDelete.setAttribute("type","button");
	btnDelete.setAttribute("style","color:red");
	btnDelete.innerHTML = "DELETE";
	divCartList.appendChild(btnDelete);
	
	insertBlankLine(divCartList);
	insertBlankLine(divCartList);

	btnDelete.addEventListener("click",function(){			// delete a product from   cart list and add quantity back to product
			var targetParent = event.target.parentNode;				// getting tje event.target target the current node clicked
			var selectedProductCartIndex=0;
	
			for (var i = 0; i < arrCart.length; i++) 
    		{
        		if (arrCart[i].Id == objProduct.Id)				//parseInt(targetParent.id)
				{
					selectedProductCartIndex = i;
					break;
				}
    		}
			
			getStoredProducts();				
												// having products array from local storage
			var selectedProductIndex=0 ;
			for(var i=0;i<products.length;i++)
			{
				if(products[i].Id == objProduct.Id)
				{
					selectedProductIndex = i;
					break;
				}
			}

			var cartProductQty=0 ;
			if(selectedProductCartIndex < arrCart.length)
				cartProductQty =  arrCart[selectedProductCartIndex].Quantity;
			
			arrCart.splice(selectedProductCartIndex,1);					// productCart is local storage where cart product is saved!
			storeCartProducts(arrCart); 
			targetParent.parentNode.removeChild(targetParent);				// removing child node 
			
			if(selectedProductIndex < products.length){						// adding quantity back
				var a = parseInt(products[selectedProductIndex].Quantity) ;
				var b = parseInt(cartProductQty);
				var c = a+b;
				products[selectedProductIndex].Quantity =c;
				storeProducts(products);
			}
									// update products local storage argument as products array
			document.location.reload();
		}
	);
}