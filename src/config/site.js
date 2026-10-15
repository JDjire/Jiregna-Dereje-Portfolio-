export const siteConfig = {
  name: 'Jiregna Dereje',
  title: 'Jiregna Dereje | Full Stack Developer Portfolio',
  description:
    'Full Stack Developer who also works with Data Science, Machine Learning, AI, Mobile App Development, and Design. I enjoy creating smart and easy-to-use apps and websites.',
  author: 'Jiregna Dereje',
  location: 'Addis Ababa, Ethiopia',
  email: 'jiregnadereje35@gmail.com',
  resumeUrl: '/JIREGNA_DEREJE_CV.pdf',
  social: {
    github: 'https://github.com/JDjire',
    linkedin: 'https://www.linkedin.com/in/jiregna-dereje-71a3ab29b',
    twitter: 'https://x.com/JireDereje1919',
    instagram: 'https://www.instagram.com/jiregna_jd?igsh=MTA0OGI2OGtzbzY2Ng==',
    telegram: 'https://t.me/JireJD',
    email: 'mailto:jiregnadereje35@gmail.com',
  },
  typingPhrases: [
    '> FULL STACK DEVELOPER',
  ],
  nav: [
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'GitHub', href: '#github' },
    { label: 'Contact', href: '#contact' },
  ],
};

export const skills = [
  { name: 'HTML5', icon: 'html', level: 90, color: 'primary' },
  { name: 'CSS3', icon: 'css', level: 85, color: 'primary' },
  { name: 'JavaScript', icon: 'javascript', level: 80, color: 'secondary' },
  { name: 'React', icon: 'react', level: 75, color: 'primary' },
  { name: 'Node.js', icon: 'nodejs', level: 70, color: 'secondary' },
  { name: 'Python', icon: 'python', level: 80, color: 'primary' },
  { name: 'Django', icon: 'django', level: 75, color: 'secondary' },
  { name: 'Git', icon: 'git', level: 85, color: 'primary' },
  { name: 'GitHub', icon: 'github', level: 85, color: 'secondary' },
];

export const projectFilters = ['all', 'web', 'mobile', 'design', 'react', 'python'];

export const certificates = [
  {
    id: 'programming-fundamentals',
    title: 'Programming Fundamentals Nanodegree',
    issuer: 'Udacity',
    description:
      'Completed the Programming Fundamentals Nanodegree, strengthening foundational programming knowledge and problem-solving skills.',
    file: '/certificates/Programming_Fundamentals_Nanodegree.pdf',
    topics: ['python'],
  },
  {
    id: 'introduction-to-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    description:
      'Studied the evolving threat landscape, cyber attacks, digital protection, risk management, and secure-by-design principles.',
    file: '/certificates/Introduction_to_Cybersecurity.pdf',
    topics: ['web'],
  },
  {
    id: 'introduction-to-networks',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    description:
      'Built a foundation in network fundamentals, IP addressing, switching, routing, protocols, services, and network security.',
    file: '/certificates/Introduction_to_Networks.pdf',
    topics: ['web'],
  },
  {
    id: 'cybershield-2026',
    title: 'Ethiopian CyberShield 2026',
    issuer: 'ALX Ethiopia and partners',
    description:
      'Participated in four days of practical cybersecurity challenges covering hardening, red team, blue team, investigation, and CTF work.',
    file: '/certificates/CyberShield2026.pdf',
    topics: ['web'],
  },
  {
    id: 'wellness-hackathon',
    title: 'Wellness Hackathon 2026',
    issuer: 'ALX Ethiopia',
    description:
      'Participated in an AI-integrated health solution hackathon and collaborated on a diet controller with personalized recommendations.',
    file: '/certificates/Wellness_Hackathon.pdf',
    topics: ['design', 'python'],
  },
  {
    id: 'geez-security',
    title: 'Cybersecurity Training',
    issuer: 'Geez Security',
    description:
      'Completed extended cybersecurity training covering reconnaissance, network scanning, web security, malware, cryptography, blue team, and CTFs.',
    file: '/certificates/GTST.pdf',
    topics: ['web'],
  },
];

export const featuredProjects = [
  {
    id: 'featured-1',
    title: 'OSI Model Interactive Guide',
    description: 'An interactive web application designed to help users understand the seven layers of the OSI networking model with visualizations, quizzes, and simulations.',
    tech: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript'],
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    liveUrl: 'https://osi-model-interactive-guide.onrender.com',
    githubUrl: 'https://github.com/JDjire/OSI-Model-Interactive-Guide',
    topics: ['web', 'python'],
    featured: true,
  },
  {
    id: 'featured-2',
    title: 'Weather Web App',
    description: 'A modern weather application that allows users to search for any city and view real-time weather data using a React frontend and Node.js backend.',
    tech: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express'],
    thumbnail: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80',
    liveUrl: 'https://jd-weather-app-tau.vercel.app/',
    githubUrl: 'https://github.com/JDjire/weather-app',
    topics: ['web', 'react'],
    featured: true,
  },
  {
    id: 'featured-4',
    title: 'Responsive Landing Page',
    description: 'A responsive landing page with an interactive navigation menu built during my Web Development Internship at Prodigy InfoTech.',
    tech: ['React', 'Tailwind', 'JavaScript'],
    thumbnail: 'https://jdjire.github.io/jiregna-portfolio/assets/Responsive%20Landing%20Page.png',
    liveUrl: 'https://responsive-landing-page-ten-nu.vercel.app/',
    githubUrl: 'https://github.com/JDjire/PRODIGY_WD_01',
    topics: ['web', 'react'],
    featured: true,
  },
  {
    id: 'featured-5',
    title: 'Stopwatch Web Application',
    description: 'A modern stopwatch web application built using React.js and Tailwind CSS with lap tracking and responsive design.',
    tech: ['React', 'Tailwind CSS'],
    thumbnail: 'https://jdjire.github.io/jiregna-portfolio/assets/Stopwatch%20Web%20Application.png',
    liveUrl: 'https://stopwatch-web-iota.vercel.app/',
    githubUrl: 'https://github.com/JDjire/PRODIGY_WD_02',
    topics: ['web', 'react'],
    featured: true,
  },
  {
    id: 'featured-6',
    title: 'Tic-Tac-Toe Web Application',
    description: 'A modern Tic-Tac-Toe web application built using React.js and Tailwind CSS with two-player gameplay and winner detection.',
    tech: ['React', 'Vite', 'Tailwind CSS'],
    thumbnail: 'https://jdjire.github.io/jiregna-portfolio/assets/Tic-Tac-Toe%20Web%20Application.png',
    liveUrl: 'https://prodigy-wd-03-omega.vercel.app/',
    githubUrl: 'https://github.com/JDjire/PRODIGY_WD_03',
    topics: ['web', 'react'],
    featured: true,
  }
];
