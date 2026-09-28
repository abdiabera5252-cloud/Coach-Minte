/* MINTE.FIT – Amharic / English toggle
 * Usage: add  <script src="amharic.js"></script>  just before </body>,
 * AFTER the page's existing <script> block. No other edits needed.
 */
(function () {
  'use strict';

  /* ---------- Amharic font + CSS ---------- */
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(fontLink);

  const style = document.createElement('style');
  style.textContent = `
    html[lang="am"] body,
    html[lang="am"] h1, html[lang="am"] h2, html[lang="am"] h3, html[lang="am"] h4,
    html[lang="am"] .font-oswald, html[lang="am"] .font-inter, html[lang="am"] button,
    html[lang="am"] input, html[lang="am"] select, html[lang="am"] textarea {
      font-family: 'Noto Sans Ethiopic', 'Inter', sans-serif !important;
      letter-spacing: 0 !important;
    }
    html[lang="am"] h1 { line-height: 1.3 !important; }
    html[lang="am"] h2, html[lang="am"] h3 { line-height: 1.3; }
  `;
  document.head.appendChild(style);

  /* ---------- Dictionary (English -> Amharic) ---------- */
  const DICT = {
    // Nav
    'ABOUT': 'ስለ እኔ', 'SERVICES': 'አገልግሎቶች', 'TRANSFORMATIONS': 'ለውጦች',
    'CALCULATOR': 'ማስያ', 'GALLERY': 'ማዕከለ ስዕል', 'CONTACT': 'ያግኙን',
    'MACRO CALCULATOR': 'የማክሮ ማስያ', 'JOIN SUBSCRIPTION': 'ይመዝገቡ',

    // Hero
    'Accepting New Clients': 'አዳዲስ ደንበኞችን እየተቀበልን ነው',
    'TRANSFORM YOUR': 'የእርስዎን',
    'PHYSIQUE': 'የአካል ቅርጽ',
    'ELEVATE YOUR MIND.': 'ይለውጡ፤ አእምሮዎን ያሳድጉ።',
    'Join an elite community dedicated to real results. Expert guidance, tailored programming, and relentless motivation from Minte Fitness Coach.':
      'ለእውነተኛ ውጤት የተሰጠ ልዩ ማኅበረሰብን ይቀላቀሉ። ከሚንቴ የአካል ብቃት አሰልጣኝ ባለሙያ መመሪያ፣ ለእርስዎ የተበጀ ፕሮግራምና የማያቋርጥ ማበረታቻ።',
    'START YOUR TRANSFORMATION': 'ለውጥዎን ይጀምሩ',
    'EXPLORE PROGRAMS': 'ፕሮግራሞችን ይመልከቱ',
    'Clients Transformed': 'የተለወጡ ደንበኞች',
    '8+ YRS': '8+ ዓመት', 'Pro Coaching': 'ሙያዊ አሰልጣኝነት',
    'Custom Tailored': 'ሙሉ በሙሉ የተበጀ',
    'COACH MINTE': 'አሰልጣኝ ሚንቴ', 'Gold Medalist': 'የወርቅ ሜዳሊያ ተሸላሚ',
    'Certified IFBB Champion & Elite Physique Coach': 'የIFBB ሰርቲፋይድ ሻምፒዮንና ልዩ የአካል ቅርጽ አሰልጣኝ',
    'Personalized Meal & Workout Systems': 'ለእርስዎ የተበጀ የምግብና የአካል ብቃት ሥርዓት',

    // About
    'Precision Method': 'ትክክለኛ ዘዴ',
    'No cookie-cutter routines. Every program is calibrated to your biomechanics and lifestyle.':
      'አንድ ዓይነት ለሁሉም የሚሆን ፕሮግራም የለም። እያንዳንዱ ፕሮግራም ከሰውነት እንቅስቃሴዎ እና ከአኗኗርዎ ጋር ይስተካከላል።',
    'Maximum Energy': 'ከፍተኛ ኃይል',
    'Build unshakeable mental discipline alongside peak physical muscle condition.':
      'ከከፍተኛ የጡንቻ ብቃት ጋር የማይናወጥ የአእምሮ ሥነ ሥርዓት ይገንቡ።',
    'Custom Macros': 'ብጁ ማክሮዎች',
    'Flexible nutrition plans engineered for fat burning without starving your favorite foods.':
      'የሚወዷቸውን ምግቦች ሳይተዉ ስብ ለማቃጠል የተዘጋጁ ተለዋዋጭ የአመጋገብ ዕቅዶች።',
    'Weekly Audits': 'ሳምንታዊ ግምገማ',
    'Direct 1-on-1 photo & video check-ins to fix plateaus instantly and guarantee progress.':
      'መቀዛቀዝን ወዲያውኑ ለማስተካከልና እድገትን ለማረጋገጥ ቀጥተኛ የአንድ ለአንድ የፎቶና የቪዲዮ ክትትል።',
    'MEET YOUR COACH': 'አሰልጣኝዎን ይተዋወቁ',
    'PASSIONATE ABOUT DRIVING REAL': 'እውነተኛ',
    'PHYSIQUE REVOLUTIONS': 'የአካል ቅርጽ አብዮትን',
    '.': 'ለማምጣት ቁርጠኛ ነኝ።',
    'I am Minte Fitness Coach—natural bodybuilder, competition champion, and dedicated lifestyle mentor. My mission is simple: eliminate fluff and give you science-backed, high-yield training protocols.':
      'እኔ የሚንቴ የአካል ብቃት አሰልጣኝ ነኝ—ተፈጥሯዊ የሰውነት ገንቢ፣ የውድድር ሻምፒዮንና ቁርጠኛ የአኗኗር መካሪ። ተልዕኮዬ ቀላል ነው፦ ትርፍ ነገሮችን አስወግዶ በሳይንስ የተደገፈ ውጤታማ የሥልጠና መመሪያ መስጠት።',
    'Whether you want to strip off stubborn belly fat, pack on dense lean muscle, or step onto a competition stage, I build the exact roadmap tailored to your body type.':
      'ግትር የሆነ የሆድ ስብን ማስወገድ፣ ጠንካራ ዘንበል ያለ ጡንቻ መገንባት ወይም የውድድር መድረክ ላይ መውጣት ቢፈልጉ፣ ለሰውነትዎ አይነት የሚስማማውን ትክክለኛ ካርታ እቀይሳለሁ።',
    'Direct WhatsApp & Mobile 1-on-1 Access': 'ቀጥተኛ የዋትስአፕና የሞባይል አንድ ለአንድ ግንኙነት',
    'Custom Training Plans (Home or Gym)': 'ብጁ የሥልጠና ዕቅዶች (ለቤት ወይም ለጂም)',
    'Cardio, Supplementation & Recovery Guidelines': 'የካርዲዮ፣ የተጨማሪ ምግብና የማገገሚያ መመሪያዎች',
    'APPLY FOR DIRECT COACHING': 'ለቀጥታ ስልጠና ያመልክቱ',

    // Services
    'OUR OFFERINGS': 'አገልግሎቶቻችን',
    'SELECT YOUR': 'የእርስዎን', 'TRANSFORMATION': 'የለውጥ', 'PATH': 'መንገድ ይምረጡ',
    'High-yield fitness coaching programs designed for sustainable, elite-level results.':
      'ዘላቂና ከፍተኛ ደረጃ ላለው ውጤት የተዘጋጁ ውጤታማ የአካል ብቃት ስልጠና ፕሮግራሞች።',
    '1-ON-1 VIP HYBRID': 'አንድ ለአንድ ቪአይፒ ድቅል',
    'In-person sessions combined with elite digital tracking. Get hands-on form corrections and maximum intensity.':
      'በአካል የሚደረጉ ክፍለ ጊዜዎች ከልዩ ዲጂታል ክትትል ጋር ተጣምረው። በእጅ የሚደረግ የእንቅስቃሴ ማስተካከያና ከፍተኛ ጥንካሬ ያግኙ።',
    'Full Biomechanical Assessment': 'ሙሉ የሰውነት እንቅስቃሴ ግምገማ',
    'In-Person Technique Coaching': 'በአካል የቴክኒክ ስልጠና',
    'Complete Meal Protocol': 'ሙሉ የምግብ መርሐ ግብር',
    'SELECT PROGRAM': 'ፕሮግራም ይምረጡ',
    'MOST POPULAR': 'በጣም ተወዳጅ',
    'ONLINE GLOBAL COACHING': 'የኦንላይን ዓለም አቀፍ ስልጠና',
    'Full remote guidance wherever you live. Video form reviews, custom workout app updates, and weekly check-ins.':
      'የትም ይኑሩ ሙሉ የርቀት መመሪያ። የቪዲዮ የእንቅስቃሴ ግምገማ፣ የብጁ ልምምድ መተግበሪያ ማሻሻያና ሳምንታዊ ክትትል።',
    'Fully Customized Gym/Home Plan': 'ሙሉ በሙሉ የተበጀ የጂም/የቤት ዕቅድ',
    'Macro & Calorie Blueprint': 'የማክሮና የካሎሪ ንድፍ',
    '24/7 WhatsApp Chat Support': '24/7 የዋትስአፕ ውይይት ድጋፍ',
    'JOIN ONLINE NOW': 'አሁኑኑ ኦንላይን ይቀላቀሉ',
    'CONTEST & PHYSIQUE PREP': 'የውድድርና የአካል ቅርጽ ዝግጅት',
    'For bodybuilders and physique athletes preparing to stage compete or achieve peak sub-8% body fat conditioning.':
      'ለመድረክ ውድድር ለሚዘጋጁ ወይም ከ8% በታች የሰውነት ስብ ከፍተኛ ብቃት ለመድረስ ለሚፈልጉ የሰውነት ገንቢዎችና የአካል ቅርጽ አትሌቶች።',
    'Peak Week Manipulation Plan': 'የከፍተኛ ሳምንት ማስተካከያ ዕቅድ',
    'Stage Posing Routine Coaching': 'የመድረክ አቋም ልምምድ ስልጠና',
    'Daily Body Metrics Monitoring': 'ዕለታዊ የሰውነት መለኪያ ክትትል',

    // Transformations
    'PROVEN RESULTS': 'የተረጋገጡ ውጤቶች', 'CLIENT': 'የደንበኞች',
    'Drag the slider on the card below to reveal real client changes achieved with MINTE.FIT programming.':
      'በ MINTE.FIT ፕሮግራም የተገኙ እውነተኛ የደንበኛ ለውጦችን ለማየት ከታች ባለው ካርድ ላይ ያለውን ማንሸራተቻ ይጎትቱ።',
    'AFTER (WEEK 12)': 'ከሥልጠና በኋላ (ሳምንት 12)',
    'BEFORE (DAY 1)': 'ከሥልጠና በፊት (ቀን 1)',
    'Drag left or right to compare results': 'ውጤቶችን ለማወዳደር ወደ ግራ ወይም ቀኝ ይጎትቱ',
    '12-WEEK SHRED PROGRAM': 'የ12 ሳምንት የስብ ማቅለጥ ፕሮግራም',
    'YONATAN T.': 'ዮናታን ት.',
    'Software Engineer, Hawassa': 'ሶፍትዌር መሐንዲስ፣ ሐዋሳ',
    'Weight Loss': 'የክብደት መቀነስ', '-14.2 KG': '-14.2 ኪ.ግ',
    'Body Fat %': 'የሰውነት ስብ %', 'Waist Size': 'የወገብ ልክ', '-12 CM': '-12 ሴ.ሜ',
    'Energy Level': 'የኃይል ደረጃ',
    '"Minte completely transformed my understanding of nutrition and workout intensity. I lost 14 kg without giving up my staple foods!"':
      '"ሚንቴ ስለ አመጋገብና የልምምድ ጥንካሬ ያለኝን ግንዛቤ ሙሉ በሙሉ ለወጠው። ዋና ምግቦቼን ሳልተው 14 ኪ.ግ ቀነስኩ!"',
    'GET YOUR TRANSFORMATION PLAN': 'የለውጥ ዕቅድዎን ያግኙ',

    // Calculator
    'FREE TOOL': 'ነፃ መሣሪያ', 'CALORIE &': 'ካሎሪና', 'MACRO': 'ማክሮ',
    'Get an instant science-backed breakdown of your required daily calories and recommended fitness program.':
      'በሳይንስ የተደገፈ የዕለታዊ ካሎሪ ፍላጎትዎንና የሚመከር የአካል ብቃት ፕሮግራም ወዲያውኑ ያግኙ።',
    'Gender': 'ፆታ', 'Male': 'ወንድ', 'Female': 'ሴት',
    'Age (yrs)': 'ዕድሜ (ዓመት)', 'Weight (kg)': 'ክብደት (ኪ.ግ)', 'Height (cm)': 'ቁመት (ሴ.ሜ)',
    'Activity Level': 'የእንቅስቃሴ ደረጃ',
    'Sedentary (Desk Job, little exercise)': 'ብዙም የማይንቀሳቀስ (የቢሮ ሥራ፣ ትንሽ ልምምድ)',
    'Lightly Active (Workout 1-3 days/wk)': 'ቀላል እንቅስቃሴ (በሳምንት 1-3 ቀን ልምምድ)',
    'Moderately Active (Workout 3-5 days/wk)': 'መካከለኛ እንቅስቃሴ (በሳምንት 3-5 ቀን)',
    'Very Active (Workout 6-7 days/wk)': 'ከፍተኛ እንቅስቃሴ (በሳምንት 6-7 ቀን)',
    'Primary Goal': 'ዋና ግብ',
    'Aggressive Fat Loss (-500 kcal)': 'ፈጣን የስብ ቅነሳ (-500 ካሎሪ)',
    'Maintain & Recomp': 'ማቆየትና ሰውነት ማስተካከል',
    'Lean Muscle Gain (+300 kcal)': 'ዘንበል ያለ ጡንቻ መገንባት (+300 ካሎሪ)',
    'CALCULATE MY TARGETS': 'ግቦቼን አስላ',
    'YOUR CUSTOM RESULTS': 'የእርስዎ ውጤቶች',
    'Estimated Daily Calorie Goal': 'የሚገመት ዕለታዊ የካሎሪ ግብ',
    'BMI Index': 'የBMI መረጃ ጠቋሚ',
    'Overweight': 'ከመጠን በላይ ክብደት', 'Underweight': 'ዝቅተኛ ክብደት',
    'Normal': 'መደበኛ', 'Obese': 'ውፍረት',
    'Protein Target': 'የፕሮቲን ግብ', '2.0g per kg': '2.0 ግ በኪ.ግ',
    'Macro Split Ratio': 'የማክሮ ክፍፍል መጠን',
    'Protein 40%': 'ፕሮቲን 40%', 'Carbs 40%': 'ካርቦሃይድሬት 40%', 'Fats 20%': 'ስብ 20%',
    'CLAIM PLAN BASED ON RESULTS': 'በውጤቶቼ መሠረት ዕቅድ ይጠይቁ',

    // Gallery
    'MEDIA SHOCK': 'ፎቶዎች', 'COACHING &': 'ስልጠናና',
    'Real gym sessions, competition posing, and client training moments.':
      'እውነተኛ የጂም ክፍለ ጊዜዎች፣ የውድድር አቋም እና የደንበኞች ልምምድ ቅጽበቶች።',
    'ALL': 'ሁሉም', 'WORKOUTS': 'ልምምዶች', 'COACHING': 'ስልጠና', 'WORKOUT': 'ልምምድ',
    'Heavy Bicep & Arm Conditioning': 'ከባድ የቢሴፕና የክንድ ልምምድ',
    'Competition Peak Stage Posing': 'የውድድር ከፍተኛ ደረጃ የመድረክ አቋም',
    'Personalized Client Form Correction': 'ለደንበኛ የተበጀ የእንቅስቃሴ ማስተካከያ',
    'Barbell Deadlift & Power Training': 'የባርቤል ዴድሊፍትና የኃይል ልምምድ',
    'Group HIIT & Hypertrophy Session': 'የቡድን HIIT እና የጡንቻ ማሳደጊያ ክፍለ ጊዜ',
    'Low Bodyfat Shredded Condition': 'ዝቅተኛ የሰውነት ስብ ጥርት ያለ ቅርጽ',
    // Lightbox captions (passed from onclick)
    'Heavy Arm Blast Session': 'ከባድ የክንድ ልምምድ ክፍለ ጊዜ',
    'Competition Prep Posing Routine': 'የውድድር ዝግጅት የአቋም ልምምድ',
    '1-on-1 Form Breakdown & Guidance': 'የአንድ ለአንድ የእንቅስቃሴ ትንተናና መመሪያ',
    'High-Intensity Group Coaching': 'ከፍተኛ ጥንካሬ ያለው የቡድን ስልጠና',
    'Sub-10% Bodyfat Physique Peak': 'ከ10% በታች የሰውነት ስብ ከፍተኛ ቅርጽ',

    // Contact / footer
    'DIRECT CONTACT': 'ቀጥተኛ ግንኙነት',
    'READY TO CHANGE YOUR': 'ሕይወትዎን ለመቀየር', 'LIFE?': 'ዝግጁ ነዎት?',
    'Reach out directly on WhatsApp or call to discuss your goals with Coach Minte. Slots are limited to maintain elite quality.':
      'ግቦችዎን ከአሰልጣኝ ሚንቴ ጋር ለመወያየት በዋትስአፕ ወይም በስልክ በቀጥታ ያግኙን። ጥራቱን ለመጠበቅ ቦታዎች የተወሰኑ ናቸው።',
    'WhatsApp Direct': 'ቀጥተኛ ዋትስአፕ', 'Primary Location': 'ዋና አድራሻ',
    'Hawassa, Ethiopia': 'ሐዋሳ፣ ኢትዮጵያ',
    'GET STARTED TODAY': 'ዛሬ ይጀምሩ',
    'Click below to fill out your quick 1-minute fitness intake form.': 'የ1 ደቂቃ አጭር የመመዝገቢያ ቅጽ ለመሙላት ከታች ይጫኑ።',
    'APPLY FOR SUBSCRIPTION NOW': 'አሁኑኑ ለምዝገባ ያመልክቱ',
    'COPY PHONE NUMBER': 'ስልክ ቁጥር ገልብጥ',
    '© 2026 MINTE FITNESS COACH. ALL RIGHTS RESERVED.': '© 2026 ሚንቴ የአካል ብቃት አሰልጣኝ። መብቱ በሕግ የተጠበቀ ነው።',

    // Modal
    'CLIENT APPLICATION': 'የደንበኛ ማመልከቻ', 'JOIN': 'ይቀላቀሉ',
    'Selected Program:': 'የተመረጠ ፕሮግራም፦',
    'General Subscription': 'አጠቃላይ ምዝገባ', 'Mobile Subscription': 'የሞባይል ምዝገባ',
    'Hero Transformation': 'የለውጥ ጉዞ', 'About Coach Section': 'ቀጥተኛ ስልጠና',
    '1-on-1 VIP Hybrid': 'አንድ ለአንድ ቪአይፒ ድቅል', 'Online Global Coaching': 'የኦንላይን ዓለም አቀፍ ስልጠና',
    'Contest Prep': 'የውድድር ዝግጅት', 'Transformation Story': 'የለውጥ ታሪክ',
    'Footer Direct Action': 'አጠቃላይ ምዝገባ',
    'Full Name *': 'ሙሉ ስም *', 'Phone / WhatsApp *': 'ስልክ / ዋትስአፕ *',
    'Fat Loss & Shred': 'የስብ ቅነሳ', 'Lean Muscle Gain': 'ጡንቻ መገንባት',
    'Your Message or Current Routine': 'መልእክትዎ ወይም አሁን ያለዎት ልምምድ',
    'SUBMIT APPLICATION VIA WHATSAPP': 'ማመልከቻውን በዋትስአፕ ይላኩ',

    // Toasts
    'Calorie & Macro Targets recalculated!': 'ካሎሪና ማክሮ ግቦች በአዲስ ተሰልተዋል!',
    'Coach Minte Phone Number Copied!': 'የአሰልጣኝ ሚንቴ ስልክ ቁጥር ተገልብጧል!',
    'Redirecting to WhatsApp with your details...': 'መረጃዎን ይዘን ወደ ዋትስአፕ በመውሰድ ላይ...',
    'Copied to clipboard!': 'ተገልብጧል!'
  };

  const PLACEHOLDERS = {
    'e.g. Abebe Bikila': 'ለምሳሌ አበበ ቢቂላ',
    'Tell Coach Minte about your training history and goals...': 'ስለ ልምምድ ታሪክዎና ግቦችዎ ለአሰልጣኝ ሚንቴ ይንገሩ...'
  };

  const TITLE_EN = document.title;
  const TITLE_AM = 'MINTE.FIT | ሚንቴ የአካል ብቃት አሰልጣኝ - አካልዎን ይለውጡ';

  const norm = (s) => s.replace(/\s+/g, ' ').trim();

  function lookup(key) {
    if (Object.prototype.hasOwnProperty.call(DICT, key)) return DICT[key];
    let m;
    if ((m = key.match(/^(.+) KCAL$/))) return m[1] + ' ካሎሪ';
    if ((m = key.match(/^(\d+) g\/day$/))) return m[1] + ' ግ/ቀን';
    if ((m = key.match(/^Custom Calorie Plan \((.*)\)$/))) return 'ብጁ የካሎሪ ዕቅድ (' + m[1] + ')';
    return undefined;
  }

  // Translate a whole string (used for toasts / captions / program names)
  function tr(s) {
    if (typeof s !== 'string') return s;
    const r = lookup(norm(s));
    return r === undefined ? s : r;
  }

  /* ---------- DOM translation ---------- */
  const store = new WeakMap(); // text node -> {orig, tr}
  let lang = 'en';

  function walk(cb) {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => {
        const p = n.parentNode && n.parentNode.nodeName;
        return (p === 'SCRIPT' || p === 'STYLE') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(cb);
  }

  function applyLang(target) {
    lang = target || lang;
    document.documentElement.lang = lang;

    walk((node) => {
      const rec = store.get(node);
      if (lang === 'am') {
        const orig = (rec && node.nodeValue === rec.tr) ? rec.orig : node.nodeValue;
        const key = norm(orig);
        if (!key) return;
        const res = lookup(key);
        if (res === undefined) return;
        const lead = orig.match(/^\s*/)[0];
        const trail = orig.match(/\s*$/)[0];
        const out = lead + res + trail;
        store.set(node, { orig: orig, tr: out });
        node.nodeValue = out;
      } else if (rec && node.nodeValue === rec.tr) {
        node.nodeValue = rec.orig;
        store.delete(node);
      }
    });

    document.querySelectorAll('[placeholder]').forEach((el) => {
      if (!el.hasAttribute('data-ph-en')) el.setAttribute('data-ph-en', el.getAttribute('placeholder'));
      const en = el.getAttribute('data-ph-en');
      el.setAttribute('placeholder', lang === 'am' && PLACEHOLDERS[en] ? PLACEHOLDERS[en] : en);
    });

    document.title = lang === 'am' ? TITLE_AM : TITLE_EN;
    updateButtons();
    try { localStorage.setItem('minte-lang', lang); } catch (e) {}
  }

  /* ---------- Toggle buttons ---------- */
  const buttons = [];
  function makeButton(extraClass) {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Switch language');
    b.className = 'lang-toggle flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-brandGreen hover:text-black text-white font-bold px-3 py-2 rounded-full text-sm transition-all ' + (extraClass || '');
    b.style.fontFamily = "'Noto Sans Ethiopic','Inter',sans-serif";
    b.addEventListener('click', () => applyLang(lang === 'en' ? 'am' : 'en'));
    buttons.push(b);
    return b;
  }
  function updateButtons() {
    buttons.forEach((b) => {
      b.innerHTML = '<i class="fa-solid fa-globe"></i><span>' + (lang === 'en' ? 'አማርኛ' : 'English') + '</span>';
    });
  }

  // Desktop / tablet + phone header (sits before the hamburger button)
  const hamburger = document.getElementById('mobile-menu-btn');
  if (hamburger) hamburger.parentNode.insertBefore(makeButton(), hamburger);

  /* ---------- Hook existing page functions ---------- */
  const _showToast = window.showToast;
  if (_showToast) window.showToast = (msg, type) => _showToast(lang === 'am' ? tr(msg) : msg, type);

  const _calc = window.calculateMacros;
  if (_calc) window.calculateMacros = function (e) {
    const r = _calc.call(this, e);
    if (lang === 'am') applyLang('am');
    return r;
  };

  let currentProgram = 'General Subscription';
  const _openModal = window.openBookingModal;
  if (_openModal) window.openBookingModal = function (name) {
    currentProgram = name || 'General Subscription';
    const r = _openModal.apply(this, arguments);
    if (lang === 'am') applyLang('am');
    return r;
  };

  const _submit = window.submitBooking;
  if (_submit) window.submitBooking = function (e) {
    // WhatsApp message stays in English, so restore the program name first
    const el = document.getElementById('modal-program-name');
    if (el) el.textContent = currentProgram.replace('ካሎሪ', 'KCAL');
    const r = _submit.call(this, e);
    if (lang === 'am') applyLang('am');
    return r;
  };

  const _lightbox = window.openLightbox;
  if (_lightbox) window.openLightbox = (src, caption) => _lightbox(src, lang === 'am' ? tr(caption) : caption);

  /* ---------- Init (restore saved choice) ---------- */
  updateButtons();
  let saved = 'en';
  try { saved = localStorage.getItem('minte-lang') || 'en'; } catch (e) {}
  if (saved === 'am') applyLang('am');
})();
