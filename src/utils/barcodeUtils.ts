import { Product, ProductDict } from '@/src/types/ProductType';
import * as Haptics from 'expo-haptics';

export function searchProductByBarcode(barcode: string, products: ProductDict): Product | null {
  const product = products[barcode] || null;

  if (product) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } else {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }

  return product;
}

export function formatProductPrice(product: Product | null): string {
  return product ? `₱${product['List Price'].toFixed(2)}` : 'NOT FOUND';
}

export function getProductName(product: Product | null): string {
  return product ? product.Name : 'NOT FOUND';
}