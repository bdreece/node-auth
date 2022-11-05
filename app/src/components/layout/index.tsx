import type { FC } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export type LayoutProps = {
  children?: JSX.Element | string;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
