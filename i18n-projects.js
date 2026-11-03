// Azerbaijani copy for projects, keyed by slug. Anything not listed here (titles, links, images, years)
// comes from projects-data.js; tags, "what I did" and detail lines are translated through i18n.js phrases.
window.PROJECTS_AZ = {
  'carbonic': {
    subtitle: 'Qablaşdırma emissiyaları marşrut planlayıcısı · Climathon 2026',
    summary: 'Riqada Climathon 2026-da Latvijas Zaļais punkts (LZP) üçün hazırlanmış alət. LDPE plastik filmi yandırmaq və ya basdırmaq əvəzinə LZP-nin tərəfdaşları vasitəsilə təkrar emal etdikdə istixana qazı emissiyalarının necə dəyişdiyini göstərir, hər rəqəmin mənbəyi ilə birlikdə.',
    did: ['Platformanın dizaynı', 'Platformanın hazırlanması', 'Tədqiqata dəstək', 'Komanda ilə ideya generasiyası'],
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
          'Latvijas Zaļais punkts (LZP) Latviyada qablaşdırma tullantılarının toplanmasını və təkrar emalını təşkil edir. Plastik film (LDPE) daha çətin axınlardan biridir: təkrar emal olunmadıqda əsasən yandırılır və ya basdırılır, təkrar emal olunduqda isə altı ölkədəki tərəfdaşlara göndərilir və hər birində məsafələr, texnologiya və enerji fərqlidir.',
          'Bu, sadə bir sualı cavablandırmağı çətinləşdirir: bu filmin təkrar emalı iqlimə təsiri həqiqətən nə qədər azaldır? LZP elmi cəhətdən əsaslandırılmış, şəffaf və praktikada istifadə oluna bilən cavab istəyirdi.'
        ]
      },
      {
        heading: 'Çağırış',
        text: [
          'Climathon 2026 Riqa Texniki Universitetində (30 oktyabr – 1 noyabr 2026) üç günlük hakaton idi və RTU-nun UniLab akseleratoru tərəfindən təşkil olunurdu. LZP dairəvi iqtisadiyyat istiqamətinə bir çağırış gətirdi: qablaşdırmanın təkrar emalının iqlimə təsirini necə ölçmək olar?',
          'Tapşırıq 2025 məlumatları və etibarlı emissiya əmsalları əsasında prototip tələb edirdi: istixana qazı emissiyalarını CO2e ilə hesablamaq, hər mərhələdə əsas mənbələri göstərmək, ən azı iki təkrar emal ssenarisini müqayisə etmək və təkrar emal olunmuş materialdan istifadə etdikdə qənaəti qiymətləndirmək. O, həmçinin GHG Protocol və həyat dövrü qiymətləndirməsi kimi qəbul olunmuş metodlara əsaslanmalı və karton və şüşə kimi digər materiallara uyğunlaşdırıla bilməli idi.'
        ]
      },
      {
        heading: 'Həll',
        text: [
          'Carbonic LZP mütəxəssisləri üçün daxili alətdir. O, LZP-nin 2025 tərəfdaş məlumatlarından qurulmuş hazır nəticə ilə açılır, beləliklə heç kim boş ekrandan başlamır və hər giriş istəyə bağlı “bəs əgər” ssenarisidir.',
          'Marşrut planlayıcısı hər ekranda bir sual verir: hansı material və neçə ton, hara gedir (tərəfdaş və ya şəhər), necə daşınır (yük maşını, qatar və ya bərə) və hansı hesablama parametrləri istifadə olunur. Sonra yaranan, qarşısı alınan və xalis emissiyaları, mərhələlər üzrə bölgünü, xəritədə marşrutu və ən səmərəli variantları göstərir. Müqayisə iki marşrutu yan-yana qoyur.'
        ],
        captions: ['Hesablamadan əvvəl göndərişin yoxlanılması']
      },
      {
        heading: 'Müştərilər və səlahiyyətli orqanlar üçün',
        text: [
          'İkinci görünüş, LZP ilə və LZP-siz, müştərinin sualına birbaşa cavab verir: mənim qablaşdırmamın bu gün aqibəti nədir və LZP onu təkrar emal etsə nə dəyişir? Tamamlanmış axtarışlar qeydiyyatda saxlanılır, hesabat səhifəsi isə onları hökumət və ya müştəri üçün həftəlik və ya aylıq hesabata, PDF və ya Excel faylı şəklində çevirir.'
        ],
        captions: ['LZP ilə və LZP-siz']
      },
      {
        heading: 'Dürüst rəqəmlər',
        text: [
          'Hər rəqəmi izləmək olar. Method paneli düsturları, sistem sərhədini və hər əmsalı mənbəyi ilə birlikdə göstərir, yalnız təxmin olan əmsallar isə tətbiqdə belə işarələnir. Low, Base və High halları tək rəqəm əvəzinə aralığı göstərir. Nəticələr hesablanmış təxminlərdir, sertifikatlı həyat dövrü qiymətləndirməsi deyil və alət bunu özü bildirir. Karton və şüşə material siyahısında artıq “tezliklə” kimi var.'
        ]
      },
      {
        heading: 'Yol',
        text: [
          'Həftə sonu cümə günü axşam RTU-da açılış, çağırışların təqdimatı və komandaların formalaşması ilə başladı. İlk versiyamız şənbə axşamı repozitoriyaya düşdü, bazar günü səhər isə saat 12:30-dakı təqdimatdan əvvəl LZP ilə təkrar emalın niyə daha yaxşı olduğunu göstərmək üçün “LZP ilə və LZP-siz” səhifəsini yenidən dizayn etdik.'
        ]
      }
    ]
  },
  'community-matchmaker': {
    subtitle: 'STUHI Tampere hakatonu · Junction çağırışı',
    summary: 'STUHI × Tampere hakatonunda Junction çağırışı üçün komandamla hazırladığım mobil tətbiq. Şimali Avropa və Baltikyanı ölkələrdə insanlara komanda yoldaşı və mentor tapmasına kömək edir: sürüşdürmə ilə uyğunlaşdırma, qruplar və çat.',
    awards: ['2-ci yer – Junction kateqoriyası', 'Ən yaxşı təqdimat mükafatı'],
    did: ['Məhsul dizaynı və UI', 'Tətbiqin mühəndisliyi', 'Uyğunlaşdırma və çat axınları', 'Komanda ilə təqdimatın hazırlanması'],
    details: [
      'Tədbir: STUHI × Tampere Hakatonu, 24–25 oktyabr 2026',
      'Məkan: Tampere Universiteti, Hervanta kampusu',
      'Format: 48 saatlıq komanda hakatonu',
      'Mənim rolum: mühəndislik və dizayn',
      'Nəticə: Junction kateqoriyasında 2-ci yer və Ən yaxşı təqdimat mükafatı'
    ],
    story: [
      {
        heading: 'Çağırış',
        text: [
          'STUHI × Tampere Hakatonu Tampere Universitetinin Hervanta kampusunda 48 saat davam etdi. Şənbə səhər tərəfdaş şirkətlər real problemlərini təqdim etdilər və hər komanda həll etmək üçün birini seçdi.',
          'Komandamız Junction çağırışını seçdi. Bundan sonra həftə sonu nəyi qurmaqı qərara almaq, onu qurmaq və bir neçə dəqiqəyə izah etməyi öyrənmək üçün keçdi.'
        ],
        captions: ['Komanda Junction nümayəndəsi ilə']
      },
      {
        heading: 'İdeya və qurulma',
        text: [
          'Tətbiq Şimali Avropa və Baltikyanı ölkələrdə insanların birlikdə işləmək üçün doğru insanları tapmasına kömək edir. Komanda yoldaşları və ya mentorlar axtara, profilləri sürüşdürə və “nə üçün uyğun gəlirsiniz” qeydini görə bilərsiniz; bu qeyd ortaq maraqlar və ya boş vaxt kimi əlaqəni izah edir.',
          'İki nəfər uyğun gəldikdə çat edə bilərlər, qruplar isə komandalara başlamaq üçün ortaq yer verir. Ana ekran regionu qlobus şəklində göstərir, buna görə də bütöv ideya bir şəhərdən daha böyük hiss olunur.',
          'Mühəndisliyin və dizaynın əksər hissəsini mən etdim. İnterfeysi sakit və tünd saxladım, bir parlaq vurgu ilə; hər şeyi beş tabın (Home, Swipe, Groups, Chats və Profile) arxasına yerləşdirdim ki, bir baş barmaqla istifadə olunsun.',
          'Məqsəd yalnız slayd deyil, insanların telefonlarında aça biləcəyi işlək tətbiq idi. Buna görə də yuxarıdakı canlı önbaxış və QR kod həqiqi tətbiqə aparır.'
        ],
        captions: ['Tətbiqin qurulması']
      },
      {
        heading: 'Final və komanda',
        bento: [
          { caption: 'Ən yaxşı təqdimat mükafatı', alt: 'Ən yaxşı təqdimat sertifikatını tutaraq' },
          { text: ['Bazar günü günorta finala seçilmiş komandalar münsiflər heyətinə demo təqdim etdilər.', 'Junction kateqoriyasında 2-ci yer tutduq və həmçinin Ən yaxşı təqdimat mükafatını qazandıq.'] },
          { text: ['Hakaton komanda oyunudur. İşi, gec qərarları və nəticəni bu insanlarla bölüşmək yadda saxlayacağım hissədir.', 'Bu, əla təcrübə oldu və işlək həll yaratmaq barədə bizə çox şey öyrətdi.'] },
          { caption: 'Komanda yoldaşları', alt: 'Gecə su kənarında komanda yoldaşları' }
        ]
      }
    ]
  },
  'payment-intelligence-dashboard': { subtitle: 'Ödəniş analitikası paneli', summary: 'Ödəniş məlumatlarını araşdırmaq üçün idarə paneli interfeysi.' },
  'data-health': { subtitle: 'Data keyfiyyəti veb tətbiqi', summary: 'Verilənlər toplularının sağlamlığını yoxlamaq üçün veb tətbiq.' },
  'nemesis': { subtitle: 'Veb tətbiq', summary: 'İnterfeys və funksiyaya fokuslanan tam veb tətbiq.' },
  'insight-desk': { subtitle: 'Analitika veb tətbiqi', summary: 'Məlumatı oxunaqlı insaytlara çevirən veb tətbiq.' },
  'workflow-automation': { subtitle: 'Google Sheets və Gmail avtomatlaşdırması', summary: 'Google Sheets və Gmail-i birləşdirən avtomatlaşdırılmış ssenari.' },
  'attendance-tracker': { subtitle: 'Davamiyyət izləmə tətbiqi', summary: 'Davamiyyəti izləmək üçün veb tətbiq.' },
  'military-ai': { subtitle: 'Sİ müəssisə həlləri', summary: 'Sİ əməliyyat platforması üçün müəssisə üslubunda lendinq təcrübəsi.' },
  'codeflow': { subtitle: 'Sİ kodlaşdırma assistenti', summary: 'Sİ kodlaşdırma assistenti üçün məhsul səhifəsi.' },
  'aura-nft': { subtitle: 'NFT incəsənət nümayışi', summary: 'NFT əsərlərinin nümayışi üçün vitrin düzəni.' },
  'f1-crew': { subtitle: 'Motorsport icması üçün gözləmə siyahısı', summary: 'Motorsport icması üçün gözləmə siyahısı səhifəsi.' },
  'horizon': { subtitle: 'Məhsuldarlıq platforması üçün gözləmə siyahısı', summary: 'Məhsuldarlıq platforması üçün gözləmə siyahısı səhifəsi.' },
  'cortex': { subtitle: 'Neyron informasiya sistemi', summary: 'Neyron informasiya sistemi üçün lendinq səhifə konsepti.' },
  'aether-robotics': { subtitle: 'Humanoid sistemlər üçün lendinq səhifə', summary: 'Humanoid robototexnika şirkəti üçün lendinq səhifə.' },
  'scribex': { subtitle: 'Rəqəmsal həllər platforması', summary: 'Rəqəmsal həllər platforması üçün marketinq saytı.' },
  'triarii-growth': { subtitle: 'Dinamik agentlik platforması', summary: 'Böyümə agentliyi üçün dinamik sayt.' }
};
