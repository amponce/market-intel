import { absoluteUrl } from '@/lib/utils';
import '@/styles/index.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://hazelsprout.com/'),
  title: {
    default: 'Hazel Sprout: Curated Baby Products for Smart Parenting',
    template: '%s | Hazel Sprout',
  },
  description:
    'Discover handpicked, curated baby essentials at Hazel Sprout. From educational toys to sustainable clothes, find everything to nurture your little sprout.',
  openGraph: {
    title: 'Hazel Sprout: Curated Baby Products for Smart Parenting',
    description:
      'Discover handpicked, curated baby essentials at Hazel Sprout. From educational toys to sustainable clothes, find everything to nurture your little sprout.',
    url: absoluteUrl('/'),
    siteName: 'Hazel Sprout',
    images: [
      {
        url: absoluteUrl('/images/og-image.png'),
        width: 1800,
        height: 1600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/favicon/favicon-32x32.png' }],
    apple: [{ url: '/favicon/apple-touch-icon.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
