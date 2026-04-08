import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
