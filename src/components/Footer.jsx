import React from 'react';

const Footer = () => {
  return (
    <div className="bg-primaryBg text-white pt-20 pb-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">Lila Finance</h1>
            <p className="mt-2">Fixed Income Solutions</p>
            <p className="mt-2 text-sm">© 2023 Lila Finance</p>
          </div>
          <div className="space-y-4">
            <div className="font-bold text-xl">Product</div>
            <ul>
                <li><a href="https://lila-finance.gitbook.io/lila-documentation/" target="_blank" rel="noopener noreferrer" className="hover:text-primaryColor">Docs</a></li>
                <li><a href="https://discord.gg/DBuG56VHfn" target="_blank" rel="noopener noreferrer" className="hover:text-primaryColor">Discord</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-bold text-xl">Resources</div>
            <ul>
            <li><a href="https://github.com/Lila-Finance/" target="_blank" rel="noopener noreferrer" className="hover:text-primaryColor">Github</a></li>
              <li className="hover:text-primaryColor">Terms of service</li>
              <li className="hover:text-primaryColor">Privacy Policy</li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="font-bold text-xl">Social</div>
            <ul>
              <li><a href="https://www.linkedin.com/company/lila-fi/" target="_blank" rel="noopener noreferrer" className="hover:text-primaryColor">LinkedIn</a></li>
              <li><a href="https://twitter.com/LilaFinance" target="_blank" rel="noopener noreferrer" className="hover:text-primaryColor">X [Twitter]</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
