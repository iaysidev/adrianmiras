export interface Tool {
  id: string;
  name: string;
  icon: string;
  collection?: 'logos' | 'simple-icons';
  color?: string;
  sourceUrl?: string;
  extension?: 'svg' | 'ico';
}

export interface ToolGroup {
  id: string;
  name: string;
  verb: string;
  description: string;
  tools: Tool[];
}

export const toolGroups: ToolGroup[] = [
  {
    id: 'build', name: 'Web & development', verb: 'BUILD',
    description: 'The code, components, and version control behind the interface.',
    tools: [
      { id: 'html5', name: 'HTML5', icon: 'html-5' },
      { id: 'css3', name: 'CSS3', icon: 'css-3' },
      { id: 'javascript', name: 'JavaScript', icon: 'javascript' },
      { id: 'react', name: 'React', icon: 'react' },
      { id: 'php', name: 'PHP', icon: 'php' },
      { id: 'git', name: 'Git', icon: 'git-icon' },
      { id: 'github', name: 'GitHub', icon: 'github-icon' },
    ],
  },
  {
    id: 'design', name: 'Design & interfaces', verb: 'SHAPE',
    description: 'For shaping identities, interfaces, and ideas into something tangible.',
    tools: [
      { id: 'figma', name: 'Figma', icon: 'figma' },
      { id: 'photoshop', name: 'Photoshop', icon: 'adobe-photoshop' },
      { id: 'illustrator', name: 'Illustrator', icon: 'adobe-illustrator' },
      { id: 'indesign', name: 'InDesign', icon: 'adobe-indesign' },
      { id: 'canva', name: 'Canva', icon: 'canva', collection: 'simple-icons', color: '#00C4CC' },
    ],
  },
  {
    id: 'connect', name: 'Mobile & data', verb: 'CONNECT',
    description: 'Native experiences and the data that brings them together.',
    tools: [
      { id: 'kotlin', name: 'Kotlin', icon: 'kotlin-icon' },
      { id: 'java', name: 'Java', icon: 'java' },
      { id: 'jetpack-compose', name: 'Jetpack Compose', icon: 'jetpackcompose', collection: 'simple-icons', color: '#4285F4' },
      { id: 'firebase', name: 'Firebase', icon: 'firebase-icon' },
      { id: 'supabase', name: 'Supabase', icon: 'supabase-icon' },
      { id: 'mysql', name: 'MySQL', icon: 'mysql-icon' },
    ],
  },
  {
    id: 'create', name: 'Content & motion', verb: 'CREATE',
    description: 'Color, motion, and a consistent presence across digital channels.',
    tools: [
      { id: 'lightroom', name: 'Lightroom', icon: 'adobe-lightroom' },
      { id: 'premiere-pro', name: 'Premiere Pro', icon: 'adobe-premiere' },
      { id: 'capcut', name: 'CapCut', icon: 'capcut', sourceUrl: 'https://sf16-web-tos-buz.capcutstatic.com/obj/capcut-web-buz-sg/common/images/lv_web-2.ico', extension: 'ico' },
      { id: 'meta-business-suite', name: 'Meta Business Suite', icon: 'meta-icon' },
    ],
  },
];
