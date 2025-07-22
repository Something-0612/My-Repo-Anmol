let bagItems;
onLoad();

 function onLoad(){
  let bagItemstr= localStorage.getItem('bagItems');
  bagItems= bagItemstr?JSON.parse(bagItemstr):[];
   displayItemsonHomePage();
   displayBagIcon();
  }

function addToBag(itemid) {
  bagItems.push(itemid);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  displayBagIcon();
}

function displayBagIcon() {
  let bagItemCountElement = document.querySelector('.bag-item-count');
   if(bagItems.length>0){
     bagItemCountElement.style.visibility='visible';
  bagItemCountElement.innerText = bagItems.length;
   }
   else {
        bagItemCountElement.style.visibility='hidden';
   }
}

function displayItemsonHomePage() {

  let itemsContainerElement = document.querySelector('.items-container');
   if(!itemsContainerElement){
    return;
   }


  let innerHtml = '';
  items.forEach(item => {
    innerHtml += `
    <div class="item_container">
      <img class="item_img" src="${item.image}" alt="item image">
      <div class="rating">
          ${item.rating.stars} ⭐ | ${item.rating.count}
      </div>
      <div class="company_name">${item.company}</div>
      <div class="item_name">${item.item_name}</div>
      <div class="price">
          <span class="current_price">Rs ${item.current_price}</span>
          <span class="original_price">Rs ${item.original_price}</span>
          <span class="discount">(${item.discount_percentage}% OFF)</span>
      </div>
       <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>`
  });
  itemsContainerElement.innerHTML = innerHtml;
}