import { IProduct } from '@/interface/product.interface';
import { create } from 'zustand';

interface ICartItem {
  product: IProduct;
  quantity: number;
}

interface IStore {
  cartItems: ICartItem[];
  addToCart: (product: IProduct, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void; // New function to clear the cart
  subtotal: number;
  total: number;
  calculateTotal: () => { subtotal: number; total: number };
}

export const useCart = create<IStore>((set, get) => ({
  cartItems: (typeof window !== 'undefined' && localStorage.getItem('cartItems'))
    ? JSON.parse(localStorage.getItem('cartItems') || '[]')
    : [],
  addToCart: (product, quantity = 1) => {
    const existingItem = get().cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
      const updatedCartItems = get().cartItems.map(item => {
        if (item.product.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        } else {
          return item;
        }
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }

      set({ cartItems: updatedCartItems });
    } else {
      const updatedCartItems = get().cartItems.concat({ product, quantity });

      if (typeof window !== 'undefined') {
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }

      set({ cartItems: updatedCartItems });
    }
  },
  removeFromCart: (productId) => {
    const updatedCartItems = get().cartItems.filter(item => item.product.id !== productId);

    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    set({ cartItems: updatedCartItems });
  },
  updateItemQuantity: (itemId, quantity) => {
    if (quantity < 0) {
      // Set quantity to 0 if it's less than 0
      quantity = 0;
    }

    const updatedCartItems = get().cartItems.map(item => {
      if (item.product.id === itemId) {
        return { ...item, quantity };
      } else {
        return item;
      }
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    set({ cartItems: updatedCartItems });
  },
  clearCart: () => {
    const updatedCartItems: ICartItem[] = []; // Explicitly type updatedCartItems as an array of ICartItem

    if (typeof window !== 'undefined') {
      localStorage.removeItem('cartItems');
    }

    set({ cartItems: updatedCartItems });
  },
  calculateTotal: () => {
    const subtotal = get().cartItems.reduce(
      (sum, item) => sum + item.product.unitPrice[0].sellingPrice * item.quantity,
      0
    );
    const total = subtotal + 10; // Assume flat rate shipping fee of $10

    return { subtotal, total };
  },
  get subtotal() {
    return get().cartItems.reduce((sum, item) => sum + item.product.unitPrice[0].sellingPrice * item.quantity, 0);
  },
  get total() {
    return get().subtotal + 10; // assume flat rate shipping fee of $10
  },
}));
