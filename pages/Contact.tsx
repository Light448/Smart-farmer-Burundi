import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface Props {
    lang: 'en' | 'fr';
}

const Contact: React.FC<Props> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In real app, send to backend
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact & Support</h1>

        <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
                <div className="bg-green-50 p-8 rounded-xl">
                    <h2 className="text-2xl font-bold text-green-900 mb-6">Get in Touch</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full text-green-600 shadow-sm"><Phone /></div>
                            <div>
                                <h3 className="font-bold text-gray-900">Phone</h3>
                                <p className="text-gray-600">+257 77176419</p>
                                <p className="text-xs text-gray-500">Mon-Fri 8am-5pm</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full text-green-600 shadow-sm"><Mail /></div>
                            <div>
                                <h3 className="font-bold text-gray-900">Email</h3>
                                <p className="text-gray-600">smartaifarmer@gmail.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full text-green-600 shadow-sm"><MapPin /></div>
                            <div>
                                <h3 className="font-bold text-gray-900">Headquarters</h3>
                                <p className="text-gray-600">Bujumbura, Burundi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Report an Issue or Feedback</h2>
                <p className="text-gray-500 mb-6">We value your input to improve Smart Farmer.</p>

                {submitted ? (
                    <div className="bg-green-100 text-green-800 p-6 rounded-lg text-center">
                        <p className="font-bold text-lg">Thank You!</p>
                        <p>We have received your message and will respond shortly.</p>
                        <button onClick={() => setSubmitted(false)} className="mt-4 text-green-600 underline">Send another</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input required type="text" className="w-full mt-1 border-gray-300 rounded-md shadow-sm border p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input required type="email" className="w-full mt-1 border-gray-300 rounded-md shadow-sm border p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message Type</label>
                            <select className="w-full mt-1 border-gray-300 rounded-md shadow-sm border p-2">
                                <option>General Inquiry</option>
                                <option>Report Bug</option>
                                <option>Feature Request</option>
                                <option>Report User/Listing</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea required rows={4} className="w-full mt-1 border-gray-300 rounded-md shadow-sm border p-2"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 flex justify-center items-center gap-2">
                            <Send size={18} /> Send Message
                        </button>
                    </form>
                )}
            </div>
        </div>
    </div>
  );
};

export default Contact;
