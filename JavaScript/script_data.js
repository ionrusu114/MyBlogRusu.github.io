var d = document,
    itemBox = d.querySelectorAll('.item_box'), 
		cartCont = d.getElementById('cart_content'); 

function addEvent(elem, type, handler){
  if(elem.addEventListener){
    elem.addEventListener(type, handler, false);
  } else {
    elem.attachEvent('on'+type, function(){ handler.call( elem ); });
  }
  return false;
}

function getCartData(){
	return JSON.parse(localStorage.getItem('cart'));
}

function setCartData(o){
	localStorage.setItem('cart', JSON.stringify(o));
	return false;
}

function addToCart(e){
	this.disabled = true; 
	var cartData = getCartData() || {}, 
			parentBox = this.parentNode, 
			itemId = this.getAttribute('data-id'), 
			itemTitle = parentBox.querySelector('.item_title').innerHTML, 
			itemPrice = parentBox.querySelector('.item_price').innerHTML; 
	if(cartData.hasOwnProperty(itemId)){ 
		cartData[itemId][2] += 1;
	} else { 
		cartData[itemId] = [itemTitle, itemPrice, 1];
	}

	if(!setCartData(cartData)){ 
		this.disabled = false; 
		cartCont.innerHTML = 'Adaugă un produs in cos';
		setTimeout(function(){
			cartCont.innerHTML = 'Continua cuparaturile...';
		}, 1500);
	}
	return false;
}


for(var i = 0; i < itemBox.length; i++){
	addEvent(itemBox[i].querySelector('.add_item'), 'click', addToCart);
}

var c;
function openCart(e){
	
	var cartData = getCartData(), 
			totalItems = '',
			totalCount = 0,
			totalSum = 0;

	if(cartData !== null){
		totalItems = '<table class="shopping_list"> <thead><tr><th>Denumire produs</th><th>Preț produs</th><th>Nr. de produse</th><th></th></tr></thead>';

		for(var items in cartData){
			totalItems += '<tr>';

			for(var i = 0; i < cartData[items].length; i++){
				totalItems += '<td>' + cartData[items][i] + '</td>'; 

			}

			totalSum += cartData[items][1] * cartData[items][2];
			totalCount += cartData[items][2];
			totalItems += '<td><div class="del_item" data-id="'+ items +'">Șterge</div></td>';
			totalItems += '</tr>';
		}
		c = totalSum;
		function afisare(){
			document.getElementById("demo").innerHTML = parseInt(totalSum);
		}
	

		totalItems += '<tr><td><strong>Total</strong></td><td><span id="total_sum">'+ totalSum +'</span> LEI</td><td><span id="total_count">'+ totalCount +'</span> produse.</td><td></td></tr>';
		totalItems += '<table>';

		/*totalItems += '<div class="elements_count" style="background-color:transparent; color:red; position:relative; margin-top:-20%;margin-left:+52%; font-size:12px;"><h3>' + c + ' </h3></div>';*/

		cartCont.innerHTML = totalItems;
	} else {

		cartCont.innerHTML = 'Cosul este gol !';
	}
	return false;
}

function afisare(){
	document.getElementById("demo").innerHTML = parseInt(c);
}


function closest(el, sel) {
	if (el !== null)
	return el.matches(sel) ? el : (el.querySelector(sel) || closest(el.parentNode, sel));
}

openCart();

addEvent(d.getElementById('checkout'), 'click', openCart);

addEvent(d.body, 'click', function(e){
	if(e.target.className === 'del_item') {
		var itemId = e.target.getAttribute('data-id'),
		cartData = getCartData();
		if(cartData.hasOwnProperty(itemId)){
			var tr = closest(e.target, 'tr');
			tr.parentNode.removeChild(tr);

			var totalSumOutput = d.getElementById('total_sum'),
			totalCountOutput = d.getElementById('total_count');
			totalSumOutput.textContent = +totalSumOutput.textContent - cartData[itemId][1] * cartData[itemId][2];
			totalCountOutput.textContent = +totalCountOutput.textContent - cartData[itemId][2];
			delete cartData[itemId]; 
			setCartData(cartData); 

		}
	}
}, false);

addEvent(d.getElementById('clear_cart'), 'click', function(e){
	localStorage.removeItem('cart');
	cartCont.innerHTML = 'Корзина очишена.';	
});

function activare(){
	 document.getElementById('hd').style.visibility = 'visible';
}
function dezactivare(){
	 document.getElementById('hd').style.visibility = 'hidden';
}

