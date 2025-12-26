import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface TryAgainProps {
  error: string;
  onPress: () => void;
}

const TryAgain: React.FC<TryAgainProps> = ({
  error,
  onPress,
}: TryAgainProps) => {
  return (
    <View style={styles.center}>
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={onPress}>
        <Text style={styles.retryText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TryAgain;
