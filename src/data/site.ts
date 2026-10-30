export interface VideoSource {
  mp4: string;
  webm?: string;
  poster?: string;
}

export const site = {
  name: 'Adrian Miras',
  fullName: 'Adrian Rhoman V. Miras',
  role: 'Graphic & Web Designer / Frontend Developer',
  email: 'adrianmiras13@gmail.com',
  location: 'Casiguran, Aurora, Philippines',
  timeZone: 'Asia/Manila',
  available: true,
  // Add public-relative file paths when your assets are ready.
  portrait: null as string | null,
  portraitAlt: 'Adrian Rhoman V. Miras',
  // Showreel for the homepage, e.g. { mp4: '/video/reel.mp4', poster: '/video/reel-poster.webp' }.
  reel: null as VideoSource | null,
  resume: null as string | null,
  github: null as string | null,
  linkedin: null as string | null,
  // Flip to true after reviewing imagery, project attributions, and links.
  readyToIndex: false,
};

// Put project images in public/images/projects/ and short muted loops in public/video/projects/.
// Leaving a cover null renders an explicitly labeled visual placeholder.
export interface GalleryImage { src: string; alt: string; caption: string; width: number; height: number }
// Vertical 9:16 clips shown in a reel strip on the case study page.
export interface Reel { mp4: string; poster: string; caption: string }

export const projectMedia: Record<string, {
  cover: string | null;
  coverAlt: string;
  preview?: VideoSource;
  gallery: GalleryImage[];
  reels?: Reel[];
  reelLinks?: string[];
}> = {
  'kasiguru-mobile': {
    cover: '/images/projects/kasiguru-mobile/00-cover.webp',
    coverAlt: 'KasiGuru download page with the Jepjep frog mascot',
    gallery: [
      { src: '/images/projects/kasiguru-mobile/02-app-welcome.webp', alt: 'KasiGuru app welcome screen with Jepjep jumping in a forest', caption: 'The app’s welcome screen, with Jepjep in a barong.', width: 739, height: 1600 },
      { src: '/images/projects/kasiguru-mobile/03-inside-the-app.webp', alt: 'Inside the app section listing the practice games', caption: 'Practice games: Word Match, Word Search and Word Wheel.', width: 1440, height: 900 },
      { src: '/images/projects/kasiguru-mobile/01-download-site.webp', alt: 'KasiGuru download page with the Jepjep frog mascot holding a word card', caption: 'The download site: Android APK, or the same app in the browser.', width: 1440, height: 900 },
    ],
  },
  'ascot-drrms': {
    cover: '/images/projects/ascot-drrms/00-cover.webp',
    coverAlt: 'ASCOT DRRMS home page with live campus status',
    gallery: [
      { src: '/images/projects/ascot-drrms/01-home.webp', alt: 'ASCOT DRRMS home page with live campus status', caption: 'Home: live advisory status for the Bazal, Casiguran and Zabali campuses.', width: 1440, height: 900 },
      { src: '/images/projects/ascot-drrms/04-mobile.webp', alt: 'ASCOT DRRMS home page on a phone', caption: 'On a phone, the hotline call button comes first.', width: 739, height: 1600 },
      { src: '/images/projects/ascot-drrms/02-what-to-do.webp', alt: 'Emergency steps for typhoons, earthquakes, fires and floods', caption: 'Three steps to remember for each hazard.', width: 1440, height: 900 },
      { src: '/images/projects/ascot-drrms/03-system-modules.webp', alt: 'List of system modules', caption: 'The modules behind the public site.', width: 1440, height: 900 },
    ],
  },
  'bacong-daycare': {
    cover: '/images/projects/bacong-daycare/00-cover.webp',
    coverAlt: 'Bacong Daycare Center sign-in screen',
    gallery: [
      { src: '/images/projects/bacong-daycare/01-sign-in.webp', alt: 'Bacong Daycare Center sign-in screen', caption: 'One sign-in for staff and parents; the right portal loads from the account role.', width: 1440, height: 900 },
      { src: '/images/projects/bacong-daycare/02-mobile.webp', alt: 'Bacong Daycare Center sign-in on a phone', caption: 'The same portal on a phone.', width: 739, height: 1600 },
    ],
  },
  mailikha: {
    cover: '/images/projects/mailikha/01-chapter-6.webp',
    coverAlt: 'Mailikha Chapter 6 anniversary campaign posts',
    gallery: [
      { src: '/images/projects/mailikha/01-chapter-6.webp', alt: 'Mailikha Chapter 6 anniversary campaign posts', caption: 'Chapter 6 anniversary: month-long promo, flash-deal calendar, chapter stamp card and hunt updates.', width: 1600, height: 1600 },
      { src: '/images/projects/mailikha/02-brand-almost-anything.webp', alt: 'Embossed sticker catalogue for cups, bottles and containers', caption: '“Brand Almost Anything”: an embossed-sticker catalogue by surface.', width: 1600, height: 1600 },
      { src: '/images/projects/mailikha/03-sticker-sizes-101.webp', alt: 'Mailikha Notes illustrated carousel about sticker sizes', caption: 'Mailikha Notes: an illustrated guide to sticker sizes.', width: 1600, height: 1600 },
      { src: '/images/projects/mailikha/04-paper-sizes-cover.webp', alt: 'Mailikha Notes Paper Sizes 101 cover', caption: 'Mailikha Notes: Paper Sizes 101.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/05-paper-sizes-chart.webp', alt: 'Paper size comparison chart from A7 to A2', caption: 'Paper sizes compared at a glance.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/06-paper-sizes-uses.webp', alt: 'Uses for each paper size', caption: 'What each size is best for.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/07-lock-in-prices.webp', alt: 'Lock in today’s prices announcement', caption: 'Price-adjustment announcement.', width: 1280, height: 1600 },
      { src: '/images/projects/mailikha/08-important-reminder.webp', alt: 'Checklist reminder before sending a layout', caption: 'A pre-print checklist for customers.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/09-we-are-open.webp', alt: 'We’re open sign for January 5, 2026', caption: 'Reopening announcement.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/10-mailikha-logo.webp', alt: 'Mailikha wordmark on a shelf', caption: 'New-year series: the Mailikha wordmark.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/11-new-year-quiet.webp', alt: 'Opportunities wait in the quiet, unseen but ready', caption: 'New-year series, shot inside the shop.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/12-new-year-grow.webp', alt: 'The year opens with room to grow', caption: 'New-year series.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/13-new-year-season.webp', alt: 'Each day prepares us to welcome what this season brings', caption: 'New-year series.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/14-what-item.webp', alt: 'Engagement post asking what item customers wish Mailikha had', caption: 'Engagement post.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/15-pop-haus-family.webp', alt: 'Pop Haus booth at a dedication and first birthday', caption: 'Pop Haus event booth coverage.', width: 1279, height: 1600 },
      { src: '/images/projects/mailikha/16-pop-haus-party.webp', alt: 'Strawberry-themed birthday setup', caption: 'Event coverage.', width: 1279, height: 1600 },
      { src: '/images/projects/mailikha/17-pop-haus-guests.webp', alt: 'Guests holding their personalised prints', caption: 'Event coverage collage.', width: 1279, height: 1600 },
      { src: '/images/projects/mailikha/18-wedding-stickers.webp', alt: 'Clarence & Pauline wedding sticker pack', caption: 'Personalised wedding sticker pack.', width: 1080, height: 1350 },
      { src: '/images/projects/mailikha/19-wedding-tattoos.webp', alt: 'Clarence & Pauline temporary tattoo pack', caption: 'Matching temporary tattoos.', width: 1080, height: 1350 },
    ],
    reels: [
      { mp4: '/video/projects/mailikha/onsite-instax.mp4', poster: '/video/projects/mailikha/onsite-instax.webp', caption: 'Onsite Instax printing' },
      { mp4: '/video/projects/mailikha/souvenir-stickers.mp4', poster: '/video/projects/mailikha/souvenir-stickers.webp', caption: 'Baler souvenir sticker packs' },
      { mp4: '/video/projects/mailikha/name-keychains.mp4', poster: '/video/projects/mailikha/name-keychains.webp', caption: 'Now crafting names' },
      { mp4: '/video/projects/mailikha/shirt-printing.mp4', poster: '/video/projects/mailikha/shirt-printing.webp', caption: 'Custom shirt printing' },
    ],
    reelLinks: [
      'https://www.facebook.com/share/r/1EEKkKWQ44/',
      'https://www.facebook.com/share/r/1GeaqoPnrb/',
      'https://www.facebook.com/share/r/1CCP9xnmNy/',
      'https://www.facebook.com/reel/944872005210504',
      'https://www.facebook.com/reel/33981976418115921',
    ],
  },
  'kasiguru-web': {
    cover: '/images/projects/kasiguru-web/00-cover.webp',
    coverAlt: 'KasiGuru moderation console sign-in screen',
    gallery: [
      { src: '/images/projects/kasiguru-web/01-moderation-console.webp', alt: 'KasiGuru moderation console sign-in screen', caption: 'The moderation console, where admins and verifiers keep the dictionary right.', width: 1440, height: 900 },
      { src: '/images/projects/kasiguru-web/02-inside-the-app.webp', alt: 'Inside the app section of the KasiGuru download site', caption: 'The public download site introduces the app’s features.', width: 1440, height: 900 },
    ],
  },
  'voice-of-the-sierra': {
    cover: '/images/projects/voice-of-the-sierra/01-tides-of-triumph.webp',
    coverAlt: 'Tides of Triumph feature layout from The Voice of the Sierra',
    gallery: [
      { src: '/images/projects/voice-of-the-sierra/01-tides-of-triumph.webp', alt: 'Tides of Triumph feature about surfing in Baler', caption: '“Tides of Triumph” feature layout.', width: 1080, height: 1080 },
      { src: '/images/projects/voice-of-the-sierra/02-until-when.webp', alt: 'Until when will I be the answer feature layout', caption: 'Feature layout.', width: 900, height: 1036 },
      { src: '/images/projects/voice-of-the-sierra/04-publication-spreads.webp', alt: 'Printed publication spreads', caption: 'Printed publication spreads.', width: 1200, height: 1600 },
      { src: '/images/projects/voice-of-the-sierra/03-new-chapter.webp', alt: 'New chapter, new possibilities', caption: 'Publication post.', width: 1080, height: 1080 },
      { src: '/images/projects/voice-of-the-sierra/05-editorial-literary.webp', alt: 'Araw ng Kagitingan, editorial and literary posts', caption: 'Commemorative, editorial and literary posts.', width: 1600, height: 1600 },
      { src: '/images/projects/voice-of-the-sierra/06-lookout-scuaa.webp', alt: 'Lookout sports coverage for SCUAA III 2025', caption: 'Sports coverage: SCUAA III 2025.', width: 1600, height: 1600 },
      { src: '/images/projects/voice-of-the-sierra/07-news-collage.webp', alt: 'Collage of news and greeting posts', caption: 'News, greetings and features.', width: 1600, height: 1600 },
      { src: '/images/projects/voice-of-the-sierra/08-bitu-mark.webp', alt: 'Gold Bitu emblem for CAASUC III coverage', caption: 'CAASUC III coverage identity.', width: 1080, height: 1080 },
      { src: '/images/projects/voice-of-the-sierra/09-caasuc-iii.webp', alt: 'CAASUC III Regional Culture and the Arts Festival 2024 frame', caption: 'CAASUC III 2024 coverage.', width: 960, height: 960 },
      { src: '/images/projects/voice-of-the-sierra/10-contemporary-dance.webp', alt: 'Contemporary dance coverage post', caption: 'Event coverage.', width: 1080, height: 1080 },
      { src: '/images/projects/voice-of-the-sierra/11-vocal-duet.webp', alt: 'Vocal duet result announcement', caption: 'Results announcement.', width: 1080, height: 1080 },
      { src: '/images/projects/voice-of-the-sierra/12-quote-card.webp', alt: 'Quote card from a poster-making participant', caption: 'Interview quote card.', width: 1080, height: 1080 },
      { src: '/images/projects/voice-of-the-sierra/13-eic-shirt.webp', alt: 'Editor-in-Chief shirt design', caption: 'Staff shirt design.', width: 1600, height: 1067 },
      { src: '/images/projects/voice-of-the-sierra/14-press-shirt-1.webp', alt: 'Press shirt design option', caption: 'Press shirt options.', width: 1220, height: 813 },
      { src: '/images/projects/voice-of-the-sierra/15-press-shirt-4.webp', alt: 'Another press shirt design option', caption: 'Press shirt options.', width: 1220, height: 813 },
    ],
  },
  aitechs: {
    cover: '/images/projects/aitechs/01-general-orientation.webp',
    coverAlt: 'General Orientation key visual for the School of Information Technology',
    gallery: [
      { src: '/images/projects/aitechs/01-general-orientation.webp', alt: 'General Orientation key visual', caption: 'General Orientation key visual.', width: 1468, height: 960 },
      { src: '/images/projects/aitechs/02-it-week.webp', alt: 'Competition announcement posts', caption: 'Competition announcements.', width: 1600, height: 1600 },
      { src: '/images/projects/aitechs/03-school-of-it.webp', alt: 'School of Information Technology posts', caption: 'School of IT posts.', width: 1600, height: 1600 },
      { src: '/images/projects/aitechs/04-project-tumbler.webp', alt: 'Project Tumbler and contest posts', caption: 'Project Tumbler and contests.', width: 1200, height: 1600 },
      { src: '/images/projects/aitechs/05-happy-new-year.webp', alt: 'Happy New Year greeting from AITECHS', caption: 'New-year greeting.', width: 1080, height: 1080 },
      { src: '/images/projects/aitechs/06-wikang-mapagpalaya.webp', alt: 'Filipino: Wikang Mapagpalaya event visual', caption: 'Language-month event visual.', width: 1294, height: 720 },
      { src: '/images/projects/aitechs/07-itasc-platforms.webp', alt: 'ITASC party platforms', caption: 'Student-council campaign: platforms.', width: 1200, height: 1600 },
      { src: '/images/projects/aitechs/08-itasc-candidates.webp', alt: 'ITASC candidate cards', caption: 'Candidate cards.', width: 1200, height: 1600 },
      { src: '/images/projects/aitechs/09-itasc-profiles.webp', alt: 'ITASC candidate profiles', caption: 'Candidate profiles.', width: 1200, height: 1600 },
      { src: '/images/projects/aitechs/10-hirangin-results.webp', alt: 'Hirangin election results posts', caption: 'Election results coverage.', width: 1600, height: 1600 },
      { src: '/images/projects/aitechs/11-hirangin-candidacy.webp', alt: 'Hirangin filing of candidacy posts', caption: 'Election information posts.', width: 1600, height: 1600 },
      { src: '/images/projects/aitechs/12-congratulations.webp', alt: 'Congratulations posts for board passers', caption: 'Congratulatory posts.', width: 1600, height: 1600 },
      { src: '/images/projects/aitechs/13-it-lanyards.webp', alt: 'Information Technology lanyard designs', caption: 'IT lanyard designs.', width: 1600, height: 1600 },
    ],
  },
  community: {
    cover: '/images/projects/community/01-lual-street-party.webp',
    coverAlt: 'Barangay fiesta street party posters',
    gallery: [
      { src: '/images/projects/community/01-lual-street-party.webp', alt: 'Brgy. Lual Fiesta 2024 street party posters', caption: 'Barangay fiesta: street party line-up.', width: 1600, height: 1600 },
      { src: '/images/projects/community/02-lual-contests.webp', alt: 'Brgy. Lual Fiesta 2024 contest posters', caption: 'Barangay fiesta: contests.', width: 1600, height: 1600 },
      { src: '/images/projects/community/03-summer-league.webp', alt: 'Summer League 2024 posts', caption: 'Summer League 2024.', width: 1200, height: 1600 },
      { src: '/images/projects/community/04-days-to-go.webp', alt: 'Countdown posts', caption: 'Countdown series.', width: 1600, height: 1600 },
      { src: '/images/projects/community/05-basketball-league.webp', alt: 'Basketball League 2024 posts', caption: 'Basketball League 2024.', width: 1600, height: 1600 },
      { src: '/images/projects/community/06-nonato-3-years.webp', alt: 'Nonato Beach Resort third anniversary poster', caption: 'Beach-resort anniversary line-up.', width: 900, height: 1200 },
      { src: '/images/projects/community/07-live-acoustic.webp', alt: 'Live acoustic gig poster', caption: 'Live music poster.', width: 900, height: 1113 },
      { src: '/images/projects/community/08-rogen-theo.webp', alt: 'Illustrated fifth birthday banner', caption: 'Illustrated birthday banner.', width: 1600, height: 1164 },
      { src: '/images/projects/community/09-corazones-cruzados.webp', alt: 'Corazones Cruzados film poster', caption: 'Film poster.', width: 900, height: 1200 },
      { src: '/images/projects/community/10-alpas-partylist.webp', alt: 'ALPAS partylist campaign posts', caption: 'Campaign materials.', width: 1200, height: 1600 },
      { src: '/images/projects/community/11-women-1.webp', alt: 'The story of women did not begin with recognition', caption: 'Women’s Month carousel.', width: 1080, height: 1080 },
      { src: '/images/projects/community/12-women-2.webp', alt: 'Filipino women shaping society', caption: 'Women’s Month carousel.', width: 1080, height: 1080 },
      { src: '/images/projects/community/13-women-3.webp', alt: 'Para sa kababaihang naglatag ng daan', caption: 'Women’s Month carousel.', width: 1080, height: 1080 },
      { src: '/images/projects/community/14-lanyard-blue.webp', alt: 'Blue lanyard mockup', caption: 'Lanyard designs.', width: 1200, height: 1600 },
      { src: '/images/projects/community/15-lanyard-gold.webp', alt: 'Black and gold lanyard mockup', caption: 'Lanyard designs.', width: 1200, height: 1600 },
      { src: '/images/projects/community/16-lanyard-black.webp', alt: 'Black lanyard mockup', caption: 'Lanyard designs.', width: 1200, height: 1600 },
      { src: '/images/projects/community/17-president-polo.webp', alt: 'President polo shirt design', caption: 'Polo shirt design.', width: 1600, height: 1067 },
    ],
  },
  'tourism-casiguran': {
    cover: '/images/projects/tourism-casiguran/00-cover.webp',
    coverAlt: 'Casiguran tourism logo: geometric tiles of the sea, mountains, harvest, lighthouse and sunrise above the Casiguran wordmark',
    gallery: [
      { src: '/images/projects/tourism-casiguran/01-logo.webp', alt: 'Casiguran tourism logo with the tagline wonder, adventure, diversity, inspiration', caption: 'The primary logo and its four-word tagline.', width: 967, height: 792 },
      { src: '/images/projects/tourism-casiguran/02-logo-variations.webp', alt: 'Horizontal and stacked versions of the Casiguran logo', caption: 'Horizontal and stacked logo versions.', width: 1200, height: 444 },
      { src: '/images/projects/tourism-casiguran/03-color-palette.webp', alt: 'Five-colour palette from deep blue to sunrise orange, each with its meaning', caption: 'A five-colour palette, each colour drawn from a place.', width: 1200, height: 295 },
      { src: '/images/projects/tourism-casiguran/04-lockups.webp', alt: 'Logo mark over a coastal photograph and a compact horizontal lockup', caption: 'The mark on photography, and a compact lockup.', width: 1200, height: 216 },
      { src: '/images/projects/tourism-casiguran/05-typography.webp', alt: 'Crostan typeface specimen with the rationale for choosing it', caption: 'Typography: Crostan.', width: 1200, height: 316 },
      { src: '/images/projects/tourism-casiguran/06-applications.webp', alt: 'The logo applied to a polo shirt, a tote bag and keychain straps', caption: 'Applications: polo shirt, tote bag and keychains.', width: 1200, height: 1014 },
    ],
  },
};

export { toolGroups } from './tools';

export const experience = [
  { role: 'Editor-in-Chief', company: 'The Voice of the Sierra', detail: 'Aurora State College of Technology', period: '2025 — Present', description: 'Editorial direction, content development, and publication production in a collaborative student newsroom.' },
  { role: 'Layout Artist & Social Media Manager', company: 'Mailikha Printing House', detail: 'Design & content', period: '2025 — Present', description: 'Graphic design, print layouts, and consistent visual communication across social media and printed materials.' },
  { role: 'Multimedia Officer', company: 'AITECHS', detail: 'Association of Information Technology Students', period: '2023 — 2024', description: 'Multimedia design and creative contributions for student organization activities and communications.' },
];
