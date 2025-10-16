import { BarcodeDict, ProductType, RawProductType } from "../types/Types";

export function formatProductPrice(product: ProductType | null): string {
  return product ? `₱${product.price.toFixed(2)}` : 'NOT FOUND';
}

export function getProductName(product: ProductType | null): string {
  return product ? product.name : 'NOT FOUND';
}

export function transformToBarcodeType(rawProducts: RawProductType): BarcodeDict {
    return Object.fromEntries(
        Object.entries(rawProducts).map(([barcode, data]) => [
            parseInt(barcode),
            {
                name: data['Name'],
                price: data['List Price'],
                updatedDate: data['Updated Date']
            }
        ])
    )
}