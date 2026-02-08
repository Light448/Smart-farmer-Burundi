import { Product } from "./types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    sellerId: '2',
    sellerName: 'Jean Pierre',
    name: 'Fresh Tomatoes / Tomates Fraîches',
    price: 1500,
    currency: 'BIF',
    category: 'Vegetables',
    imageUrl: 'https://picsum.photos/id/102/400/300',
    description: 'Organic tomatoes harvested this morning. High quality.'
  },
  {
    id: '2',
    sellerId: '2',
    sellerName: 'Jean Pierre',
    name: 'Maize / Maïs',
    price: 800,
    currency: 'BIF',
    category: 'Grains',
    imageUrl: 'https://picsum.photos/id/111/400/300',
    description: 'Dried maize suitable for flour.'
  },
  {
    id: '3',
    sellerId: '99',
    sellerName: 'Maria N.',
    name: 'Coffee Beans / Café',
    price: 5000,
    currency: 'BIF',
    category: 'Cash Crops',
    imageUrl: 'https://picsum.photos/id/106/400/300',
    description: 'Premium Arabica beans from Kayanza.'
  }
];

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
