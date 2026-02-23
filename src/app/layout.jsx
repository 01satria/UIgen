import '../styles/globals.css';

export const metadata = {
  title: 'GlassForge — CSS Glassmorphism Generator',
  description: 'Generate pixel-perfect glassmorphism CSS, Tailwind, and React styles in real-time. Customize Cards, Buttons, Modals, and more.',
  keywords: ['glassmorphism', 'css generator', 'ui components', 'tailwind', 'react'],
  openGraph: {
    title: 'GlassForge — CSS Glassmorphism Generator',
    description: 'Build stunning glass UI components instantly.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
