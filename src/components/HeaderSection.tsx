import { Image, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { styles } from '@/src/styles/IndexStyle';
import { getVjandepLogos } from '@/src/constants/Logos';

export function HeaderSection() {
    const theme = useTheme();
    const {vjandepLogo, gasaLogo, baayLogo, samuelLogo, vviLogo} = getVjandepLogos(theme);
   
    return (
        <>
        <View style={styles.logoContainer}>
            <Image source={vjandepLogo} style={styles.logo} resizeMode="contain" />
            <Image source={gasaLogo} style={styles.logo} resizeMode="contain" />
            <Image source={baayLogo} style={styles.logo} resizeMode="contain" />
            <Image source={samuelLogo} style={styles.logo} resizeMode="contain" />
        </View>

        <Image source={vviLogo} style={styles.vviLogo} resizeMode="contain" />

        <Text variant="headlineLarge" style={{ fontWeight: 'bold', marginBottom: 10 }}>
            VVI BARCODE PRICE CHECKER
        </Text>
        </>
  );
}