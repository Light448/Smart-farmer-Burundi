/**
 * Smart Farmer Burundi Marketplace. ZERO AUTHORITY TO CREATE DATA.
 * System must NEVER auto-add: price, quantity, location, crop type, or images.
 * Farmer input is the ONLY source of truth. Display exactly what the farmer enters — nothing more, nothing less.
 * No auto-fill, no placeholders, no inference. If a value is not provided by the farmer → leave it empty.
 */
import React, { useState, useRef } from 'react';
import { User, Product, ChatMessage } from '../types';
import { MOCK_PRODUCTS, TRANSLATIONS } from '../constants';
import { PROVINCES_ZONES } from '../data/cropRecommendations';
import { Search, MessageCircle, X, Send, Plus, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  lang: 'en' | 'fr';
  user: User | null;
}

const Marketplace: React.FC<Props> = ({ lang, user }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addForm, setAddForm] = useState({
    imageUrl: '',
    cropName: '',
    quantityKg: '',
    pricePerKg: '',
    location: ''
  });

  const t = TRANSLATIONS[lang];

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  /** Required farmer inputs (image optional). No auto-fill. */
  const hasRequiredFarmerInput = (p: Product) =>
    p.name?.trim() && p.price != null && p.availableYieldKg != null && p.provinceZone?.trim();

  /** Show image only when farmer uploaded it (via Add Product form). */
  const hasFarmerUploadedImage = (p: Product) => Boolean(p.imageUrl?.trim());

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAddForm(prev => ({ ...prev, imageUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = addForm.cropName.trim();
    const quantityKg = addForm.quantityKg.trim() ? Number(addForm.quantityKg) : undefined;
    const pricePerKg = addForm.pricePerKg.trim() ? Number(addForm.pricePerKg) : undefined;
    const provinceZone = addForm.location.trim() || undefined;
    if (!name || quantityKg == null || pricePerKg == null || !provinceZone) return;
    const newProduct: Product = {
      id: Date.now().toString(),
      sellerId: user?.id ?? 'farmer',
      sellerName: user?.name ?? 'Farmer',
      name,
      price: pricePerKg,
      currency: 'BIF',
      category: '',
      imageUrl: addForm.imageUrl,
      description: '',
      provinceZone,
      availableYieldKg: quantityKg
    };
    setProducts(prev => [...prev, newProduct]);
    setAddForm({ imageUrl: '', cropName: '', quantityKg: '', pricePerKg: '', location: '' });
    setShowAddProduct(false);
  };

  const noImageText = lang === 'en' ? 'No image uploaded by farmer' : 'Aucune image téléchargée par le producteur';
  const imageByFarmerText = lang === 'en' ? 'Image uploaded by farmer' : 'Image téléchargée par le producteur';
  const allDataByFarmerText = lang === 'en' ? 'All data entered by farmer' : 'Toutes les données saisies par le producteur';

  /** Empty / incomplete listing: exact message only. No auto-complete, no examples. */
  const incompleteMessage =
    lang === 'en'
      ? 'To publish your product, please enter: crop name, quantity (kg), price per kg, location, and upload a harvest image.'
      : 'Pour publier votre produit, veuillez indiquer : nom de la culture, quantité (kg), prix au kg, lieu, et télécharger une image de la récolte.';

  const openChat = (product: Product) => {
    if (!user) {
        alert("Please login to chat with seller.");
        return;
    }
    setSelectedProduct(product);
    setShowChat(true);
    // Mock initial message
    setMessages([
        {
            id: 'init',
            senderId: product.sellerId,
            receiverId: user.id,
            text: lang === 'en' ? `Hello! Interested in my ${product.name}?` : `Bonjour! Intéressé par mon ${product.name}?`,
            timestamp: Date.now()
        }
    ]);
  };

  const sendMessage = () => {
    if(!chatMessage.trim() || !user || !selectedProduct) return;
    
    const newMsg: ChatMessage = {
        id: Date.now().toString(),
        senderId: user.id,
        receiverId: selectedProduct.sellerId,
        text: chatMessage,
        timestamp: Date.now()
    };
    
    setMessages([...messages, newMsg]);
    setChatMessage('');
    
    // Simulating reply
    setTimeout(() => {
        const reply: ChatMessage = {
            id: (Date.now() + 1).toString(),
            senderId: selectedProduct.sellerId,
            receiverId: user.id,
            text: "Thanks for your message. Can you call me at +257 77...?",
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.marketplace}</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setShowAddProduct(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
          >
            <Plus size={20} /> {lang === 'en' ? 'Sell My Harvest' : 'Vendre ma récolte'}
          </button>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={lang === 'en' ? 'Search crops...' : 'Rechercher...'}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 && (
          <div className="col-span-full bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-700 text-sm">{incompleteMessage}</p>
          </div>
        )}
        {filteredProducts.map((product) =>
          !hasRequiredFarmerInput(product) ? (
            <div key={product.id} className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-amber-800 text-sm">{incompleteMessage}</p>
            </div>
          ) : (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              {/* Image: only if farmer uploaded. No placeholder image ever. */}
              <div className="aspect-[4/3] flex items-center justify-center border-b border-gray-100 bg-gray-50 min-h-[120px] relative">
                {hasFarmerUploadedImage(product) ? (
                  <>
                    <img src={product.imageUrl} alt="" className="w-full h-full object-cover absolute inset-0" />
                    <div className="absolute bottom-2 left-2 right-2 text-xs text-gray-700 bg-white/90 px-2 py-1 rounded">
                      <p>{imageByFarmerText}</p>
                      <p>{allDataByFarmerText}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm text-center px-4">{noImageText}</p>
                )}
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <p className="text-xs text-gray-500 mb-2">{allDataByFarmerText}</p>
                <p className="text-sm text-gray-700"><strong>Crop:</strong> {product.name}</p>
                <p className="text-sm text-gray-700"><strong>Quantity:</strong> {product.availableYieldKg} kg</p>
                <p className="text-sm text-gray-700"><strong>Price:</strong> {product.price} {product.currency} per kg</p>
                <p className="text-sm text-gray-700"><strong>Location:</strong> {product.provinceZone}</p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                  <span className="text-sm font-medium text-gray-700">{product.sellerName}</span>
                  <button
                    onClick={() => openChat(product)}
                    className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Add Product / Sell My Harvest modal – farmer manually enters all data. System only receives and displays. */}
      {showAddProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {lang === 'en' ? 'Add Product' : 'Ajouter un produit'}
              </h2>
              <button type="button" onClick={() => setShowAddProduct(false)} className="p-1 text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddProductSubmit} className="p-5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'en' ? 'Harvest image' : 'Image de la récolte'}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {!addForm.imageUrl ? (
                  <>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 text-sm hover:border-green-500 hover:text-green-600"
                    >
                      {lang === 'en' ? 'Choose image from device' : 'Choisir une image'}
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      {lang === 'en'
                        ? 'Upload a real photo of your harvested crop from your device.'
                        : 'Téléchargez une vraie photo de votre récolte depuis votre appareil.'}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <img src={addForm.imageUrl} alt="" className="w-full h-48 object-contain" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 mb-2">
                      {lang === 'en' ? 'Image preview (local only).' : 'Aperçu (local uniquement).'}
                    </p>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        <RefreshCw size={16} /> {lang === 'en' ? 'Change image' : 'Changer l’image'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAddForm(prev => ({ ...prev, imageUrl: '' }));
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        <Trash2 size={16} /> {lang === 'en' ? 'Remove image' : 'Supprimer l’image'}
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'en' ? 'Crop name' : 'Nom de la culture'}
                </label>
                <input
                  type="text"
                  value={addForm.cropName}
                  onChange={(e) => setAddForm(prev => ({ ...prev, cropName: e.target.value }))}
                  placeholder={lang === 'en' ? 'e.g. Maize' : 'ex. Maïs'}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'en' ? 'Quantity (kg)' : 'Quantité (kg)'}
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={addForm.quantityKg}
                  onChange={(e) => setAddForm(prev => ({ ...prev, quantityKg: e.target.value }))}
                  placeholder=""
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {lang === 'en'
                    ? 'Enter how many kilograms you are selling.'
                    : 'Indiquez combien de kilogrammes vous vendez.'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'en' ? 'Price per kg (BIF)' : 'Prix au kg (BIF)'}
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={addForm.pricePerKg}
                  onChange={(e) => setAddForm(prev => ({ ...prev, pricePerKg: e.target.value }))}
                  placeholder=""
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {lang === 'en'
                    ? 'Enter your own price per kilogram.'
                    : 'Indiquez votre propre prix au kilogramme.'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {lang === 'en' ? 'Location' : 'Lieu'}
                </label>
                <select
                  value={addForm.location}
                  onChange={(e) => setAddForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">{lang === 'en' ? 'Select province' : 'Choisir une province'}</option>
                  {PROVINCES_ZONES.map((z) => (
                    <option key={z.value} value={z.value}>{lang === 'en' ? z.labelEn : z.labelFr}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {lang === 'en'
                    ? 'Select where this crop is located (Burundi only).'
                    : 'Sélectionnez où se trouve cette culture (Burundi uniquement).'}
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
                >
                  {lang === 'en' ? 'Cancel' : 'Annuler'}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                >
                  {lang === 'en' ? 'Publish' : 'Publier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChat && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
                {/* Chat Header */}
                <div className="bg-green-600 p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <img src={`https://picsum.photos/seed/${selectedProduct.sellerId}/50`} className="w-10 h-10 rounded-full border-2 border-white" />
                        <div>
                            <h3 className="font-bold">{selectedProduct.sellerName}</h3>
                            <p className="text-xs text-green-100">{selectedProduct.name}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowChat(false)}><X/></button>
                </div>
                
                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50 space-y-3">
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                                msg.senderId === user?.id 
                                ? 'bg-green-600 text-white rounded-br-none' 
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-3 border-t bg-white flex gap-2">
                    <input 
                        type="text" 
                        className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Type a message..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button 
                        onClick={sendMessage}
                        className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
