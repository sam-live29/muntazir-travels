import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-6 md:px-12 hidden md:block">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">M</div>
            <h2 className="text-2xl font-bold tracking-tight text-white">Muntazir Travels</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Experience the magic of Kashmir with Muntazir Travels. We provide curated packages, local expertise, and unforgettable memories in the paradise on earth.
          </p>
          <div className="flex gap-4">
            <a href="#" className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <Facebook size={20} />
            </a>
            <a href="#" className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="size-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
          <ul className="space-y-4">
            <li><Link to="/home" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/explore" className="hover:text-primary transition-colors">Explore Destinations</Link></li>
            <li><Link to="/categories" className="hover:text-primary transition-colors">Travel Categories</Link></li>
            <li><Link to="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link></li>
            <li><Link to="/bookings" className="hover:text-primary transition-colors">My Bookings</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">Support</h3>
          <ul className="space-y-4">
            <li><Link to="/support" className="hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link to="/info" className="hover:text-primary transition-colors">Travel Information</Link></li>
            <li><Link to="/profile" className="hover:text-primary transition-colors">Account Settings</Link></li>
            <li><Link to="/wishlist" className="hover:text-primary transition-colors">Your Wishlist</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-primary shrink-0" />
              <span>Srinagar, Jammu & Kashmir, India - 190001</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-primary shrink-0" />
              <span>+91 7889570933</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-primary shrink-0" />
              <span>muntazirtravels.09@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Muntazir Travels. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
