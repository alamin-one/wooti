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
  title: "Wooti | Modern E-Commerce Platform",

  description:
    "Wooti is a modern e-commerce platform where users can explore quality products and enjoy a smooth shopping experience.",

  metadataBase: new URL("https://alamin-wooti.vercel.app/"),

  openGraph: {
    title: "Wooti | Modern E-Commerce Platform",

    description:
      "A modern e-commerce platform built for a smooth and simple shopping experience.",

    url: "https://alamin-wooti.vercel.app/",

    siteName: "Wooti",

    images: [
      {
        url: "/images/wooti.webp",
        width: 1200,
        height: 630,
        alt: "Wooti E-Commerce Preview",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Wooti | Modern E-Commerce Platform",

    description:
      "A modern e-commerce platform built for a smooth and simple shopping experience.",

    images: ["/images/wooti.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
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
