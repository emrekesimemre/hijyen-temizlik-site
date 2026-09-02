import type { Metadata } from "next";

const title = "Ahlat Halı Yıkama | Ücretsiz Servis | Hijyen Halı Temizleme";
const description =
  "Ahlat halı yıkama, Ahlat yorgan yıkama ve Ahlat koltuk yıkama hizmeti. Salı, Perşembe ve Cumartesi ücretsiz evden alım-teslim. 0555 063 13 14";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ahlat halı yıkama",
    "ahlat hali yikama",
    "ahlat yorgan yıkama",
    "ahlat koltuk yıkama",
    "ahlat halı yıkama telefon",
    "hijyen halı yıkama ahlat",
    "ahlat ücretsiz servis",
    "bitlis ahlat halı yıkama",
    "ahlat perde yıkama",
  ],
  alternates: {
    canonical: "/ahlat-hali-yikama",
  },
  openGraph: {
    title,
    description,
    url: "https://hijyenhalitemizleme.com/ahlat-hali-yikama",
    siteName: "Hijyen Halı Temizleme",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/logo.jpeg",
        width: 1024,
        height: 566,
        alt: "Ahlat Halı Yıkama — Hijyen Halı Temizleme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.jpeg"],
  },
};

export default function AhlatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
