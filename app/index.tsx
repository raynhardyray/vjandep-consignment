import { Product, ProductDict } from '@/src/types/ProductType';
import rawProducts from '@assets/data/products.json';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';

export default function Index() {
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [hasScanned, setHasScanned] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);

  const vjandepLogo = require('@assets/images/vjandep-logo.png');
  const gasaLogo = require('@assets/images/gasa-logo.png');
  const baayLogo = require('@assets/images/baay-logo.png');
  const samuelLogo = theme.dark
    ? require('@assets/images/samuel-logo-dark.png')
    : require('@assets/images/samuel-logo-light.png');
  const vviLogo = theme.dark
    ? require('@assets/images/vvi-logo-dark.png')
    : require('@assets/images/vvi-logo-light.png');

  const handlePermissionRequest = async () => {
    const result = await requestPermission();

    if (result.granted === false && result.canAskAgain === false) {
      Linking.openSettings();
    }
  }

  if (!permission) {
    return (
      <View>
        <ActivityIndicator animating={true} size="large" />
      </View>
    )
  };

  if (!permission.granted) {
    return (
      <View style={styles.container}>
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
            "qr"
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  logo: {
    width: 70,
    height: 70,
  },
  vviLogo: {
    width: 70,
    height: 70,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '95%',
    overflow: 'hidden',
    borderRadius: 15,
    marginBottom: 10,
  },
  resultContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 5,
    gap: 10,
  },
  resultLabel: {
    fontWeight: 'bold',
  },
  resultValue: {
    flexShrink: 1,
    fontSize: 30
  }
});