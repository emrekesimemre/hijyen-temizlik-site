import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hijyenhalitemizleme.com"),
  title:
    "Hijyen Halı Temizleme | Adilcevaz ve Ahlat'ın En İyi Halı Yıkama Fabrikası",
  description:
    "Adilcevaz ve Ahlat bölgesinde profesyonel halı, koltuk, yorgan ve perde yıkama hizmetleri. Özel şampuanlar, %100 memnuniyet garantisi ve ücretsiz servis imkanı.",
  keywords: [
    "halı yıkama",
    "koltuk yıkama",
    "adilcevaz halı yıkama",
    "ahlat halı yıkama",
    "hijyen halı yıkama",
    "hijyen temizlik",
    "perde yıkama",
    "yorgan yıkama",
  ],
  authors: [{ name: "Hijyen Halı Temizleme" }],
  creator: "Hijyen Halı Temizleme",
  // EKSİK 1 GİDERİLDİ: Canonical URL eklendi. (metadataBase ile birleşip root URL'yi oluşturur)
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hijyen Halı Temizleme | Profesyonel Temizlik",
    description:
      "Adilcevaz ve Ahlat bölgesinde garantili ve derinlemesine halı, koltuk, battaniye ve yorgan temizliği. 0555 063 13 14",
    url: "https://hijyenhalitemizleme.com",
    siteName: "Hijyen Halı Temizleme",
    images: [
      {
        url: "/logo.jpeg",
        width: 800,
        height: 600,
        alt: "Hijyen Halı Temizleme Logosu",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    // EKSİK 2 GİDERİLDİ: iOS cihazlar için Apple Touch Icon desteği eklendi
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a233a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // EKSİK 3 GİDERİLDİ: Tracking ID environment variable'a çekildi.
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        <Analytics />
      </body>
    </html>
  );
}
