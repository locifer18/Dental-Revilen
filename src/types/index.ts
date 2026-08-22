export type TreatmentCategory =
  | "all"
  | "cosmetic"
  | "orthodontics"
  | "restorative"
  | "surgical"
  | "preventive";

export interface ClinicLocation {
  id: string;
  name: string;
  city: string;
  tag: string;
  address: string;
  landmark: string;
  phone: string;
  whatsappPhone: string;
  email: string;
  mapEmbedUrl: string;
  directionsUrl: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  metroAccess: string;
  parkingInfo: string;
  isFlagship?: boolean;
}

export interface ProcedureStep {
  stepNumber: number;
  title: string;
  description: string;
  duration: string;
}

export interface TreatmentFAQ {
  question: string;
  answer: string;
}

export interface Treatment {
  slug: string;
  title: string;
  shortTitle: string;
  category: TreatmentCategory;
  tag: string;
  badge?: string;
  heroImage: string;
  secondaryImage?: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  keyBenefits: string[];
  idealCandidate: string[];
  procedureSteps: ProcedureStep[];
  duration: string;
  recoveryTime: string;
  longevity: string;
  painLevel: "Completely Painless" | "Minimal Discomfort (Managed)" | "Mild Sensitivity" | "Computerized Painless Anesthesia";
  anesthesiaType: string;
  aftercareTips: string[];
  startingPrice: number;
  priceDisplay: string;
  emiStartingPrice: number;
  emiDisplay: string;
  faqs: TreatmentFAQ[];
  relatedDoctorSlugs: string[];
}

export interface DoctorEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface Doctor {
  slug: string;
  name: string;
  title: string;
  qualification: string;
  experienceYears: number;
  specialty: string;
  subSpecialties: string[];
  bio: string;
  fullBio: string;
  image: string;
  education: DoctorEducation[];
  memberships: string[];
  awards: string[];
  verifiedCasesCount: number;
  consultationFee: number;
  availableDays: string[];
  locations: string[];
}

export interface Equipment {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  tagline: string;
  description: string;
  clinicalAdvantage: string;
  patientBenefit: string;
  techSpecs: { label: string; value: string }[];
}

export interface Transformation {
  id: string;
  title: string;
  treatmentType: string;
  treatmentSlug: string;
  duration: string;
  doctorName: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  clinicalNotes: string;
  isDemoSample: boolean;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  treatment: string;
  treatmentSlug?: string;
  rating: number;
  date: string;
  quote: string;
  fullReview: string;
  verified: boolean;
  avatarUrl: string;
}

export interface FAQ {
  id: string;
  category: "general" | "treatments" | "financing" | "safety" | "appointment";
  question: string;
  answer: string;
}

export type BookingStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface BookingPayload {
  id?: string;
  locationId: string;
  locationName: string;
  treatmentSlug: string;
  treatmentTitle: string;
  doctorSlug: string;
  doctorName: string;
  appointmentDate: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  isFirstVisit: boolean;
  notes?: string;
  createdAt?: string;
  status?: "confirmed" | "pending" | "cancelled";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ora";
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    href: string;
  };
}
