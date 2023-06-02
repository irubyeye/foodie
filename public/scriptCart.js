// Rendering info

let cartItems = JSON.parse(localStorage.getItem("cartItems"));
const cartList = document.querySelector(".cart-items");

function renderCartItems() {
  cartList.innerHTML = "";
  let total = 0;
  if (cartItems) {
    cartItems.forEach((item, i) => {
      const { id, name, price, quantity } = item;

      const cartItem = document.createElement("li");
      cartItem.classList.add("cart-item");

      const itemName = document.createElement("span");
      itemName.classList.add("cart-item-name");
      itemName.textContent = name + " ";

      const itemPrice = document.createElement("span");
      itemPrice.classList.add("cart-item-price");
      itemPrice.textContent = `$${price} Quantity: `;

      const itemQuantity = document.createElement("input");
      itemQuantity.classList.add("cart-item-quantity");
      itemQuantity.type = "number";
      itemQuantity.value = quantity;
      itemQuantity.addEventListener("change", (event) => {
        let newQuantity = parseInt(event.target.value);
        updateCartItemQuantity(id, newQuantity);
      });

      const removeItem = document.createElement("span");
      removeItem.classList.add("cart-item-remove");
      removeItem.textContent = "❌";
      removeItem.addEventListener("click", (event) => {
        deleteCartItem(id);
      });

      total += quantity * price * 1;

      cartItem.appendChild(itemName);
      cartItem.appendChild(itemPrice);
      cartItem.appendChild(itemQuantity);
      cartList.appendChild(cartItem);
      cartItem.appendChild(removeItem);

      if (i === cartItems.length - 1) {
        const totalAmount = document.createElement("span");
        totalAmount.classList.add("cart-item-total");
        totalAmount.textContent = "Total: $" + total;

        cartItem.appendChild(totalAmount);
      }
    });
  }
}

function deleteCartItem(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
  console.log(cartItems.length);
  if (cartItems.length === 0) {
    localStorage.removeItem("cartItems");
  }
}

function updateCartItemQuantity(itemId, newQuantity) {
  const updatedCartItems = cartItems.map((item) => {
    if (item.id === itemId) {
      item.quantity = newQuantity;
    }
    return item;
  });

  cartItems = updatedCartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateTotal();
}

function updateTotal() {
  let total = 0;
  cartItems.forEach((el) => {
    total += el.quantity * el.price * 1;
  });
  const totalEl = document.querySelector(".cart-item-total");
  totalEl.textContent = "Total: $" + total;
  return total;
}

const clearBtn = document.querySelector(".clear");

function clearCart() {
  localStorage.removeItem("cartItems");
  cartList.innerHTML = "";
}

clearBtn.addEventListener("click", clearCart);

renderCartItems();

function submitOrder() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (cartItems) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const orderData = [
      {
        name: name,
        email: email,
        phone: phone,
        address: address,
        order: cartItems,
      },
    ];

    fetch("/foodie/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
      });
    clearCart();
  }
}

const submitButton = document.querySelector(".checkout");
submitButton.addEventListener("click", submitOrder);
