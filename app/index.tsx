import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import products from '../assets/data/products.json';

type Product = {
  Name: string;
  "List Price": number;
  "Updated Date": string;
}

type ProductDict = {
  [barcode: string]: Product;
}

export default function Index() {
  const theme = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [hasScanned, setHasScanned] = useState(false);

  const vjandepLogo = require('../assets/images/vjandep-logo.png');
  const gasaLogo = require('../assets/images/gasa-logo.png');
  const baayLogo = require('../assets/images/baay-logo.png');
  const samuelLogo = theme.dark
    ? require('../assets/images/samuel-logo-dark.png')
    : require('../assets/images/samuel-logo-light.png');
  const vviLogo = theme.dark
    ? require('../assets/images/vvi-logo-dark.png')
    : require('../assets/images/vvi-logo-light.png');

  if (!permission) {
    return <View />;
  };

  // if (!permission.granted) {
  //   return (
  //     <View>
  //       <Text>We need your permission to show the camera</Text>
  //       <Button onPress={requestPermission}>Grand Permission</Button>
  //     </View>
  //   )
  // };

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    setHasScanned(true);

    const product = (products as ProductDict)[result.data];

    if (product) {

    }  
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={vjandepLogo} style={styles.logo} resizeMode='contain'/>
          <Image source={gasaLogo} style={styles.logo} resizeMode='contain' />
          <Image source={baayLogo} style={styles.logo} resizeMode='contain' />
          <Image source={samuelLogo} style={styles.logo} resizeMode='contain' />
        </View>
        
        <Image source={vviLogo} style={styles.vviLogo} resizeMode='contain' />

        <Text variant='headlineLarge' style={{fontWeight: 'bold'}}>VVI BARCODE PRICE CHECKER</Text>
        
        <CameraView 
          facing={'back'} 
          style={styles.camera} 
          barcodeScannerSettings={{
            barcodeTypes: [
              "ean13",
              "ean8", 
              "upc_a", 
              "upc_e", 
              "code128"
            ]
          }}
          onBarcodeScanned={hasScanned ? undefined : handleBarcodeScanned}
        />
        {hasScanned && (
          <Button 
            mode={"contained-tonal"} 
            onPress={() => setHasScanned(false)}
            style={{alignSelf: 'center'}}
          >Scan</Button>
        )}

        <Text variant='displaySmall' style={{fontWeight: 'bold', color: '#FF7F7F'}}>RESULTS</Text>

        <View style={styles.resultContainer}>
          <Text variant='headlineSmall' style={{fontWeight: 'bold'}}>NAME: {}</Text> 
          <Text variant='headlineSmall' style={{fontWeight: 'bold'}}>PRICE:</Text> 
        </View> 
        
      </View>
    </>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
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
    width: '100%',
    paddingLeft: 20,
  },
});