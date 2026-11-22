import { api } from "@/services/api";

import type {
  AddToCartDto,
  Cart,
  CartApiResponse,
  CartItem,
  CartProduct,
  UpdateCartItemDto,
} from "../types/cart.types";

export const CART_KEY = "/carts/me";

/** The API doesn't document its response schemas, so accept the common field aliases. */
interface RawCartProduct {
  id?: number;
  title?: string;
  name?: string;
  price?: number;
  stock?: number;
  description?: string | null;
  categories?: CartProduct["categories"];
}

interface RawCartItem {
  id?: number;
  quantity?: number;
  productId?: number;
  product_id?: number;
  product?: RawCartProduct | null;
}

interface RawCart {
  id?: number;
  items?: RawCartItem[];
  cartItems?: RawCartItem[];
  totalItems?: number;
  totalPrice?: number;
  total?: number;
  data?: RawCart;
}

function normalizeCart(raw: RawCart | null | undefined): Cart {
  const source = raw?.data && !raw.items && !raw.cartItems ? raw.data : raw;
  const rawItems = source?.items ?? source?.cartItems ?? [];

  const items: CartItem[] = rawItems
    .filter((item) => item && (item.product || item.productId || item.product_id))
    .map((item, index) => {
      const product = item.product ?? {};
      const productId = item.productId ?? item.product_id ?? product.id ?? index;

      return {
        id: item.id ?? productId,
        productId,
        quantity: Number(item.quantity) || 1,
        product: {
          id: productId,
          title: product.title ?? product.name ?? "محصول",
          price: Number(product.price) || 0,
          stock: product.stock,
          description: product.description,
          categories: product.categories,
        },
      };
    });

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    id: source?.id ?? 0,
    items,
    totalItems: source?.totalItems ?? itemCount,
    totalPrice:
      source?.totalPrice ??
      source?.total ??
      items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  };
}

// Get current user cart
export const getMyCartService = async (): Promise<Cart> => {
  const res = await api.get<CartApiResponse<RawCart>>(CART_KEY);

  return normalizeCart(res.data.data);
};

// Add product to cart
export const addToCartService = async (data: AddToCartDto): Promise<void> => {
  await api.post("/carts/items", data);
};

// Update cart item quantity
export const updateCartItemService = async (
  itemId: number,
  data: UpdateCartItemDto,
): Promise<void> => {
  await api.patch(`/carts/items/${itemId}`, data);
};

// Remove item from cart
export const removeCartItemService = async (itemId: number): Promise<void> => {
  await api.delete(`/carts/items/${itemId}`);
};

// Clear current user cart
export const clearCartService = async (): Promise<void> => {
  await api.delete("/carts/clear");
};
