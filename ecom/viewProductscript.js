var products = [];		// PRODUCT ARRAY GET THROUGH LOCAL STORAGE
var arrCart = [];		// CART ARRAY
var productId = 1;
var viewProduct = document.getElementById("viewProduct");
var gotoCart = document.getElementById("gotocart");

gotoCart.addEventListener("click",function(){
					location.href = '/cart.html' ;
				}
			);				

function getStoredProducts(){
	if(!localStorage.products){
		// default to empty array
		localStorage.products = JSON.stringify([]);
	}	
	else{
		products = JSON.parse(localStorage.products); // string converted into object array
		for(var i=0;i<products.length;i++){
			viewProducttoDOM(products[i]);	// passing array objects one by one
			productId++;
		}
	}
}
function getStoredCartProducts(){
	if(!localStorage.productCart){
		// default to empty array
		localStorage.productCart = JSON.stringify([]);
	}	
	else{
		arrCart = JSON.parse(localStorage.productCart); // string converted into object array
	}
}

function storeProducts(arrCart){
	localStorage.productCart = JSON.stringify(arrCart);
}

function storeProduct(products){
	localStorage.products = JSON.stringify(products);
}

function insertBlankLine(targetElement)
{
    var br = document.createElement("br");
    targetElement.appendChild(br);
}

function viewProducttoDOM(objProduct){
	var divView = document.createElement("div");
	divView.setAttribute("id",objProduct.Id);
	viewProduct.appendChild(divView);

	var lblProductName = document.createElement("label");	// node  0
	lblProductName.innerHTML = "<b>P_name</b> :"+objProduct.Name;
	divView.appendChild(lblProductName);

	insertBlankLine(divView);		//1

	var lblProductDesc = document.createElement("label");		//2
	lblProductDesc.innerHTML = "<b>P_desc</b> :"+objProduct.Desc;
	divView.appendChild(lblProductDesc);

	insertBlankLine(divView);			//3

	var lblProductPrice = document.createElement("label");		//4
	lblProductPrice.innerHTML = "<b>P_price</b> :"+objProduct.Price;
	divView.appendChild(lblProductPrice);

	insertBlankLine(divView);		//5

	var txtQty = document.createElement("input");		//6
	txtQty.setAttribute("type","type");
	txtQty.setAttribute("placeholder","Quantity");
	txtQty.setAttribute("id","inputQty");
	txtQty.setAttribute("style","width:60px");
	divView.appendChild(txtQty);

	var btnAddtoCart = document.createElement("button");
	btnAddtoCart.setAttribute("type","submit");
	btnAddtoCart.innerHTML = "ADD TO CART";
	divView.appendChild(btnAddtoCart);
	
	insertBlankLine(divView);
	insertBlankLine(divView);

	btnAddtoCart.addEventListener("click",function(){

				var targetParent = event.target.parentNode;
				var selectedProductIndex = getProductIndex(parseInt(targetParent.id));
				
				var childNodes = targetParent.childNodes;
				
				var inputQty = childNodes[6];

				var validQty =0;
				
				if(selectedProductIndex<products.length){
					
				validQty = products[selectedProductIndex].Quantity;
			
				if(inputQty.value.length == 0){
					alert("Please ! fill the quantity box.");	
				}
				else if(inputQty.value > validQty){
					alert("Only "+validQty+" pieces are available in stock!");
				}
				else if(inputQty.value == 0){
					alert("Please ! fill one or more items in quantity box.");
				}	
				else{
					//addToArrCart(products[selectedProductIndex],inputQty.value);
					/*************************/

					var obj = new Object();
					obj.Id = products[selectedProductIndex].Id;
					obj.Name = products[selectedProductIndex].Name;
					obj.Desc = products[selectedProductIndex].Desc;
					obj.Price = products[selectedProductIndex].Price;
					obj.Quantity =inputQty.value;
					obj.mail = localStorage.getItem("currEmail");
					getStoredCartProducts();
					arrCart.push(obj);
					storeProducts(arrCart);

					/***************************/
					products[selectedProductIndex].Quantity = validQty - inputQty.value;   			// updating stock
					storeProduct(products);

					alert("Successfully added to cart!");
				}
				
				inputQty.value="";		// reset field
				}
			}
		);				
}

function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
    {
        if (products[i].Id == id) 
		return i;
    }
} 