import React from 'react';

interface Props {}

const Footer = (props: Props) => {
  const footerYear = new Date().getFullYear();
  return (
    <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
      <div></div>
      <p>Copyright &copy; {footerYear} All rights reserved</p>
    </footer>
  );
};

export default Footer;
