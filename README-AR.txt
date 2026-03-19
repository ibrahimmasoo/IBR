ملف الداشبورد فقط

ارفع هذه الملفات فقط إلى نفس مستوى index.html داخل مشروعك:
- admin.html
- admin.css
- admin.js
- supabase-config.js
- مجلد sql (اختياري لو هتشغل SQL)

الخطوات:
1) ارفع admin.html و admin.css و admin.js و supabase-config.js
2) افتح Supabase > SQL Editor
3) شغل الملف الموجود داخل sql/supabase_schema.sql
4) من Supabase Authentication أنشئ مستخدم Admin
5) افتح admin.html وسجل دخول

مهم:
- هذا الملف لا يغير index.html
- لو عايز تضيف رابط Dashboard في الموقع أضفه يدويًا فقط
- استخدم Project URL و Publishable Key الموجودين داخل supabase-config.js
