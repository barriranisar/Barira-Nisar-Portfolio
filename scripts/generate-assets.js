import fs from 'fs';
import path from 'path';

// Helper to write file
function writeSvg(filePath, svgContent) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, svgContent.trim(), 'utf-8');
  console.log(`Generated: ${filePath}`);
}

// 1. Profile Avatar (Creative editorial portrait illustration)
const profileSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181035"/>
      <stop offset="50%" stop-color="#0b071e"/>
      <stop offset="100%" stop-color="#05030d"/>
    </linearGradient>
    <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="40" />
    </filter>
  </defs>
  <rect width="600" height="700" fill="url(#bgGrad)"/>
  
  <!-- Glowing Ambient Orbs -->
  <circle cx="200" cy="220" r="140" fill="#8b5cf6" opacity="0.35" filter="url(#blurFilter)"/>
  <circle cx="420" cy="380" r="130" fill="#ec4899" opacity="0.3" filter="url(#blurFilter)"/>
  <circle cx="280" cy="520" r="110" fill="#3b82f6" opacity="0.25" filter="url(#blurFilter)"/>

  <!-- Cybernetic Grid & Geometry -->
  <g opacity="0.15" stroke="#ffffff" stroke-width="1">
    <line x1="50" y1="50" x2="550" y2="50" stroke-dasharray="6 6"/>
    <line x1="50" y1="650" x2="550" y2="650" stroke-dasharray="6 6"/>
    <line x1="50" y1="50" x2="50" y2="650" stroke-dasharray="6 6"/>
    <line x1="550" y1="50" x2="550" y2="650" stroke-dasharray="6 6"/>
    <circle cx="300" cy="350" r="180" fill="none" stroke="url(#neonGlow)" stroke-width="1.5" stroke-dasharray="10 5"/>
  </g>

  <!-- Editorial Silhouette & Tri-Identity Fusion -->
  <g transform="translate(150, 140)">
    <!-- Abstract Head & Torso -->
    <path d="M150 70 C100 70 80 120 80 170 C80 230 110 260 150 260 C190 260 220 230 220 170 C220 120 200 70 150 70 Z" fill="#1e183a" stroke="url(#neonGlow)" stroke-width="2"/>
    <!-- Eye Line / Creative Visor -->
    <rect x="100" y="160" width="100" height="12" rx="6" fill="url(#neonGlow)"/>
    <!-- Shading & Hair Line -->
    <path d="M90 140 C110 100 190 90 210 140 C215 110 180 80 150 80 C120 80 95 100 90 140 Z" fill="#2d2254"/>

    <!-- Shoulders -->
    <path d="M50 340 C60 270 110 250 150 250 C190 250 240 270 250 340 L280 430 L20 430 Z" fill="#130e26" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>

    <!-- Data Scientist: Matrix chart overlay -->
    <g transform="translate(-40, 220)">
      <rect width="110" height="70" rx="10" fill="#0c071d" stroke="#3b82f6" stroke-width="1.5" opacity="0.9"/>
      <path d="M10 50 L30 35 L55 42 L80 18 L100 25" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="80" cy="18" r="4" fill="#60a5fa"/>
      <text x="12" y="20" fill="#93c5fd" font-family="monospace" font-size="9">DATA [ML]</text>
    </g>

    <!-- Web Developer: Code badge -->
    <g transform="translate(230, 190)">
      <rect width="105" height="65" rx="10" fill="#0c071d" stroke="#8b5cf6" stroke-width="1.5" opacity="0.9"/>
      <text x="12" y="24" fill="#c084fc" font-family="monospace" font-size="10">&lt;React /&gt;</text>
      <text x="12" y="44" fill="#e9d5ff" font-family="monospace" font-size="8">clean_build()</text>
    </g>

    <!-- Photographer: Lens Ring -->
    <g transform="translate(100, 310)">
      <circle cx="50" cy="50" r="38" fill="#171030" stroke="url(#orangeGlow)" stroke-width="3"/>
      <circle cx="50" cy="50" r="24" fill="#090514" stroke="#ec4899" stroke-width="2"/>
      <circle cx="50" cy="50" r="10" fill="#ec4899" opacity="0.8"/>
      <circle cx="44" cy="44" r="3" fill="#ffffff" opacity="0.9"/>
      <!-- Aperture blades indication -->
      <line x1="50" y1="26" x2="68" y2="38" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
      <line x1="68" y1="38" x2="62" y2="60" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
      <line x1="62" y1="60" x2="38" y2="62" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    </g>
  </g>

  <!-- Editorial Typography Watermark -->
  <text x="50" y="620" fill="rgba(255,255,255,0.08)" font-family="sans-serif" font-weight="900" font-size="64" letter-spacing="4">BARIRA</text>
  <text x="50" y="645" fill="#ec4899" font-family="monospace" font-size="12" letter-spacing="2">CREATIVE TECHNOLOGIST &amp; VISUAL ARTIST</text>
</svg>`;

writeSvg('public/images/profile/avatar.svg', profileSvg);

// 2. Project 1: Air Quality Intelligence
const airQualitySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="p1Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1128"/>
      <stop offset="100%" stop-color="#040714"/>
    </linearGradient>
    <linearGradient id="p1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="50%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#p1Bg)"/>
  
  <!-- Grid backdrop -->
  <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
    <line x1="50" y1="100" x2="750" y2="100"/>
    <line x1="50" y1="180" x2="750" y2="180"/>
    <line x1="50" y1="260" x2="750" y2="260"/>
    <line x1="50" y1="340" x2="750" y2="340"/>
    <line x1="50" y1="420" x2="750" y2="420"/>
    <line x1="150" y1="60" x2="150" y2="440"/>
    <line x1="300" y1="60" x2="300" y2="440"/>
    <line x1="450" y1="60" x2="450" y2="440"/>
    <line x1="600" y1="60" x2="600" y2="440"/>
  </g>

  <!-- Metric Badges -->
  <g transform="translate(60, 40)">
    <rect width="180" height="40" rx="8" fill="#131e42" stroke="#3b82f6" stroke-width="1"/>
    <text x="15" y="24" fill="#93c5fd" font-family="sans-serif" font-size="12" font-weight="bold">PAKISTAN AQI INDEX: 184</text>
  </g>
  <g transform="translate(260, 40)">
    <rect width="160" height="40" rx="8" fill="#131e42" stroke="#06b6d4" stroke-width="1"/>
    <text x="15" y="24" fill="#67e8f9" font-family="sans-serif" font-size="12" font-weight="bold">PM2.5: 118 µg/m³</text>
  </g>
  <g transform="translate(440, 40)">
    <rect width="160" height="40" rx="8" fill="#131e42" stroke="#10b981" stroke-width="1"/>
    <text x="15" y="24" fill="#6ee7b7" font-family="sans-serif" font-size="12" font-weight="bold">MONITORED CITIES: 12</text>
  </g>

  <!-- Spline Chart Wave -->
  <path d="M 60 380 Q 150 220 250 280 T 450 160 T 620 220 T 740 130" fill="none" stroke="url(#p1Grad)" stroke-width="4" stroke-linecap="round"/>
  <path d="M 60 380 Q 150 220 250 280 T 450 160 T 620 220 T 740 130 L 740 420 L 60 420 Z" fill="url(#p1Grad)" opacity="0.12"/>

  <!-- City Data Nodes -->
  <circle cx="250" cy="280" r="7" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
  <text x="235" y="315" fill="#cbd5e1" font-family="sans-serif" font-size="11">Karachi</text>

  <circle cx="450" cy="160" r="8" fill="#ec4899" stroke="#ffffff" stroke-width="2"/>
  <text x="435" y="145" fill="#f472b6" font-family="sans-serif" font-size="12" font-weight="bold">Lahore (Peak)</text>

  <circle cx="620" cy="220" r="7" fill="#06b6d4" stroke="#ffffff" stroke-width="2"/>
  <text x="600" y="255" fill="#cbd5e1" font-family="sans-serif" font-size="11">Islamabad</text>

  <circle cx="740" cy="130" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
  <text x="710" y="115" fill="#cbd5e1" font-family="sans-serif" font-size="11">Peshawar</text>

  <!-- Tableau / BI Badge -->
  <g transform="translate(620, 430)">
    <rect width="130" height="28" rx="6" fill="#1e293b" stroke="rgba(255,255,255,0.2)"/>
    <text x="14" y="18" fill="#e2e8f0" font-family="monospace" font-size="10">TABLEAU / POWER BI</text>
  </g>
</svg>`;

writeSvg('public/images/projects/project-air-quality.svg', airQualitySvg);

// 3. Project 2: QueueBite
const queuebiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="qbBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1035"/>
      <stop offset="100%" stop-color="#0d061c"/>
    </linearGradient>
    <linearGradient id="qbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#qbBg)"/>

  <!-- Browser UI Window Container -->
  <g transform="translate(60, 40)">
    <rect width="680" height="420" rx="14" fill="#130b24" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
    
    <!-- Window Titlebar -->
    <rect width="680" height="38" rx="14" fill="#1a1130"/>
    <circle cx="24" cy="19" r="6" fill="#ef4444"/>
    <circle cx="44" cy="19" r="6" fill="#f59e0b"/>
    <circle cx="64" cy="19" r="6" fill="#10b981"/>
    <rect x="220" y="10" width="240" height="18" rx="6" fill="#0d061c"/>
    <text x="260" y="23" fill="#a78bfa" font-family="monospace" font-size="10">queuebite.campus.app</text>

    <!-- App Header inside UI -->
    <text x="30" y="80" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="800">QueueBite</text>
    <text x="140" y="80" fill="#ec4899" font-family="sans-serif" font-size="12" font-weight="600">SMART CANTEEN</text>

    <!-- Queue Status Bar -->
    <rect x="30" y="105" width="620" height="48" rx="8" fill="#1c1236" stroke="rgba(139,92,246,0.3)"/>
    <circle cx="55" cy="129" r="8" fill="#10b981"/>
    <text x="75" y="133" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="600">Current Queue: #24</text>
    <text x="280" y="133" fill="#a78bfa" font-family="sans-serif" font-size="13">Est. Wait Time: 4 mins</text>
    <rect x="520" y="115" width="115" height="28" rx="6" fill="url(#qbGrad)"/>
    <text x="538" y="133" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">READY FOR PICKUP</text>

    <!-- Menu Cards -->
    <g transform="translate(30, 175)">
      <!-- Item 1 -->
      <rect width="190" height="200" rx="10" fill="#1a1033" stroke="rgba(255,255,255,0.08)"/>
      <rect x="15" y="15" width="160" height="90" rx="6" fill="#2d1d52"/>
      <text x="95" y="65" text-anchor="middle" fill="#ec4899" font-size="28">☕</text>
      <text x="20" y="130" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">Mocha Espresso</text>
      <text x="20" y="150" fill="#9ca3af" font-family="sans-serif" font-size="11">Queue: 2 min prep</text>
      <rect x="20" y="165" width="150" height="26" rx="4" fill="#8b5cf6"/>
      <text x="60" y="182" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Order Now</text>
    </g>

    <g transform="translate(245, 175)">
      <!-- Item 2 -->
      <rect width="190" height="200" rx="10" fill="#1a1033" stroke="rgba(255,255,255,0.08)"/>
      <rect x="15" y="15" width="160" height="90" rx="6" fill="#2d1d52"/>
      <text x="95" y="65" text-anchor="middle" fill="#ec4899" font-size="28">🥪</text>
      <text x="20" y="130" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">Artisan Club Panini</text>
      <text x="20" y="150" fill="#9ca3af" font-family="sans-serif" font-size="11">Queue: 5 min prep</text>
      <rect x="20" y="165" width="150" height="26" rx="4" fill="#8b5cf6"/>
      <text x="60" y="182" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Order Now</text>
    </g>

    <g transform="translate(460, 175)">
      <!-- Item 3 -->
      <rect width="190" height="200" rx="10" fill="#1a1033" stroke="rgba(255,255,255,0.08)"/>
      <rect x="15" y="15" width="160" height="90" rx="6" fill="#2d1d52"/>
      <text x="95" y="65" text-anchor="middle" fill="#ec4899" font-size="28">🥗</text>
      <text x="20" y="130" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold">Fresh Harvest Bowl</text>
      <text x="20" y="150" fill="#9ca3af" font-family="sans-serif" font-size="11">Queue: Instant</text>
      <rect x="20" y="165" width="150" height="26" rx="4" fill="#8b5cf6"/>
      <text x="60" y="182" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Order Now</text>
    </g>
  </g>
</svg>`;

writeSvg('public/images/projects/project-queuebite.svg', queuebiteSvg);

// 4. Project 3: Unity 3D Flying Game
const unityGameSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="gameBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="60%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#311042"/>
    </linearGradient>
    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#gameBg)"/>

  <!-- Low-poly Sun & Sky glow -->
  <circle cx="400" cy="220" r="110" fill="url(#sunGrad)" opacity="0.65"/>
  <circle cx="400" cy="220" r="140" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="8 6" opacity="0.4"/>

  <!-- Floating Low-Poly Floating Islands -->
  <!-- Main Island -->
  <polygon points="400,260 520,300 480,360 400,390 320,360 280,300" fill="#3b2d54" stroke="#ec4899" stroke-width="2"/>
  <polygon points="400,260 520,300 400,310 280,300" fill="#4c3a6b"/>
  <polygon points="400,310 520,300 480,360 400,390" fill="#2d2242"/>

  <!-- Distant Left Floating Peak -->
  <polygon points="180,200 240,230 220,270 170,290 130,260" fill="#251a3a" stroke="#8b5cf6" stroke-width="1.5"/>
  <polygon points="180,200 240,230 180,240 130,260" fill="#352652"/>

  <!-- Right Floating Island -->
  <polygon points="620,180 700,210 670,260 600,280 560,240" fill="#291e42" stroke="#f59e0b" stroke-width="1.5"/>

  <!-- Stylized Gliding Character / Wings -->
  <g transform="translate(380, 160)">
    <!-- Wings spread -->
    <polygon points="20,-20 -50,-10 -20,5 20,0" fill="#38bdf8"/>
    <polygon points="20,-20 90,-10 60,5 20,0" fill="#38bdf8"/>
    <!-- Body -->
    <polygon points="15,-25 25,-25 22,15 18,15" fill="#ffffff"/>
    <circle cx="20" cy="-28" r="5" fill="#facc15"/>
    <!-- Particle Flight Stream -->
    <line x1="-30" y1="0" x2="-80" y2="20" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4"/>
    <line x1="70" y1="0" x2="120" y2="20" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4 4"/>
  </g>

  <!-- Game HUD Elements -->
  <g transform="translate(50, 40)">
    <rect width="180" height="34" rx="8" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.2)"/>
    <text x="15" y="22" fill="#38bdf8" font-family="monospace" font-size="12" font-weight="bold">ALTITUDE: 1,420M</text>
  </g>
  <g transform="translate(570, 40)">
    <rect width="180" height="34" rx="8" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.2)"/>
    <text x="15" y="22" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="bold">FLIGHT ABILITY: 85%</text>
  </g>
</svg>`;

writeSvg('public/images/projects/project-unity-game.svg', unityGameSvg);

// 5. Project 4: Faculty of Science Website
const facultySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="facBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1b1a"/>
      <stop offset="100%" stop-color="#040c0b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#facBg)"/>

  <g transform="translate(60, 40)">
    <rect width="680" height="420" rx="14" fill="#091414" stroke="rgba(16, 185, 129, 0.3)" stroke-width="1.5"/>
    
    <!-- Navbar Header -->
    <rect width="680" height="46" rx="14" fill="#0f2624"/>
    <text x="25" y="29" fill="#34d399" font-family="sans-serif" font-size="15" font-weight="bold">FACULTY OF SCIENCE</text>
    <text x="280" y="29" fill="#9ca3af" font-family="sans-serif" font-size="11">DEPARTMENTS  •  RESEARCH  •  ACADEMICS  •  EVENTS</text>
    <rect x="570" y="10" width="90" height="26" rx="6" fill="#059669"/>
    <text x="590" y="27" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">PORTAL</text>

    <!-- Content Blocks -->
    <g transform="translate(25, 70)">
      <rect width="390" height="180" rx="10" fill="#112926" stroke="rgba(255,255,255,0.06)"/>
      <text x="20" y="35" fill="#ffffff" font-family="sans-serif" font-size="16" font-weight="bold">Empowering Scientific Discovery</text>
      <text x="20" y="60" fill="#a7f3d0" font-family="sans-serif" font-size="11">Academic programs, cutting-edge laboratory facilities, and symposiums.</text>
      <!-- Mini department pills -->
      <rect x="20" y="90" width="100" height="26" rx="13" fill="#164e63"/>
      <text x="32" y="107" fill="#67e8f9" font-family="sans-serif" font-size="10">Computer Sci</text>
      <rect x="130" y="90" width="100" height="26" rx="13" fill="#14532d"/>
      <text x="145" y="107" fill="#86efac" font-family="sans-serif" font-size="10">Data Science</text>
      <rect x="240" y="90" width="100" height="26" rx="13" fill="#3b0764"/>
      <text x="255" y="107" fill="#d8b4fe" font-family="sans-serif" font-size="10">Biochemistry</text>
    </g>

    <g transform="translate(435, 70)">
      <rect width="220" height="180" rx="10" fill="#112926" stroke="rgba(255,255,255,0.06)"/>
      <text x="20" y="32" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="bold">UPCOMING EVENTS</text>
      <line x1="20" y1="46" x2="200" y2="46" stroke="rgba(255,255,255,0.1)"/>
      <text x="20" y="70" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">ICyDD 2026 Keynote</text>
      <text x="20" y="86" fill="#9ca3af" font-family="sans-serif" font-size="10">Digital Defence &amp; AI</text>
      
      <text x="20" y="120" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">JTECH Annual Expo</text>
      <text x="20" y="136" fill="#9ca3af" font-family="sans-serif" font-size="10">Student Innovation</text>
    </g>

    <!-- Bottom Research Row -->
    <g transform="translate(25, 270)">
      <rect width="630" height="120" rx="10" fill="#112926" stroke="rgba(255,255,255,0.06)"/>
      <text x="20" y="30" fill="#34d399" font-family="sans-serif" font-size="12" font-weight="bold">FEATURED FACULTY RESEARCH PUBLICATIONS</text>
      <rect x="20" y="48" width="180" height="50" rx="6" fill="#0d211e"/>
      <text x="32" y="72" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">Urban AQI Deep Learning</text>
      <text x="32" y="88" fill="#6ee7b7" font-family="sans-serif" font-size="9">Environmental Lab</text>

      <rect x="220" y="48" width="180" height="50" rx="6" fill="#0d211e"/>
      <text x="232" y="72" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">Distributed Cloud Queues</text>
      <text x="232" y="88" fill="#6ee7b7" font-family="sans-serif" font-size="9">Dept of Software</text>

      <rect x="420" y="48" width="180" height="50" rx="6" fill="#0d211e"/>
      <text x="432" y="72" fill="#ffffff" font-family="sans-serif" font-size="10" font-weight="bold">HCI in Pedagogic Systems</text>
      <text x="432" y="88" fill="#6ee7b7" font-family="sans-serif" font-size="9">Interaction Design</text>
    </g>
  </g>
</svg>`;

writeSvg('public/images/projects/project-faculty.svg', facultySvg);

// 6. Project 5: Sukhan HCI Project
const sukhanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="skBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#190e2b"/>
      <stop offset="100%" stop-color="#0a0512"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#skBg)"/>

  <g transform="translate(60, 40)">
    <rect width="680" height="420" rx="14" fill="#130b21" stroke="rgba(236,72,153,0.25)" stroke-width="1.5"/>

    <text x="40" y="60" fill="#ec4899" font-family="monospace" font-size="12" letter-spacing="3">HCI RESEARCH &amp; INTERACTIVE DESIGN</text>
    <text x="40" y="110" fill="#ffffff" font-family="serif" font-size="42" font-style="italic">Sukhan — سخن</text>
    <text x="40" y="145" fill="#c084fc" font-family="sans-serif" font-size="14">Human-Centered Digital Experience for Cultural Poetry &amp; Emotional Expression</text>

    <!-- Interactive Cards / Heuristic Evaluation -->
    <g transform="translate(40, 180)">
      <rect width="180" height="190" rx="10" fill="#1e1133" stroke="rgba(255,255,255,0.08)"/>
      <text x="20" y="32" fill="#a855f7" font-family="sans-serif" font-size="12" font-weight="bold">EMPATHY MAPPING</text>
      <text x="20" y="60" fill="#e2e8f0" font-family="sans-serif" font-size="11">Discovering emotional triggers, reading fatigue points, and typography scaling.</text>
      <circle cx="90" cy="130" r="30" fill="rgba(168,85,247,0.15)" stroke="#a855f7" stroke-width="1.5"/>
      <text x="74" y="136" fill="#c084fc" font-family="sans-serif" font-size="20">✦</text>
    </g>

    <g transform="translate(250, 180)">
      <rect width="180" height="190" rx="10" fill="#1e1133" stroke="rgba(255,255,255,0.08)"/>
      <text x="20" y="32" fill="#ec4899" font-family="sans-serif" font-size="12" font-weight="bold">MICRO-INTERACTIONS</text>
      <text x="20" y="60" fill="#e2e8f0" font-family="sans-serif" font-size="11">Haptic-like tactile feedback, smooth rhythm pacing, and responsive ligatures.</text>
      <rect x="40" y="115" width="100" height="30" rx="15" fill="#ec4899"/>
      <text x="64" y="135" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold">Interact</text>
    </g>

    <g transform="translate(460, 180)">
      <rect width="180" height="190" rx="10" fill="#1e1133" stroke="rgba(255,255,255,0.08)"/>
      <text x="20" y="32" fill="#38bdf8" font-family="sans-serif" font-size="12" font-weight="bold">USABILITY TESTING</text>
      <text x="20" y="60" fill="#e2e8f0" font-family="sans-serif" font-size="11">Task completion time improved by 42% over standard poetry archives.</text>
      <text x="50" y="140" fill="#38bdf8" font-family="sans-serif" font-size="28" font-weight="900">+42%</text>
    </g>
  </g>
</svg>`;

writeSvg('public/images/projects/project-sukhan.svg', sukhanSvg);

// 7. Photography Placeholders (photo-1 through photo-9)
const photos = [
  { id: 1, title: 'Keynote Illuminate', color1: '#8b5cf6', color2: '#3b82f6', icon: '🎤', tag: 'ICyDD 2026 STAGE' },
  { id: 2, title: 'The Focus of JTECH', color1: '#ec4899', color2: '#f97316', icon: '💻', tag: 'DEV SPRINT' },
  { id: 3, title: 'Academic Milestone', color1: '#3b82f6', color2: '#06b6d4', icon: '🎓', tag: 'CAMPUS LIFE' },
  { id: 4, title: 'Prism & Reflection', color1: '#f97316', color2: '#ec4899', icon: '✨', tag: 'CREATIVE OPTICS' },
  { id: 5, title: 'The Director’s View', color1: '#6366f1', color2: '#a855f7', icon: '🎬', tag: 'PRODUCTION CONSOLE' },
  { id: 6, title: 'GDGoC Campus Gathering', color1: '#10b981', color2: '#06b6d4', icon: '👥', tag: 'COMMUNITY TECH' },
  { id: 7, title: 'Quiet Concentration', color1: '#f43f5e', color2: '#8b5cf6', icon: '👤', tag: 'SPEAKER PORTRAIT' },
  { id: 8, title: 'Neon Motion Blur', color1: '#06b6d4', color2: '#3b82f6', icon: '⚡', tag: 'LIGHT TRAILS' },
  { id: 9, title: 'Gear Prep at Dawn', color1: '#eab308', color2: '#f97316', icon: '📷', tag: 'EQUIPMENT CHECK' },
];

photos.forEach(p => {
  const photoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
    <defs>
      <linearGradient id="pGrad${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${p.color1}" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="${p.color2}" stop-opacity="0.1"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="#0c071a"/>
    <rect width="800" height="600" fill="url(#pGrad${p.id})"/>
    
    <!-- Viewfinder Markings -->
    <g stroke="rgba(255,255,255,0.2)" stroke-width="2">
      <!-- Corners -->
      <path d="M 60 100 L 60 60 L 100 60" fill="none"/>
      <path d="M 740 100 L 740 60 L 700 60" fill="none"/>
      <path d="M 60 500 L 60 540 L 100 540" fill="none"/>
      <path d="M 740 500 L 740 540 L 700 540" fill="none"/>
      
      <!-- Center Crosshair -->
      <circle cx="400" cy="300" r="40" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <line x1="390" y1="300" x2="410" y2="300"/>
      <line x1="400" y1="290" x2="400" y2="310"/>
    </g>

    <!-- Dynamic Graphic Symbol -->
    <circle cx="400" cy="270" r="70" fill="none" stroke="${p.color1}" stroke-width="3" stroke-dasharray="12 6"/>
    <text x="400" y="285" text-anchor="middle" font-size="44">${p.icon}</text>

    <!-- Editorial Overlay -->
    <text x="400" y="380" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="24" font-weight="700" letter-spacing="1">${p.title}</text>
    <rect x="320" y="405" width="160" height="26" rx="13" fill="rgba(255,255,255,0.08)"/>
    <text x="400" y="422" text-anchor="middle" fill="${p.color1}" font-family="monospace" font-size="11" font-weight="bold">${p.tag}</text>

    <!-- Camera Metadata Bar -->
    <g transform="translate(60, 530)">
      <text x="0" y="0" fill="rgba(255,255,255,0.4)" font-family="monospace" font-size="11">[REC] ISO 400 • f/1.8 • 1/250s • PRO RAW</text>
    </g>
  </svg>`;

  writeSvg(`public/images/photography/photo-${p.id}.svg`, photoSvg);
});

// 8. Experience SVGs
const exps = [
  { file: 'icydd-2026.svg', title: 'ICyDD 2026', subtitle: 'Photography Head', color: '#ec4899' },
  { file: 'jtech-2026.svg', title: 'JTECH 2026', subtitle: 'Content Co-Head', color: '#8b5cf6' },
  { file: 'jtech-2025.svg', title: 'JTECH 2025', subtitle: 'Judge Management', color: '#3b82f6' },
  { file: 'gdgoc.svg', title: 'GDGoC', subtitle: 'Campus Photographer', color: '#06b6d4' },
  { file: 'icydd-2025.svg', title: 'ICyDD 2025', subtitle: 'Volunteer Photo', color: '#f59e0b' },
];

exps.forEach(e => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <rect width="200" height="200" rx="30" fill="#130d29" stroke="${e.color}" stroke-width="2"/>
    <circle cx="100" cy="80" r="40" fill="${e.color}" opacity="0.15"/>
    <text x="100" y="88" text-anchor="middle" fill="${e.color}" font-family="sans-serif" font-size="18" font-weight="900">${e.title}</text>
    <text x="100" y="140" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="600">${e.subtitle}</text>
  </svg>`;
  writeSvg(`public/images/experience/${e.file}`, svg);
});

console.log("All artwork generated successfully!");

