// React JSX + Tailwind CSS footer component

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white">CodersWay LMS</h2>
            <p className="mt-2 text-sm max-w-xs">
              Upgrade your skills with our comprehensive IT courses in Web
              Development, AI, Data Science & more.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="/courses" className="hover:text-white transition">
              Courses
            </a>
            <a href="/about" className="hover:text-white transition">
              About Us
            </a>
            <a href="/contact" className="hover:text-white transition">
              Contact
            </a>
            <a href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs">
          &copy; {new Date().getFullYear()} CodersWay. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
