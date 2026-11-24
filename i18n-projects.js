// Layihələrin Azərbaycan dilində mətnləri (slug üzrə).
window.PROJECTS_AZ = {
  'utopia': {
    subtitle: 'Windows üçün AI əməliyyat sistemi · Junction 2026',
    tags: ['Masaüstü tətbiq', 'AI Agentləri', 'Electron', 'Hakaton'],
    summary: 'Utopia (UOS) Finlandiyanın Espoo şəhərində keçirilən Junction 2026 hakatonunda hazırlanmış AI əməliyyat sistemidir. Bütün kompüteri tək bir interfeysdən idarə etməyə imkan verir: qovluqlar, proqramlar və onlarla brauzer tabı arasında gəzmək əvəzinə istədiyinizi bir yerdə yazırsınız — Utopia faylları tapıb redaktə edir, tətbiqləri açır, paylaşdığınız Chrome tablarını oxuyur, canlı axtarış aparır və nəticəni aydın vizual kartlar və ya hesabat şəklində təqdim edir.',
    did: ['Masaüstü tətbiqin arxitekturası və interfeysi', 'Agent koordinatoru və lokal fayl alətləri', 'Chrome əlavəsi və cihaz körpüsü', 'Lendinq səhifəsi və Windows Beta buraxılışı'],
    details: [
      'Tədbir: Junction 2026 (European Tech Renaissance)',
      'Tarix: 13–15 noyabr 2026',
      'Məkan: Hype Areena, Espoo, Finlandiya',
      'İstiqamət: Agentic AI',
      'Texnologiyalar: Electron, Node.js, Claude, Exa, NSIS',
      'Buraxılış: Windows Beta (v0.19.11)'
    ],
    story: [
      {
        heading: 'Haqqında',
        text: [
          'Utopia (UOS) Finlandiyanın Espoo şəhərində, Hype Areena-da keçirilən Junction 2026 (13–15 noyabr 2026) hakatonunda 48 saat ərzində ərsəyə gəldi. “European Tech Renaissance” mövzusu altında Avropanın dörd bir yanından gələn mühəndis və developerlər bir həftəsonunda işlək məhsullar hazırlamaq üçün toplaşmışdı.',
          'Agentic AI istiqamətinə hamımızın hər gün qarşılaşdığı bir problemdən yola çıxaraq qoşulduq: fayllar, qeydlər, proqramlar və brauzer tabları onlarla fərqli pəncərəyə səpələnib, süni intellekt isə hələ də kompüterdəki işlərə toxuna bilməyən ayrı bir çat pəncərəsində qalıb.'
        ],
        captions: ['Hype Areena, Espoo — Junction 2026']
      },
      {
        heading: 'İdeya',
        text: [
          'Fikrimizcə, proqram təminatının gələcəyi növbəti bir tətbiq və ya brauzer əlavəsi deyil — bütün kompüteri tək interfeysdən idarə edən AI əməliyyat sistemi qatıdır. Faylları qovluq-qovluq axtarmaq, beş fərqli proqram arasında keçid etmək və mətnləri çat pəncərəsinə köçürmək əvəzinə, məqsədinizi birbaşa deyirsiniz və sistem qalan işi kompüterinizdə özü koordinasiya edir.',
          'İlk saatdan etibarən üç əsas prinsipə güvəndik. Birincisi, nəzarətli lokal kontekst: bütün diski buluda yükləmək əvəzinə, Utopia yalnız sizin icazə verdiyiniz qovluqları və Chrome tablarını görür, şəxsi məlumatlara toxunmur. İkincisi, çərçivələnmiş agent icrası: nəzarətsiz dövrələr əvəzinə konkret alət siyahısı, aydın oxuma/yazma limitləri və geri qaytarıla bilən dəyişikliklər sistemi etibarlı edir. Üçüncüsü isə vizual cavablar: uzun mətn blokları əvəzinə, tapşırığa uyğun müqayisə cədvəlləri, fayl əməliyyatları, siyahılar və yoxlanılmış hesabatlar göstərilir.'
        ]
      },
      {
        heading: 'Məhsul',
        text: [
          'Utopia (UOS) v0.19.11 Windows üçün Electron əsaslı masaüstü tətbiq, server tərəfli axtarış/səs şlüzü və NSIS quraşdırıcısından (Utopia-Setup.exe) ibarətdir. Lokal kontekst mühərriki (context-store.cjs) 40 qovluq dərinliyinə, 150 min qeydə və 100 min fayla qədər indeksləmə aparır, icazəli qovluqlardan kənara çıxan keçidləri bloklayır, TXT, MD, CSV, JSON, LOG və ICS fayllarını oxuyur və dəyişiklikləri geri qaytarmaq imkanı ilə yoxlanılmış hesabatlar yaradır.',
          'Brauzer inteqrasiyası üçün hazırladığımız Chrome əlavəsi 256-bitlik qoşulma açarı və activeTab icazəsi ilə qorunan yalnız lokal körpü (127.0.0.1:43127) üzərindən işləyir; PowerShell skriptləri vasitəsilə isə Start menyusundakı proqramlar tanınır və birbaşa açılır. Arxa planda Claude və Exa əsasında qurulmuş koordinator (coordinator.mjs) çoxaddımlı axtarış və əməliyyatları idarə edir, Windows safeStorage cihaz açarlarını şifrələyir, hesabsız qeydiyyat xidməti isə istifadəçilərə API açarı yazmadan Utopia Beta-nı dərhal sınamaq imkanı verir.'
        ]
      },
      {
        heading: 'Səhnədən iş masasına',
        text: [
          'Həftəsonu boyu Google DeepMind və NVIDIA kimi tərəfdaşların “European Tech Renaissance” və agent əsaslı sistemlər haqqında çıxış etdiyi əsas səhnənin düz qarşısında çalışırdıq.',
          'Bu çıxışları bir neçə addımlıqdan dinləmək bizi təqdimat slaydlarından çox real işləyən masaüstü tətbiqə — fayl təhlükəsizliyi, Chrome qoşulması və canlı axtarışın başdan-ayağa işləməsinə köklədi.'
        ],
        captions: ['Əsas səhnədə Google DeepMind', 'NVIDIA — European Tech Renaissance']
      },
      {
        heading: '48 saatlıq marafon',
        bento: [
          { caption: 'Əsas səhnə qarşısında iş prosesi', alt: 'Junction 2026 əsas səhnəsi qarşısında Utopia üzərində iş' },
          {
            text: [
              'Bütün həftəsonu dayanmadan Electron koordinatoru, lokal fayl alətləri və Chrome körpüsü üzərində işlədik ki, masaüstü tətbiqlə veb səhifə bir bütün kimi işləsin.',
              'Hər bir təhlükəsizlik addımı — qovluq icazəsi, birdəfəlik qoşulma açarı və bir kliklə bağlantını kəsmək — elə əvvəldən məhsulun özünə daxil edildi.'
            ]
          },
          {
            text: [
              'Bazar gününə artıq hesabsız işləyən, birdəfəlik cihaz razılığı olan Windows Beta quraşdırıcısı (Utopia-Setup.exe) və ictimai lendinq səhifəsi hazır idi.',
              '48 saat ərzində həm işlək masaüstü tətbiqi, həm də onun veb səhifəsini çıxarmaq Junction 2026-nı yaddaqalan etdi.'
            ]
          },
          { caption: 'Gecə yarısı komanda işi', alt: 'Junction 2026-da gecə yarısı iş prosesi' }
        ]
      },
      {
        heading: 'European Tech Renaissance',
        text: [
          'Espoo-dakı iki gərgin gecədən sonra əlimizdə işlək Windows Beta versiyası (v0.19.11), ictimai lendinq səhifəsi və bütün kompüteri tək AI interfeysindən idarə etmək üçün real texniki baza qaldı.'
        ],
        captions: ['Junction 2026 — European Tech Renaissance']
      }
    ]
  },
  'carbonic': {
    subtitle: 'Qablaşdırma emissiyaları üzrə marşrut planlayıcısı · Climathon 2026',
    summary: 'Riqada keçirilən Climathon 2026 hakatonunda Latvijas Zaļais punkts (LZP) üçün hazırlanmış alətdir. LDPE plastik plyonkanın yandırılmaq və ya poliqona göndərilmək əvəzinə LZP tərəfdaşları vasitəsilə təkrar emal edilməsinin istixana qazı emissiyalarını nə qədər azaltdığını — hər rəqəmin elmi mənbəyi ilə birlikdə — hesablayır.',
    did: ['Platformanın dizaynı', 'Platformanın hazırlanması', 'Araşdırma dəstəyi', 'Komanda ilə ideya üzərində iş'],
    details: [
      'Tədbir: Climathon 2026, Riqa Texniki Universiteti',
      'Tarix: 30 oktyabr – 1 noyabr 2026',
      'Çağırış tərəfdaşı: Latvijas Zaļais punkts (LZP)',
      'İstiqamət: Dairəvi iqtisadiyyat',
      'Texnologiyalar: React, TypeScript, Vite, Tailwind',
      'Status: Canlı'
    ],
    story: [
      {
        heading: 'Problem',
        text: [
          'Latvijas Zaļais punkts (LZP) Latviyada qablaşdırma tullantılarının toplanması və təkrar emalını təşkil edir. Plastik plyonka (LDPE) ən çətin tullantı növlərindən biridir: təkrar emal olunmadıqda ya yandırılır, ya da basdırılır; təkrar emala göndərildikdə isə altı fərqli ölkədəki tərəfdaş zavodlara daşınır və hər birinin məsafəsi, texnologiyası və enerji mənbəyi fərqlidir.',
          'Buna görə də sadə görünən bir suala dəqiq cavab vermək çətindir: bu plyonkanın təkrar emalı iqlimə ziyanı real olaraq nə qədər azaldır? LZP elmi əsaslı, şəffaf və gündəlik işdə tətbiq oluna bilən bir alət istəyirdi.'
        ]
      },
      {
        heading: 'Çağırış',
        text: [
          'Climathon 2026 Riqa Texniki Universitetinin UniLab akseleratorunun təşkilatçılığı ilə keçirilən üçgünlük hakaton idi (30 oktyabr – 1 noyabr 2026). LZP dairəvi iqtisadiyyat istiqamətində konkret məsələ qoymuşdu: qablaşdırmanın təkrar emalının iqlimə təsirini dəqiq və şəffaf şəkildə necə ölçmək olar?',
          'Tapşırıq 2025-ci il məlumatları və etibarlı emissiya əmsalları əsasında CO2e göstəricisini hesablayan, hər mərhələdə əsas emissiya mənbələrini göstərən, ən azı iki ssenarini müqayisə edən və təkrar emaldan gələn qənaəti qiymətləndirən prototip tələb edirdi. Hesablamalar GHG Protocol və LCA prinsiplərinə uyğun olmalı, gələcəkdə karton və şüşəyə də genişlənə bilməli idi.'
        ]
      },
      {
        heading: 'Həll',
        text: [
          'Carbonic LZP mütəxəssisləri üçün daxili iş alətidir. Açılan kimi 2025-ci ilin real tərəfdaş məlumatları əsasında hazır nəticə göstərir — istifadəçi boş ekranla qarşılaşmır, istənilən parametri dəyişib alternativ ssenariləri dərhal yoxlaya bilir.',
          'Marşrut planlayıcısı istifadəçini addım-addım aparır: material və çəki (tonla), təyinat nöqtəsi (tərəfdaş zavod və ya şəhər), nəqliyyat növü (yük maşını, qatar və ya bərə) və hesablama parametrləri. Nəticədə yaranan, qarşısı alınan və xalis emissiyalar, mərhələlər üzrə bölgü, xəritədə marşrut və ən səmərəli seçimlər görünür. Müqayisə rejimi isə iki marşrutu yan-yana qoyur.'
        ],
        captions: ['Hesablamadan əvvəl göndərişin yoxlanılması']
      },
      {
        heading: 'Müştərilər və rəsmi hesabatlar üçün',
        text: [
          '“LZP ilə və LZP-siz” bölməsi müştərinin əsas sualına birbaşa cavab verir: qablaşdırmamın bu gün aqibəti nə olur və LZP onu təkrar emal etsə fərq nə qədərdir? Bütün hesablamalar tarixçədə saxlanılır və hesabat bölməsi onları dövlət qurumları və ya müştərilər üçün həftəlik və aylıq PDF və ya Excel faylına çevirir.'
        ],
        captions: ['LZP ilə və LZP-siz müqayisəsi']
      },
      {
        heading: 'Şəffaf hesablamalar',
        text: [
          'Sistemdəki hər bir rəqəmin mənbəyi açıqdır. Metodologiya paneli düsturları, hesablama sərhədlərini və bütün əmsalları mənbələri ilə birlikdə göstərir; təxmini göstəricilər isə ayrıca qeyd olunur. Aşağı, Baza və Yüksək ssenarilər tək rəqəm yerinə real diapazon verir. Alət nəticələrin sertifikatlı LCA deyil, hesablama təxmini olduğunu açıq şəkildə bildirir. Karton və şüşə isə artıq siyahıda “tezliklə” kimi nəzərdə tutulub.'
        ]
      },
      {
        heading: 'Proses',
        text: [
          'Həftəsonu cümə axşamı RTU-da açılış, tapşırıqların təqdimatı və komandaların qurulması ilə başladı. İlk işlək versiya şənbə axşamı hazır oldu, bazar səhəri isə 12:30-dakı təqdimatdan əvvəl LZP ilə təkrar emalın üstünlüyünü daha aydın göstərmək üçün müqayisə səhifəsini yenidən dizayn etdik.'
        ]
      }
    ]
  },
  'community-matchmaker': {
    subtitle: 'STUHI Tampere hakatonu · Junction çağırışı',
    summary: 'STUHI × Tampere hakatonunda Junction tapşırığı üçün komandamla hazırladığımız mobil tətbiqdir. Şimali Avropa və Baltikyanı ölkələrdə olan gənclərə komanda yoldaşı və mentor tapmaqda kömək edir — profillərə baxıb uyğunlaşma, ortaq qruplar və çat funksiyaları ilə.',
    awards: ['2-ci yer – Junction kateqoriyası', 'Ən yaxşı təqdimat mükafatı'],
    did: ['Məhsul və UI dizaynı', 'Tətbiqin hazırlanması', 'Uyğunlaşma və çat axınları', 'Komanda ilə təqdimat hazırlığı'],
    details: [
      'Tədbir: STUHI × Tampere Hakatonu, 24–25 oktyabr 2026',
      'Məkan: Tampere Universiteti, Hervanta kampusu',
      'Format: 48 saatlıq komanda hakatonu',
      'Mənim rolum: Mühəndislik və dizayn',
      'Nəticə: Junction kateqoriyasında 2-ci yer və Ən yaxşı təqdimat mükafatı'
    ],
    story: [
      {
        heading: 'Çağırış',
        text: [
          'STUHI × Tampere Hakatonu Tampere Universitetinin Hervanta kampusunda 48 saat davam etdi. Şənbə səhəri tərəfdaş şirkətlər real problemlərini təqdim etdilər və hər komanda öz istiqamətini seçdi.',
          'Biz Junction tapşırığını götürdük. Ondan sonrakı iki gün nə hazırlayacağımıza qərar vermək, işlək tətbiqi yığmaq və onu bir neçə dəqiqədə inandırıcı şəkildə təqdim etməyə hazırlaşmaqla keçdi.'
        ],
        captions: ['Komanda Junction nümayəndəsi ilə']
      },
      {
        heading: 'İdeya və hazırlıq',
        text: [
          'Tətbiq Şimali Avropa və Baltikyanı ölkələrdə birlikdə layihə qurmaq istəyənləri bir araya gətirir. İstifadəçilər komanda yoldaşı və ya mentor axtara, profillər arasında sürətlə keçid edə və ortaq maraqlar, bacarıqlar və ya boş vaxt əsasında niyə uyğun gəldiklərini qısa izahla görə bilirlər.',
          'Qarşılıqlı uyğunluq yarandıqda birbaşa yazışmaq mümkündür; qruplar isə yeni komandaların başlaması üçün ortaq məkan rolunu oynayır. Ana ekrandakı interaktiv qlobus regionu bir bütöv kimi göstərir və ideyanı tək bir şəhər çərçivəsindən çıxarır.',
          'Mühəndisliyin və dizaynın əsas hissəsini mən öz üzərimə götürdüm. Tünd və diqqəti yayındırmayan interfeys seçdim, bütün funksiyaları beş əsas bölmədə (Home, Swipe, Groups, Chats, Profile) cəmlədim ki, tətbiq telefonda tək əllə rahat idarə olunsun.',
          'Məqsədimiz sadəcə slayd göstərmək deyil, insanların öz telefonlarında açıb yoxlaya biləcəyi işlək tətbiq təqdim etmək idi. Yuxarıdakı canlı keçid və QR kod da elə həmin tətbiqə aparır.'
        ],
        captions: ['Tətbiqin hazırlanma prosesi']
      },
      {
        heading: 'Final və komanda',
        bento: [
          { caption: 'Ən yaxşı təqdimat mükafatı', alt: 'Ən yaxşı təqdimat sertifikatı ilə' },
          { text: ['Bazar günortası finala seçilən komandalar münsiflər qarşısında canlı demo təqdim etdilər.', 'Junction kateqoriyasında 2-ci yerə çıxdıq və ayrıca “Ən yaxşı təqdimat” mükafatını qazandıq.'] },
          { text: ['Hakaton komanda işidir. Gərgin qərarları, yuxusuz saatları və sonda qazanılan uğuru bu insanlarla bölüşmək mənim üçün ən yaddaqalan hissə oldu.', 'Qısa müddətdə işlək məhsul çıxarmaq baxımından əla təcrübə qazandıq.'] },
          { caption: 'Komanda yoldaşları', alt: 'Gecə sahildə komanda yoldaşları' }
        ]
      }
    ]
  },
  'payment-intelligence-dashboard': { subtitle: 'Ödəniş analitikası paneli', summary: 'Ödəniş əməliyyatlarını, uğursuzluqları və bərpa göstəricilərini izləmək üçün analitika paneli.' },
  'data-health': { subtitle: 'Data keyfiyyəti üzrə veb tətbiq', summary: 'Məlumat bazalarının keyfiyyətini və etibarlılığını yoxlayan veb tətbiq.' },
  'nemesis': { subtitle: 'Veb tətbiq', summary: 'İnterfeys və funksionallığı bir araya gətirən tam veb tətbiq.' },
  'insight-desk': { subtitle: 'Analitika veb tətbiqi', summary: 'Məlumatları aydın nəticələrə və qərarlara çevirən analitika platforması.' },
  'workflow-automation': { subtitle: 'Google Sheets və Gmail avtomatlaşdırması', summary: 'Google Sheets və Gmail arasında iş axınını avtomatlaşdıran inteqrasiya.' },
  'attendance-tracker': { subtitle: 'Davamiyyət izləmə tətbiqi', summary: 'Davamiyyəti qeydə almaq və izləmək üçün veb tətbiq.' },
  'military-ai': { subtitle: 'Korporativ AI həlləri', summary: 'AI əməliyyat platforması üçün müəssisə səviyyəli lendinq səhifəsi.' },
  'codeflow': { subtitle: 'AI kodlaşdırma köməkçisi', summary: 'AI kodlaşdırma köməkçisi üçün təqdimat səhifəsi.' },
  'aura-nft': { subtitle: 'NFT incəsənət qalereyası', summary: 'NFT rəqəmsal əsərləri üçün vitrin və qalereya səhifəsi.' },
  'f1-crew': { subtitle: 'Avtoidman icması üçün gözləmə siyahısı', summary: 'Avtoidman həvəskarları icması üçün gözləmə siyahısı səhifəsi.' },
  'horizon': { subtitle: 'Məhsuldarlıq platforması üçün gözləmə siyahısı', summary: 'Məhsuldarlıq platforması üçün gözləmə siyahısı səhifəsi.' },
  'cortex': { subtitle: 'Neyron informasiya sistemi', summary: 'Neyron informasiya sistemi üçün lendinq səhifə konsepti.' },
  'aether-robotics': { subtitle: 'Humanoid robototexnika lendinq səhifəsi', summary: 'Humanoid robototexnika şirkəti üçün təqdimat səhifəsi.' },
  'scribex': { subtitle: 'Rəqəmsal həllər platforması', summary: 'Rəqəmsal həllər platforması üçün təqdimat saytı.' },
  'triarii-growth': { subtitle: 'Agentlik platforması', summary: 'Böyümə yönümlü agentlik üçün müasir veb sayt.' }
};
