import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { styles } from '@/src/styles/IndexStyle';

interface ResultCardProps {
  label: string;
  value: string;
}

export function ResultCard({ label, value }: ResultCardProps) {
  return (
    <View style={styles.resultContainer}>
      <Text variant="headlineMedium" style={styles.resultLabel}>
        {label}
      </Text>
      <Text variant="headlineSmall" style={styles.resultValue}>
        {value}
      </Text>
    </View>
  );
}