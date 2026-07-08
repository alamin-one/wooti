import { Libre_Baskerville, Poppins } from 'next/font/google';
import './globals.css';
import SessioProviderwrp from '@/providers/SessioProviderwrp';
import { CartProvider } from '@/contexts/CartProvider';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '500', '600', '700'],
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Wooti',
  description:
    'Wooti - Your ultimate shopping destination for quality products at the best prices.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SessioProviderwrp>
          <CartProvider>{children}</CartProvider>
        </SessioProviderwrp>
      </body>
    </html>
  );
}
