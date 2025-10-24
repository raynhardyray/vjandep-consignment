import { useEffect, useState } from "react";
import useConnectivityHandler from "@hooks/useConnectivityHandler";
import { Portal, Snackbar } from "react-native-paper";

export default function ConnectivitySnackbar() {
    const isConnected = useConnectivityHandler();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, [isConnected])

    return (
        <Portal>
            <Snackbar 
                visible={visible} 
                onDismiss={() => setVisible(false)} 
                duration={3000}
                style={{
                    alignSelf: 'center',
                    borderWidth: 2,
                    borderColor: isConnected ? 'green' : 'red',
                }}
            >
                {isConnected ? "🟢 You are Online, using data online.." : "🔴 You are Offline, using existing data.."}
            </Snackbar>
        </Portal>
    );
}