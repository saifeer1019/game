const Footer = () => {
  return (
    <footer className="bg-[#181816] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">GameVault</h2>
            <p className="text-sm text-white/60 mb-6">
              Your ultimate destination for discovering and downloading the latest games. 
              Join our community of gamers and creators.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                YouTube
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Discord
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Browse Games</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">New Releases</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Top Rated</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Categories</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Upload Game</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Developer Guide</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">Community Rules</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm text-white/60 mb-4">
              Subscribe to our newsletter for the latest news, game releases, and updates.
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Your Email Address"
                className="px-4 py-2 bg-[#242424] text-white rounded-md text-sm focus:ring-2 focus:ring-[#0070f3] focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent_ text-white rounded-md text-sm hover:bg-[#005bb5] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white/60">
              © 2024 GameVault. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
