import * as Network from 'expo-network';
import { useEffect, useState } from 'react';

export default function useConnectivityHandler() {
    const [isConnected, setIsConnected] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        async function checkConnection() {
            try {
                const networkState = await Network.getNetworkStateAsync();
                setIsConnected(networkState.isConnected && networkState.isInternetReachable);
            } catch {
                setIsConnected(false);
            }
        }

        checkConnection();

        const networkListener = Network.addNetworkStateListener((networkState) => {
            setIsConnected(networkState.isConnected && networkState.isInternetReachable);
        });

        // const intervalId = setInterval(checkConnection, 180000); // Check every 3 minutes

        return () => {
            // clearInterval(intervalId) // Clean up the intervalId
            networkListener.remove();
        };
    }, []);

    return isConnected;
};