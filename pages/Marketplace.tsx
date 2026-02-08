import React, { useState } from 'react';
import { User, Product, ChatMessage } from '../types';
import { MOCK_PRODUCTS, TRANSLATIONS } from '../constants';
import { Search, ShoppingCart, MessageCircle, X, Send } from 'lucide-react';

interface Props {
  lang: 'en' | 'fr';
  user: User | null;
}

const Marketplace: React.FC<Props> = ({ lang, user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const t = TRANSLATIONS[lang];

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.marketplace}</h1>
        <div className="mt-4 md:mt-0 relative w-full md:w-96">
          <input
            type="text"
            placeholder={lang === 'en' ? "Search crops..." : "Rechercher..."}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden bg-gray-200">
               <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                   <span className="text-xs font-bold text-green-600 uppercase tracking-wide">{product.category}</span>
                   <h3 className="text-xl font-bold text-gray-900 mt-1">{product.name}</h3>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                   {product.price} {product.currency}
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">{product.description}</p>
              
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                       <img src={`https://picsum.photos/seed/${product.sellerId}/50`} alt="Seller" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{product.sellerName}</span>
                </div>
                <button 
                  onClick={() => openChat(product)}
                  className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                >
                    <MessageCircle size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
