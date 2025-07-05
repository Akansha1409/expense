import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Finance Visualizer',
  description: 'Track your expenses and budgets with visual insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
