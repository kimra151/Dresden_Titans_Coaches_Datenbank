import { Inter, Montserrat } from 'next/font/google';
import Sidebar from '../components/ui/Sidebar';
import Header from '../components/ui/Header';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata = {
  title: 'Coaches Vault | Dresden Titans',
  description: 'Interne Video Datenbank',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-[#EEF3F8] text-[#1C2430] flex min-h-screen">
        
        <Sidebar />

        {/* ml-64 sorgt dafür, dass der Content exakt neben der Sidebar beginnt */}
        <div className="flex-1 ml-64 flex flex-col min-h-screen">
          <Header />
          
          <main className="p-8 flex-1">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}