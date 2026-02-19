'use client';

import { useRouter, usePathname } from 'next/navigation';
import { IoChevronForwardOutline } from 'react-icons/io5';

export const ReturnButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = () => {
    if (typeof window !== 'undefined' && window.history.length > 2) {
      router.back();
      return;
    }

    const segments = pathname.split('/').filter(Boolean);
    
    if (segments.length > 0) {
      const rootSection = `/${segments[0]}`;
      
      if (pathname !== rootSection) {
        router.push(rootSection);
        return;
      }
    }

    router.push('/');
  };

  return (
    <button 
      onClick={handleNavigation} 
      className="text-gray-600 p-1 hover:text-gray-800 transition-colors"
      aria-label="بازگشت"
    >
      <IoChevronForwardOutline size={24} className="rotate-180" />
    </button>
  );
};
