export enum UserRole {
  FARMER = 'FARMER',
  BUYER = 'BUYER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export interface CropAnalysis {
  id: string;
  timestamp: number;
  imageUrl: string;
  healthy: boolean;
  diseaseName?: string;
  confidence: number;
  advice: string;
  treatment?: string;
  language: 'en' | 'fr';
}

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  imageUrl: string;
  description: string;
  /** Province / Zone (Burundi). For marketplace card. */
  provinceZone?: string;
  /** Available yield in kg. For marketplace card. */
  availableYieldKg?: number;
}

export interface SoilRecommendation {
  id: string;
  soilType: string;
  cropType: string;
  phLevel: number;
  season: string;
  recommendation: string;
  fertilizer: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}
