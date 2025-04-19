export default function Footer() {
  return (
    <footer className="bg-blue-50 text-gray-800 py-8 px-8 border-t mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-bold mb-1">MadadPay</h3>
          <p className="text-sm">Empowering local UPI cash exchanges 💡</p>
        </div>
        <div className="flex space-x-6">
          <a href="/privacy" className="hover:underline text-sm">
            Privacy
          </a>
          <a href="/terms" className="hover:underline text-sm">
            Terms
          </a>
          <a href="/contact" className="hover:underline text-sm">
            Contact
          </a>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} MadadPay. All rights reserved.
      </div>
    </footer>
  );
}
