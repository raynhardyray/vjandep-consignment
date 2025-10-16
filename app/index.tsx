import { Product, ProductDict } from '@/src/types/ProductType';
import rawProducts from '@assets/data/products.json';
import { BarcodeScanningResult } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { styles } from '@/src/styles/IndexStyle';
import useCameraPermissionHandler from '@/src/hooks/useCameraPermissionHandler';
import { CameraScanner } from '@/src/components/CameraScanner';
import { HeaderSection } from '@/src/components/HeaderSection';
import { ScanButton } from '@/src/components/ScanButton';
import { ResultCard } from '@/src/components/ResultCard';
import { formatProductPrice, getProductName } from '@/src/utils/barcodeUtils';

export default function Index() {
    const [hasScanned, setHasScanned] = useState(false);
    const [scannedProduct, setScannedProduct] = useState<Product | null>(null);

    const theme = useTheme();
    const {permission, handlePermissionRequest} = useCameraPermissionHandler();

    if (!permission) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background}]}>
                <ActivityIndicator animating={true} size="large" />
            </View>
        )
    };

    if (!permission.granted) {
      return (
        <View style={[styles.container, { backgroundColor: theme.colors.background}]}>
            <Text>We need your permission to show the camera</Text>
            <Button onPress={handlePermissionRequest}>Grant Permission</Button>
        </View>
      )
    }

    const handleBarcodeScanned = (result: BarcodeScanningResult) => {
        setHasScanned(true);

        const product = (rawProducts as ProductDict)[result.data];

        if (product) {
            setScannedProduct(product);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
            setScannedProduct(null);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background}]}>

        <HeaderSection />
        
        <CameraScanner isScanned={hasScanned} onBarcodeScanned={handleBarcodeScanned} />
        
        <ScanButton onPress={() => setHasScanned(false)} disabled={!hasScanned} />

        <ResultCard label="NAME:" value={getProductName(scannedProduct)} />
        <ResultCard label="PRICE:" value={formatProductPrice(scannedProduct)} />
      </View>
    );
};