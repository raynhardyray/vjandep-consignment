import * as Papa from 'papaparse';
import { RawProductType } from '@/src/types/Types';
import rawProductsData from '@assets/data/products.json';

const rawProductsCSV = process.env.EXPO_PUBLIC_SHEET_URL;

export async function fetchProduct() {
    try {
        const response = await fetch(rawProductsCSV!);
        const responseText = await response.text();

        const parsedCSV = Papa.parse(responseText, {
            header: true,
            skipEmptyLines: true,
        });

        const rawProducts = transformToRawJSON(parsedCSV.data);

        return rawProducts;
    } catch (error) {
        console.error('ERROR FETCHING DATA! using existing data\n', error);
        return rawProductsData;
    }
};

export function transformToRawJSON (rows: any[]): RawProductType {
    const raw: RawProductType = {};

    rows.forEach(row => {
        const productId = row['Product ID'];
        if (!productId) return;

        raw[productId] = {
            Name: row['Name'],
            'List Price': row['List Price'],
            'Updated Date': row['Updated Date'],
        };
    });

    return raw;
};