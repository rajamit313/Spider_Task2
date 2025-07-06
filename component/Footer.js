import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 px-6 py-6 bg-white/5 backdrop-blur-sm border-t border-white/10 text-white min-h-28">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
      
        <div>
          <h4 className="text-xl font-semibold text-indigo-300">SplitEase</h4>
          <p className="text-sm text-indigo-200">Simplifying group expenses since 2025</p>
        </div>


        <div className="space-x-6 text-sm text-indigo-200">
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>
      </div>


      <div className="text-center text-xs text-indigo-300 mt-6">
        © 2025 SplitEase. All rights reserved.
      </div>
    </footer>
  );
}
