import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  retryButton: {
    marginTop: 12,
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: '#DC2626',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default styles;
