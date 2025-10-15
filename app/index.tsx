import { Product, ProductDict } from '@/src/types/ProductType';
import rawProducts from '@assets/data/products.json';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Image, Linking, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { styles } from '@/src/styles/IndexStyle';
import { getVjandepLogos } from '@/src/constants/Logos';

export default function Index() {
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [hasScanned, setHasScanned] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const {vjandepLogo, gasaLogo, baayLogo, samuelLogo, vviLogo} = getVjandepLogos(theme);

  const handlePermissionRequest = async () => {
    const result = await requestPermission();

    if (result.granted === false && result.canAskAgain === false) {
      Linking.openSettings();
    }
  }

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
  };

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
      <View style={styles.logoContainer}>
        <Image source={vjandepLogo} style={styles.logo} resizeMode='contain'/>
        <Image source={gasaLogo} style={styles.logo} resizeMode='contain' />
        <Image source={baayLogo} style={styles.logo} resizeMode='contain' />
        <Image source={samuelLogo} style={styles.logo} resizeMode='contain' />
      </View>
      
      <Image source={vviLogo} style={styles.vviLogo} resizeMode='contain' />

      <Text variant='headlineLarge' style={{fontWeight: 'bold', marginBottom: 10}}>VVI BARCODE PRICE CHECKER</Text>
      
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
        onBarcodeScanned={hasScanned ? undefined : handleBarcodeScanned}
      />
      <Button 
          mode={"contained-tonal"} 
          onPress={() => setHasScanned(false)}
          style={{alignSelf: 'center',}}
          contentStyle={{height: 50, paddingHorizontal: 5 }}
          labelStyle={{fontSize: 20,}}
          disabled={!hasScanned}
      >SCAN</Button>


      <View style={styles.resultContainer}>
      <Text variant='headlineMedium' style={styles.resultLabel}>NAME:</Text> 
      <Text variant='headlineSmall' style={styles.resultValue}>{scannedProduct ? scannedProduct.Name : 'NOT FOUND'}</Text> 
      </View>

      <View style={styles.resultContainer}>
        <Text variant='headlineMedium' style={styles.resultLabel}>PRICE:</Text> 
        <Text variant='headlineSmall' style={styles.resultValue}>{scannedProduct ? `₱${scannedProduct['List Price'].toFixed(2)}` : 'NOT FOUND'}</Text> 
      </View> 
    </View>
  );
};