import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => (
  <footer className="bg-bowls-green-dark text-gray-300 mt-16">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-bowls-gold flex items-center justify-center">
              <span className="text-bowls-green-dark font-bold text-sm">🎯</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm">Australian Matchplay</div>
              <div className="text-bowls-gold text-xs font-semibold tracking-wider uppercase">Championships</div>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Australia's independent nationwide lawn bowls matchplay competition. 
            Compete from your local club all the way to a national final.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Competition</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-bowls-gold transition-colors">How It Works</Link></li>
            <li><Link to="/register" className="hover:text-bowls-gold transition-colors">Register</Link></li>
            <li><Link to="/login" className="hover:text-bowls-gold transition-colors">Sign In</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:info@australianmatchplay.com.au" className="hover:text-bowls-gold transition-colors">
                info@australianmatchplay.com.au
              </a>
            </li>
            <li className="text-gray-500 text-xs mt-4">
              Season 2026 | Est. 2026
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500">
          © 2026 Australian Matchplay Championships. An independent bowls competition.
        </p>
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Entry</span>
        </div>
      </div>
    </div>
  </footer>
);
