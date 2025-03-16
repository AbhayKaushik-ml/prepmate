import React from 'react';
import { UserCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const WelcomeBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl shadow-md overflow-hidden">
      <div className="p-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Browse Courses
          </h1>
          <p className="text-purple-100 mt-1">
            Explore our library and start learning today
          </p>
        </div>
        
        {/* Profile link */}
        <Link href="/profile" className="mt-4 md:mt-0 flex items-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-300">
          <UserCircle className="mr-2" size={20} />
          <span>My Profile</span>
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default WelcomeBanner;