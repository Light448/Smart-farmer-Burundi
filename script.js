// ==============================================
// SMART FARMER BURUNDI - COMPLETE APPLICATION
// ==============================================

// ===== GLOBAL STATE =====
const AppState = {
    user: null,
    isLoggedIn: false,
    currentSection: 'home',
    cropPredictions: [],
    marketplaceItems: [],
    conversations: [],
    notifications: [],
    adminMode: false,
    currentConversationId: null
};

// ===== LOCAL STORAGE KEYS =====
const STORAGE_KEYS = {
    USER: 'smartFarmer_user',
    PREDICTIONS: 'smartFarmer_predictions',
    MARKETPLACE: 'smartFarmer_marketplace',
    CONVERSATIONS: 'smartFarmer_conversations'
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Smart Farmer Burundi...');
    
    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // Load saved state
    loadSavedState();
    
    // Initialize all components
    initializeNavigation();
    initializeEventListeners();
    initializeCropDetection();
    initializeMarketplace();
    initializeChat();
    initializeModals();
    
    // Check URL parameters for demo/admin mode
    checkUrlParameters();
    
    // Start counter animations
    startCounters();
    
    console.log('✅ Application initialized successfully');
});

// ... (Rest of the 2000+ lines of JavaScript code)
// [This would continue with all the functions from the previous app.js]