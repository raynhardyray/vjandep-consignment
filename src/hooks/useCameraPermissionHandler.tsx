import { useCameraPermissions } from "expo-camera";
import { Linking, } from "react-native";

export default function useCameraPermissionHandler() {
    const [permission, requestPermission] = useCameraPermissions();

    const handlePermissionRequest = async () => {
        const result = await requestPermission();

        if (result.granted === false && result.canAskAgain === false) {
        Linking.openSettings();
        }
    }

    return {permission, handlePermissionRequest}
};