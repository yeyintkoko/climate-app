import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    alignItems: 'center',
  },
  city: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  temp: {
    fontSize: 48,
    fontWeight: '800',
    color: '#1E90FF',
    marginTop: 8,
  },
  desc: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 6,
    textTransform: 'capitalize',
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 14,
    color: '#374151',
  },
  moreButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  moreIcon: {
    width: 18,
    height: 18,
    tintColor: '#6B7280',
  },
});

export default styles;
