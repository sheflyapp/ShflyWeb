# شفلي — موقع التطبيق (React Native / Expo Web)

صفحة هبوط لتطبيق **شفلي SHFLY** مبنية بـ React Native (Expo + React Native Web)، تشتغل على الويب وجاهزة للرفع على Vercel.

## التشغيل محلياً
```bash
npm install
npm run web        # يفتح الموقع على http://localhost:8081
```

## البناء
```bash
npm run build      # يطلع الموقع الجاهز في مجلد dist/
```

## الرفع على Vercel
**الطريقة 1 — من GitHub (الأسهل):**
1. ارفع المجلد كمستودع على GitHub.
2. في Vercel: Add New → Project → اختر المستودع.
3. الإعدادات تُقرأ تلقائياً من `vercel.json` (Build: `npx expo export -p web`، Output: `dist`). اضغط Deploy.

**الطريقة 2 — من الطرفية:**
```bash
npm i -g vercel
vercel          # للمعاينة
vercel --prod   # للنشر النهائي
```

## التعديل
| الملف | المحتوى |
|---|---|
| `src/data.js` | النصوص: الخدمات، الخطوات، آراء العملاء، الأسئلة، **روابط المتاجر** |
| `src/theme.js` | ألوان الهوية (Smashed Pumpkin `#FC6B3A`، Temptress `#3E1F21`) |
| `src/sections.js` | أقسام الصفحة |
| `assets/` | الصور والشعار والأيقونة |

> روابط App Store و Google Play حالياً عامة — حدّثها في `STORE_LINKS` داخل `src/data.js` بعد نشر التطبيق.
