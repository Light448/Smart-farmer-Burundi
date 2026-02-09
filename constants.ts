import { Product } from "./types";

/**
 * Marketplace listings. ZERO AUTHORITY to create data — system must NEVER auto-add price, quantity, location, crop, or images.
 * ALL listings must be created manually by the farmer. No demo listings, no sample data.
 */
export const MOCK_PRODUCTS: Product[] = [];

export const TRANSLATIONS = {
  en: {
    welcome: "Welcome to Smart Farmer Burundi",
    subtitle: "Empowering Farmers with AI",
    upload: "Upload Photo",
    analyzing: "Analyzing Crop...",
    healthy: "Healthy Crop",
    diseased: "Disease Detected",
    confidence: "Confidence",
    advice: "Advice",
    treatment: "Recommended Treatment",
    marketplace: "Marketplace",
    soilAdvisor: "Soil Advisor",
    cropRecommendation: "Crop by Region",
    contact: "Contact Us",
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
    admin: "Admin",
    report: "Report Issue",
    language: "Français", // Button label to switch to French
    copyright: "© 2024 Smart Farmer Burundi. Built by Floris Hatungimana."
  },
  fr: {
    welcome: "Bienvenue sur Smart Farmer Burundi",
    subtitle: "Autonomiser les agriculteurs avec l'IA",
    upload: "Télécharger une photo",
    analyzing: "Analyse en cours...",
    healthy: "Culture Saine",
    diseased: "Maladie Détectée",
    confidence: "Confiance",
    advice: "Conseil",
    treatment: "Traitement Recommandé",
    marketplace: "Marché",
    soilAdvisor: "Conseiller Sol",
    cropRecommendation: "Cultures par région",
    contact: "Contactez-nous",
    login: "Connexion",
    logout: "Déconnexion",
    dashboard: "Tableau de bord",
    admin: "Admin",
    report: "Signaler un problème",
    language: "English", // Button label to switch to English
    copyright: "© 2025 Smart Farmer Burundi. Créé par Floris Hatungimana."
  }
};
