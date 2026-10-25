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
export const projectMedia: Record<string, {
  cover: string | null;
  coverAlt: string;
  preview?: VideoSource;
  gallery: { src: string; alt: string; caption: string }[];
}> = {
  'kasiguru-web': { cover: null, coverAlt: 'KasiGuru web administration interface', gallery: [] },
  'kasiguru-mobile': { cover: null, coverAlt: 'KasiGuru mobile language-learning screens', gallery: [] },
  mailikha: { cover: null, coverAlt: 'Mailikha marketing and print design collection', gallery: [] },
  'voice-of-the-sierra': { cover: null, coverAlt: 'The Voice of the Sierra publication layouts', gallery: [] },
  'tourism-casiguran': { cover: null, coverAlt: 'Tourism Casiguran visual identity exploration', gallery: [] },
};

export { toolGroups } from './tools';

export const experience = [
  { role: 'Editor-in-Chief', company: 'The Voice of the Sierra', detail: 'Aurora State College of Technology', period: '2025 — Present', description: 'Editorial direction, content development, and publication production in a collaborative student newsroom.' },
  { role: 'Layout Artist & Social Media Manager', company: 'Mailikha Printing House', detail: 'Design & content', period: '2025 — Present', description: 'Graphic design, print layouts, and consistent visual communication across social media and printed materials.' },
  { role: 'Multimedia Officer', company: 'AITECHS', detail: 'Association of Information Technology Students', period: '2023 — 2024', description: 'Multimedia design and creative contributions for student organization activities and communications.' },
];
