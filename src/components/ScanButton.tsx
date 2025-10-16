import { Button } from 'react-native-paper';

interface ScanButtonProps {
  onPress: () => void;
  disabled: boolean;
}

export function ScanButton({ onPress, disabled }: ScanButtonProps) {
  return (
    <Button
      mode="contained-tonal"
      onPress={onPress}
      style={{ alignSelf: 'center' }}
      contentStyle={{ height: 50, paddingHorizontal: 5 }}
      labelStyle={{ fontSize: 20 }}
      disabled={disabled}
    >
      SCAN
    </Button>
  );
}