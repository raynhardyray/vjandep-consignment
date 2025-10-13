import { CameraView, useCameraPermissions } from "expo-camera";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View
    >
      <CameraView 
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'ean13', 'ean8', 'code39', 'code128'],
        }}
      />
      <Text>Home</Text>
    </View>
  );
}
