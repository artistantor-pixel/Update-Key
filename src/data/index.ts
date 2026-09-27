export const calculatorData = [
  {
    category: 'Branding & Design',
    items: [
      { id: 'logo', name: 'Logo & Visual Identity', price: 1500, description: 'Primary logo, color palette, and typography.' },
      { id: 'brand_book', name: 'Full Brand Guidelines', price: 2500, description: 'Comprehensive rulebook for all visual assets.' },
      { id: 'uiux', name: 'UI/UX App Design', price: 3500, description: 'Figma prototyping for mobile or web apps.' }
    ]
  },
  {
    category: 'Web Development',
    items: [
      { id: 'landing_page', name: 'High-Converting Landing Page', price: 1200, description: 'Single page optimized for lead generation.' },
      { id: 'custom_web', name: 'Custom Website (Up to 5 Pages)', price: 4000, description: 'React/Next.js blazing fast architecture.' },
      { id: 'ecommerce', name: 'E-Commerce Platform', price: 7500, description: 'Full Shopify or custom e-commerce build.' }
    ]
  },
  {
    category: 'Growth & Automation',
    items: [
      { id: 'meta_ads', name: 'Meta/Google Ads Setup', price: 800, description: 'Campaign architecture and tracking setup.' },
      { id: 'motion_ads', name: 'Motion Graphic Creatives (x3)', price: 1500, description: 'High-converting video ads for TikTok/Reels.' },
      { id: 'ai_bot', name: 'AI Customer Support Bot', price: 2000, description: 'Custom GPT trained on your business data.' }
    ]
  }
];

export const careersData = [
  {
    id: 'frontend',
    title: 'Senior Frontend Engineer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Engineering',
    description: 'We are looking for a React/Next.js expert with an eye for pixel-perfect design and smooth animations to build next-generation web experiences.'
  },
  {
    id: 'designer',
    title: 'UI/UX Product Designer',
    type: 'Full-time',
    location: 'Remote',
    department: 'Design',
    description: 'Join our creative team to craft stunning, user-centric interfaces. Proficiency in Figma and a strong portfolio of modern, glassmorphic designs required.'
  },
  {
    id: 'growth',
    title: 'Growth Marketing Manager',
    type: 'Contract',
    location: 'Hybrid',
    department: 'Marketing',
    description: 'Lead our client ad campaigns. Must have a proven track record of managing $100k+ monthly ad spend on Meta and Google with high ROAS.'
  }
];

export const teamData = [
  {
    id: 'antor',
    name: 'Antor Biswas',
    role: 'Founder & CEO',
    bio: 'Visionary leader bridging the gap between cutting-edge technology and brilliant design.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'Head of AI & Growth',
    bio: 'Data scientist turned growth hacker. She automates the impossible.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 'marcus',
    name: 'Marcus Wright',
    role: 'Creative Director',
    bio: 'Award-winning designer obsessed with pixel-perfect glassmorphism and typography.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    id: 'elena',
    name: 'Elena Rodriguez',
    role: 'Lead Developer',
    bio: 'Building the lightning-fast, scalable React architecture that powers our ecosystems.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  }
];

export const servicesData = [
  {
    id: 'identity',
    title: 'Identity',
    description: 'We craft memorable brands that stand out and connect with your audience.',
    features: ['Logo Design', 'Brand Guidelines', 'Packaging', 'Typography & Color'],
  },
  {
    id: 'presence',
    title: 'Presence',
    description: 'High-converting custom web experiences that turn visitors into customers.',
    features: ['Custom Web Development', 'Landing Pages', 'UI/UX Design', 'SEO Optimization'],
  },
  {
    id: 'growth',
    title: 'Growth (Advertising)',
    description: 'Data-driven ad campaigns designed for maximum ROI and scale.',
    features: ['Meta/Google Ads', 'Motion Ads', 'Performance Creatives', 'A/B Testing'],
  },
  {
    id: 'efficiency',
    title: 'Efficiency (AI)',
    description: 'Automate your workflows and scale operations without adding headcount.',
    features: ['AI Automation', 'Chatbots', 'CRM Integration', 'Zapier/Make Setups'],
  },
];

export const pricingData = [
  {
    id: 'launchpad',
    name: 'Launchpad',
    tagline: 'Starter package for new brands',
    price: '$2,500',
    features: [
      'Basic Brand Identity',
      '1-Page High-Converting Website',
      'Contact Form Integration',
      'Mobile Responsive Design',
      '1 Week Delivery',
    ],
    popular: false,
  },
  {
    id: 'growth-engine',
    name: 'Growth Engine',
    tagline: 'Most popular for scaling businesses',
    price: '$5,000',
    features: [
      'Full Brand Identity + Guidelines',
      'Custom Multi-page Website (Up to 5 pages)',
      '1 Motion Ad Creative',
      'Basic SEO Setup',
      '3 Weeks Delivery',
    ],
    popular: true,
  },
  {
    id: 'full-ecosystem',
    name: 'Full Ecosystem',
    tagline: 'The all-in-one agency replacement',
    price: '$10,000+',
    features: [
      'Premium Branding + Web Experience',
      'Meta/Google Ads Campaign Setup',
      'AI Automation + CRM Setup',
      'Custom Chatbot Integration',
      'Dedicated Account Manager',
    ],
    popular: false,
  }
];

export const caseStudiesData = [
  {
    id: '1',
    title: 'Neon Tech Rebrand',
    category: 'Identity & Presence',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
    metrics: {
      roas: 'N/A',
      timeSaved: '20 hrs/week',
      conversionLift: '+45%',
    },
    tabs: {
      challenge: 'Neon Tech was struggling to attract top-tier developer talent due to an outdated, corporate brand identity that felt out of touch with modern engineering culture.',
      solution: 'We completely overhauled their visual identity, leaning into a dark-mode first, cyberpunk-inspired aesthetic. We built a custom WebGL landing page that serves as a playground for developers.',
      impact: 'Within 30 days of launch, inbound job applications increased by 45%, and the new branding was featured on Awwwards, establishing them as a tech leader.'
    }
  },
  {
    id: '2',
    title: 'Apex E-Commerce',
    category: 'Growth & Efficiency',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    metrics: {
      roas: '4.2x',
      timeSaved: '50 hrs/week',
      conversionLift: '+120%',
    },
    tabs: {
      challenge: 'Apex was burning ad spend on Meta with a terrible 1.1x ROAS. Furthermore, their support team was overwhelmed with basic "Where is my order?" inquiries.',
      solution: 'We deployed a series of rapid-fire motion graphic creatives optimized for TikTok and Reels. Simultaneously, we built an AI-powered CRM chatbot to handle level 1 support instantly.',
      impact: 'ROAS stabilized at 4.2x within 60 days. The AI chatbot now handles 70% of all customer inquiries, saving the team over 50 hours a week.'
    }
  },
];

export const sectorsData = [
  {
    id: 'khoborki',
    title: 'Khobor Ki',
    description: 'Your reliable source for the latest news and updates, keeping you informed on what matters most.',
    iconName: 'Newspaper',
    color: 'from-primary to-accent',
    bgGlow: 'bg-primary/10',
    link: '#khoborki',
    className: 'md:col-span-2 md:row-span-2',
    large: true,
    horizontal: false,
  },
  {
    id: 'updatekids',
    title: 'Update Kids',
    description: 'A fun, educational, and safe space tailored for children.',
    iconName: 'Smile',
    color: 'from-pink-500 to-rose-400',
    bgGlow: 'bg-pink-500/10',
    link: '#updatekids',
    className: 'md:col-span-1 md:row-span-1',
    large: false,
    horizontal: false,
  },
  {
    id: 'problemkey',
    title: 'Problem Key',
    description: 'Community forum to discuss problems and find solutions.',
    iconName: 'Users',
    color: 'from-purple-500 to-indigo-400',
    bgGlow: 'bg-purple-500/10',
    link: '/problem-key',
    className: 'md:col-span-1 md:row-span-1',
    large: false,
    horizontal: false,
  },
  {
    id: 'updatemart',
    title: 'Update Mart',
    description: 'Your one-stop digital shop for exclusive products, merchandise, and daily essentials.',
    iconName: 'ShoppingCart',
    color: 'from-emerald-400 to-teal-500',
    bgGlow: 'bg-emerald-500/10',
    link: '#updatemart',
    className: 'md:col-span-3 md:row-span-1 flex flex-col md:flex-row items-center md:items-start md:justify-between',
    large: true,
    horizontal: true,
  },
];
