// --- Interfaces ---

export interface Testimonial {
  quote: string;
  author: string;
}

export interface Service {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
  client: string;
  year: number;
  videos: string[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
}

export interface EventData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  slug: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface PastEvent {
  name: string;
  image: string;
}

// --- Data ---

export const testimonials: Testimonial[] = [
  {
    quote:
      "I've never felt more welcomed and valued by a company before! Their commitment to diversity and inclusion truly shines through in everything they do.",
    author: "Adetolu Tayo",
  },
  {
    quote:
      "From start to finish, I felt like I was part of something bigger. Their dedication to inclusion isn't just a statement—it's a way of life!",
    author: "Stephanie Opara",
  },
  {
    quote:
      "Highly recommend! Not only are their services top-notch, but the sense of community they build is unlike anything I've seen before.",
    author: "Sylvester T",
  },
];

export const services: Service[] = [
  {
    title: "Artist Bookings",
    description:
      "We can book any of your desired Nigerian artists for your various events anywhere across the world at the best rate with stress free engagement, management and co-ordination.",
  },
  {
    title: "Asset & Content Creation",
    description:
      "Our in-house photography, videography and editing team produce cutting-edge social media assets for your brand, optimised for each platform. Whether you need campaign photos, branded videos or repurposed influencer content — we've got you covered.",
  },
  {
    title: "Crisis Management",
    description:
      "We are very prompt in Identifying, Measuring, Monitoring, Fixing, Repairing, Preventing, Response Management etc.",
  },
  {
    title: "Public and Media Relations",
    description:
      "Our dedicated creative strategists and content team work together to build a game plan that will amplify your story and meaningfully grow your online presence. We leverage our relationships with key journalists and influencers to get your story told.",
  },
  {
    title: "Social Media Ads & Campaigns",
    description:
      "We develop and execute social media strategies that engage your target audience, build brand awareness, and drive business results.",
  },
  {
    title: "Reporting",
    description:
      "Our reports measure how audiences are engaging with your social presence and provide you with a clear understanding of key performance metrics. We analyse trends in your audience growth, demographics, and interactions to continuously improve strategies and maximise your ROI.",
  },
];

export const projects: Project[] = [
  {
    id: "burna-boy-concert",
    title: "Burna Boy Live in Concert",
    category: "Live Event",
    thumbnail: "/images/projects/project-1.jpg",
    images: [
      "/images/projects/project-1.jpg",
      "/images/projects/project-1-2.jpg",
      "/images/projects/project-1-3.jpg",
    ],
    description:
      "A spectacular live concert experience featuring Burna Boy, produced and managed by A1 Media from conception to execution.",
    client: "Burna Boy Management",
    year: 2025,
    videos: [],
  },
  {
    id: "brand-campaign-coca-cola",
    title: "Coca-Cola Youth Campaign",
    category: "Brand Campaign",
    thumbnail: "/images/projects/project-2.jpg",
    images: [
      "/images/projects/project-2.jpg",
      "/images/projects/project-2-2.jpg",
    ],
    description:
      "A dynamic social media campaign targeting Gen Z audiences across Lagos and Abuja, driving engagement through influencer partnerships and experiential activations.",
    client: "Coca-Cola Nigeria",
    year: 2025,
    videos: [],
  },
  {
    id: "asake-music-video",
    title: "Asake — Official Music Video",
    category: "Music Video",
    thumbnail: "/images/projects/project-3.jpg",
    images: [
      "/images/projects/project-3.jpg",
      "/images/projects/project-3-2.jpg",
    ],
    description:
      "Full production of Asake's official music video, from creative direction and location scouting to post-production and distribution.",
    client: "YBNL Nation",
    year: 2024,
    videos: [],
  },
  {
    id: "lagos-fashion-week",
    title: "Lagos Fashion Week Coverage",
    category: "Content Creation",
    thumbnail: "/images/projects/project-4.jpg",
    images: [
      "/images/projects/project-4.jpg",
      "/images/projects/project-4-2.jpg",
      "/images/projects/project-4-3.jpg",
    ],
    description:
      "Comprehensive media coverage of Lagos Fashion Week, including backstage content, runway photography, and social media management.",
    client: "Style House Files",
    year: 2024,
    videos: [],
  },
  {
    id: "heineken-green-light",
    title: "Heineken Green Light Sessions",
    category: "Brand Activation",
    thumbnail: "/images/projects/project-5.jpg",
    images: ["/images/projects/project-5.jpg"],
    description:
      "An exclusive series of intimate live music sessions sponsored by Heineken, curated and produced by A1 Media across premium venues in Lagos.",
    client: "Heineken Nigeria",
    year: 2024,
    videos: [],
  },
  {
    id: "wizkid-album-launch",
    title: "Wizkid Album Launch Party",
    category: "Live Event",
    thumbnail: "/images/projects/project-6.jpg",
    images: [
      "/images/projects/project-6.jpg",
      "/images/projects/project-6-2.jpg",
    ],
    description:
      "Exclusive album launch event for Wizkid, featuring VIP guest management, media coordination, and live production across multiple venues.",
    client: "Starboy Entertainment",
    year: 2023,
    videos: [],
  },
];

export const artists: Artist[] = [
  {
    id: "artist-1",
    name: "DJ Neptune",
    image: "/images/artists/artist-1.jpg",
    genre: "Afrobeats / DJ",
  },
  {
    id: "artist-2",
    name: "Teni",
    image: "/images/artists/artist-2.jpg",
    genre: "Afropop",
  },
  {
    id: "artist-3",
    name: "Rema",
    image: "/images/artists/artist-3.jpg",
    genre: "Afrorave",
  },
  {
    id: "artist-4",
    name: "Ayra Starr",
    image: "/images/artists/artist-4.jpg",
    genre: "Afropop",
  },
  {
    id: "artist-5",
    name: "BNXN",
    image: "/images/artists/artist-5.jpg",
    genre: "Afrofusion",
  },
  {
    id: "artist-6",
    name: "Falz",
    image: "/images/artists/artist-6.jpg",
    genre: "Hip Hop / Afrobeats",
  },
];

export const events: EventData[] = [
  {
    id: "amlr",
    title: "Amapiano Left and Right",
    tagline: "Back to the Groove",
    description:
      "After a brief pause, Amapiano Left and Right is back—and we're coming in hot with Back to the Groove! It's time to reconnect with the rhythm, the basslines, and the unmatched vibe only Amapiano can deliver.",
    image: "/images/events/amlr.jpg",
    slug: "amlr",
  },
  {
    id: "about-the-hype",
    title: "About The Hype",
    tagline: "Gives Hype A Meaning",
    description:
      "Welcome to About The Hype — where the energy is unmatched and the vibe is everything. Every Thursday night, we bring together elite Artistes, Hypemen, and industry tastemakers for an unforgettable experience.",
    image: "/images/events/ath.jpg",
    slug: "about-the-hype",
  },
];

export const socialLinks: SocialLink[] = [
  { platform: "Instagram", url: "https://www.instagram.com/thea1media" },
  { platform: "X", url: "https://x.com/thea1media" },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/share/1Ed57T2dF9/",
  },
];

export const instagramPosts = [
  "https://www.instagram.com/p/DFh2zY_tVoZ/",
  "https://www.instagram.com/p/DGDC3p7tuwj/",
  "https://www.instagram.com/p/C_LW-v4tL8l/",
  "https://www.instagram.com/p/C_LaP4QNEYS/",
];

export const amlrPastEvents: PastEvent[] = [
  { name: "Debut Edition", image: "/images/events/amlr-1.jpg" },
  { name: "Let The Music Bind Us", image: "/images/events/amlr-2.jpg" },
  { name: "Bring Back The Groove", image: "/images/events/amlr-3.jpg" },
  { name: "We Groove Different", image: "/images/events/amlr-4.jpg" },
  {
    name: "Pretty Girls Love Amapiano",
    image: "/images/events/amlr-5.jpg",
  },
  {
    name: "Your Piano Is Not My Piano",
    image: "/images/events/amlr-6.jpg",
  },
  { name: "Lagos to Johannesburg", image: "/images/events/amlr-7.jpg" },
  { name: "The Last Dance", image: "/images/events/amlr-8.jpg" },
  { name: "We Dance Again", image: "/images/events/amlr-9.jpg" },
];

export const navItems = [
  { label: "Who We Are", href: "/who-we-are" },
  { label: "What We Do", href: "/what-we-do" },
  { label: "Our Portfolio", href: "/portfolio" },
  { label: "Our Artists", href: "/artists" },
  { label: "Our Events", href: "/events" },
  { label: "Socials", href: "/socials" },
];
