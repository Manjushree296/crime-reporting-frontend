import React from 'react';

const Footer = ()=> {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-content1 py-4 px-6 border-t border-divider relative bottom-0">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-default-500 text-sm">
          &copy; {currentYear} Crime Report System. All rights reserved.
        </p>
        <div className="text-default-400 text-sm mt-2 md:mt-0">
        Building smarter systems for a safer world.
        </div>
      </div>
    </footer>
    
  );
}

export default Footer;
