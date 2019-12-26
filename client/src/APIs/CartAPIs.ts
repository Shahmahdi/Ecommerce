export const addItemIntoCart = (item: object, next: () => void) => {
  let cart: any = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart')!)
    }
    cart.push({
      ...item,
      count: 1
    });

    cart = Array.from(new Set(cart.map((p: any) => p._id))).map(id => {
      return cart.find((p: any) => p._id === id);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    next();

  }
}

export const totalItemInCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')!).length;
    }
    return 0;
  }
}