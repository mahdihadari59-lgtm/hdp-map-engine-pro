const fs = require('fs');
const path = require('path');
const raw = fs.readFileSync(path.join(__dirname, '../data/bandar_abbas_pois.json'), 'utf8');
const data = JSON.parse(raw);
const places = data.results;

const CAT_NAMES = {
  bank: 'بانک', cafe: 'کافه', fuel: 'جایگاه سوخت', hospital: 'بیمارستان',
  pharmacy: 'داروخانه', restaurant: 'رستوران', school: 'مدرسه', police: 'پلیس',
  atm: 'خودپرداز', park: 'پارک', parking: 'پارکینگ', market: 'بازار',
  hotel: 'هتل', mosque: 'مسجد', bus_station: 'پایانه اتوبوس',

  office: 'اداره', transport: 'حمل‌ونقل', clinic: 'کلینیک',
  convenience: 'فروشگاه محلی', supermarket: 'سوپرمارکت', government: 'ادارهٔ دولتی',
  yes: 'فروشگاه', bakery: 'نانوایی', car_repair: 'تعمیرگاه خودرو',
  company: 'شرکت', car_parts: 'لوازم یدکی خودرو', clothes: 'پوشاک',
  hairdresser: 'آرایشگاه', greengrocer: 'میوه و سبزی', estate_agent: 'مشاور املاک',
  doctors: 'مطب پزشک', insurance: 'بیمه', beauty: 'سالن زیبایی',
  dentist: 'دندانپزشکی', florist: 'گل‌فروشی', pastry: 'شیرینی‌فروشی',
  mobile_phone: 'موبایل‌فروشی', educational_institution: 'مؤسسه آموزشی',
  car: 'نمایشگاه خودرو', hardware: 'ابزارفروشی', butcher: 'قصابی',
  electrical: 'لوازم برقی', marketplace: 'بازارچه', travel_agency: 'آژانس مسافرتی',
  tyres: 'لاستیک‌فروشی', seafood: 'غذای دریایی', stationery: 'لوازم‌التحریر',
  mall: 'مرکز خرید', appliance: 'لوازم خانگی', university: 'دانشگاه',
  department_store: 'فروشگاه بزرگ', furniture: 'مبلمان', library: 'کتابخانه',
  herbalist: 'عطاری', ticket: 'فروش بلیت', shoes: 'کفش‌فروشی', sports: 'ورزشی',
  bicycle: 'دوچرخه‌فروشی', electronics: 'لوازم الکترونیکی', cosmetics: 'لوازم آرایشی',
  jewelry: 'طلافروشی', wholesale: 'عمده‌فروشی', trade: 'بازرگانی',
  houseware: 'لوازم منزل', paint: 'رنگ‌فروشی', copyshop: 'کپی و تکثیر',
  interior_decoration: 'دکوراسیون داخلی', computer: 'کامپیوتر',
  variety_store: 'فروشگاه متنوع', gas: 'گاز مایع', dry_cleaning: 'خشکشویی',
  chemist: 'داروخانه', coffee: 'قهوه‌فروشی', telecommunication: 'مخابرات',
  lawyer: 'وکالت', notary: 'دفتر اسناد رسمی', kitchen: 'کابینت‌سازی',
  motorcycle_repair: 'تعمیرگاه موتور', motorcycle: 'نمایشگاه موتور',
  doors: 'در و پنجره', repair: 'تعمیرگاه', fabric: 'پارچه‌فروشی',
  kiosk: 'کیوسک', tailor: 'خیاطی', agrarian: 'ادوات کشاورزی',
  nuts: 'خشکبار', video_games: 'بازی رایانه‌ای', optician: 'عینک‌فروشی',
  tobacco: 'سیگارفروشی', sewing: 'خیاطی', moving_company: 'باربری',
  advertising_agency: 'آژانس تبلیغاتی', general: 'فروشگاه عمومی',
  books: 'کتاب‌فروشی', gift: 'هدیه‌فروشی', medical_supply: 'تجهیزات پزشکی',
  curtain: 'پرده‌فروشی', religion: 'مذهبی', architect: 'دفتر معماری',
  kindergarten: 'مهدکودک', college: 'آموزشکده', laundry: 'لباسشویی',
  photo: 'عکاسی', rice: 'برنج‌فروشی', dairy: 'لبنیات', confectionery: 'شیرینی‌فروشی',
  bed: 'تختخواب‌فروشی', water: 'آب‌فروشی', farm: 'کشاورزی', toys: 'اسباب‌بازی',
  party: 'لوازم جشن', security: 'حفاظتی', pet: 'حیوانات خانگی',
  storage_rental: 'اجارهٔ انبار', second_hand: 'دست‌دوم', musical_instrument: 'آلات موسیقی',
  carpet: 'فرش‌فروشی', hifi: 'صوتی‌تصویری', fashion_accessories: 'اکسسوری',
  fishing: 'ماهیگیری', massage: 'ماساژ', lighting: 'روشنایی', boat: 'قایق',
  logistics: 'لجستیک', charity: 'خیریه', outdoor: 'لوازم فضای باز',
  locksmith: 'کلیدسازی', spices: 'ادویه‌فروشی', art: 'هنری',
  bathroom_furnishing: 'لوازم حمام', bag: 'کیف‌فروشی', watches: 'ساعت‌فروشی',
  hvac: 'تهویه مطبوع', frame: 'قاب‌سازی', tea: 'چای‌فروشی',
  beverages: 'نوشیدنی', wine: 'مشروبات', pawnbroker: 'رهنی',
  deli: 'خواربارفروشی', outpost: 'پیک', hookah: 'قلیان‌فروشی',
  antiques: 'عتیقه‌فروشی', tool_hire: 'اجارهٔ ابزار', grocery: 'خواربارفروشی',
  perfumery: 'عطرفروشی', tiles: 'کاشی و سرامیک', flowers: 'گل‌فروشی',
  fruit: 'میوه‌فروشی', therapist: 'درمانگر', ngo: 'سازمان مردم‌نهاد',
  association: 'انجمن', water_utility: 'ادارهٔ آب', diplomatic: 'دیپلماتیک',
  financial: 'مالی', guide: 'راهنمای گردشگری', financial_advisor: 'مشاور مالی',
};

function getPlaces(cat) {
  if (!cat || cat === 'all') return places;
  return places.filter(p => p.cat === cat);
}

function getPlaceById(id) {
  return places.find(p => p.id === id);
}

function getStats() {
  const cats = {};
  places.forEach(p => { cats[p.cat] = (cats[p.cat] || 0) + 1; });
  return {
    total: places.length,
    categories: Object.entries(cats).map(([cat, count]) => ({
      cat, count, name: CAT_NAMES[cat] || cat
    })).sort((a, b) => b.count - a.count)
  };
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function getNearby(lat, lon, radius, cat) {
  const list = getPlaces(cat);
  return list
    .map(p => ({ ...p, distance: Math.round(haversine(lat, lon, p.lat, p.lon)) }))
    .filter(p => p.distance <= radius)
    .sort((a, b) => a.distance - b.distance);
}

module.exports = { places, getPlaces, getPlaceById, getStats, getNearby, CAT_NAMES };
