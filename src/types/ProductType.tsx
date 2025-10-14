export type Product = {
  Name: string;
  "List Price": number;
  "Updated Date": string;
}

export type ProductDict = {
  [barcode: string]: Product;
}