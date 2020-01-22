var products = [];
var productId = 1;
var divAddProduct = document.getElementById("divAddProduct");
var divListProducts = document.getElementById("divListProducts");
var aAddProduct = document.getElementById("aAddProduct");
var divEditProduct = document.getElementById("divEditProduct");
					
aAddProduct.addEventListener("click", function(event)
					{  
						 createNewProductPanel(); 
					}
			 );
	
function storeProducts(products){
	localStorage.products = JSON.stringify(products);
}

function getStoredProducts(){
	if(!localStorage.products){
		// default to empty array
		localStorage.products = JSON.stringify([]);
	}	
	else{
		products = JSON.parse(localStorage.products);
		
		for(var i=0;i<products.length;i++){
			addProducttoDOM(products[i]);
			productId++;
		}
	}	
}

function addProducttoArray()
{
	var objProduct = new Object();
	
	objProduct.Id = productId;
 	objProduct.Name = document.getElementById("txtProductName").value;
    objProduct.Desc = document.getElementById("txtProductDesc").value;
	objProduct.Price = document.getElementById("txtProductPrice").value;
	objProduct.Quantity = document.getElementById("txtProductQuantity").value;
	
    products.push(objProduct);
	storeProducts(products);
	addProducttoDOM(objProduct);
    deleteNewProductPanel();
	productId++;
}

function updateProductInArray(objProduct){
	// product id will remain same
	objProduct.Name = document.getElementById("editProductName").value;
	objProduct.Desc = document.getElementById("editProductDesc").value;
	objProduct.Price = document.getElementById("editProductPrice").value;
	objProduct.Quantity = document.getElementById("editProductQuantity").value;
	
	storeProducts(products);
	updateProductInDOM(objProduct);
	deleteEditProductPanel();
}

function createEditProductLabel(objProduct){
	
	var lblEditProduct = document.createElement("label");
	lblEditProduct.setAttribute("style","font-weight:bold");
	lblEditProduct.innerHTML = "Edit Product";
	divEditProduct.appendChild(lblEditProduct);
	
	insertBlankLine(divEditProduct);
	insertBlankLine(divEditProduct);
	
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","editProductName");
    txtProductName.setAttribute("placeholder", "Enter the product name");	
	txtProductName.setAttribute("style","width:250px");
	txtProductName.setAttribute("value",objProduct.Name);
	divEditProduct.appendChild(txtProductName);	
	
	insertBlankLine(divEditProduct);
	insertBlankLine(divEditProduct);
	
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","editProductDesc");
    txtProductDesc.setAttribute("placeholder", "Enter the product description");	
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	txtProductDesc.innerHTML=objProduct.Desc;
	divEditProduct.appendChild(txtProductDesc);	
	
	insertBlankLine(divEditProduct);
	insertBlankLine(divEditProduct);

	/* TextBox - Product Price */ 
	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","text");
	txtProductPrice.setAttribute("id","editProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice.setAttribute("style","width:250px");
	txtProductPrice.setAttribute("value",objProduct.Price);
	divEditProduct.appendChild(txtProductPrice);	
	
	insertBlankLine(divEditProduct);
	insertBlankLine(divEditProduct);
	
	/* TextBox - Product Quantity */ 
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","text");
	txtProductQuantity.setAttribute("id","editProductQuantity");
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity.setAttribute("style","width:250px");
	txtProductQuantity.setAttribute("value",objProduct.Quantity);
	divEditProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divEditProduct);
	insertBlankLine(divEditProduct);
	
	var btnUpdate = document.createElement("button");
	btnUpdate.setAttribute("id","btnUpdate");
	btnUpdate.innerHTML = "Update";
	divEditProduct.appendChild(btnUpdate);

	var btnCancel = document.createElement("button");
	btnCancel.setAttribute("id","btnCancel");
	btnCancel.innerHTML = "Cancel";
	divEditProduct.appendChild(btnCancel);

	btnUpdate.addEventListener("click",function(event)
									{
										updateProductInArray(objProduct);
									}
								);
	btnCancel.addEventListener("click",function(event){
								deleteEditProductPanel();
							}
				);	
}

function updateProductInDOM(objProduct){
	var childNodes = divListProducts.childNodes;
	var currDivProduct = childNodes[objProduct.Id];			// id donot match with div id if we delete some items
	var currProductNode = currDivProduct.childNodes;
	var temp1 = currProductNode[0];
	var temp2 = currProductNode[2];
	temp1.innerHTML = objProduct.Name;
	temp2.innerHTML = objProduct.Desc;
}

function addProducttoDOM(objProduct)
{  	
	//create a new DIV for this product 
	// in dom id is equal to productId
	var divProduct = document.createElement("div");	
	divProduct.setAttribute("id", productId);		//** set id = productId
	
	//create an anchor for product name
	var aProductName = document.createElement("a");	// node0
	aProductName.setAttribute("href","#");
	aProductName.innerHTML = objProduct.Name;
	divProduct.appendChild(aProductName);
	
   insertBlankLine(divProduct);		// node1
	
	//create a label for product description
	var lblProductName = document.createElement("label"); //node2
	lblProductName.innerHTML = objProduct.Desc;
    divProduct.appendChild(lblProductName);
	
    insertBlankLine(divProduct);	// node3
		
	//create a anchor for deleting this product
	var aDelete = document.createElement("a");	//node4
	aDelete.setAttribute("href","#");
	aDelete.innerHTML = "Delete";
	divProduct.appendChild(aDelete);

   insertBlankLine(divProduct);		//node5

	var aEdit = document.createElement("a");	//node6
	aEdit.setAttribute("href","#");
	aEdit.innerHTML = "Edit";
	divProduct.appendChild(aEdit);
	
	aEdit.addEventListener("click",function(event)
								{
									// To access the parent node of the element which is clicked
									var targetParent = event.target.parentNode;
									var selectedProductIndex = getProductIndex(parseInt(targetParent.id));
									createEditProductLabel(products[selectedProductIndex]);
								}
							);
	aDelete.addEventListener("click",function(event)
									  {
									   // To access the parent node of the element which is clicked
									   // Ist method
										  // var selectedProductIndex = getProductIndex(parseInt(divProduct.id));
										  // removeFromProductsArray(selectedProductIndex);
                                          // divProduct.parentNode.removeChild(divProduct);
										  
									   // 2nd Method 
										   var targetParent = event.target.parentNode;
										   var selectedProductIndex = getProductIndex(parseInt(targetParent.id)); 
										   removeFromProductsArray(selectedProductIndex);
										   targetParent.parentNode.removeChild(targetParent);
									  }
							);
							
	// on clicking product name link gves product info on console
    aProductName.addEventListener("click",function(event)
									  {
										 var selectedProductIndex = getProductIndex(parseInt(event.target.parentNode.id));
										 getProductDetails(selectedProductIndex);
									  }
							     );
									  
	divListProducts.appendChild(divProduct);
	
    insertBlankLine(divProduct);
	insertBlankLine(divProduct);

	unHideAddNewProductLink();
}

// Given a product ID, returns the index to the product data in products. 
function getProductIndex(id) 
{
    for (var i = 0; i < products.length; i++) 
	{
        if (products[i].Id == id) 
		return i;
    }
} 

function getProductDetails(selectedProductIndex)
{
  console.log( "Name : " + products[selectedProductIndex].Name + "  Desc: " + products[selectedProductIndex].Desc + 
               "   Price : " + products[selectedProductIndex].Price + "  Quantity: " + products[selectedProductIndex].Quantity+" ID: "+products[selectedProductIndex].Id);	
}


function removeFromProductsArray(selectedProductIndex)
{
	products.splice(selectedProductIndex,1);
	storeProducts(products);
	console.log(products);
}

function deleteEditProductPanel(){
	var childNodes = divEditProduct.childNodes;
	for(var i=0; childNodes.length>0;){
		divEditProduct.removeChild(childNodes[i]);
	}
}

function deleteNewProductPanel()
{
   var childNodes = divAddProduct.childNodes;
   for (var i = 0; childNodes.length > 0;) 
   {
     divAddProduct.removeChild(childNodes[i]);
   }
}
/*
function hideDivEditProduct(){
	divEditProduct.setAttribute("style","visibility:hidden");
}*/

function hideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:hidden");
}

function unHideAddNewProductLink()
{
   aAddProduct.setAttribute("style","visibility:visible");
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}

function createNewProductPanel()
{
	hideAddNewProductLink();

	/* Label - Product Quantity */ 
	var lblAddProduct = document.createElement("label");
	lblAddProduct.innerHTML = "Add New Product";
	lblAddProduct.setAttribute("style","font-weight:bold");
    divAddProduct.appendChild(lblAddProduct);

	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Name */ 
	var txtProductName = document.createElement("input");
	txtProductName.setAttribute("type","text");
	txtProductName.setAttribute("id","txtProductName");
    txtProductName.setAttribute("placeholder", "Enter the product name");	
	txtProductName.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductName);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Description */ 
	var txtProductDesc = document.createElement("textarea");
	txtProductDesc.setAttribute("id","txtProductDesc");
    txtProductDesc.setAttribute("placeholder", "Enter the product description");	
	txtProductDesc.setAttribute("style","width:250px ; height:50px");
	divAddProduct.appendChild(txtProductDesc);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);

	/* TextBox - Product Price */ 
	var txtProductPrice = document.createElement("input");
	txtProductPrice.setAttribute("type","text");
	txtProductPrice.setAttribute("id","txtProductPrice");
    txtProductPrice.setAttribute("placeholder", "Enter the product price");	
	txtProductPrice.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductPrice);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* TextBox - Product Quantity */ 
	var txtProductQuantity = document.createElement("input");
	txtProductQuantity.setAttribute("type","text");
	txtProductQuantity.setAttribute("id","txtProductQuantity");
    txtProductQuantity.setAttribute("placeholder", "Enter the product quantity");	
	txtProductQuantity.setAttribute("style","width:250px");
	divAddProduct.appendChild(txtProductQuantity);	
	
	insertBlankLine(divAddProduct);
	insertBlankLine(divAddProduct);
	
	/* Button - Add Product */ 
	var btnAddButton = document.createElement("button");
	btnAddButton.setAttribute("id","btnAddButton");
	btnAddButton.innerHTML = "Add Product";
	divAddProduct.appendChild(btnAddButton);		
		
    btnAddButton.addEventListener("click", function(event)
											{
												addProducttoArray();
											}
								 );	
}