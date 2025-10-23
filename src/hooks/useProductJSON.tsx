import { useEffect, useState } from "react";
import { RawProductType } from "@/src/types/Types";
import useConnectivityHandler from "@/src/hooks/useConnectivityHandler";
import { fetchProduct } from "@/src/utils/productsUtils";
import rawProducts from '../../assets/data/products.json';

export default function useProductJSON() {
    const [productJSON, setProductJSON] = useState<RawProductType>();
    const isConnected = useConnectivityHandler();

    useEffect(() => {
        async function loadProductData() {
            if (isConnected) {
                const fetchedProducts = await fetchProduct();
                setProductJSON(fetchedProducts!);
            } else {
                setProductJSON(rawProducts);
            };
        };

        loadProductData();

    }, [isConnected]);

    return productJSON;
};