# HDP Map Engine Pro 🚢

**Hormozgan Driver Pro — Bandar Abbas Edition**

نقشه هوشمند بندرعباس با ۹٬۷۱۴ مکان واقعی از OpenStreetMap (بیمارستان، مدرسه، بازار، اداره، حمل‌ونقل و ...).

> این یک مخزن (ریپوی) مستقل و جداگانه است — بخشی از پروژهٔ اصلی [hermezgan-intelligent](https://github.com/mahdihadari59-lgtm/hermezgan-intelligent) نیست، ولی به‌عنوان لایهٔ نقشهٔ مکمل آن پروژه توسعه داده می‌شود.

## 🚀 Quick Start
```bash
npm run setup   # نصب همه وابستگی‌ها
npm run seed    # پر کردن دیتابیس
npm run dev     # اجرای همزمان بک‌اند و فرانت
Structure
backend/ — Express + JSON-file DB API (app.js / routes/places.js)
frontend/ — React 18 + Vite + Leaflet (src/pages/MapPage.jsx)
data/bandar_abbas_pois.json — ۹٬۷۱۴ POI واقعی هرمزگان (education, markets, offices, healthcare, transport)
📊 دسته‌بندی‌ها
۱۵۰ دستهٔ مختلف مکان، با نگاشت فارسی کامل در backend/data.js.

## 🧪 Tests
[![Test & Build](https://github.com/mahdihadari59-lgtm/hdp-map-engine-pro/actions/workflows/test.yml/badge.svg)](https://github.com/mahdihadari59-lgtm/hdp-map-engine-pro/actions/workflows/test.yml)
