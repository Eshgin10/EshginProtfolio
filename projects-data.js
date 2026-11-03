// Shared project data for the gallery carousel (index.html) and detail page (project.html).
// Edit copy, years, tags and lists here; both pages pick it up.
window.PROJECTS = [
  {
    group: 'gallery',
    slug: 'military-ai',
    title: 'Military AI Ops',
    subtitle: 'AI Enterprise Solutions',
    year: '2026',
    tags: ['Web Design', 'Front-end'],
    image: '/Images/military-ai.png',
    summary: 'An enterprise-style landing experience for an AI operations platform.',
    did: ['Landing page design', 'Responsive front-end', 'Interaction design', 'Content structure'],
    details: ['Type: AI platform', 'Format: Landing page', 'Hosting: Emergent', 'Status: Live'],
    live: 'https://military-ai-ops.preview.emergentagent.com/',
    source: ''
  },
  {
    group: 'gallery',
    slug: 'codeflow',
    title: 'CodeFlow',
    subtitle: 'AI Coding Assistant',
    year: '2026',
    tags: ['Web Design', 'Front-end'],
    image: '/Images/codeflow.png',
    summary: 'A product page for an AI coding assistant.',
    did: ['Landing page design', 'Responsive front-end', 'Interaction design', 'Product messaging'],
    details: ['Type: Developer tool', 'Format: Landing page', 'Hosting: GitHub Pages', 'Status: Live'],
    live: 'https://eshgin10.github.io/CodeFlow/',
    source: 'https://github.com/Eshgin10/CodeFlow'
  },
  {
    group: 'gallery',
    slug: 'aura-nft',
    title: 'Aura NFT',
    subtitle: 'NFT Art Display',
    year: '2026',
    tags: ['Web Design', 'Gallery'],
    image: '/Images/aura-nft.png',
    summary: 'A showcase layout for displaying NFT artwork.',
    did: ['Visual design', 'Gallery layout', 'Responsive front-end', 'Interaction design'],
    details: ['Type: Art display', 'Format: Showcase site', 'Hosting: Lovable', 'Status: Live'],
    live: 'https://aura-nft-art-display.lovable.app/',
    source: ''
  },
  {
    group: 'gallery',
    slug: 'f1-crew',
    title: 'F1 Crew',
    subtitle: 'Motorsport Community Waitlist',
    year: '2026',
    tags: ['Waitlist', 'Front-end'],
    image: '/Images/f1-waitlist.png',
    summary: 'A waitlist page for a motorsport community.',
    did: ['Landing page design', 'Waitlist flow', 'Responsive front-end', 'Interaction design'],
    details: ['Type: Community', 'Format: Waitlist page', 'Hosting: GitHub Pages', 'Status: Live'],
    live: 'https://eshgin10.github.io/F1-Waitlist/',
    source: 'https://github.com/Eshgin10/F1-Waitlist'
  },
  {
    group: 'gallery',
    slug: 'horizon',
    title: 'Horizon',
    subtitle: 'Productivity Platform Waitlist',
    year: '2026',
    tags: ['Waitlist', 'Front-end'],
    image: '/Images/horizon-waitlist.png',
    summary: 'A waitlist page for a productivity platform.',
    did: ['Landing page design', 'Waitlist flow', 'Responsive front-end', 'Interaction design'],
    details: ['Type: Productivity', 'Format: Waitlist page', 'Hosting: GitHub Pages', 'Status: Live'],
    live: 'https://eshgin10.github.io/Horizon-Waitlist/',
    source: 'https://github.com/Eshgin10/Horizon-Waitlist'
  },
  {
    group: 'gallery',
    slug: 'cortex',
    title: 'Cortex',
    subtitle: 'Neural Information System',
    year: '2026',
    tags: ['Web Design', 'Front-end'],
    image: '/Images/cortex.png',
    summary: 'A landing page concept for a neural information system.',
    did: ['Visual design', 'Responsive front-end', 'Interaction design', 'Content structure'],
    details: ['Type: Concept', 'Format: Landing page', 'Hosting: GitHub Pages', 'Status: Live'],
    live: 'https://eshgin10.github.io/Cortex/',
    source: 'https://github.com/Eshgin10/Cortex'
  },
  {
    group: 'gallery',
    slug: 'aether-robotics',
    title: 'Aether Robotics',
    subtitle: 'Humanoid Systems Landing Page',
    year: '2026',
    tags: ['Web Design', 'Landing Page'],
    image: '/Images/aether.png',
    summary: 'A landing page for a humanoid robotics company.',
    did: ['Landing page design', 'Responsive front-end', 'Interaction design', 'Product messaging'],
    details: ['Type: Robotics', 'Format: Landing page', 'Hosting: Lovable', 'Status: Live'],
    live: 'https://aether-genesis-site-spark.lovable.app',
    source: ''
  },
  {
    group: 'gallery',
    slug: 'scribex',
    title: 'ScribeX',
    subtitle: 'Digital Solutions Platform',
    year: '2026',
    tags: ['Web Design', 'Front-end'],
    image: '/Images/scribex.png',
    summary: 'A marketing site for a digital solutions platform.',
    did: ['Landing page design', 'Responsive front-end', 'Interaction design', 'Content structure'],
    details: ['Type: Platform', 'Format: Marketing site', 'Hosting: GitHub Pages', 'Status: Live'],
    live: 'https://eshgin10.github.io/ScribeX/',
    source: 'https://github.com/Eshgin10/ScribeX'
  },
  {
    group: 'gallery',
    slug: 'triarii-growth',
    title: 'Triarii Growth',
    subtitle: 'Dynamic Agency Platform',
    year: '2026',
    tags: ['Agency', 'Front-end'],
    image: '/Images/triarii.png',
    summary: 'A dynamic website for a growth agency.',
    did: ['Landing page design', 'Responsive front-end', 'Interaction design', 'Content structure'],
    details: ['Type: Agency', 'Format: Marketing site', 'Hosting: GitHub Pages', 'Status: Live'],
    live: 'https://eshgin10.github.io/Triarii-Growth/',
    source: 'https://github.com/Eshgin10/Triarii-Growth'
  }
];

window.PROJECTS.unshift(
  {
    group: 'featured',
    slug: 'carbonic',
    title: 'Carbonic',
    subtitle: 'Packaging emissions route planner \u00b7 Climathon 2026',
    year: '2026',
    tags: ['Web App', 'Climate', 'Hackathon', 'Data'],
    image: '/Images/carbonic-result.webp',
    summary: 'A tool built at Climathon 2026 in Riga for Latvijas Za\u013cais punkts (LZP). It shows how greenhouse gas emissions change when LDPE plastic film is recycled through LZP\u2019s partners instead of being burned or buried, with a source for every number.',
    did: ['Route planner and results', 'Emissions calculation model', 'With LZP vs without comparison', 'PDF and Excel reports'],
    details: [
      'Event: Climathon 2026, Riga Technical University',
      'Dates: 30 Oct \u2013 1 Nov 2026',
      'Challenge partner: Latvijas Za\u013cais punkts (LZP)',
      'Track: Circular economy',
      'Stack: React, TypeScript, Vite, Tailwind',
      'Status: Live'
    ],
    screens: [
      { src: '/Images/carbonic-route-question.webp', alt: 'Choosing a recycling partner in the route planner' },
      { src: '/Images/carbonic-result.webp', alt: 'Result with net emissions, stage breakdown and route map' },
      { src: '/Images/carbonic-report.webp', alt: 'Report preview for the authorities' },
      { src: '/Images/carbonic-method.webp', alt: 'Method and sources panel' }
    ],
    story: [
      {
        heading: 'The problem',
        text: [
          'Latvijas Za\u013cais punkts (LZP) organises the collection and recycling of packaging waste in Latvia. Plastic film (LDPE) is one of the harder streams: when it is not recycled it is mostly burned or buried, and when it is recycled it travels to partners in six countries, each with different distances, technology and energy.',
          'That makes a simple question hard to answer: how much does recycling this film really reduce the climate impact? LZP wanted an answer that is scientifically grounded, transparent and usable in practice.'
        ]
      },
      {
        heading: 'The challenge',
        text: [
          'Climathon 2026 was a three-day hackathon at Riga Technical University (30 October \u2013 1 November 2026), organised by RTU\u2019s UniLab accelerator. LZP brought a challenge to the circular economy track: how to measure the climate impact of packaging recycling?',
          'The brief asked for a prototype, built on 2025 data and sound emission factors, that calculates greenhouse gas emissions in CO2e, shows the main sources at each stage, compares at least two recycling scenarios and estimates the saving from using recycled instead of virgin material. It also had to follow recognised methods such as the GHG Protocol and life cycle assessment, and be adaptable to other materials like cardboard and glass.'
        ]
      },
      {
        heading: 'The solution',
        text: [
          'Carbonic is an internal tool for LZP specialists. It opens on a finished result built from LZP\u2019s 2025 partner data, so nobody starts from an empty screen, and every input is an optional what-if.',
          'The route planner asks one question per screen: which material and how many tonnes, where it goes (a partner or a city), how it travels (truck, rail or ferry) and which calculation settings to use. Then it shows the emissions caused, the emissions avoided and the net result, with a breakdown by stage, the route on a map and the most efficient options. Compare puts two routes side by side.'
        ],
        images: [{ src: '/Images/carbonic-route-check.webp', alt: 'Checking the shipment before calculating', caption: 'Checking the shipment before calculating' }]
      },
      {
        heading: 'A worked example',
        stats: [
          { big: '\u221287.2 t', label: 'net CO2e for 100 t of film' },
          { big: '\u2212872 kg', label: 'CO2e per tonne recycled' },
          { big: '6', label: 'countries with recycling partners' },
          { big: '34.8 t', label: 'less CO2e a year for a 24 t customer' }
        ],
        note: 'Default settings: 100 t of LDPE film to Nordic Plast SIA, 50 km by truck, base case. Customer figure uses the default 24 t a year, recycled fully through LZP instead of the EU average.'
      },
      {
        heading: 'For customers and authorities',
        text: [
          'A second view, With LZP vs without, answers the customer\u2019s question directly: what happens to my packaging today, and what changes if LZP recycles it? Finished searches are saved in a record, and the report page turns them into a weekly or monthly report for the government or a customer, as a PDF or an Excel file.'
        ],
        images: [{ src: '/Images/carbonic-with-lzp.webp', alt: 'With LZP vs without comparison', caption: 'With LZP vs without' }]
      },
      {
        heading: 'Honest numbers',
        text: [
          'Every number can be traced. The Method panel lists the formulas, the system boundary and every factor with its source, and factors that are only estimates are marked as such in the app. Low, Base and High cases show a range instead of a single figure. The results are calculated estimates, not a certified life cycle assessment, and the tool says so. Cardboard and glass are already in the material list as coming soon.'
        ]
      },
      {
        heading: 'The journey',
        text: [
          'The weekend started on Friday evening at RTU with the opening, the challenge presentations and team forming. Our first version went into the repository on Saturday evening, and on Sunday morning we redesigned the With LZP page to show why recycling through LZP is better, ahead of the 12:30 pitch.'
        ]
      }
    ],
    live: 'https://eshgin10.github.io/carbonic/',
    source: 'https://github.com/Eshgin10/carbonic'
  },
  {
    group: 'featured',
    slug: 'community-matchmaker',
    title: 'Community Matchmaker',
    subtitle: 'STUHI Tampere Hackathon · Junction challenge',
    year: '2026',
    tags: ['Mobile App', 'Hackathon', 'Design', 'Engineering'],
    image: '/Images/junction-app-home.png',
    awards: ['2nd place – Junction category', 'Best Pitch award'],
    summary: 'A mobile app built with my team at the STUHI × Tampere Hackathon for the Junction challenge. It helps people in the Nordics and Baltics find teammates and mentors, with swipe-based matching, groups and chat.',
    did: ['Product design and UI', 'App engineering', 'Matching and chat flows', 'Pitch preparation with the team'],
    details: [
      'Event: STUHI × Tampere Hackathon, 24–25 Oct 2026',
      'Venue: Tampere University, Hervanta campus',
      'Format: 48-hour team hackathon',
      'My role: engineering and design',
      'Result: 2nd place in the Junction category and the Best Pitch award'
    ],
    screens: [
      { src: '/Images/junction-app-welcome.png', alt: 'Welcome screen' },
      { src: '/Images/junction-app-home.png', alt: 'Home screen with the Nordics and Baltics globe' },
      { src: '/Images/junction-app-swipe.png', alt: 'Swipe screen with a match' },
      { src: '/Images/junction-app-chats.png', alt: 'Chats list' },
      { src: '/Images/junction-app-profile.png', alt: 'Profile screen' }
    ],
    story: [
      {
        heading: 'The challenge',
        text: [
          'The STUHI × Tampere Hackathon ran for 48 hours at Tampere University’s Hervanta campus. On Saturday morning the partner companies presented real problems and every team picked one to solve.',
          'Our team went for the Junction challenge. From there it was a weekend of deciding what to build, building it, and learning how to explain it in a few minutes.'
        ],
        images: [{ src: '/Images/junction-team.jpg', alt: 'The team with a Junction representative at the venue', caption: 'The team with a Junction representative' }]
      },
      {
        heading: 'The idea and the build',
        text: [
          'The app helps people across the Nordics and Baltics find the right people to build with. You can look for teammates or mentors, swipe through profiles, and see a short “why you match” note that explains the connection, such as shared interests or free time.',
          'Once two people match they can chat, and groups give teams a shared place to start. The home screen shows the region as a globe, so the whole idea feels bigger than one city.',
          'I handled most of the engineering and the design. I kept the interface calm and dark with one bright accent, and put everything behind five tabs (Home, Swipe, Groups, Chats and Profile) so it works with one thumb.',
          'The goal was a working app people could open on their phone, not just a slide deck. That is why the live preview and the QR code above go to the real thing.'
        ],
        images: [{ src: '/Images/junction-pitching.jpg', alt: 'Working on the app during the hackathon', caption: 'Building the app' }]
      },
      {
        heading: 'The final and the team',
        bento: [
          { area: 'photo-a', src: '/Images/junction-best-pitch.jpg', alt: 'Holding the Best Pitch certificate', caption: 'Best Pitch award' },
          {
            area: 'text-a',
            text: [
              'On Sunday afternoon the teams chosen for the final demoed to the jury.',
              'We finished 2nd in the Junction category and also took home the Best Pitch award.'
            ]
          },
          {
            area: 'text-b',
            text: [
              'A hackathon is a team sport. Sharing the work, the late decisions and the result with these people is the part I will remember.',
              'It was a great experience and taught us a lot about creating a working solution.'
            ]
          },
          { area: 'photo-b', src: '/Images/junction-teammates-night.jpg', alt: 'Teammates by the water at night', caption: 'Teammates' }
        ]
      }
    ],
    qr: '/Images/junction-app-qr.png',
    live: 'https://c49d465b-202a-452c-8eb7-126ee7a81d6c.web.bilt.me',
    source: ''
  },
  {
    group: 'featured',
    slug: 'payment-intelligence-dashboard',
    title: 'Payment Intelligence Dashboard',
    subtitle: 'Payments Analytics Dashboard',
    year: '2026',
    tags: ['Full-stack', 'Dashboard'],
    image: '/Images/payment-intelligence-dashboard.png',
    summary: 'A dashboard interface for exploring payment data.',
    did: ['Interface design', 'Front-end build', 'Back-end & data', 'Deployment'],
    details: ['Type: Dashboard', 'Format: Web app', 'Hosting: Render', 'Status: Live'],
    live: 'https://payment-intelligence-dashboard.onrender.com/',
    source: 'https://github.com/Eshgin10/Payment-Intelligence-Dashboard'
  },
  {
    group: 'featured',
    slug: 'data-health',
    title: 'Data Health',
    subtitle: 'Data Quality Web App',
    year: '2026',
    tags: ['Full-stack', 'Web App'],
    image: '/Images/data-health.png',
    summary: 'A web app for checking the health of datasets.',
    did: ['Interface design', 'Front-end build', 'Back-end & data', 'Deployment'],
    details: ['Type: Data tool', 'Format: Web app', 'Hosting: Railway', 'Status: Live'],
    live: 'https://datahealth-production.up.railway.app/',
    source: 'https://github.com/Eshgin10/DataHealth'
  },
  {
    group: 'featured',
    slug: 'nemesis',
    title: 'Nemesis',
    subtitle: 'Web Application',
    year: '2026',
    tags: ['Full-stack', 'Web App'],
    image: '/Images/nemesis.png',
    summary: 'A full web application with a focus on interface and function.',
    did: ['Interface design', 'Front-end build', 'Back-end & data', 'Deployment'],
    details: ['Type: Web app', 'Format: Full-stack', 'Hosting: Vercel', 'Status: Live'],
    live: 'https://nemesis-lime-chi.vercel.app/',
    source: 'https://github.com/Eshgin10/Nemesis'
  },
  {
    group: 'featured',
    slug: 'insight-desk',
    title: 'Insight Desk',
    subtitle: 'Insights Web App',
    year: '2026',
    tags: ['Full-stack', 'Web App'],
    image: '/Images/insight-desk.png',
    summary: 'A web app that turns data into readable insights.',
    did: ['Interface design', 'Front-end build', 'Back-end & data', 'Deployment'],
    details: ['Type: Insights tool', 'Format: Web app', 'Hosting: Render', 'Status: Live'],
    live: 'https://insight-desk-v35h.onrender.com/',
    source: 'https://github.com/Eshgin10/InsightDesk'
  },
  {
    group: 'featured',
    slug: 'workflow-automation',
    title: 'Workflow Automation',
    subtitle: 'Google Sheets and Gmail Automation',
    year: '2026',
    tags: ['Automation', 'Integration'],
    image: '/Images/workflow-automation.png',
    summary: 'An automated scenario connecting Google Sheets and Gmail.',
    did: ['Workflow design', 'Integration setup', 'Automation logic', 'Testing'],
    details: ['Type: Automation', 'Format: Scenario', 'Platform: Make', 'Status: Live'],
    live: 'https://eu1.make.com/public/shared-scenario/uCMLRIhjqdF/integration-google-sheets-gmail-tools',
    source: ''
  },
  {
    group: 'featured',
    slug: 'attendance-tracker',
    title: 'Attendance Tracker',
    subtitle: 'Attendance Tracking App',
    year: '2026',
    tags: ['Full-stack', 'Web App'],
    image: '/Images/attendance-tracker.png',
    summary: 'A web app for tracking attendance.',
    did: ['Interface design', 'Front-end build', 'Back-end & data', 'Deployment'],
    details: ['Type: Tracker', 'Format: Web app', 'Hosting: Vercel', 'Status: Live'],
    live: 'https://attendo-two.vercel.app/',
    source: 'https://github.com/Eshgin10/Attendo'
  }
);
