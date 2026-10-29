// Site language (English / Azerbaijani). Static text carries data-i18n attributes; project, blog and map
// text is looked up through window.I18N when it is rendered, and re-rendered on the 'langchange' event.
(function () {
  var T = {
    en: {
      'doc.title': 'Eshgin - Portfolio',
      'doc.blog': 'Eshgin - Blog',
      'nav.featured': 'Featured',
      'nav.gallery': 'Gallery',
      'nav.contact': 'Contact',
      'nav.blog': 'Blog',
      'lang.label': 'Language',
      'hero.title': 'A digital space for my work and experiments.',
      'hero.sub': 'Portfolio Website of Eshgin Shikhmammadov.',
      'hero.cta': 'Discover my work',
      'feat.label': '// Featured Work',
      'feat.heading': '<strong>Functional systems.</strong> <span class="light">Innovative interfaces.</span>',
      'gal.label': 'Gallery',
      'gal.heading': 'Landing pages and creative work.',
      'gal.prev': 'Previous',
      'gal.next': 'Next',
      'map.label': "// Places I've been",
      'map.count': '13 countries',
      'map.lived': 'Lived in',
      'map.visited': 'Visited',
      'map.hint': 'Drag to pan · Ctrl + scroll to zoom · Click a country',
      'map.back': '← Back',
      'map.zoomIn': 'Zoom in',
      'map.zoomOut': 'Zoom out',
      'map.home': 'Back to Europe',
      'contact.title': 'Get in Touch.',
      'contact.text': "Feel free to reach out for collaborations or just to say hi. I'm always open to new opportunities.",
      'contact.email': 'Email:',
      'contact.location': 'Location:',
      'contact.locval': 'Riga, Latvia',
      'contact.send': 'Send an Email',
      'contact.success': "Thanks for reaching out! I'll get back to you soon.",
      'form.name': 'Your Name',
      'form.email': 'Your Email',
      'form.message': 'Your Message',
      'form.submit': 'Send Message',
      'footer.tag': 'Software Engineer based in Riga, Latvia.<br>Building the future of the web.',
      'footer.nav': 'Navigation',
      'footer.featured': 'Featured Work',
      'footer.gallery': 'Gallery',
      'footer.contact': 'Contact',
      'footer.blog': 'Blog',
      'footer.credit': 'Created by Eshgin Shikhmammadov',
      'sheet.close': 'Close',
      'sheet.did': 'What I did',
      'sheet.details': 'Details',
      'sheet.prev': 'Previous',
      'sheet.next': 'Next',
      'sheet.live': 'Live preview',
      'sheet.source': 'Source code',
      'sheet.qr': 'Scan to open the live app on your phone',
      'sheet.qrAlt': 'QR code to open the app on your phone',
      'sheet.open': 'Open',
      'blog.label': 'Notebook',
      'blog.heading': 'Experiments, thoughts and digital discoveries.',
      'blog.read': 'Read post',
      'blog.back': 'back to notebook'
    },
    az: {
      'doc.title': 'Eşqin - Portfolio',
      'doc.blog': 'Eşqin - Bloq',
      'nav.featured': 'Seçilmiş',
      'nav.gallery': 'Qalereya',
      'nav.contact': 'Əlaqə',
      'nav.blog': 'Bloq',
      'lang.label': 'Dil',
      'hero.title': 'İşlərim və təcrübələrim üçün rəqəmsal məkan.',
      'hero.sub': 'Eşqin Şıxməmmədovun portfolio saytı.',
      'hero.cta': 'İşlərimlə tanış ol',
      'feat.label': '// Seçilmiş işlər',
      'feat.heading': '<strong>Funksional sistemlər.</strong> <span class="light">Yenilikçi interfeyslər.</span>',
      'gal.label': 'Qalereya',
      'gal.heading': 'Lendinq səhifələri və kreativ işlər.',
      'gal.prev': 'Əvvəlki',
      'gal.next': 'Növbəti',
      'map.label': '// Getdiyim yerlər',
      'map.count': '13 ölkə',
      'map.lived': 'Yaşadığım',
      'map.visited': 'Getdiyim',
      'map.hint': 'Sürüşdürmək üçün dartın · Yaxınlaşdırmaq üçün Ctrl + sürüşdürmə · Ölkəyə klikləyin',
      'map.back': '← Geri',
      'map.zoomIn': 'Yaxınlaşdır',
      'map.zoomOut': 'Uzaqlaşdır',
      'map.home': 'Avropaya qayıt',
      'contact.title': 'Əlaqə saxlayın.',
      'contact.text': 'Əməkdaşlıq üçün və ya sadəcə salam demək üçün yazmaqdan çəkinməyin. Yeni imkanlara həmişə açığam.',
      'contact.email': 'E-poçt:',
      'contact.location': 'Məkan:',
      'contact.locval': 'Riqa, Latviya',
      'contact.send': 'E-poçt göndər',
      'contact.success': 'Yazdığınız üçün təşəkkürlər! Tezliklə sizə cavab verəcəyəm.',
      'form.name': 'Adınız',
      'form.email': 'E-poçtunuz',
      'form.message': 'Mesajınız',
      'form.submit': 'Mesaj göndər',
      'footer.tag': 'Riqada yaşayan proqram mühəndisi.<br>Veb-in gələcəyini qururam.',
      'footer.nav': 'Naviqasiya',
      'footer.featured': 'Seçilmiş işlər',
      'footer.gallery': 'Qalereya',
      'footer.contact': 'Əlaqə',
      'footer.blog': 'Bloq',
      'footer.credit': 'Eşqin Şıxməmmədov tərəfindən yaradılıb',
      'sheet.close': 'Bağla',
      'sheet.did': 'Nə etdim',
      'sheet.details': 'Detallar',
      'sheet.prev': 'Əvvəlki',
      'sheet.next': 'Növbəti',
      'sheet.live': 'Canlı önbaxış',
      'sheet.source': 'Mənbə kodu',
      'sheet.qr': 'Canlı tətbiqi telefonunuzda açmaq üçün skan edin',
      'sheet.qrAlt': 'Tətbiqi telefonda açmaq üçün QR kod',
      'sheet.open': 'Aç',
      'blog.label': 'Qeydlər dəftəri',
      'blog.heading': 'Təcrübələr, fikirlər və rəqəmsal kəşflər.',
      'blog.read': 'Yazını oxu',
      'blog.back': 'qeydlərə qayıt'
    }
  };

  // Country and city names shown on the map (the SVG keeps English names as keys).
  var PLACES_AZ = {
    Russia: 'Rusiya', France: 'Fransa', Sweden: 'İsveç', Austria: 'Avstriya', Hungary: 'Macarıstan',
    Latvia: 'Latviya', Estonia: 'Estoniya', Germany: 'Almaniya', 'Türkiye': 'Türkiyə', Azerbaijan: 'Azərbaycan',
    Georgia: 'Gürcüstan', Finland: 'Finlandiya', Czechia: 'Çexiya',
    Istanbul: 'İstanbul', Trabzon: 'Trabzon', Helsinki: 'Helsinki', Tampere: 'Tampere', Tbilisi: 'Tbilisi',
    Rustavi: 'Rustavi', Batumi: 'Batumi', Vladikavkaz: 'Vladiqafqaz', Prokhladny: 'Proxladnı', Munich: 'Münhen',
    Stockholm: 'Stokholm', Vienna: 'Vyana', Budapest: 'Budapeşt', Paris: 'Paris', Prague: 'Praqa', Tallinn: 'Tallin'
  };

  // Tags, "what I did" items and the pieces of "Key: value" detail lines.
  var PHRASES_AZ = {
    'Web Design': 'Veb dizayn', 'Front-end': 'Front-end', 'Gallery': 'Qalereya', 'Waitlist': 'Gözləmə siyahısı',
    'Landing Page': 'Lendinq', 'Agency': 'Agentlik', 'Full-stack': 'Full-stack', 'Dashboard': 'İdarə paneli',
    'Web App': 'Veb tətbiq', 'Automation': 'Avtomatlaşdırma', 'Integration': 'İnteqrasiya', 'Mobile App': 'Mobil tətbiq',
    'Hackathon': 'Hakaton', 'Design': 'Dizayn', 'Engineering': 'Mühəndislik',
    'Landing page design': 'Lendinq səhifə dizaynı', 'Responsive front-end': 'Responsiv front-end',
    'Interaction design': 'İnteraksiya dizaynı', 'Content structure': 'Məzmun strukturu',
    'Product messaging': 'Məhsul mesajlaşması', 'Visual design': 'Vizual dizayn', 'Gallery layout': 'Qalereya düzəni',
    'Waitlist flow': 'Gözləmə siyahısı axını', 'Interface design': 'İnterfeys dizaynı',
    'Front-end build': 'Front-end hazırlığı', 'Back-end & data': 'Back-end və data', 'Deployment': 'Yerləşdirmə',
    'Workflow design': 'İş axınının dizaynı', 'Integration setup': 'İnteqrasiyanın qurulması',
    'Automation logic': 'Avtomatlaşdırma məntiqi', 'Testing': 'Test',
    'Type': 'Növ', 'Format': 'Format', 'Hosting': 'Hostinq', 'Status': 'Status', 'Platform': 'Platforma',
    'AI platform': 'Sİ platforması', 'Landing page': 'Lendinq səhifə', 'Live': 'Canlı',
    'Developer tool': 'Developer aləti', 'Art display': 'İncəsənət nümayişi', 'Showcase site': 'Nümayiş saytı',
    'Community': 'İcma', 'Waitlist page': 'Gözləmə siyahısı səhifəsi', 'Productivity': 'Məhsuldarlıq',
    'Concept': 'Konsept', 'Robotics': 'Robototexnika', 'Marketing site': 'Marketinq saytı',
    'Web app': 'Veb tətbiq', 'Data tool': 'Data aləti', 'Insights tool': 'Analitika aləti', 'Scenario': 'Ssenari',
    'Tracker': 'İzləmə aləti'
  };

  var lang = 'en';
  try {
    var saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'az') lang = saved;
    else if ((navigator.language || '').toLowerCase().indexOf('az') === 0) lang = 'az';
  } catch (e) { /* storage blocked */ }

  function t(key) {
    var d = T[lang] || T.en;
    return d[key] !== undefined ? d[key] : (T.en[key] !== undefined ? T.en[key] : key);
  }

  function place(name) {
    return lang === 'az' && PLACES_AZ[name] ? PLACES_AZ[name] : name;
  }

  function phrase(str) {
    if (lang !== 'az') return str;
    if (PHRASES_AZ[str]) return PHRASES_AZ[str];
    var i = str.indexOf(': ');
    if (i > 0) {
      var k = str.slice(0, i);
      var v = str.slice(i + 2);
      return (PHRASES_AZ[k] || k) + ': ' + (PHRASES_AZ[v] || v);
    }
    return str;
  }

  function mergeStory(en, patch) {
    return en.map(function (blk, i) {
      var pt = patch && patch[i];
      if (!pt) return blk;
      var b = Object.assign({}, blk);
      if (pt.heading) b.heading = pt.heading;
      if (pt.text) b.text = pt.text;
      if (pt.captions && blk.images) {
        b.images = blk.images.map(function (im, k) {
          return pt.captions[k] ? Object.assign({}, im, { caption: pt.captions[k], alt: pt.captions[k] }) : im;
        });
      }
      if (pt.bento && blk.bento) {
        b.bento = blk.bento.map(function (tile, k) {
          return Object.assign({}, tile, pt.bento[k] || {});
        });
      }
      return b;
    });
  }

  // A project as it should be shown in the current language.
  function project(p) {
    if (lang !== 'az') return p;
    var o = (window.PROJECTS_AZ || {})[p.slug] || {};
    var q = Object.assign({}, p, o);
    q.tags = o.tags || p.tags.map(phrase);
    q.did = o.did || p.did.map(phrase);
    q.details = o.details || p.details.map(phrase);
    if (p.story) q.story = mergeStory(p.story, o.story);
    return q;
  }

  // ---- flags (inline SVG so they render on every OS)
  function star(cx, cy, ro, ri) {
    var pts = [];
    for (var k = 0; k < 16; k++) {
      var r = k % 2 === 0 ? ro : ri;
      var a = (Math.PI / 8) * k - Math.PI / 2;
      pts.push((cx + r * Math.cos(a)).toFixed(2) + ',' + (cy + r * Math.sin(a)).toFixed(2));
    }
    return pts.join(' ');
  }

  var FLAGS = {
    en: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#012169"/>' +
      '<path d="M0 0L60 40M60 0L0 40" stroke="#fff" stroke-width="8"/>' +
      '<path d="M0 0L60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/>' +
      '<path d="M30 0V40M0 20H60" stroke="#fff" stroke-width="12"/>' +
      '<path d="M30 0V40M0 20H60" stroke="#C8102E" stroke-width="7"/></svg>',
    az: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="13.4" fill="#00B5E2"/>' +
      '<rect y="13.3" width="60" height="13.4" fill="#EF3340"/><rect y="26.6" width="60" height="13.4" fill="#509E2F"/>' +
      '<circle cx="27" cy="20" r="6.2" fill="#fff"/><circle cx="29" cy="20" r="5" fill="#EF3340"/>' +
      '<polygon points="' + star(34, 20, 3.4, 1.7) + '" fill="#fff"/></svg>'
  };

  // ---- applying the language
  function apply() {
    var root = document.documentElement;
    root.lang = lang === 'az' ? 'az' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n-html')); });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria'))); });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) { el.setAttribute('alt', t(el.getAttribute('data-i18n-alt'))); });
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function set(next) {
    if (next !== 'en' && next !== 'az') return;
    lang = next;
    try { localStorage.setItem('lang', lang); } catch (e) { /* ignore */ }
    apply();
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  function buildSwitch() {
    var links = document.querySelector('.nav-links');
    if (!links || links.querySelector('.lang-switch')) return;
    var box = document.createElement('div');
    box.className = 'lang-switch';
    box.setAttribute('role', 'group');
    box.setAttribute('data-i18n-aria', 'lang.label');
    [['en', 'EN', 'English'], ['az', 'AZ', 'Azərbaycanca']].forEach(function (x) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-lang', x[0]);
      b.setAttribute('title', x[2]);
      b.innerHTML = '<span class="flag">' + FLAGS[x[0]] + '</span><span class="code">' + x[1] + '</span>';
      b.addEventListener('click', function () { set(x[0]); });
      box.appendChild(b);
    });
    var blogBtn = links.querySelector('.btn');
    if (blogBtn) links.insertBefore(box, blogBtn); else links.appendChild(box);
  }

  window.I18N = {
    get lang() { return lang; },
    t: t,
    place: place,
    s: phrase,
    project: project,
    set: set,
    apply: apply
  };

  buildSwitch();
  apply();
})();
