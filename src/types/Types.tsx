export interface RawProductType {
  [key: string] : {
    Name: string;
    "List Price": number;
    "Updated Date": string;
  };
};

export interface ProductType {
  name: string;
  price: number;
  updatedDate: string;
}

export interface BarcodeDict {
  [barcode: string]: ProductType;
}