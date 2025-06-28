import { StyleSheet, Platform } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[50],
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    // Add extra padding for Android devices with navigation buttons
    paddingBottom: Platform.select({
      android: 16,
      default: 0,
    }),
  },
  // New style for content that should avoid bottom navigation area
  contentWithBottomPadding: {
    paddingBottom: Platform.select({
      android: 96, // Tab height + navigation buttons space
      ios: 80,    // Tab height + safe area
      web: 80,
    }),
  },
  padding: {
    padding: 16,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  paddingVertical: {
    paddingVertical: 16,
  },
  margin: {
    margin: 16,
  },
  marginHorizontal: {
    marginHorizontal: 16,
  },
  marginVertical: {
    marginVertical: 16,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    backgroundColor: colors.primary[500],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: colors.white,
  },
  textPrimary: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[900],
  },
  textSecondary: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[600],
  },
  heading1: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    lineHeight: 34,
    color: colors.neutral[900],
  },
  heading2: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    lineHeight: 30,
    color: colors.neutral[900],
  },
  heading3: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    lineHeight: 24,
    color: colors.neutral[900],
  },
  heading4: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: colors.neutral[900],
  },
  body: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutral[700],
  },
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutral[500],
  },
});