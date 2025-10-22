import * as Network from 'expo-network';
import { useEffect, useState } from 'react';

export default function useConnectivityHandler() {
    const [isConnected, setIsConnected] = useState<boolean | undefined>(false);

    useEffect(() => {
        async function checkConnection() {
            try {
                const networkState = await Network.getNetworkStateAsync();
                setIsConnected(networkState.isConnected && networkState.isInternetReachable)
            } catch {
                setIsConnected(false);
            }
        }

        checkConnection();

        const intervalId = setInterval(checkConnection, 180000);

        return () => clearInterval(intervalId);
    }, [])

    return isConnected;
};