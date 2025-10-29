import { Phone, Mail, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-velvet-black border-t border-gold/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-3xl font-bold text-gold mb-4">Velvet</h3>
            <p className="text-gray-400 mb-6">
              Premium chauffeur service. Reserved access. Always pre-booked.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 luxury-ease duration-300">
                <Instagram className="w-5 h-5 text-gold" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 luxury-ease duration-300">
                <Facebook className="w-5 h-5 text-gold" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 luxury-ease duration-300">
                <Linkedin className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>

          {/* Concierge */}
          <div>
            <h4 className="font-semibold text-white mb-4">Concierge</h4>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-gold luxury-ease duration-300">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </a>
              <a href="https://wa.me/919876543210" className="flex items-center gap-3 text-gray-400 hover:text-gold luxury-ease duration-300">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a href="mailto:concierge@velvetexperience.com" className="flex items-center gap-3 text-gray-400 hover:text-gold luxury-ease duration-300">
                <Mail className="w-4 h-4" />
                <span>concierge@velvetexperience.com</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="/book" className="text-gray-400 hover:text-gold luxury-ease duration-300">Book Direct</a></li>
              <li><a href="/book?type=special" className="text-gray-400 hover:text-gold luxury-ease duration-300">Special Booking</a></li>
              <li><a href="/book?type=club" className="text-gray-400 hover:text-gold luxury-ease duration-300">Velvet Club</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold luxury-ease duration-300">Corporate</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-gold luxury-ease duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold luxury-ease duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold luxury-ease duration-300">Cancellation Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold luxury-ease duration-300">Safety Standards</a></li>
              <li><a href="#" className="text-gray-400 hover:text-gold luxury-ease duration-300">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gold/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Velvet Experience. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Designed for those who expect more.
            </p>
          </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Velvet Experience",
          "description": "Premium luxury chauffeur service with private fleet and executive-class drivers",
          "url": "https://velvetexperience.com",
          "logo": "https://velvetexperience.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-98765-43210",
            "contactType": "Concierge Service",
            "availableLanguage": ["English", "Hindi"]
          },
          "sameAs": [
            "https://instagram.com/velvetexperience",
            "https://facebook.com/velvetexperience",
            "https://linkedin.com/company/velvetexperience"
          ]
        })}
      </script>
    </footer>
  );
}
