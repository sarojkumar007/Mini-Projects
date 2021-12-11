console.log('Welcome to our Restaurant!');

const themeSwitch = document.querySelector('.toggleTheme');
const itemHeadings = document.querySelectorAll('.menu_category .heading');
const menu = document.querySelector('.menu');
const cartItems = document.querySelector('.cart_items');
const cartTotal = document.querySelector('.cartTotal');
const clearCartBtn = document.querySelector('.clearCartBtn');

const themePreference = localStorage.getItem('themeConfig');
if(themePreference){
	if(themePreference === 'dark'){
		document.body.classList.add('dark');
		themeSwitch.querySelector('i').textContent = 'dark_mode'
		themeSwitch.title = "Switch to Light Theme"
	} else {
		document.body.classList.remove('dark');
		themeSwitch.querySelector('i').textContent = 'light_mode'
		themeSwitch.title = "Switch to Dark Theme"
	}
}else{
	localStorage.setItem('themeConfig','light');
}

themeSwitch.addEventListener('click',()=>{
	document.body.classList.toggle('dark');
	if(document.body.classList.contains('dark')){
		themeSwitch.querySelector('i').textContent = 'dark_mode'
		themeSwitch.title = "Switch to Light Theme"
		localStorage.setItem('themeConfig','dark');
	}
	else{
		themeSwitch.querySelector('i').textContent = 'light_mode';
		themeSwitch.title = "Switch to Dark Theme";
		localStorage.setItem('themeConfig','light');
	}
});

const restaurantData = [
{
"id": 1,
"item": 'Hydrabadi Biriyani',
"price": 199,
"mIcon": "dinner_dining",
"category": "Today's Special"
},
{
"id": 9,
"item": 'Special Matka Mutton',
"price": 349,
"mIcon": "brunch_dining",
"category": "Today's Special"
},
{
"id": 2,
"item": "Chicken Tikka (6pc)",
"price": 175,
"mIcon": "brunch_dining",
"category": "Starter"
},
{
"id": 3,
"item": "Mashroom Manchurian",
"price": 155,
"mIcon": "fastfood",
"category": "Starter"
},
{
"id": 4,
"item": "Heaven Berry ButterScotch",
"price": 279,
"mIcon": "icecream",
"category": "Desert"
},
{
"id": 5,
"item": "Blue Ocean Mojito",
"price": 120,
"mIcon": "local_bar",
"category": "Drinks"
},
{
"id": 6,
"item": "Baby Corn Sticks",
"price": 180,
"mIcon": "local_dining",
"category": "Starter"
},
{
"id": 7,
"item": "Veg Fried Rice",
"price": 140,
"mIcon": "rice_bowl",
"category": "Main Course"
},
{
"id": 8,
"item": "Panner Kadai",
"price": 180,
"mIcon": "ramen_dining",
"category": "Main Course"
},
{
"id": 10,
"item": "Masala Dosa",
"price": 60,
"mIcon": "ramen_dining",
"category": "Breakfast and Snacks"
},
{
"id": 11,
"item": "Samosa (4pc)",
"price": 40,
"mIcon": "tapas",
"category": "Breakfast and Snacks"
},
{
"id": 12,
"item": "King Size Burger (1pc)",
"price": 79,
"mIcon": "lunch_dining",
"category": "Breakfast and Snacks"
},
{
"id": 13,
"item": "Mushroom Chilly",
"price": 180,
"mIcon": "dinner_dining",
"category": "Main Course"
},
{
"id": 14,
"item": "Curd Rice",
"price": 130,
"mIcon": "restaurant_menu",
"category": "Main Course"
},
{
"id": 15,
"item": "Tuna Fish Curry",
"price": 179,
"mIcon": "set_meal",
"category": "Main Course"
},
{
"id": 16,
"item": "Lemon Tea",
"price": 25,
"mIcon": "local_drink",
"category": "Drinks"
},
{
"id": 17,
"item": "Ice Tea",
"price": 35,
"mIcon": "local_cafe",
"category": "Drinks"
},
{
"id": 18,
"item": "Dalgona Coffee",
"price": 95,
"mIcon": "coffee",
"category": "Drinks"
},
{
"id": 19,
"item": "Lemon Honey Mojito",
"price": 120,
"mIcon": "local_bar",
"category": "Drinks"
},
{
"id": 20,
"item": "Strawberry Shake",
"price": 80,
"mIcon": "local_drink",
"category": "Drinks"
}
];

const categories = [];
restaurantData.forEach(i => {
	if(!categories.includes(i.category)){
		categories.push(i.category)
	}
});

let menuHTML = ""

categories.forEach(c => {
	menuHTML += `<div class="menu_category"><h3 class="heading">⚡ ${c}</h3><div class="menu_box">`;
	for(let i of restaurantData.filter(r => c === r.category)){
		menuHTML += `<div class="menu_item center_v" data-id="${i.id}">
					<i class="m-icon-round">${i.mIcon}</i>
					<h4>${i.item}</h4>
					<span class="price">Rs. ${i.price} /-</span>
					<button class="cartBtn center_v">
						<i class="m-icon-round">add_shopping_cart</i>
						Add
					</button>
				</div>`;
	}
	menuHTML += `</div></div>`
});

menu.innerHTML = menuHTML;


//

let cartData = []

const updateCart = cData => {
	if(cData.length > 0){
		let cHTML = "";
		let totalAmount = 0
		for(let c of cData){
			cHTML += `<div class="menu_item center_v" data-id="${c.id}">
					<i class="m-icon-round">${c.mIcon}</i>
					<h4>${c.item}</h4>
					<span class="price">Rs. ${c.price} /-</span>
					<span class="quantity">Quatity: ${c.count}</span>
				</div>`;
			totalAmount += c.count * Number(c.price)
		}

		document.querySelector('#cartItemNo').textContent = cData.length;
		cartItems.innerHTML = cHTML

		clearCartBtn.classList.add('active');
		cartTotal.style.display = 'inline-block';
		cartTotal.innerHTML = `Rs. ${totalAmount.toFixed(2)} /-`
	}else{
		clearCartBtn.classList.remove('active');
		cartTotal.style.display = 'none';
		cartTotal.innerHTML = "";

		document.querySelector('#cartItemNo').textContent = 0;
		cartItems.innerHTML = `<div class="empty_box">
					<i class="m-icon-round" style="color: #999;">add_shopping_cart</i>
					<h5>Add Items to bring them to cart</h5>
				</div>`;
	}
}

clearCartBtn.addEventListener('click',()=>{
	cartData = [];
	updateCart(cartData);
})

menu.addEventListener('click',e=>{
	if(e.target.closest('.heading')){
		e.target.closest('.menu_category').classList.toggle('active');
		Array.from(document.querySelectorAll('.menu_category')).filter(
			el => el != e.target.closest('.menu_category')
		).forEach(
			b => b.classList.remove('active')
		);
	}
	else if(e.target.closest('.cartBtn')){
		const item = restaurantData.filter(i => i.id === Number(e.target.closest('.menu_item').dataset.id))[0];
		const cartItem = cartData.filter(itm => itm.item === item.item);
		if(cartItem.length > 0){
			cartItem[0].count++
		}
		else{
			cartData.push({...item,"count":1})
		}
		updateCart(cartData);
	}
});


// Modal

const openModal = m => {
	document.querySelector('.modal-overlay').classList.add('active');
	m.classList.add('active');
}

const closeModal = m => {
	document.querySelector('.modal-overlay').classList.remove('active');
	m.classList.remove('active');
	window.location.hash = "!"
}

document.querySelectorAll('[data-trigger]').forEach(t => {
	t.addEventListener('click',e =>{
		e.preventDefault();
		openModal(document.querySelector(t.dataset.trigger))
	})
});

document.querySelectorAll('[data-close]').forEach(c => {
	c.addEventListener('click',e=>{
		closeModal(e.target.closest('.modal'))
	})
});