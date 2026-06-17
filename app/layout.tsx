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
  title: "Hijyen Halı Temizleme | Adilcevaz ve Ahlat Halı Yıkama Fabrikası",
  description:
    "Bitlis ili Adilcevaz ve Ahlat'ta profesyonel halı, koltuk, yorgan ve perde yıkama. Ücretsiz servis, özel şampuanlar ve %100 memnuniyet garantisi. 0555 063 13 14",
  keywords: [
    "halı yıkama",
    "koltuk yıkama",
    "adilcevaz halı yıkama",
    "ahlat halı yıkama",
    "bitlis halı yıkama",
    "hijyen halı yıkama",
    "hijyen temizlik",
    "perde yıkama",
    "yorgan yıkama",
  ],
  authors: [{ name: "Hijyen Halı Temizleme" }],
  creator: "Hijyen Halı Temizleme",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hijyen Halı Temizleme | Adilcevaz, Ahlat ve Bitlis Halı Yıkama",
    description:
      "Bitlis ili Adilcevaz ve Ahlat'ta garantili halı, koltuk, battaniye ve yorgan temizliği. Ücretsiz servis. 0555 063 13 14",
    url: "https://hijyenhalitemizleme.com",
    siteName: "Hijyen Halı Temizleme",
    images: [
      {
        url: "/logo.jpeg",
        width: 1024,
        height: 566,
        alt: "Hijyen Halı Temizleme — Adilcevaz ve Ahlat Halı Yıkama Fabrikası",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hijyen Halı Temizleme | Adilcevaz ve Ahlat Halı Yıkama",
    description:
      "Bitlis ili Adilcevaz ve Ahlat'ta profesyonel halı yıkama. Ücretsiz servis, %100 memnuniyet garantisi.",
    images: ["/logo.jpeg"],
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
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1a233a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
