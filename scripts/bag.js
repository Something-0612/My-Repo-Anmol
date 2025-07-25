const CONVENIENCE_FEES=99;
let bagItemObject;
onLoad();
function onLoad(){
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}
function displayBagSummary(){
  let bagSummaryelement=document.querySelector('.bag-summary');
  let totalItem=bagItemObject.length;
  let totalMRP=0;
  let totalDiscount=0;
  let finalPayment=0;

bagItemObject.forEach(bagItem=>{
  totalMRP+=bagItem.original_price;
  totalDiscount+=(bagItem.original_price- bagItem.current_price); // discount total
  finalPayment+=bagItem.current_price;
 });
 if(bagItemObject.length>0)  finalPayment+=CONVENIENCE_FEES;
  //  finalPayment=totalMRP-totalDiscount +CONVENIENCE_FEES; // 99 is convience fees

  bagSummaryelement.innerHTML=`  <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">- ₹ ${totalDiscount} </span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">${bagItemObject.length>0?99:0}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹ ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}

function loadBagItemsObjects(){
  console.log(bagItems);
  bagItemObject=  bagItems.map(itemId=>{
      for(let i=0;i<items.length;i++){
        if(itemId==items[i].id){
          return items[i];
        }
      }
    });
    console.log(bagItemObject);
}

function displayBagItems(){
  let containerELement= document.querySelector('.bag-items-container');
  let innerhtml='';
  bagItemObject.forEach(bagitem => {
    innerhtml+=generateItemHtml(bagitem);
  });
  
  containerELement.innerHTML= innerhtml;
}

 function removeFromBag(itemId){
  let index = bagItems.indexOf(itemId);
  if (index !== -1) {
    bagItems.splice(index, 1); // Remove only one occurrence
  }
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemsObjects();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
 }

function generateItemHtml(item){
  return  `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>

            <div class="item-right-part">
              <div class="company">${item.company} </div>
              <div class="item-name">  ${item.item_name} </div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount}  % OFF)</span>
              </div>

              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>

              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date} </span>
              </div>
              
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})" >X</div>
          </div>`;
}