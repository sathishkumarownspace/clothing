const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");
const searchToggle = document.querySelector(".search-toggle");
const searchInput = document.querySelector("#product-search");
const products = [...document.querySelectorAll(".product-card")];
const cartCount = document.querySelector(".cart-count");
const cartButton = document.querySelector(".cart-button");
const favoriteButton = document.querySelector(".favorite-button");
const statusMessage = document.querySelector("#status-message");
let cartItems = 0;
let messageTimer;

function announce(message) {
  statusMessage.textContent = message;
  statusMessage.classList.add("is-visible");
  window.clearTimeout(messageTimer);
  messageTimer = window.setTimeout(() => statusMessage.classList.remove("is-visible"), 2400);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isOpen);
});

searchToggle.addEventListener("click", () => {
  const isOpen = document.querySelector(".site-header").classList.toggle("mobile-search-open");
  searchToggle.setAttribute("aria-expanded", String(isOpen));
  searchToggle.setAttribute("aria-label", isOpen ? "Close search" : "Open search");
  if (isOpen) searchInput.focus();
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  products.forEach((product) => {
    const matches = product.dataset.search.includes(query);
    product.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  document.querySelector("#empty-search").hidden = visibleCount > 0;
});

document.querySelectorAll("[data-add]").forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    cartButton.setAttribute("aria-label", `Shopping bag, ${cartItems} ${cartItems === 1 ? "item" : "items"}`);
    announce(`${button.dataset.add} added to your bag.`);
  });
});

favoriteButton.addEventListener("click", () => {
  const isFavorite = favoriteButton.getAttribute("aria-pressed") === "true";
  favoriteButton.setAttribute("aria-pressed", String(!isFavorite));
  announce(isFavorite ? "Removed from your favorites." : "Added to your favorites.");
});

cartButton.addEventListener("click", () => {
  announce(cartItems ? `Your bag has ${cartItems} ${cartItems === 1 ? "item" : "items"}.` : "Your shopping bag is empty.");
});