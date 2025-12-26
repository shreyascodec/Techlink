// Type definitions for the application

export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface Stat {
  number: string;
  label: string;
}

