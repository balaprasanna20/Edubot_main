# Edubot — Implementation Reference Sheet

This document records the exact measurements, proportions, typography, colors, and layout landmarks extracted from the 5 approved reference images (1024×576 px, 16:9 aspect ratio).

---

## 1. Reference Metadata & Dimensions

| Section | Approved Reference File | Native Resolution | Aspect Ratio | Primary Visual Focus |
| :--- | :--- | :--- | :--- | :--- |
| **Overview** | `download(2).jpg` (`media_1794462178015_a0c35de8.jpg`) | 1024 × 576 px | 16:9 | Blue architectural "e" campus illustration & editorial serif headline |
| **Features** | `download(5).jpg` (`media_1794466962038_9e4cd342.jpg`) | 1024 × 576 px | 16:9 | 6 minimal cards in 3 cols × 2 rows under campus essentials heading |
| **User Portals** | `download(1).jpg` (`media_1794472548604_12579c05.jpg`) | 1024 × 576 px | 16:9 | 4 vertical role panels (Super Admin, Admin, Mentor, Student) |
| **Benefits** | `download(3).jpg` (`media_1794473520622_31ea76aa.jpg`) | 1024 × 576 px | 16:9 | Circular connected campus SVG graphic + 3 lower benefit columns |
| **Request a Demo** | `download(4).jpg` (`media_1794474533284_126da57a.jpg`) | 1024 × 576 px | 16:9 | Royal blue campus panel (left) beside personalised demo form (right) |

---

## 2. Sampled Color Tokens

| Token Name | Sampled Hex | Sampled RGB | Usage across References |
| :--- | :--- | :--- | :--- |
| `color-primary` | `#064BFF` (`#023EDE`–`#063EEB`) | `rgb(6, 75, 255)` | Edubot logo, active nav indicator, accent words, primary CTA buttons |
| `color-primary-hover` | `#0039DE` | `rgb(0, 57, 222)` | Interactive button hover state |
| `color-navy` | `#080D26` | `rgb(8, 13, 38)` | Primary headings, card titles, main high-contrast text |
| `color-secondary` | `#606879` | `rgb(96, 104, 121)` | Subtitles, descriptions, supporting copy, footer credits |
| `color-pale-blue` | `#EFF5FF` | `rgb(239, 245, 255)` | Eyebrow badges, portal 2 background, benefits circular graphic |
| `color-border` | `#E0E6EF` | `rgb(224, 230, 239)` | Navbar divider, card outlines, form input borders, footer rule |
| `color-white` | `#FFFFFF` | `rgb(255, 255, 255)` | Page canvas background, card surfaces, white button text |
| `color-card-neutral` | `#F8FAFC` | `rgb(248, 250, 252)` | User Portal panels 01 & 03 background |
| `color-card-blue` | `#EBF3FE` | `rgb(235, 243, 254)` | User Portal panel 02 (Administrator) background |

---

## 3. Typography Hierarchy & Font Matching

| Role | Font Family Candidate | Weight | Line Height | Case / Letter Spacing | Reference Matching Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Headline** | `Lora` / High-Contrast Serif fallback (`Georgia`, `Newsreader`) | Bold (600/700) | 1.06 (tight) | Title case, -0.025em | Distinctive curved "Y", rounded "C", ball terminals on "r", "s", and terminal period |
| **Section Headings** | `Inter` / Clean Sans | Bold (700) | 1.12–1.15 | Title case, -0.02em | Matches modern geometric/grotesque sans across Features, Portals, Benefits, Demo |
| **Eyebrows** | `Inter` | Bold (700) | 1.2 | UPPERCASE, +0.08em | Small tracked badges (e.g. `EDUCATION MANAGEMENT SYSTEM`, `FEATURES`) |
| **Body / Subtitles** | `Inter` | Regular/Medium (400/500) | 1.45–1.5 | Sentence case, normal | High legibility neutral secondary text |
| **Outlined Numerals** | SVG `<text>` with stroke | Bold (700) | 1.0 | Vector stroke `#D1DAE6` / `#BFD7F8` / `white/40` | Crisp scalable outlines at bottom of portal panels |

---

## 4. Section Proportions & Element Layout

### 4.1. Shared Navigation Bar
- **Proportional Bounds**: x = 2.4% to 97.6% (width: 95.2%), y = 2.0% to 8.3% (height: 36px).
- **Branding**: Logo on left (`Edubot` with blue icon).
- **Navigation Links**: Centered: `Overview`, `Features`, `User Portals`, `Benefits`.
- **Active Navigation State**:
  - `Overview` active: Outlined demo button (`border border-[#064BFF] text-[#064BFF]`).
  - Subsequent sections active (`Features`, `User Portals`, `Benefits`, `Request a Demo`): Solid blue demo button (`bg-[#064BFF] text-white`).
  - Active section link shows blue text + `2.5px` bottom underline.

### 4.2. Overview Section (Landing Hero Rebuild)
- **Architecture**: Modular separation into `HeroContent`, `HeroActions`, `CampusVisual`, and `FeatureBadge`.
- **Desktop Grid Composition**: Approximately 40% solid-white text area on the left and 60% campus artwork on the right with a clean vertical boundary (no gradient, blur, or fade overlay).
- **Left Column Elements**:
  - Eyebrow: `EDUCATION MANAGEMENT SYSTEM` (`text-primary uppercase tracking-wider`).
  - Editorial Serif Headline: `Your campus.` in navy (`#080D26`) and `Connected.` in primary blue (`#064BFF`), `font-serif` (Lora).
  - Two-line Description: `Administration, teaching and learning. / Together in one platform.`.
  - Supporting Audience Line: `For schools, colleges and universities` in `text-secondary`.
  - CTA Button Pair:
    - Primary CTA: `Request a Demo` (solid blue `#064BFF`, smooth-scrolls to `#request-demo`).
    - Secondary CTA: Circular play icon with `See How It Works` (smooth-scrolls to `#user-portals`).
- **Right Column Campus Artwork & Floating Feature Badges**:
  - Campus Visual: Pure photographic plate featuring the blue architectural "e" entrance, campus buildings, faculty, and students (`/images/hero-campus-artwork-pure.webp`).
  - Real HTML/CSS Badges:
    1. `Attendance verified` badge: CalendarCheck vector icon + label + live green status dot (`#10B981`). Positioned at top ~22%, left ~58% relative to artwork.
    2. `Learning, organised` badge: BookOpen vector icon + label. Positioned at top ~48%, left ~64% relative to artwork.
- **Bottom Four-Portals Strip**: Full width, pale-blue `#EFF5FF`, border `#D6E4FF`.
  - Text: `One platform. Four dedicated portals.`
  - Direct role selector buttons: `Super Admin · Administrator · Mentor · Student` with smooth scroll and role preselection event dispatch.

### 4.3. Features Section
- **Header**: Centered layout (`text-center max-w-2xl mx-auto`). Eyebrow `FEATURES` centered, Heading `Campus essentials. All in one place.` centered with the circular blue Edubot "e" emblem embedded inline inside `[e]ssentials`, Subtitle centered.
- **6-Card Grid**: x = 2.4% to 97.6%, y = 38.0% to 87.5% (3 columns × 2 rows).
  - Card Dimensions: ~305px wide × 125px high, 16px corner radius (`rounded-2xl`).
  - Icon container: 44×44px with pale blue `#EFF5FF` surface and thin blue icon outline.
- **Footer Link**: Centered `Explore user portals →`.

### 4.4. User Portals Section
- **Header**: Centered layout (`text-center max-w-3xl mx-auto`). Eyebrow `FOUR PORTALS. ONE EDUBOT.` centered, Heading `Different roles. One connected campus.` centered with circular blue Edubot "e" emblem embedded inline in `conn[e]cted`, Subtitle centered.
- **4-Panel Row**: x = 2.4% to 97.6%, y = 35.5% to 89.0% (4 equal panels, ~226px wide, gap ~18px).
  - Upper small numbers ("01", "02", "03", "04") removed from card headers; role icon cleanly aligned top-right.
  - Resting State: Clean neutral surface (`bg-[#F8FAFC]`), dark navy typography (`#080D26`), and subtle border (`border-[#E2E8F0]`).
  - Dynamic Hover & Touch State (No Gradients): On hover/touch, the active card smoothly transforms to solid royal blue (`bg-[#064BFF]`), typography and icons transition to crisp white, dividers become `bg-white/20`, the lower large number outline illuminates with white stroke (`stroke="#FFFFFF"`), and the circular arrow rotates 45° with spring physics (`rotate: 45`, `scale: 1.02`, `y: -8px`).
- **Footer**: `Built around people. Connected by Edubot.` (left), `Explore the benefits →` (right).

### 4.5. Benefits Section
- **Header**: Centered layout (`text-center max-w-3xl mx-auto`). Eyebrow `04 / WHY EDUBOT` centered, Heading `One institution. Working better, together.` centered with circular blue Edubot "e" emblem embedded inline in `b[e]tter` and `tog[e]ther`, Short blue rule centered, Subtitle centered, `Explore Edubot →` centered.
- **Campus Illustration**: Centered connected campus architectural panel (`max-w-[760px] mx-auto mb-12 sm:mb-14`).
- **Bottom 3 Columns**: `01 Less administrative effort`, `02 Better institutional visibility`, `03 More consistent coordination` with subtle vertical dividers.
- **Footer Link**: Centered `Explore Edubot →`.

### 4.6. Request a Demo Section (Approved Reference Rebuild)
- **Composition & Split**: Desktop 46.4% Left (solid white) / 53.6% Right (very pale blue `#E5F1FD` background hosting a white form card).
- **Left Introduction**:
  - Branding: Small `e | Edubot` logo identity at the top.
  - Eyebrow: `LET’S CONNECT` in blue `#064BFF` with letter spacing.
  - Headline:
    - Line 1: `Your next chapter` in bold modern sans-serif (`font-sans font-bold text-navy`).
    - Line 2: `starts with Edubot.` in elegant italic serif (`font-serif italic font-normal text-primary`).
  - Supporting paragraph: `See how connected administration, teaching and learning can work for your institution.`.
  - Campus Gateway Artwork: Preserved original illustration with blue circular lowercase "e" emblem, university library, classical hall, students, and winding path (`/images/demo_campus_gateway_artwork-2x.png`).
  - Category baseline caption: `Schools · Colleges · Universities`.
- **Right Form Panel**:
  - Surface: Pure white card with `rounded-[32px]`, `border border-[#DCE8F8]`, and soft shadow.
  - Pill label: `PERSONALISED WALKTHROUGH` (solid blue `#064BFF`, white uppercase tracking).
  - Title: `Let’s explore your campus needs.`
  - Subtitle: `Tell us a little about your institution.`
  - Row 1: Full name (`Your name`) & Work email (`you@institution.edu`) in 2 columns.
  - Row 2: Institution name (`Your institution`).
  - Row 3: Institution type accessible radio group (School, College, University, Other with custom vector icons).
  - Row 4: Your role dropdown (`Super Admin`, `Administrator`, `Mentor / Educator`, `Student`, `Other`).
  - Row 5: What would you like to explore? (optional textarea).
  - Submit Button: `Request my demo →` with subtle hover slide.
  - Helper text: `Our team will contact you to arrange your demo.` & `Prototype preview — enquiries are not sent.`.
- **Footer**: Thin divider line with `Edubot by Codework` on left and `Built for connected institutions.` on right.

---

## 5. Recovered Assets & Strategy

1. **`hero-clean-plate.jpg`**: Isolate campus background without text collision for crisp HTML text rendering.
2. **`demo_panel_2x.png`**: High-resolution 2x retina crop of the approved gateway illustration panel.
3. **Connected Campus Graphic**: Precision SVG vector diagram matching the circular layout and line thicknesses.
4. **Icons**: Lucide React outline icons configured with `stroke-[1.8]` matching the reference stroke weight.

