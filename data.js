// Large data sets are now loaded dynamically in App.jsx to optimize bundle size.
export const EXAM_DATE = new Date('2026-04-30T08:30:00+05:00');

export const ELECTRICAL_INTERVIEW = [
  { id:'ei1', category:'Technical', questionEn:'A 3-phase induction motor fails to start. Walk me through your troubleshooting steps.', questionUr:'3-فیز انڈکشن موٹر سٹارٹ نہیں ہو رہی۔ آپ کیا کریں گے؟', starEn: 'Action: (1) Check supply voltage at MCC. (2) Check contactor coil. (3) LOTO applied. (4) Replaced contactor, tested with Megger. Result: Restored safely.', starUr: 'پہلے سپلائی چیک کریں گے، پھر کنٹیکٹر اور پھر میگر کے ذریعے ٹیسٹنگ کریں گے۔' },
  { id:'ei2', category:'Technical', questionEn:'Explain the difference between a fuse and a circuit breaker.', questionUr:'فیوز اور سرکٹ بریکر میں کیا فرق ہے؟', starEn: 'A fuse is a one-time protection device. A circuit breaker is reusable and trips on overcurrent.', starUr: 'فیوز ایک بار جلنے کے بعد بیکار ہو جاتا ہے جبکہ سرکٹ بریکر دوبارہ استعمال ہو سکتا ہے۔' },
  { id:'ei3', category:'Technical', questionEn:'What is the purpose of earthing/grounding?', questionUr:'ارتھنگ یا گراؤنڈنگ کا کیا مقصد ہے؟', starEn: 'Earthing provides a low-resistance path for fault currents, preventing dangerous voltage buildup.', starUr: 'ارتھنگ فالٹ کرنٹ کو زمین میں بھیجنے کا راستہ فراہم کرتی ہے تاکہ جھٹکے سے بچا جا سکے۔' },
];

export const CIVIL_INTERVIEW = [
  { id:'ci1', category:'Technical', questionEn:'You observe cracks in a newly built RCC column. Response?', questionUr:'نئے بنے ہوئے کالم میں دراڑیں پڑ جائیں تو کیا کریں گے؟', starEn: 'Action: Stop all loading, measure cracks, inform engineer, check curing logs. Result: Prevented structural risk.', starUr: 'لوڈ بند کروا دیں گے، دراڑوں کی پیمائش کریں گے اور انجینئر کو رپورٹ کریں گے۔' },
  { id:'ci2', category:'Technical', questionEn:'Difference between simply supported and cantilever beam?', questionUr:'سمپلی سپورٹڈ اور کینٹی لیور بیم میں کیا فرق ہے؟', starEn: 'Simply supported rests on two supports. Cantilever is fixed at one end and free at the other.', starUr: 'سمپلی سپورٹڈ بیم دونوں طرف سے ٹکا ہوتا ہے، جبکہ کینٹی لیور ایک طرف سے فکس اور دوسری طرف سے آزاد ہوتا ہے۔' },
  { id:'ci3', category:'Technical', questionEn:'Explain the slump test procedure.', questionUr:'سلمپ ٹیسٹ کا طریقہ کیا ہے؟', starEn: 'Fill cone in 3 layers, 25 tamping strokes each, lift cone, measure difference.', starUr: 'کون کو 3 تہوں میں بھریں، 25 بار دبائیں اور کون اٹھا کر کنکریٹ کے گرنے کا ناپ لیں۔' },
];

export const CHECKLIST_ITEMS = {
  general: [
    { id:'ch1', textEn:'PAEC Knowledge: Chairman, PNRA, 40,000 MW target', textUr:'پی اے ای سی معلومات: چیئرمین، پی این آر اے، اہداف' },
    { id:'ch2', textEn:'Islamic Studies: Quranic facts, Prophets, History', textUr:'اسلامیات: قرآنی معلومات، انبیاء کرام، تاریخ' },
    { id:'ch3', textEn:'Pak Studies: Resolutions, Constitution, Geography', textUr:'مطالعہ پاکستان: قراردادیں، آئین، جغرافیہ' },
  ],
  electrical: [
    { id:'ch4', textEn:'Circuits: Ohm\'s Law, KVL/KCL, Power formulas', textUr:'سرکٹس: اوہم کا قانون، پاور کے فارمولے' },
    { id:'ch5', textEn:'Machines: Induction motor slip, Transformers', textUr:'مشینز: انڈکشن موٹر، ٹرانسفارمرز' },
    { id:'ch6', textEn:'Safety: ALARA, LOTO, Earthing', textUr:'حفاظتی تدابیر: الارم، لاٹو، ارتھنگ' },
  ],
  civil: [
    { id:'ch7', textEn:'Materials: OPC, Brick dimensions, Curing', textUr:'مٹیریل: او پی سی سیمنٹ، اینٹوں کی پیمائش' },
    { id:'ch8', textEn:'Surveying: RL, HI method, Contour lines', textUr:'سروے: ریڈیوسڈ لیول، انسٹرومنٹ ہائٹ، کنٹورز' },
    { id:'ch9', textEn:'Structures: SF/BM diagrams, Slump test', textUr:'اسٹرکچرز: شیئر فورس اور بینڈنگ مومنٹ، سلمپ ٹیسٹ' },
  ],
};
