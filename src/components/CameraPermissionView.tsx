import { View } from "react-native";
import { ActivityIndicator, Button, Text, useTheme} from "react-native-paper";
import { styles } from '@/src/styles/IndexStyle';

interface CameraPermissionViewProps {
    permission: any;
    onGrantPermission: () => void;
}

export function CameraPermissionView({permission, onGrantPermission}: CameraPermissionViewProps) {
    const theme = useTheme();
    
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
            <Button onPress={onGrantPermission}>Grant Permission</Button>
        </View>
      )
    }
}