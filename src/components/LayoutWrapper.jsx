"use client";

import { usePathname } from 'next/navigation';
import SpecialEventsBanner from './SpecialEventsBanner';

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  return (
    <>
      {isHomepage && <SpecialEventsBanner />}
      {children}
    </>
  );
};

export default LayoutWrapper; 