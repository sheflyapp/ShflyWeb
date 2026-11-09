import React from 'react';
import { View, Text, Pressable, Linking, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, font, maxWidth } from './theme';

export function useLayout() {
  const { width } = useWindowDimensions();
  return { width, isDesktop: width >= 1000, isTablet: width >= 700 };
}

export function T({ style, weight = '400', size = 16, color = colors.text, children, ...rest }) {
  return (
    <Text style={[{ fontFamily: font, fontWeight: weight, fontSize: size, color, lineHeight: size * 1.6 }, style]} {...rest}>
      {children}
    </Text>
  );
}

export function Container({ style, children }) {
  const { isTablet } = useLayout();
  return (
    <View style={[{ width: '100%', maxWidth, alignSelf: 'center', paddingHorizontal: isTablet ? 32 : 18 }, style]}>
      {children}
    </View>
  );
}

export function Button({ label, onPress, variant = 'solid', icon = 'arrow-back', small, style }) {
  const solid = variant === 'solid';
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ hovered, pressed }) => [
      s.btn,
      small && { paddingVertical: 9, paddingHorizontal: 18 },
      solid ? { backgroundColor: colors.orange } : { borderWidth: 1.5, borderColor: colors.orange, backgroundColor: 'transparent' },
      (hovered || pressed) && { transform: [{ translateY: -2 }], opacity: 0.92 },
      style,
    ]}>
      <T weight="700" size={small ? 14 : 16} color={solid ? '#fff' : colors.orange} style={{ lineHeight: small ? 20 : 22 }}>{label}</T>
      {icon ? <Ionicons name={icon} size={small ? 16 : 18} color={solid ? '#fff' : colors.orange} /> : null}
    </Pressable>
  );
}

export function StoreBadge({ store, dark = false, onPress }) {
  const apple = store === 'apple';
  const url = apple ? 'https://apps.apple.com/' : 'https://play.google.com/store';
  return (
    <Pressable
      onPress={onPress || (() => Linking.openURL(url))}
      accessibilityRole="link"
      style={({ hovered }) => [s.badge, dark && { borderColor: 'rgba(255,255,255,0.35)' }, hovered && { transform: [{ translateY: -2 }] }]}
    >
      <Ionicons name={apple ? 'logo-apple' : 'logo-google-playstore'} size={26} color="#fff" />
      <View>
        <T size={10} color="#ddd" style={{ lineHeight: 13 }}>{apple ? 'تنزيل من' : 'احصل عليه من'}</T>
        <T size={17} weight="700" color="#fff" style={{ lineHeight: 21 }}>{apple ? 'App Store' : 'Google Play'}</T>
      </View>
    </Pressable>
  );
}

export function Logo({ light = false, size = 1 }) {
  if (!light) {
    return <Image source={require('../assets/logo.png')} style={{ width: 122 * size, height: 56 * size }} resizeMode="contain" accessibilityLabel="شفلي SHFLY" />;
  }
  return (
    <View style={{ alignItems: 'center' }}>
      <T size={34 * size} weight="800" color={colors.cream} style={{ lineHeight: 40 * size }}>شفلي</T>
      <T size={15 * size} weight="700" color={colors.cream} style={{ letterSpacing: 5, lineHeight: 18 * size }}>SHFLY</T>
    </View>
  );
}

export function SectionTitle({ title, subtitle, align = 'auto', light }) {
  return (
    <View style={{ gap: 12, alignItems: align === 'center' ? 'center' : 'stretch' }}>
      <T size={34} weight="800" color={light ? '#fff' : colors.brown} style={{ lineHeight: 50, textAlign: align === 'center' ? 'center' : undefined }}>{title}</T>
      <View style={{ width: 56, height: 4, borderRadius: 4, backgroundColor: colors.orange, alignSelf: align === 'center' ? 'center' : 'flex-start' }} />
      {subtitle ? <T size={16} color={light ? '#f3e6e0' : colors.muted} style={{ textAlign: align === 'center' ? 'center' : undefined }}>{subtitle}</T> : null}
    </View>
  );
}

const s = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 26,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#111',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#111',
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 150,
  },
});
