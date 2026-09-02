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
    "Bitlis ili Adilcevaz ve Ahlat'ta profesyonel halı, koltuk, yorgan ve perde yıkama. Ücretsiz servis, özel şampuanlar ve memnuniyet garantisi. 0555 063 13 14",
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
    "halı yıkama fiyatları",
    "koltuk temizleme",
    "battaniye yıkama",
    "yorgan yıkama adilcevaz",
    "adilcevaz temizlik",
    "halı yıkama adilcevaz fiyat",
    "bitlis halı temizleme",
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
      "Bitlis ili Adilcevaz ve Ahlat'ta profesyonel halı yıkama. Ücretsiz servis ve memnuniyet garantisi.",
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Hijyen Halı Temizleme",
  description:
    "Bitlis ili Adilcevaz ve Ahlat'ta profesyonel halı, koltuk, yorgan ve perde yıkama hizmetleri. Ücretsiz servis ve memnuniyet garantisi.",
  image: "https://hijyenhalitemizleme.com/logo.jpeg",
  logo: "https://hijyenhalitemizleme.com/logo.jpeg",
  "@id": "https://hijyenhalitemizleme.com",
  url: "https://hijyenhalitemizleme.com",
  telephone: "905550631314",
  hasMap:
    "https://maps.google.com/?q=Alacaatlı+Mah.+Toki+Cd.+No:18/B+Adilcevaz+Bitlis",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alacaatlı Mah. Toki Cd. No: 18/B",
    addressLocality: "Adilcevaz",
    addressRegion: "Bitlis",
    postalCode: "13500",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.8021,
    longitude: 42.7303,
  },
  areaServed: [
    { "@type": "City", name: "Adilcevaz" },
    {
      "@type": "City",
      name: "Ahlat",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Bitlis",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 38.7544,
        longitude: 42.4944,
      },
    },
    { "@type": "AdministrativeArea", name: "Bitlis" },
    {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 38.7544,
        longitude: 42.4944,
      },
      geoRadius: "15000",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "00:00",
      closes: "00:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  priceRange: "₺₺",
  sameAs: ["https://instagram.com/hijyenhalitemizleme"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Halı yıkama fiyatları ne kadar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Halı yıkama hizmetimiz m² başına 80₺'den başlamaktadır. Kilim, yün halı ve bambu halı için farklı fiyatlar uygulanmaktadır. Güncel fiyat listemiz için 0555 063 13 14 numaralı hattımızı arayabilirsiniz.",
      },
    },
    {
      "@type": "Question",
      name: "Ahlat'a servis yapıyor musunuz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet, Ahlat'a her Salı, Perşembe ve Cumartesi günleri ücretsiz servis hizmeti sunmaktayız. Adilcevaz ilçesi için ise her gün servis imkânımız bulunmaktadır.",
      },
    },
    {
      "@type": "Question",
      name: "Halılar ne kadar sürede yıkanır ve teslim edilir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Halılarınız teslim alındıktan sonra genellikle 1-2 iş günü içinde yıkanıp teslim edilmektedir. Sürecin her aşamasında (teslim alma, fiyatlandırma, yola çıkma) SMS ile bilgilendirilirsiniz.",
      },
    },
    {
      "@type": "Question",
      name: "Ödeme yöntemleri neler?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kapıda nakit veya kredi kartı ile ödeme kabul edilmektedir. Ön ödeme talep edilmemektedir.",
      },
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://hijyenhalitemizleme.com",
  name: "Hijyen Halı Temizleme",
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

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
