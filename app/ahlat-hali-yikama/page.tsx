"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  CalendarDays,
  Camera,
  CheckCircle2,
  Droplets,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wind,
  X,
} from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const SITE_URL = "https://hijyenhalitemizleme.com";
const PAGE_PATH = "/ahlat-hali-yikama";
const PHONE = "0555 063 13 14";
const PHONE_RAW = "905550631314";
const WHATSAPP = "https://wa.me/message/OB34N547CCZME1";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Hijyen Halı Temizleme — Ahlat Halı Yıkama",
  description:
    "Ahlat'ta profesyonel halı, yorgan ve koltuk yıkama. Salı, Perşembe ve Cumartesi ücretsiz servis.",
  image: `${SITE_URL}/logo.jpeg`,
  url: `${SITE_URL}${PAGE_PATH}`,
  telephone: PHONE_RAW,
  parentOrganization: {
    "@type": "LocalBusiness",
    name: "Hijyen Halı Temizleme",
    url: SITE_URL,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alacaatlı Mah. Toki Cd. No: 18/B",
    addressLocality: "Adilcevaz",
    addressRegion: "Bitlis",
    postalCode: "13500",
    addressCountry: "TR",
  },
  areaServed: {
    "@type": "City",
    name: "Ahlat",
    containedInPlace: { "@type": "AdministrativeArea", name: "Bitlis" },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.7544,
      longitude: 42.4944,
    },
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Thursday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ahlat'a hangi günler servis yapıyorsunuz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ahlat'a her Salı, Perşembe ve Cumartesi günleri ücretsiz evden alım ve teslim servisi yapıyoruz.",
      },
    },
    {
      "@type": "Question",
      name: "Ahlat halı yıkama fiyatları ne kadar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ahlat halı yıkama hizmetimiz m² başına 80₺'den başlar. Kilim, yün, bambu ve ipek halılar ile yorgan ve koltuk için ayrı fiyat uygulanır. Güncel fiyat için 0555 063 13 14'ü arayabilirsiniz.",
      },
    },
    {
      "@type": "Question",
      name: "Ahlat'ta evden alım ücretli mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hayır. Salı, Perşembe ve Cumartesi günleri Ahlat içi evden alım ve teslim tamamen ücretsizdir.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ahlat Halı Yıkama",
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const SERVICES = [
  {
    title: "Ahlat Halı Yıkama",
    description:
      "Halı, kilim, yün, bambu ve ipek halılarınızı özel şampuanlar ve tam otomatik makinelerle derinlemesine temizliyoruz. Doku zarar görmez, kir dışarı çıkar.",
    icon: <Droplets className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Ahlat Yorgan Yıkama",
    description:
      "Ev tipi makinelere girmeyen büyük elyaf, yün ve bebek yorganlarınız endüstriyel makinelerimizde yıkanır, kapalı alanda kurutulur.",
    icon: <Wind className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Ahlat Koltuk Yıkama",
    description:
      "Koltuk ve köşe takımlarınız yerinden kaldırılmadan, sanayi tipi vakum makineleriyle evinizde temizlenir. Leke, tüy ve toz akarlarına karşı etkilidir.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
  },
];

const FEATURES = [
  "Ücretsiz Ahlat Servisi",
  "SMS ile Anlık Bilgilendirme",
  "Anti-Bakteriyel Şampuanlar",
  "Kapalı Alan Kurutma",
  "Kapıda Nakit / Kredi Kartı",
  "Hijyenik Ambalajlama",
];

const REVIEWS = [
  {
    name: "Ayşe K.",
    location: "Ahlat",
    comment:
      "Ahlat'a ücretsiz servis olması büyük avantaj. Zamanında gelip aldılar, halılarım pırıl pırıl ve mis gibi kokarak geri geldi. Kesinlikle tavsiye ederim.",
    rating: 5,
  },
  {
    name: "Fatma D.",
    location: "Ahlat — Selçuklu Mah.",
    comment:
      "Salaş firmalardan bıkmıştım. Bu sefer hem SMS attılar hem de iki günde teslim ettiler. Yorgan yıkama için de bir daha tercih edeceğim.",
    rating: 5,
  },
  {
    name: "Hüseyin A.",
    location: "Ahlat — Kırklar Mah.",
    comment:
      "Koltuk takımı yıkama için geldiler, aynı gün bitti. Alev kokusu ve tüy tamamen gitti. Fiyat-performans açısından bölgede rakipsizler.",
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    question: "Ahlat'a hangi günler servis yapıyorsunuz?",
    answer:
      "Her Salı, Perşembe ve Cumartesi Ahlat içi evden alım ve teslim hizmeti sunmaktayız. Servis tamamen ücretsizdir.",
  },
  {
    question: "Ahlat halı yıkama fiyatları ne kadar?",
    answer:
      "Halı yıkama m² başına 80₺'den başlamaktadır. Kilim, yün, bambu ve ipek halılar için farklı fiyat uygulanır. Güncel liste için 0555 063 13 14'ü arayabilir ya da ana sayfamızdaki fiyat listesini inceleyebilirsiniz.",
  },
  {
    question: "Halılarım ne kadar sürede teslim edilir?",
    answer:
      "Teslim alındıktan sonra genellikle 1-2 iş günü içinde yıkayıp geri getiriyoruz. Her aşamada (teslim alma, net fiyat, yola çıkma) SMS ile bilgi veriyoruz.",
  },
  {
    question: "Ödeme nasıl yapılır?",
    answer:
      "Kapıda nakit veya kredi kartıyla ödeme alıyoruz. Ön ödeme istemiyoruz.",
  },
  {
    question: "Fabrika nerede?",
    answer:
      "Fabrikamız Adilcevaz Alacaatlı Mah. Toki Cd. No: 18/B adresindedir. Ahlat'tan yaklaşık 25-30 km uzaklıktadır; servise çıkma giderini müşteriden talep etmiyoruz.",
  },
];

const STATS = [
  { value: 5000, suffix: "+", label: "Memnun Aile", decimal: false },
  { value: 8, suffix: "+ Yıl", label: "Hizmet Deneyimi", decimal: false },
  { value: 49, suffix: "★", label: "Ortalama Puan", decimal: true },
  { value: 2, suffix: " İlçe", label: "Servis Bölgesi", decimal: false },
];

const MARQUEE_ITEMS = [
  "Ücretsiz Ahlat Servisi",
  "Anti-Bakteriyel Şampuan",
  "SMS Bilgilendirme",
  "Kapalı Alan Kurutma",
  "Kapıda Nakit / Kredi Kartı",
  "Hijyenik Ambalaj",
  "Endüstriyel Makineler",
  "1-2 Gün Teslim",
];

const NEIGHBORHOODS = [
  "Selçuklu",
  "Kırklar",
  "Harabeşehir",
  "Taht-ı Süleyman",
  "Kulaksız",
  "Tunus",
];

function AnimatedCounter({
  end,
  suffix,
  decimal,
}: {
  end: number;
  suffix: string;
  decimal: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const fps = 60;
    const totalSteps = (duration / 1000) * fps;
    const increment = end / totalSteps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, end);
      setCount(Math.floor(current));
      if (current >= end) clearInterval(timer);
    }, duration / totalSteps);
    return () => clearInterval(timer);
  }, [isInView, end]);

  const display = decimal
    ? (count / 10).toFixed(1)
    : count.toLocaleString("tr-TR");

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function AhlatHaliYikamaPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "Ahlat",
    service: "Halı Yıkama",
    address: "",
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Merhaba, ben ${formData.name}. ${formData.location} bölgesinden ${formData.service} hizmeti için randevu oluşturmak istiyorum.${formData.address ? ` Adresim: ${formData.address}. Bu adresten halılarımın alınmasını istiyorum.` : ""}`;
    window.open(
      `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setShowFloatingButton(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* NAVBAR */}
      <header className="fixed w-full top-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link href="/" aria-label="Ana sayfaya git">
              <Image
                src="/logo.jpeg"
                alt="Hijyen Halı Temizleme Logosu"
                width={150}
                height={70}
                className="object-contain h-[55px] sm:h-[70px] w-auto mix-blend-multiply"
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-[12px] font-bold tracking-[0.15em] uppercase text-slate-500 hover:text-blue-600 transition-colors"
              >
                Ana Sayfa
              </Link>
              <a
                href="#hizmetler"
                className="text-[12px] font-bold tracking-[0.15em] uppercase text-slate-500 hover:text-blue-600 transition-colors"
              >
                Hizmetler
              </a>
              <a
                href="#sss"
                className="text-[12px] font-bold tracking-[0.15em] uppercase text-slate-500 hover:text-blue-600 transition-colors"
              >
                SSS
              </a>
            </nav>

            <div className="flex items-center gap-4">
              <a
                href={`tel:${PHONE_RAW}`}
                className="hidden lg:flex items-center gap-1.5 text-slate-800 font-bold text-base whitespace-nowrap hover:text-blue-600 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                {PHONE}
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wide flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Hızlı Randevu
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#1a233a]"
      >
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 origin-top"
        >
          <Image
            src="/hero-bg.png"
            alt="Ahlat halı yıkama — temiz halı"
            fill
            className="object-cover object-top"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-r from-[#1a233a]/85 via-[#1a233a]/30 to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Sayfa konumu" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-slate-200 font-medium">Ahlat Halı Yıkama</li>
            </ol>
          </nav>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 text-slate-300 border border-slate-600/50 backdrop-blur-md mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-slate-200">
                Ahlat&apos;ın en çok tercih edilen halı yıkama fabrikası
              </span>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl md:text-6xl text-white mb-4 tracking-tight leading-[1.1] drop-shadow-lg">
                <span className="font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-blue-400">
                  Ahlat Halı
                </span>{" "}
                <br />
                <span className="font-light text-slate-200">
                  Yıkama Fabrikası
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed drop-shadow-md font-light"
            >
              Ahlat&apos;a{" "}
              <strong className="text-white font-medium">
                Salı, Perşembe ve Cumartesi
              </strong>{" "}
              ücretsiz servisimizle geliyoruz. Halı, yorgan ve koltuk yıkama
              için Adilcevaz&apos;daki fabrikamızda endüstriyel temizlik yapılır,
              1-2 günde evinize teslim edilir.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`tel:${PHONE_RAW}`}
                className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-black/20"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                Hemen Arayın
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white/5 hover:bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-slate-200" />
                WhatsApp Randevu
              </button>
            </motion.div>
          </motion.div>

          {/* Floating stat cards */}
          <div className="hidden lg:flex flex-col gap-4 absolute right-8 xl:right-16 top-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-xl"
            >
              <span className="text-2xl">⭐</span>
              <div>
                <div className="text-white font-extrabold text-xl leading-none">
                  4.9
                </div>
                <div className="text-slate-300 text-xs font-medium mt-0.5">
                  Müşteri Puanı
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-xl"
            >
              <span className="text-2xl">🏠</span>
              <div>
                <div className="text-white font-extrabold text-xl leading-none">
                  5000+
                </div>
                <div className="text-slate-300 text-xs font-medium mt-0.5">
                  Memnun Aile
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AHLAT SERVİS BİLDİRİMİ */}
      <section className="relative -mt-10 z-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl shadow-emerald-900/5 border border-slate-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-emerald-50/80 border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
              <CalendarDays className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-1 tracking-tight">
                Ahlat&apos;a Ücretsiz Servis Günleri
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-base">
                Her{" "}
                <span className="text-emerald-600 font-semibold">Salı</span>,{" "}
                <span className="text-emerald-600 font-semibold">Perşembe</span>{" "}
                ve{" "}
                <span className="text-emerald-600 font-semibold">Cumartesi</span>{" "}
                günleri Ahlat&apos;a{" "}
                <span className="underline decoration-emerald-500/50 decoration-2 underline-offset-4">
                  ücretsiz servisimiz
                </span>{" "}
                bulunmaktadır.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 w-full md:w-auto text-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all shadow-lg hover:shadow-slate-900/20 relative z-10"
          >
            Randevu Oluştur
          </button>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="bg-slate-900 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    decimal={stat.decimal}
                  />
                </div>
                <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HİZMETLERİMİZ */}
      <section id="hizmetler" className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">
              Ahlat&apos;ta Sunduğumuz Hizmetler
            </h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Ahlat ilçesindeki evler için tek noktadan çözüm. Halı fabrikada
              yıkanır, koltuk evinizde yerinde temizlenir, yorgan ve perde için
              de aynı servis günleri kullanılır.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 border border-slate-100 group flex flex-col items-center text-center hover:-translate-y-1"
              >
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-light text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MARQUEE ŞERİDİ */}
      <div className="relative overflow-hidden bg-blue-600 py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-3 mx-8 text-white font-semibold text-sm tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* HAKKIMIZDA / SÜREÇ */}
      <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative w-full px-4 sm:px-0"
            >
              <div className="aspect-4/5 w-full max-w-md mx-auto relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 bg-slate-100 group">
                <Image
                  src="/about1.jpeg"
                  alt="Hijyen Halı Temizleme Fabrikası — Ahlat hizmet alanı"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex flex-col items-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/30 text-white transition-all transform hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                      <Camera className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                    <span className="font-bold tracking-widest text-xs sm:text-sm uppercase text-center drop-shadow-md">
                      Hemen Randevu Al
                    </span>
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-4 md:right-4 bg-white p-4 sm:p-6 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 border border-slate-50 w-[85%] sm:w-auto z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-extrabold text-lg sm:text-xl text-slate-900 leading-none mb-1">
                    Ücretsiz
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Ahlat Servisi
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Ahlat&apos;a Nasıl <br /> Servis Yapıyoruz?
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed font-light">
                Halılarınızı Ahlat&apos;taki adresinizden ücretsiz teslim
                alıyoruz. Sürecin her aşamasında{" "}
                <strong className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  SMS ile sizi bilgilendiriyoruz
                </strong>{" "}
                (teslim alma, net fiyatlandırma ve yola çıkma). Adilcevaz
                fabrikamızda toz alma, leke müdahalesi, tam otomatik yıkama ve
                kapalı alan kurutma yapıldıktan sonra parfümleyip ambalajlıyoruz.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-10">
                {FEATURES.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-medium text-slate-700 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bold text-slate-800 mb-4">
                  Hizmet Verdiğimiz Mahalleler
                </h3>
                <ul className="grid grid-cols-2 gap-2.5">
                  {NEIGHBORHOODS.map((name) => (
                    <li
                      key={name}
                      className="flex items-center gap-2 text-slate-600 text-sm font-medium"
                    >
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      {name} Mah.
                    </li>
                  ))}
                </ul>
                <p className="text-slate-400 text-xs mt-3 leading-relaxed">
                  Listede olmayan mahalle veya köy için de arayabilirsiniz — rotaya
                  dahil edebiliriz.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SSS */}
      <section id="sss" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">
              Sık Sorulan Sorular
            </h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Ahlat halı yıkama hakkında aklınıza takılan soruların cevaplarını
              burada bulabilirsiniz.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="border border-slate-200 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-800 pr-4">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg leading-none"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-slate-500 leading-relaxed font-light border-t border-slate-100 pt-4">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-slate-500 mb-4">Başka sorunuz mu var?</p>
            <a
              href={`tel:${PHONE_RAW}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
            >
              <Phone className="w-5 h-5" />
              Bizi Arayın
            </a>
          </div>
        </div>
      </section>

      {/* MÜŞTERİ YORUMLARI */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-100 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-b from-blue-100/50 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">
              Ahlat&apos;tan Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Ahlat ilçesinde onlarca ailenin evine hijyen taşıdık. İşte
              hizmetimizi deneyimleyen müşterilerimizin yorumları.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {REVIEWS.map((review, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-serif shadow-lg shadow-blue-600/30 opacity-80 group-hover:opacity-100 transition-opacity">
                  &quot;
                </div>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-600 leading-relaxed font-light mb-8 italic">
                  &quot;{review.comment}&quot;
                </p>

                <div className="flex items-center gap-4 mt-auto border-t border-slate-50 pt-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{review.name}</h4>
                    <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">
                      {review.location}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 flex justify-center"
          >
            <a
              href="https://www.instagram.com/hijyenhalitemizleme"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 px-8 py-4 rounded-full bg-white border border-slate-200 hover:border-fuchsia-400 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="p-2 bg-linear-to-tr from-yellow-400 via-red-500 to-fuchsia-600 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                <InstagramIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                Daha Fazlası Instagram&apos;da
              </span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white rounded-2xl p-1 shadow-lg shadow-blue-900/50 shrink-0 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/footer-logo.png"
                    alt="Hijyen Halı Temizleme Fabrikası Logosu"
                    width={60}
                    height={60}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="block font-bold text-2xl text-white leading-none mb-1.5">
                    Hijyen Halı
                  </span>
                  <span className="text-xs text-blue-400 font-bold tracking-widest uppercase block">
                    TEMİZLEME FABRİKASI
                  </span>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Ahlat bölgesinin en modern, en titiz halı yıkama fabrikası.
                &quot;Temizlik Bizim İşimiz&quot; vizyonuyla hizmetinizdeyiz.
              </p>
            </div>

            <div className="col-span-1">
              <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
                İletişim Bilgileri
              </h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <div>
                    <span className="block text-sm text-slate-400 mb-1">
                      Müşteri Hizmetleri
                    </span>
                    <a
                      href={`tel:${PHONE_RAW}`}
                      className="text-lg font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      {PHONE}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1 shrink-0" />
                  <div>
                    <span className="block text-sm text-slate-400 mb-1">
                      Fabrika Adresi
                    </span>
                    <span className="text-base text-slate-200">
                      Alacaatlı Mah. Toki Cd. No: 18/B ADİLCEVAZ
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4 pt-2">
                  <div className="p-2 bg-linear-to-tr from-yellow-400 via-red-500 to-fuchsia-600 rounded-lg shrink-0 shadow-lg">
                    <InstagramIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-sm text-slate-400 mb-1">
                      Bizi Takip Edin
                    </span>
                    <a
                      href="https://instagram.com/hijyenhalitemizleme"
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-medium text-white hover:text-fuchsia-400 transition-colors"
                    >
                      @hijyenhalitemizleme
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
                Hızlı Bağlantılar
              </h4>
              <ul className="space-y-3 mb-8">
                {[
                  { label: "Ana Sayfa", href: `${SITE_URL}/` },
                  { label: "Ahlat Halı Yıkama", href: "#" },
                  { label: "Hizmetlerimiz", href: "#hizmetler" },
                  { label: "Sık Sorulan Sorular", href: "#sss" },
                ].map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
                Ahlat Servis Günleri
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Adilcevaz İçi:</span>
                  <span className="text-white font-medium">Her Gün</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Ahlat Servisi:</span>
                  <span className="text-emerald-400 font-medium">
                    Salı, Perş, Cmt
                  </span>
                </li>
                <li className="flex justify-between pt-2 items-center">
                  <span className="text-slate-400">Pazar:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 tracking-wide">
                    Kapalı
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Hijyen Halı Temizleme. Tüm
              hakları saklıdır.
            </p>
            <p className="text-slate-500 text-sm">
              <Link
                href="/"
                className="text-slate-400 hover:text-white transition-colors font-medium"
              >
                hijyenhalitemizleme.com
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* RANDEVU MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-md rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-xl font-bold text-slate-800">
                    Randevu Oluştur
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="p-6 space-y-4">
                <div>
                  <label
                    htmlFor="ahlat-name"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Adınız Soyadınız
                  </label>
                  <input
                    id="ahlat-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Örn: Yusuf POLATCI"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="ahlat-location"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Bölgeniz
                    </label>
                    <select
                      id="ahlat-location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                    >
                      <option value="Ahlat">Ahlat (Salı, Perş, Cmt)</option>
                      <option value="Adilcevaz">Adilcevaz</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ahlat-service"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Hizmet Türü
                    </label>
                    <select
                      id="ahlat-service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                    >
                      <option value="Halı Yıkama">Halı Yıkama</option>
                      <option value="Koltuk Yıkama">Koltuk Yıkama</option>
                      <option value="Yorgan/Battaniye">Yorgan/Battaniye</option>
                      <option value="Stor Perde">Stor Perde</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ahlat-address"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Adresiniz{" "}
                    <span className="text-slate-400 font-normal">
                      (isteğe bağlı)
                    </span>
                  </label>
                  <input
                    id="ahlat-address"
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Örn: Selçuklu Mah. Cumhuriyet Cad. No: 5"
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp ile Randevu Oluştur
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.button
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-[#25D366]/40 flex items-center justify-center group"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm font-medium py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Bize Ulaşın
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
