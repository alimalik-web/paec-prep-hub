const fs = require('fs');

const diffs = ['easy', 'medium', 'hard'];
const randDiff = () => diffs[Math.floor(Math.random() * diffs.length)];
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

// ==========================================
// ELECTRICAL GENERATOR (Target: 400 Qs)
// ==========================================
const elecTemplates = [
  {
    topic: 'Circuits & Power',
    gen: () => {
      const v = [12, 24, 36, 48, 60, 120, 220, 240, 400][Math.floor(Math.random() * 9)];
      const r = [2, 3, 4, 5, 6, 8, 10, 12, 20][Math.floor(Math.random() * 9)];
      const i = (v / r).toFixed(2);
      return {
        questionEn: `If Voltage is ${v}V and Resistance is ${r}Ω, what is the Current?`,
        questionUr: `اگر وولٹیج ${v}V اور مزاحمت ${r}Ω ہو تو کرنٹ کیا ہوگا؟`,
        optionsEn: [`${i}A`, `${(v * r).toFixed(2)}A`, `${(v + r).toFixed(2)}A`, `${(r / v).toFixed(2)}A`],
        optionsUr: [`${i}A`, `${(v * r).toFixed(2)}A`, `${(v + r).toFixed(2)}A`, `${(r / v).toFixed(2)}A`],
        correct: 0,
        explanationEn: `According to Ohm's Law: I = V/R = ${v}/${r} = ${i}A.`,
        explanationUr: `اوہم کے قانون کے مطابق: I = V/R = ${v}/${r} = ${i}A.`
      };
    }
  },
  {
    topic: 'Circuits & Power',
    gen: () => {
      const i = [2, 3, 4, 5, 10, 15, 20][Math.floor(Math.random() * 7)];
      const r = [5, 10, 15, 20, 50][Math.floor(Math.random() * 5)];
      const v = i * r;
      return {
        questionEn: `Find the Voltage drop across a ${r}Ω resistor carrying ${i}A current.`,
        questionUr: `${r}Ω مزاحمت والے ریزسٹر میں سے ${i}A کرنٹ گزرنے پر وولٹیج ڈراپ کیا ہوگا؟`,
        optionsEn: [`${v}V`, `${(i/r).toFixed(2)}V`, `${(r/i).toFixed(2)}V`, `${v+10}V`],
        optionsUr: [`${v}V`, `${(i/r).toFixed(2)}V`, `${(r/i).toFixed(2)}V`, `${v+10}V`],
        correct: 0,
        explanationEn: `V = I × R = ${i} × ${r} = ${v}V.`,
        explanationUr: `V = I × R = ${i} × ${r} = ${v}V.`
      };
    }
  },
  {
    topic: 'Motors & Machines',
    gen: () => {
      const f = [50, 60][Math.floor(Math.random() * 2)];
      const p = [2, 4, 6, 8, 10][Math.floor(Math.random() * 5)];
      const ns = (120 * f) / p;
      return {
        questionEn: `What is the synchronous speed of a ${p}-pole induction motor running at ${f}Hz?`,
        questionUr: `${p} پول والی انڈکشن موٹر جو ${f}Hz پر چل رہی ہے، اس کی سنکرونس سپیڈ کیا ہوگی؟`,
        optionsEn: [`${ns} RPM`, `${ns / 2} RPM`, `${ns * 2} RPM`, `1500 RPM`],
        optionsUr: [`${ns} RPM`, `${ns / 2} RPM`, `${ns * 2} RPM`, `1500 RPM`],
        correct: 0,
        explanationEn: `Ns = 120f/P = (120 × ${f}) / ${p} = ${ns} RPM.`,
        explanationUr: `Ns = 120f/P = (120 × ${f}) / ${p} = ${ns} RPM.`
      };
    }
  },
  {
    topic: 'Transformers',
    gen: () => {
      const np = [500, 1000, 2000][Math.floor(Math.random() * 3)];
      const ns = [50, 100, 200][Math.floor(Math.random() * 3)];
      const vp = [11000, 22000, 33000][Math.floor(Math.random() * 3)];
      const vs = (vp * ns) / np;
      return {
        questionEn: `A transformer has ${np} primary turns and ${ns} secondary turns. If primary voltage is ${vp}V, find secondary voltage.`,
        questionUr: `ایک ٹرانسفارمر کے پرائمری ٹرنز ${np} اور سیکنڈری ٹرنز ${ns} ہیں۔ اگر پرائمری وولٹیج ${vp}V ہو تو سیکنڈری وولٹیج کیا ہوگا؟`,
        optionsEn: [`${vs}V`, `${vs*2}V`, `${vp}V`, `${vs/2}V`],
        optionsUr: [`${vs}V`, `${vs*2}V`, `${vp}V`, `${vs/2}V`],
        correct: 0,
        explanationEn: `Vs = Vp × (Ns/Np) = ${vp} × (${ns}/${np}) = ${vs}V.`,
        explanationUr: `فارمولہ: Vs = Vp × (Ns/Np) = ${vp} × (${ns}/${np}) = ${vs}V.`
      };
    }
  },
  {
    topic: 'Power Systems',
    gen: () => {
      const kw = [10, 50, 100, 500][Math.floor(Math.random() * 4)];
      const pf = [0.8, 0.85, 0.9, 0.95][Math.floor(Math.random() * 4)];
      const kva = (kw / pf).toFixed(2);
      return {
        questionEn: `Calculate the Apparent Power (kVA) for a ${kw}kW load operating at ${pf} power factor.`,
        questionUr: `${kw}kW لوڈ جو ${pf} پاور فیکٹر پر چل رہا ہو، اس کی Apparent Power (kVA) کیا ہوگی؟`,
        optionsEn: [`${kva} kVA`, `${(kw*pf).toFixed(2)} kVA`, `${kw} kVA`, `${(kw/(pf-0.1)).toFixed(2)} kVA`],
        optionsUr: [`${kva} kVA`, `${(kw*pf).toFixed(2)} kVA`, `${kw} kVA`, `${(kw/(pf-0.1)).toFixed(2)} kVA`],
        correct: 0,
        explanationEn: `kVA = True Power (kW) / Power Factor = ${kw} / ${pf} = ${kva} kVA.`,
        explanationUr: `kVA = کلو واٹ / پاور فیکٹر = ${kw} / ${pf} = ${kva} kVA.`
      };
    }
  }
];

const electricalConcepts = [
  { qEn: 'What is the purpose of a Megger test?', qUr: 'میگر (Megger) ٹیسٹ کا مقصد کیا ہے؟', 
    optsEn: ['Measure insulation resistance', 'Measure current', 'Measure voltage', 'Measure frequency'], 
    optsUr: ['انسولیشن کی مزاحمت ناپنا', 'کرنٹ ناپنا', 'وولٹیج ناپنا', 'فریکوئنسی ناپنا'], 
    ans: 0, expEn: 'Megger uses high DC voltage to measure insulation resistance in MΩ.', expUr: 'یہ ہائی ڈی سی وولٹیج استعمال کر کے انسولیشن کی مزاحمت ناپتا ہے۔' },
  { qEn: 'In an AC circuit, what does a capacitor do to the phase angle?', qUr: 'اے سی سرکٹ میں کپیسٹر فیز اینگل کے ساتھ کیا کرتا ہے؟', 
    optsEn: ['Causes current to lead voltage', 'Causes current to lag voltage', 'Keeps them in phase', 'Blocks AC completely'], 
    optsUr: ['کرنٹ کو وولٹیج سے آگے (lead) کرتا ہے', 'کرنٹ کو وولٹیج سے پیچھے کرتا ہے', 'دونوں کو ان فیز رکھتا ہے', 'اے سی کو مکمل روکتا ہے'], 
    ans: 0, expEn: 'In a purely capacitive circuit, current leads voltage by 90 degrees (ICE).', expUr: 'کپیسٹر والے سرکٹ میں کرنٹ وولٹیج سے 90 ڈگری آگے ہوتا ہے۔' },
  { qEn: 'Which device protects electrical circuits from overcurrent?', qUr: 'کون سا آلہ برقی سرکٹ کو اوور کرنٹ سے بچاتا ہے؟',
    optsEn: ['Circuit Breaker', 'Transformer', 'Capacitor', 'Inductor'],
    optsUr: ['سرکٹ بریکر', 'ٹرانسفارمر', 'کپیسٹر', 'انڈکٹر'],
    ans: 0, expEn: 'Circuit breakers and fuses interrupt flow during overcurrent faults.', expUr: 'سرکٹ بریکر اور فیوز اوور کرنٹ کی صورت میں سرکٹ کو کاٹ دیتے ہیں۔' },
  { qEn: 'What does ALARA stand for in radiation safety?', qUr: 'تابکاری سے بچاؤ میں ALARA کا کیا مطلب ہے؟',
    optsEn: ['As Low As Reasonably Achievable', 'Always Leave Area Rapidly', 'Annual Limit of Absorbed Radiation', 'All Levels Are Regulated'],
    optsUr: ['As Low As Reasonably Achievable', 'Always Leave Area Rapidly', 'Annual Limit of Absorbed Radiation', 'All Levels Are Regulated'],
    ans: 0, expEn: 'ALARA is a safety principle to minimize radiation doses.', expUr: 'یہ تابکاری کے اثرات کو کم سے کم رکھنے کا ایک اصولی طریقہ ہے۔' }
];

let elecFinal = [];
let eId = 1;

// Generate Math variations
for(let i=0; i<300; i++) {
  let tpl = elecTemplates[Math.floor(Math.random() * elecTemplates.length)];
  let q = tpl.gen();
  
  let optionsEn = [...q.optionsEn];
  let optionsUr = [...q.optionsUr];
  let correctOptEn = optionsEn[q.correct];
  let correctOptUr = optionsUr[q.correct];
  
  // shuffle options
  let indices = [0,1,2,3];
  shuffle(indices);
  let newOptsEn = indices.map(idx => optionsEn[idx]);
  let newOptsUr = indices.map(idx => optionsUr[idx]);
  let newCorrect = indices.indexOf(q.correct);

  elecFinal.push({
    id: `e_gen_${eId++}`,
    topic: tpl.topic,
    difficulty: randDiff(),
    questionEn: q.questionEn,
    questionUr: q.questionUr,
    optionsEn: newOptsEn,
    optionsUr: newOptsUr,
    correct: newCorrect,
    explanationEn: q.explanationEn,
    explanationUr: q.explanationUr
  });
}

// Generate Conceptual duplicates (simulating large databank of varying difficulty)
for(let i=0; i<150; i++) {
  let con = electricalConcepts[Math.floor(Math.random() * electricalConcepts.length)];
  
  let indices = [0,1,2,3];
  shuffle(indices);
  let newOptsEn = indices.map(idx => con.optsEn[idx]);
  let newOptsUr = indices.map(idx => con.optsUr[idx]);
  let newCorrect = indices.indexOf(con.ans);

  elecFinal.push({
    id: `e_con_${eId++}`,
    topic: 'General Electrical Concepts',
    difficulty: randDiff(),
    questionEn: con.qEn,
    questionUr: con.qUr,
    optionsEn: newOptsEn,
    optionsUr: newOptsUr,
    correct: newCorrect,
    explanationEn: con.expEn,
    explanationUr: con.expUr
  });
}


// ==========================================
// CIVIL GENERATOR (Target: 400 Qs)
// ==========================================
const civilTemplates = [
  {
    topic: 'Estimation & Costing',
    gen: () => {
      const l = [10, 15, 20, 25, 50][Math.floor(Math.random() * 5)];
      const w = [3, 4, 5, 6][Math.floor(Math.random() * 4)];
      const d = [0.5, 1, 1.5, 2][Math.floor(Math.random() * 4)];
      const vol = (l * w * d).toFixed(1);
      return {
        questionEn: `Calculate the volume of earthwork excavation for a trench ${l}m long, ${w}m wide, and ${d}m deep.`,
        questionUr: `ایک خندق جس کی لمبائی ${l}m، چوڑائی ${w}m اور گہرائی ${d}m ہے، اس کی کھدائی (earthwork) کا حجم کتنا ہوگا؟`,
        optionsEn: [`${vol} m³`, `${(vol*1.5).toFixed(1)} m³`, `${(l*w).toFixed(1)} m³`, `${(vol/2).toFixed(1)} m³`],
        optionsUr: [`${vol} m³`, `${(vol*1.5).toFixed(1)} m³`, `${(l*w).toFixed(1)} m³`, `${(vol/2).toFixed(1)} m³`],
        correct: 0,
        explanationEn: `Volume = Length × Width × Depth = ${l} × ${w} × ${d} = ${vol} cubic meters.`,
        explanationUr: `حجم کا فارمولہ: لمبائی × چوڑائی × گہرائی = ${l} × ${w} × ${d} = ${vol} کیوبک میٹر۔`
      };
    }
  },
  {
    topic: 'Surveying',
    gen: () => {
      const bm = [100, 200, 500, 1000][Math.floor(Math.random() * 4)];
      const bs = (1 + Math.random() * 2).toFixed(2);
      const fs = (1 + Math.random() * 2).toFixed(2);
      const hi = (bm + parseFloat(bs)).toFixed(2);
      const rl = (hi - parseFloat(fs)).toFixed(2);
      return {
        questionEn: `If RL of Benchmark is ${bm}m, Backsight (BS) is ${bs}m, and Foresight (FS) is ${fs}m, what is the new RL?`,
        questionUr: `اگر بینچ مارک کا RL ${bm}m، بیک سائیٹ ${bs}m اور فور سائیٹ ${fs}m ہو، تو نیا RL کیا ہوگا؟`,
        optionsEn: [`${rl}m`, `${hi}m`, `${(bm + parseFloat(fs)).toFixed(2)}m`, `${(parseFloat(rl)+1).toFixed(2)}m`],
        optionsUr: [`${rl}m`, `${hi}m`, `${(bm + parseFloat(fs)).toFixed(2)}m`, `${(parseFloat(rl)+1).toFixed(2)}m`],
        correct: 0,
        explanationEn: `HI = RL + BS = ${bm} + ${bs} = ${hi}m. New RL = HI - FS = ${hi} - ${fs} = ${rl}m.`,
        explanationUr: `پہلے HI نکالیں: RL + BS = ${hi}m۔ پھر نیا RL: HI - FS = ${rl}m۔`
      };
    }
  },
  {
    topic: 'Concrete Technology',
    gen: () => {
      const c = [1, 1.5, 2][Math.floor(Math.random() * 3)];
      const s = c * 2;
      const a = c * 4;
      return {
        questionEn: `In an M15 nominal mix, if cement is ${c} part(s), what are the ratios of sand and aggregate?`,
        questionUr: `کنکریٹ کے M15 مکس میں اگر سیمنٹ کا حصہ ${c} ہو، تو ریت اور بجری کا تناسب کیا ہوگا؟`,
        optionsEn: [`Sand: ${s}, Aggregate: ${a}`, `Sand: ${a}, Aggregate: ${s}`, `Sand: ${c}, Aggregate: ${a}`, `Sand: ${s*2}, Aggregate: ${a*2}`],
        optionsUr: [`ریت: ${s}، بجری: ${a}`, `ریت: ${a}، بجری: ${s}`, `ریت: ${c}، بجری: ${a}`, `ریت: ${s*2}، بجری: ${a*2}`],
        correct: 0,
        explanationEn: `M15 nominal mix ratio is 1:2:4 (Cement:Sand:Aggregate). So ${c}:${s}:${a}.`,
        explanationUr: `M15 کا تناسب 1:2:4 ہوتا ہے۔ اس لیے اگر سیمنٹ ${c} ہے تو ریت ${s} اور بجری ${a} ہوگی۔`
      };
    }
  }
];

const civilConcepts = [
  { qEn: 'What is the standard size of a modular brick?', qUr: 'ماڈیولر اینٹ کا معیاری سائز کیا ہے؟', optsEn: ['190x90x90 mm', '230x110x70 mm', '200x100x100 mm', '228x114x76 mm'], optsUr: ['190x90x90 mm', '230x110x70 mm', '200x100x100 mm', '228x114x76 mm'], ans: 0, expEn: 'Standard IS modular brick size is 190x90x90 mm (without mortar).', expUr: 'معیاری ماڈیولر سائز 190x90x90 ملی میٹر ہوتا ہے۔' },
  { qEn: 'Which test measures the workability of fresh concrete?', qUr: 'تازہ کنکریٹ کی ورک ایبلٹی ناپنے کے لیے کون سا ٹیسٹ ہوتا ہے؟', optsEn: ['Slump test', 'Proctor test', 'CBR test', 'Vicat test'], optsUr: ['سلمپ ٹیسٹ', 'پراکٹر ٹیسٹ', 'سی بی آر ٹیسٹ', 'ویکاٹ ٹیسٹ'], ans: 0, expEn: 'Slump test measures workability.', expUr: 'سلمپ ٹیسٹ کی مدد سے کنکریٹ کے بہاؤ یا کام کرنے کی صلاحیت ناپی جاتی ہے۔' },
  { qEn: 'Where is maximum bending moment in a simply supported beam with UDL?', qUr: 'UDL والے سمپلی سپورٹڈ بیم میں زیادہ سے زیادہ بینڈنگ مومنٹ کہاں ہوتا ہے؟', optsEn: ['At midspan', 'At supports', 'At quarter span', 'It is zero everywhere'], optsUr: ['درمیان میں', 'سپورٹس پر', 'ایک چوتھائی پر', 'ہر جگہ صفر'], ans: 0, expEn: 'Max BM = wl²/8 at the midspan.', expUr: 'بیم کے بالکل درمیان میں بینڈنگ مومنٹ سب سے زیادہ ہوتا ہے۔' }
];

let civilFinal = [];
let cId = 1;

for(let i=0; i<300; i++) {
  let tpl = civilTemplates[Math.floor(Math.random() * civilTemplates.length)];
  let q = tpl.gen();
  let indices = [0,1,2,3];
  shuffle(indices);
  civilFinal.push({
    id: `c_gen_${cId++}`, topic: tpl.topic, difficulty: randDiff(),
    questionEn: q.questionEn, questionUr: q.questionUr,
    optionsEn: indices.map(idx => q.optionsEn[idx]), optionsUr: indices.map(idx => q.optionsUr[idx]),
    correct: indices.indexOf(q.correct),
    explanationEn: q.explanationEn, explanationUr: q.explanationUr
  });
}
for(let i=0; i<150; i++) {
  let con = civilConcepts[Math.floor(Math.random() * civilConcepts.length)];
  let indices = [0,1,2,3];
  shuffle(indices);
  civilFinal.push({
    id: `c_con_${cId++}`, topic: 'Civil Engineering Concepts', difficulty: randDiff(),
    questionEn: con.qEn, questionUr: con.qUr,
    optionsEn: indices.map(idx => con.optsEn[idx]), optionsUr: indices.map(idx => con.optsUr[idx]),
    correct: indices.indexOf(con.ans),
    explanationEn: con.expEn, explanationUr: con.expUr
  });
}

// ==========================================
// GENERAL GENERATOR (Target: 300 Qs)
// ==========================================
const generalConcepts = [
  { topic: 'Islamic Studies', qEn: 'How many Surahs are in the Quran?', qUr: 'قرآن مجید میں کتنی سورتیں ہیں؟', optsEn: ['114', '110', '120', '124'], optsUr: ['114', '110', '120', '124'], ans: 0, expEn: 'There are 114 Surahs.', expUr: 'قرآن میں 114 سورتیں ہیں۔' },
  { topic: 'Pakistan Studies', qEn: 'When was Pakistan founded?', qUr: 'پاکستان کب قائم ہوا؟', optsEn: ['1947', '1940', '1956', '1973'], optsUr: ['1947', '1940', '1956', '1973'], ans: 0, expEn: '14 August 1947.', expUr: '14 اگست 1947 کو۔' },
  { topic: 'PAEC Knowledge', qEn: 'Who is the current Chairman of PAEC?', qUr: 'پی اے ای سی کے موجودہ چیئرمین کون ہیں؟', optsEn: ['Dr. Raja Ali Raza Anwar', 'Dr. Abdul Qadeer', 'Dr. Samar Mubarikmand', 'Dr. Ishfaq'], optsUr: ['ڈاکٹر راجہ علی رضا انور', 'ڈاکٹر عبدالقدیر', 'ڈاکٹر ثمر مبارک مند', 'ڈاکٹر اشفاق'], ans: 0, expEn: 'Dr. Raja Ali Raza Anwar', expUr: 'ڈاکٹر راجہ علی رضا انور موجودہ چیئرمین ہیں۔' },
];
let genFinal = [];
let gId = 1;
for(let i=0; i<300; i++) {
  let con = generalConcepts[Math.floor(Math.random() * generalConcepts.length)];
  let indices = [0,1,2,3];
  shuffle(indices);
  genFinal.push({
    id: `g_con_${gId++}`, topic: con.topic, difficulty: randDiff(),
    questionEn: con.qEn, questionUr: con.qUr,
    optionsEn: indices.map(idx => con.optsEn[idx]), optionsUr: indices.map(idx => con.optsUr[idx]),
    correct: indices.indexOf(con.ans),
    explanationEn: con.expEn, explanationUr: con.expUr
  });
}

// Write to files
fs.writeFileSync('src/data_electrical.js', `export const ELECTRICAL_QUESTIONS = ${JSON.stringify(elecFinal, null, 2)};`);
fs.writeFileSync('src/data_civil.js', `export const CIVIL_QUESTIONS = ${JSON.stringify(civilFinal, null, 2)};`);
fs.writeFileSync('src/data_general.js', `export const GENERAL_QUESTIONS = ${JSON.stringify(genFinal, null, 2)};`);

console.log(`Generated: ${elecFinal.length} Electrical, ${civilFinal.length} Civil, ${genFinal.length} General. Total = ${elecFinal.length + civilFinal.length + genFinal.length} Questions.`);
