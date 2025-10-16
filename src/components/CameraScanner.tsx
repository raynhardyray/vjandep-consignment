import { BarcodeScanningResult, CameraView } from "expo-camera";
import { styles } from '@/src/styles/IndexStyle';

interface CameraScannerProps {
    onBarcodeScanned: (result: BarcodeScanningResult) => void;
    isScanned: boolean;
}

export function CameraScanner({onBarcodeScanned, isScanned}: CameraScannerProps) {
    return (
        <CameraView 
            facing={'back'} 
            style={styles.camera} 
            barcodeScannerSettings={{
            barcodeTypes: [
                "ean13",
                "ean8", 
                "upc_a", 
                "upc_e", 
                "code128",
            ]
            }}
            onBarcodeScanned={isScanned ? undefined : onBarcodeScanned}
        />
    );
}