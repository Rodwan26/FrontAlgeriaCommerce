export type CartProduct = {
  id: number;
  name: string;
  price: number;
  image: string | null;
};

export type CartItem = CartProduct & {
  quantity: number;
};

const CART_KEY = "algeria-commerce-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(CART_KEY);

    if (!stored) {
      return [];
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to read cart:", error);
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(product: CartProduct) {
  const cart = getCart();

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  saveCart(cart);
}

export function removeFromCart(productId: number) {
  const cart = getCart().filter((item) => item.id !== productId);

  saveCart(cart);
}

export function updateCartQuantity(
  productId: number,
  quantity: number
) {
  const cart = getCart();

  const item = cart.find((item) => item.id === productId);

  if (!item) {
    return;
  }

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  item.quantity = quantity;

  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}

export function getCartCount() {
  return getCart().reduce(
    (total, item) => total + item.quantity,
    0
  );
}

export function getCartTotal() {
  return getCart().reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

