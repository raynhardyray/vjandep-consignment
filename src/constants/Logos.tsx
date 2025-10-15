import { MD3Theme } from "react-native-paper";

export const getVjandepLogos = (isDarkMode: MD3Theme) => {
    const vjandepLogo = require('@assets/images/vjandep-logo.png');
    const gasaLogo = require('@assets/images/gasa-logo.png');
    const baayLogo = require('@assets/images/baay-logo.png');
    const samuelLogo = isDarkMode.dark
        ? require('@assets/images/samuel-logo-dark.png')
        : require('@assets/images/samuel-logo-light.png');
    const vviLogo = isDarkMode.dark
        ? require('@assets/images/vvi-logo-dark.png')
        : require('@assets/images/vvi-logo-light.png');

    return {vjandepLogo, gasaLogo, baayLogo, samuelLogo, vviLogo};
}