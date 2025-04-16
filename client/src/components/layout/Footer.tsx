import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-white mt-16 border-t border-neutral-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="mr-2 text-lg font-semibold text-neutral-900">باحث علمي عربي</span>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center">
            <a href="#" className="px-3 py-2 text-neutral-600 hover:text-primary">عن الموقع</a>
            <a href="#" className="px-3 py-2 text-neutral-600 hover:text-primary">اتصل بنا</a>
            <a href="#" className="px-3 py-2 text-neutral-600 hover:text-primary">المساعدة</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-neutral-500 text-sm">
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} باحث علمي عربي
        </div>
      </div>
    </footer>
  );
};

export default Footer;
