import { useEffect, useState } from "react";
import { RawProductType } from "@/src/types/Types";
import useConnectivityHandler from "@/src/hooks/useConnectivityHandler";
// import { fetchProduct } from "@/src/utils/productsUtils"; // disabled for now
import rawProducts from '@assets/data/products.json';

export default function useProductJSON() {
    const [productJSON, setProductJSON] = useState<RawProductType>();
    const isConnected = useConnectivityHandler();

    useEffect(() => {
        async function loadProductData() {
            if (isConnected) {
                // const fetchedProducts = await fetchProduct(); // disabled for now
                // setProductJSON(fetchedProducts!); // disabled for now
                setProductJSON(rawProducts); //temporary 
            } else {
                setProductJSON(rawProducts);
            };
        };

        loadProductData();

    }, [isConnected]);

    return productJSON;
};