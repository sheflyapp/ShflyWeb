import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Linking, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, shadow } from './theme';
import { T, Container, Button, StoreBadge, Logo, SectionTitle, useLayout } from './ui';
import { navLinks, services, steps, testimonials, faqs, STORE_LINKS } from './data';

/* ───────── Header ───────── */
export function Header({ onNav, active }) {
  const { isDesktop } = useLayout();
  const [open, setOpen] = useState(false);
  const go = (k) => { setOpen(false); onNav(k); };
  return (
    <View style={st.header}>
      <Container style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}>
        <Pressable onPress={() => go('home')}><Logo /></Pressable>
        {isDesktop ? (
          <View style={{ flexDirection: 'row', gap: 34 }}>
            {navLinks.map((l) => (
              <Pressable key={l.key} onPress={() => go(l.key)} style={({ hovered }) => [st.navItem, (active === l.key || hovered) && st.navActive]}>
                <T size={15} weight={active === l.key ? '700' : '500'} color={active === l.key ? colors.orange : colors.text}>{l.label}</T>
              </Pressable>
            ))}
          </View>
        ) : null}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Button small label="حمّل التطبيق" icon="download-outline" onPress={() => go('download')} />
          {!isDesktop ? (
            <Pressable onPress={() => setOpen((o) => !o)} style={st.menuBtn} accessibilityLabel="القائمة">
              <Ionicons name={open ? 'close' : 'menu'} size={24} color={colors.brown} />
            </Pressable>
          ) : null}
        </View>
      </Container>
      {open && !isDesktop ? (
        <Container style={{ paddingBottom: 14, gap: 4 }}>
          {navLinks.map((l) => (
            <Pressable key={l.key} onPress={() => go(l.key)} style={st.mobileLink}>
              <T size={16} weight="600" color={active === l.key ? colors.orange : colors.text}>{l.label}</T>
            </Pressable>
          ))}
        </Container>
      ) : null}
    </View>
  );
}

/* ───────── Hero ───────── */
export function Hero() {
  const { isDesktop, isTablet } = useLayout();
  return (
    <View style={{ overflow: 'hidden' }}>
      {/* موجات برتقالية زخرفية */}
      <View style={[st.wave, { bottom: isDesktop ? 40 : 10 }]} />
      <View style={[st.wave2, { bottom: isDesktop ? 22 : -6 }]} />
      <Container style={{ flexDirection: isDesktop ? 'row' : 'column', alignItems: 'center', gap: isDesktop ? 24 : 28, paddingTop: isDesktop ? 40 : 24, paddingBottom: isDesktop ? 70 : 50 }}>
        <View style={{ flex: isDesktop ? 1 : undefined, gap: 18, width: isDesktop ? undefined : '100%' }}>
          <T size={isTablet ? 72 : 54} weight="800" color={colors.orange} style={{ lineHeight: isTablet ? 96 : 74 }}>شفلي</T>
          <T size={isTablet ? 44 : 32} weight="800" color={colors.brown} style={{ lineHeight: isTablet ? 66 : 48 }}>
            كل الخدمات اللي تحتاجها{'\n'}في مكان واحد
          </T>
          <T size={isTablet ? 19 : 17} color={colors.text} style={{ maxWidth: 480, lineHeight: 32 }}>
            تواصل بسهولة مع مقدمي الخدمات الموثوقين وانجز احتياجاتك بسرعة وأمان.
          </T>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
            <StoreBadge store="apple" />
            <StoreBadge store="google" />
          </View>
        </View>
        <View style={{ flex: isDesktop ? 1.05 : undefined, width: '100%', maxWidth: 620 }}>
          <Image source={require('../assets/hero.png')} style={{ width: '100%', aspectRatio: 580 / 486, borderRadius: 28 }} resizeMode="cover" accessibilityLabel="الهدهد وتطبيق شفلي" />
        </View>
      </Container>
    </View>
  );
}

/* ───────── Services ───────── */
export function Services({ onNav }) {
  const { isDesktop, isTablet } = useLayout();
  return (
    <Container style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 36, alignItems: isDesktop ? 'center' : 'stretch', paddingVertical: 40 }}>
      <View style={{ width: isDesktop ? 280 : '100%', gap: 18 }}>
        <SectionTitle title={'خدمات متنوعة\nتلبي احتياجاتك'} subtitle="من الخدمات المنزلية إلى الخدمات المهنية، كل ما تحتاجه في تطبيق واحد." />
        <Button variant="outline" small label="استكشف الخدمات" onPress={() => onNav('download')} />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 18 }}>
        {services.map((sv) => (
          <Pressable key={sv.title} style={({ hovered }) => [st.serviceCard, { flexBasis: isDesktop ? '22%' : isTablet ? '46%' : '100%' }, hovered && st.cardHover]}>
            <View style={st.iconCircle}>
              <MaterialCommunityIcons name={sv.icon} size={40} color={colors.orange} />
            </View>
            <T size={19} weight="700" color={colors.brown} style={{ textAlign: 'center' }}>{sv.title}</T>
            <T size={14} color={colors.muted} style={{ textAlign: 'center', lineHeight: 22 }}>{sv.desc}</T>
          </Pressable>
        ))}
      </View>
    </Container>
  );
}

/* ───────── How it works ───────── */
export function HowItWorks({ onNav }) {
  const { isDesktop, isTablet } = useLayout();
  return (
    <View style={{ backgroundColor: colors.orangeTint }}>
      <Container style={{ flexDirection: isDesktop ? 'row' : 'column-reverse', gap: 40, alignItems: 'center', paddingVertical: 60 }}>
        <View style={{ flex: isDesktop ? 1.4 : undefined, width: isDesktop ? undefined : '100%', flexDirection: isTablet ? 'row' : 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          {steps.map((sp, i) => (
            <React.Fragment key={sp.n}>
              <View style={[st.stepCard, { width: isTablet ? undefined : '100%', flex: isTablet ? 1 : undefined }]}>
                <View style={st.stepNum}><T size={15} weight="800" color="#fff" style={{ lineHeight: 18 }}>{sp.n}</T></View>
                <MaterialCommunityIcons name={sp.icon} size={50} color={sp.n === 3 ? colors.brown : colors.brown} />
                <T size={16} weight="600" color={colors.brown} style={{ textAlign: 'center', lineHeight: 26 }}>{sp.title}</T>
              </View>
              {i < steps.length - 1 ? (
                <Ionicons name={isTablet ? 'arrow-back' : 'arrow-down'} size={24} color={colors.brown} />
              ) : null}
            </React.Fragment>
          ))}
        </View>
        <View style={{ flex: isDesktop ? 1 : undefined, width: isDesktop ? undefined : '100%', gap: 16 }}>
          <SectionTitle title="كيف يعمل شفلي؟" subtitle="بخطوات بسيطة، تحصل على الخدمة التي تحتاجها بكل سهولة." />
          <Button variant="outline" small label="اعرف المزيد" onPress={() => onNav('faq')} />
        </View>
      </Container>
    </View>
  );
}

/* ───────── Provider banner ───────── */
export function ProviderBanner({ onNav }) {
  const { isDesktop, isTablet } = useLayout();
  return (
    <Container style={{ paddingVertical: 50 }}>
      <View style={[st.banner, { flexDirection: isDesktop ? 'row' : 'column', paddingTop: isDesktop ? 0 : 36 }]}>
        <View style={st.bannerGlow} />
        <MaterialCommunityIcons name="storefront-outline" size={isTablet ? 110 : 80} color={colors.orange} style={{ alignSelf: 'center' }} />
        <View style={{ flex: isDesktop ? 1 : undefined, gap: 10, paddingHorizontal: 12, alignItems: isDesktop ? 'stretch' : 'center' }}>
          <T size={isTablet ? 32 : 26} weight="800" color="#fff" style={{ textAlign: isDesktop ? undefined : 'center' }}>انضم إلى مقدمي الخدمات</T>
          <T size={17} color="#F3E3DA" style={{ textAlign: isDesktop ? undefined : 'center' }}>وسّع عملك ووصل إلى المزيد من العملاء مع شفلي، وتابع دخلك بسهولة من المحفظة.</T>
        </View>
        <Button label="سجل الآن" onPress={() => onNav('download')} style={{ alignSelf: 'center' }} />
        <Image source={require('../assets/provider.png')} style={{ width: 200, height: 194, alignSelf: 'flex-end' }} resizeMode="cover" accessibilityLabel="مقدم خدمة" />
      </View>
    </Container>
  );
}

/* ───────── Testimonials + FAQ ───────── */
export function TestimonialsFaq() {
  const { isDesktop } = useLayout();
  return (
    <Container style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 40, paddingVertical: 30, paddingBottom: 70 }}>
      <View style={{ flex: 1, gap: 18 }}>
        <T size={26} weight="800" color={colors.brown}>الأسئلة الشائعة</T>
        {faqs.map((f) => <FaqItem key={f.q} {...f} />)}
      </View>
      <View style={{ flex: 1, gap: 18 }}>
        <T size={26} weight="800" color={colors.brown}>ماذا يقول عملاؤنا؟</T>
        <Testimonials />
      </View>
    </Container>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <Pressable onPress={() => setOpen((o) => !o)} style={({ hovered }) => [st.faq, (hovered || open) && { borderColor: colors.orange }]} accessibilityRole="button">
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <T size={16} weight="700" color={colors.text} style={{ flex: 1 }}>{q}</T>
        <Ionicons name={open ? 'remove' : 'add'} size={22} color={open ? colors.orange : colors.text} />
      </View>
      {open ? <T size={15} color={colors.muted} style={{ marginTop: 10, lineHeight: 26 }}>{a}</T> : null}
    </Pressable>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[i];
  return (
    <View style={{ gap: 16 }}>
      <View style={st.quoteCard}>
        <T size={56} weight="800" color={colors.orange} style={{ lineHeight: 56, height: 40 }}>”</T>
        <T size={18} color={colors.text} style={{ lineHeight: 32, minHeight: 64 }}>{t.text}</T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 }}>
          <View style={st.avatar}><T size={20} weight="800" color="#fff" style={{ lineHeight: 24 }}>{t.initials}</T></View>
          <View>
            <T size={16} weight="700" color={colors.brown}>{t.name}</T>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              {[0, 1, 2, 3, 4].map((k) => <Ionicons key={k} name="star" size={15} color={colors.star} />)}
            </View>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
        {testimonials.map((_, k) => (
          <Pressable key={k} onPress={() => setI(k)} accessibilityLabel={`رأي ${k + 1}`}
            style={{ width: k === i ? 22 : 8, height: 8, borderRadius: 8, backgroundColor: k === i ? colors.orange : '#E8CDBE' }} />
        ))}
      </View>
    </View>
  );
}

/* ───────── Footer ───────── */
export function Footer({ onNav }) {
  const { isDesktop } = useLayout();
  const socials = [
    { icon: 'logo-linkedin', url: 'https://linkedin.com' },
    { icon: 'logo-youtube', url: 'https://youtube.com' },
    { icon: 'logo-instagram', url: 'https://instagram.com' },
    { icon: 'logo-x', url: 'https://x.com' },
  ];
  return (
    <View style={{ backgroundColor: colors.brown }}>
      <Container style={{ paddingVertical: 48, gap: 32 }}>
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-between', gap: 28 }}>
          <View style={{ alignItems: 'center', gap: 16 }}>
            <Logo light />
            <View style={{ flexDirection: 'row', gap: 16 }}>
              {socials.map((so) => (
                <Pressable key={so.icon} onPress={() => Linking.openURL(so.url)} style={({ hovered }) => [st.social, hovered && { backgroundColor: colors.orange }]}>
                  <Ionicons name={so.icon} size={18} color="#fff" />
                </Pressable>
              ))}
            </View>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <T size={28} weight="800" color="#fff" style={{ textAlign: 'center' }}>حمّل تطبيق شفلي الآن</T>
            <T size={16} color="#E9D9D2" style={{ textAlign: 'center' }}>واحصل على أفضل الخدمات في أي وقت وأي مكان</T>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <StoreBadge store="apple" dark onPress={() => Linking.openURL(STORE_LINKS.appStore)} />
            <StoreBadge store="google" dark onPress={() => Linking.openURL(STORE_LINKS.googlePlay)} />
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: 'rgba(252,107,58,0.35)' }} />
        <View style={{ flexDirection: isDesktop ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 22 }}>
            {navLinks.map((l) => (
              <Pressable key={l.key} onPress={() => onNav(l.key)}>
                {({ hovered }) => <T size={14} color={hovered ? colors.orange : '#E9D9D2'}>{l.label}</T>}
              </Pressable>
            ))}
            <Pressable onPress={() => Linking.openURL('mailto:info@shfly.com')}>
              {({ hovered }) => <T size={14} color={hovered ? colors.orange : '#E9D9D2'}>تواصل معنا</T>}
            </Pressable>
          </View>
          <T size={13} color="#BFA9A2">© {new Date().getFullYear()} شفلي. جميع الحقوق محفوظة.</T>
        </View>
      </Container>
    </View>
  );
}

const st = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(255,248,241,0.94)',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    zIndex: 10,
  },
  navItem: { paddingVertical: 6, borderBottomWidth: 2, borderBottomColor: 'transparent' },
  navActive: { borderBottomColor: colors.orange },
  menuBtn: { padding: 8, borderRadius: 10, backgroundColor: colors.orangeTint },
  mobileLink: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  wave: {
    position: 'absolute', left: -200, right: -200, height: 120,
    backgroundColor: colors.orange, opacity: 0.9, borderRadius: 400,
    transform: [{ rotate: '-4deg' }],
  },
  wave2: {
    position: 'absolute', left: -200, right: -200, height: 140,
    backgroundColor: colors.page, borderRadius: 400,
    transform: [{ rotate: '-3deg' }],
  },
  serviceCard: {
    flexGrow: 1, backgroundColor: colors.card, borderRadius: 22, padding: 24, alignItems: 'center', gap: 10,
    borderWidth: 1, borderColor: colors.border, ...shadow,
  },
  cardHover: { transform: [{ translateY: -6 }], borderColor: colors.orange },
  iconCircle: { width: 76, height: 76, borderRadius: 38, backgroundColor: colors.orangeTint, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  stepCard: {
    backgroundColor: colors.card, borderRadius: 22, paddingTop: 32, paddingBottom: 22, paddingHorizontal: 16,
    alignItems: 'center', gap: 12, borderWidth: 1, borderColor: colors.border, minWidth: 150, ...shadow,
  },
  stepNum: {
    position: 'absolute', top: -16, width: 34, height: 34, borderRadius: 17, backgroundColor: colors.orange,
    alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.orangeTint,
  },
  banner: {
    backgroundColor: colors.brown, borderRadius: 26, overflow: 'hidden', alignItems: 'center',
    gap: 24, paddingHorizontal: 36, ...shadow,
  },
  bannerGlow: {
    position: 'absolute', width: 600, height: 600, borderRadius: 300, backgroundColor: colors.orange, opacity: 0.12,
    top: -380, right: -120,
  },
  faq: {
    backgroundColor: colors.card, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 20,
    borderWidth: 1, borderColor: colors.border,
  },
  quoteCard: { backgroundColor: colors.card, borderRadius: 22, padding: 28, borderWidth: 1, borderColor: colors.border, ...shadow },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  social: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
});
