// contexts/CartContext.tsx
"use client";

import { createContext, useContext, useReducer, useMemo, useEffect, ReactNode, Dispatch } from "react";

// ============================================================================
// TYPES
// ============================================================================

export interface CartItem {
  variantId: string;
  quantity: number;
  addedAt: number;
}

export interface CartState {
  cart: CartItem[];
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: { variantId: string; quantity?: number } }
  | { type: "UPDATE_QUANTITY"; payload: { variantId: string; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { variantId: string } }
  | { type: "INITIALIZE_CART"; payload: CartItem[] }
  | { type: "CLEAR_CART" };

interface CartContextType {
  state: CartState;
  dispatch: Dispatch<CartAction>;
  getCartItemCount: () => number;
  getCartItem: (variantId: string) => CartItem | undefined;
}

// ============================================================================
// INITIAL STATE
// ============================================================================

const INITIAL_STATE: CartState = { 
  cart: [] 
};

// ============================================================================
// CONTEXT
// ============================================================================

const CartContext = createContext<CartContextType | undefined>(undefined);

// ============================================================================
// REDUCER
// ============================================================================

const reducer = (state: CartState, action: CartAction): CartState => {
  console.log('🛒 Cart action:', action.type, action.payload);

  switch (action.type) {
    case "ADD_TO_CART": {
      const { variantId, quantity = 1 } = action.payload;

      if (!variantId) {
        console.error("❌ variantId is required");
        return state;
      }

      const cartList = [...state.cart];
      const existingIndex = cartList.findIndex(
        item => item.variantId === variantId
      );

      if (existingIndex >= 0) {
        // Update quantity
        console.log('📦 Updating existing item quantity');
        cartList[existingIndex] = {
          ...cartList[existingIndex],
          quantity: cartList[existingIndex].quantity + quantity,
        };
      } else {
        // Add new item
        console.log('✨ Adding new item to cart');
        cartList.push({
          variantId,
          quantity,
          addedAt: Date.now(),
        });
      }

      console.log('🛒 New cart:', cartList);
      return { ...state, cart: cartList };
    }

    case "UPDATE_QUANTITY": {
      const { variantId, quantity } = action.payload;

      if (quantity < 1) {
        console.log('🗑️ Removing item (quantity < 1)');
        return {
          ...state,
          cart: state.cart.filter(item => item.variantId !== variantId),
        };
      }

      console.log('🔄 Updating quantity to:', quantity);
      return {
        ...state,
        cart: state.cart.map(item =>
          item.variantId === variantId ? { ...item, quantity } : item
        ),
      };
    }

    case "REMOVE_FROM_CART": {
      const { variantId } = action.payload;
      console.log('❌ Removing item:', variantId);

      return {
        ...state,
        cart: state.cart.filter(item => item.variantId !== variantId),
      };
    }

    case "INITIALIZE_CART": {
      console.log('🔧 Initializing cart:', action.payload);
      return {
        ...state,
        cart: action.payload,
      };
    }

    case "CLEAR_CART": {
      console.log('🧹 Clearing cart');
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
};

// ============================================================================
// PROVIDER
// ============================================================================

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCart = localStorage.getItem("cart_v2");
    
    if (storedCart) {
      try {
        const parsed: CartItem[] = JSON.parse(storedCart);
        console.log('📥 Loading cart from localStorage:', parsed);
        dispatch({
          type: "INITIALIZE_CART",
          payload: parsed,
        });
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage on every change
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    console.log('💾 Saving cart to localStorage:', state.cart);
    localStorage.setItem("cart_v2", JSON.stringify(state.cart));
  }, [state.cart]);

  const contextValue = useMemo<CartContextType>(
    () => ({
      state,
      dispatch,
      getCartItemCount: (): number => {
        return state.cart.reduce((total, item) => total + item.quantity, 0);
      },
      getCartItem: (variantId: string): CartItem | undefined => {
        return state.cart.find(item => item.variantId === variantId);
      },
    }),
    [state]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// ============================================================================
// HOOK
// ============================================================================

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};