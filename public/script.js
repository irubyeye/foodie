const shopsList = document.querySelector(".shop-list");
const productsList = document.querySelector(".card-container");
let productsAll = document.querySelectorAll(".card");

const renderDataShops = (data) => {
  const html = `
  <li class="shop-item" id = "${data._id}">${data.name}</li>
  `;
  shopsList.insertAdjacentHTML("beforeend", html);
};

const renderProducts = (data) => {
  const html = `
  <div class="card" id="${data._id}">
            <div class="card__header">
              <div class="card__picture">
                <img
                  src="img/${data.mainPhoto}"
                  alt="${data.name}"
                  class="card__picture-img"
                />
              </div>

              <h3 class="heading-tertirary">
                <span>${data.name}</span>
              </h3>
            </div>

            <div class="card__details">
              <h4 class="card__sub-heading">${data.subHeader}</h4>
              <p class="card__text">
              ${data.description}
              </p>
            </div>

            <div class="card__footer">
            <button class="btn btn--green btn--small" id="${data._id}">
            Add to cart: <span class="card__footer-value">$${data.price}</span>
          </button>
            </div>
          </div>
  `;
  productsList.insertAdjacentHTML("beforeend", html);
};

const getShopsData = async (url) => {
  const rawShops = await fetch(url);
  const shops = await rawShops.json();

  shops.data.shops.forEach((element) => {
    renderDataShops(element);
  });
};

const getProductsData = async (url) => {
  const rawProducts = await fetch(url);
  const products = await rawProducts.json();
  console.log(products);

  products.forEach((element) => {
    renderProducts(element);
  });
};

const removeSelected = () => {
  const shopItems = document.querySelectorAll(".shop-item");

  shopItems.forEach((item) => {
    item.classList.remove("selected");
  });
};

shopsList.addEventListener("click", (e) => {
  if (localStorage.length === 0) {
    const shopId = e.target.id;
    removeSelected();
    const shopListItem = document.getElementById(`${shopId}`);
    shopListItem.classList.add("selected");
    productsAll = document.querySelectorAll(".card");
    clearPage();
    getProductsData(`/foodie/v1/products/${shopId}`);
  } else if (localStorage.length > 0) {
    alert("Only one shop for delivery is permitted! Clear cart first");
  }
});

const clearPage = () => {
  productsAll.forEach((product) => {
    product.remove();
  });
  productsAll = null;
};

const initialize = async () => {
  await getShopsData("/foodie/v1/shops/");

  await (function () {
    const shopItems = document.querySelector(".shop-item");
    shopItems.classList.add("selected");
    console.log(shopItems);
    getProductsData(`/foodie/v1/products/${shopItems.id}`);
    console.log();
  })();
};

initialize();

const saveSession = (nameToSave, idToSave) => {
  sessionStorage.setItem(nameToSave, idToSave);
  const dataToRetrieve = sessionStorage.getItem(nameToSave);
  return dataToRetrieve;
};

//Cart

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".card-container");
  container.addEventListener("click", function (event) {
    if (event.target && event.target.matches(".btn--green")) {
      const card = event.target.closest(".card");
      const productId = card.id;

      const productName = card.querySelector(
        ".heading-tertirary span"
      ).textContent;
      const productPrice = card.querySelector(
        ".card__footer-value"
      ).textContent;

      const product = {
        id: productId,
        name: productName,
        price: productPrice.slice(1),
        quantity: 1,
      };

      let cartItems = localStorage.getItem("cartItems");
      if (cartItems) {
        cartItems = JSON.parse(cartItems);

        const existingProduct = cartItems.find((item) => item.id === productId);
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cartItems.push(product);
        }
      } else {
        cartItems = [product];
      }
      alert("Product added to cart!");
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  });
});
