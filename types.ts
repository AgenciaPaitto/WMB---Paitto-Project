export interface Property {
  id: string;
  model: string;
  tagline: string;
  specs: string;
  price: string;
  features: string[];
  imageUrl: string;
}

export interface Amenity {
  icon: string;
  title: string;
  desc: string;
}

export enum SectionId {
  HERO = 'hero_section',
  BIO = 'bio_section',
  SHOWCASE = 'houses_showcase',
  AMENITIES = 'location_amenities',
  TRUST = 'security_trust',
  CTA = 'cta_fomo',
  FOOTER = 'footer'
}