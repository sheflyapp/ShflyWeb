import React, { useRef, useState, useCallback } from 'react';
import { ScrollView, View, Platform, I18nManager } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/theme';
import { Header, Hero, Services, HowItWorks, ProviderBanner, TestimonialsFaq, Footer } from './src/sections';

// اتجاه الصفحة من اليمين لليسار + خط Tajawal (بديل قريب من Graphik Arabic)
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  document.documentElement.setAttribute('dir', 'rtl');
  document.documentElement.setAttribute('lang', 'ar');
  document.title = 'شفلي | كل الخدمات اللي تحتاجها في مكان واحد';
  if (!document.getElementById('tajawal-font')) {
    const pre = document.createElement('link');
    pre.rel = 'preconnect';
    pre.href = 'https://fonts.gstatic.com';
    pre.crossOrigin = 'anonymous';
    document.head.appendChild(pre);
    const link = document.createElement('link');
    link.id = 'tajawal-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap';
    document.head.appendChild(link);
  }
  const meta = document.createElement('meta');
  meta.name = 'description';
  meta.content = 'شفلي — تواصل بسهولة مع مقدمي الخدمات الموثوقين وانجز احتياجاتك بسرعة وأمان.';
  document.head.appendChild(meta);
} else {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
}

export default function App() {
  const scrollRef = useRef(null);
  const positions = useRef({});
  const [active, setActive] = useState('home');

  const register = (key) => (e) => {
    positions.current[key] = e.nativeEvent.layout.y;
  };

  const onNav = useCallback((key) => {
    const y = positions.current[key] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 10), animated: true });
    setActive(key);
  }, []);

  const onScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y + 140;
    const entries = Object.entries(positions.current).filter(([k]) => k !== 'download').sort((a, b) => a[1] - b[1]);
    let current = 'home';
    for (const [k, pos] of entries) if (y >= pos) current = k;
    if (current !== active) setActive(current);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.page }}>
      <StatusBar style="dark" />
      <Header onNav={onNav} active={active} />
      <ScrollView ref={scrollRef} onScroll={onScroll} scrollEventThrottle={64} style={{ flex: 1 }}>
        <View onLayout={register('home')}><Hero /></View>
        <View onLayout={register('services')}><Services onNav={onNav} /></View>
        <View onLayout={register('how')}><HowItWorks onNav={onNav} /></View>
        <View onLayout={register('providers')}><ProviderBanner onNav={onNav} /></View>
        <View onLayout={register('faq')}><TestimonialsFaq /></View>
        <View onLayout={register('download')}><Footer onNav={onNav} /></View>
      </ScrollView>
    </View>
  );
}
