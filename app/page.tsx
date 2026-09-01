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
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Droplets,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Wind,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CONTACT_INFO = {
  phone: "0555 063 13 14",
  phoneRaw: "905550631314",
  address: "Alacaatlı Mah. Toki Cd. No: 18/B ADİLCEVAZ",
  whatsappLink: "https://wa.me/message/OB34N547CCZME1",
  instagram: "@hijyenhalitemizleme",
};

const PRICING_DATA = {
  hali: [
    { name: "Halı Yıkama", price: "80.0₺", unit: "M2" },
    { name: "Kilim-Savan Yıkama", price: "90.0₺", unit: "M2" },
    { name: "Yün Halı Yıkama", price: "90.0₺", unit: "M2" },
    { name: "Battaniye Yıkama", price: "400.0₺", unit: "ADET" },
    { name: "Elyaf Yorgan Yıkama", price: "600.0₺", unit: "ADET" },
    { name: "Yün Yorgan Yıkama", price: "750.0₺", unit: "ADET" },
    { name: "Yorgan Yıkama (Bebek)", price: "500.0₺", unit: "ADET" },
    { name: "Perde Yıkama", price: "90.0₺", unit: "M2" },
    { name: "Tül Perde Yıkama", price: "500.0₺", unit: "ADET" },
    { name: "Tek Halı Yıkama", price: "100.0₺", unit: "M2" },
    { name: "Bambu Halı Yıkama", price: "100.0₺", unit: "M2" },
    { name: "İpek Halı Yıkama", price: "100.0₺", unit: "M2" },
    { name: "Yastık Yıkama", price: "200.0₺", unit: "ADET" },
    { name: "Yün Yıkama", price: "100.0₺", unit: "KİLO" },
    { name: "Elde Yıkama", price: "120.0₺", unit: "M2" },
    { name: "(Çok Kirli) Halı Yıkama", price: "100.0₺", unit: "M2" },
    { name: "Sünger Yatak Yıkama", price: "750.0₺", unit: "ADET" },
    { name: "Yerinde Yıkama", price: "100.0₺", unit: "M2" },
  ],
  koltuk: [
    { name: "Koltuk Takımı Yıkama", price: "2000.0₺", unit: "ADET" },
    { name: "Köşe Takımı Yıkama", price: "1500.0₺", unit: "ADET" },
    { name: "Koltuk Takımı Yıkama (Yastıklı)", price: "2500.0₺", unit: "ADET" },
    {
      name: "Koltuk Takımı Yıkama (Çekme Yataklı)",
      price: "2500.0₺",
      unit: "ADET",
    },
    {
      name: "Koltuk Takımı Yıkama (Yastıklı ve Çekme Yataklı)",
      price: "2500.0₺",
      unit: "ADET",
    },
    { name: "Kanepe Yıkama", price: "750.0₺", unit: "ADET" },
    { name: "Tekli Koltuk Yıkama", price: "500.0₺", unit: "ADET" },
    { name: "Orta Puf Koltuk Yıkama", price: "300.0₺", unit: "ADET" },
    { name: "Baza (Çift Kişilik) Yıkama", price: "750.0₺", unit: "ADET" },
    { name: "Baza (Tek Kişilik) Yıkama", price: "500.0₺", unit: "ADET" },
    { name: "Yatak (Bebek) Yıkama", price: "750.0₺", unit: "ADET" },
    { name: "Yatak (Tek Kişilik) Yıkama", price: "1000.0₺", unit: "ADET" },
    { name: "Sandalye Yıkama", price: "200.0₺", unit: "ADET" },
    { name: "Sandalye (Küçük) Yıkama", price: "150.0₺", unit: "ADET" },
    {
      name: "Tek Kişilik Yatak (Tek Yüzü) Yıkama",
      price: "750.0₺",
      unit: "ADET",
    },
    {
      name: "Çift Kişilik Yatak (Tek Yüzü) Yıkama",
      price: "1000.0₺",
      unit: "ADET",
    },
    {
      name: "Yatak Kılıfı (Çift Kişilik) Yıkama",
      price: "1000.0₺",
      unit: "ADET",
    },
    {
      name: "Yatak Başlığı (Çift Kişilik) Yıkama",
      price: "750.0₺",
      unit: "ADET",
    },
    {
      name: "Yatak Başlığı (Tek Kişilik) Yıkama",
      price: "500.0₺",
      unit: "ADET",
    },
    { name: "Yatak (Çift Kişilik) Yıkama", price: "1500.0₺", unit: "ADET" },
    {
      name: "Yatak Kılıfı (Tek Kişilik) Yıkama",
      price: "750.0₺",
      unit: "ADET",
    },
    { name: "Kanepe Yıkama (Çekme Yataklı)", price: "900.0₺", unit: "ADET" },
    { name: "Araç Koltuk Yıkama", price: "2000.0₺", unit: "ADET" },
    { name: "Oto Kuaför", price: "5000.0₺", unit: "ADET" },
  ],
};

const REVIEWS = [
  {
    name: "Ahmet T.",
    location: "Adilcevaz",
    comment:
      "Halılarımdaki o inatçı çay lekesini bile tamamen çıkarmışlar. Gerçekten 'Temizlik Bizim İşimiz' sloganının hakkını veriyorlar. Ellerine sağlık.",
    rating: 5,
  },
  {
    name: "Ayşe K.",
    location: "Ahlat",
    comment:
      "Ahlat'a ücretsiz servis olması büyük avantaj. Zamanında gelip aldılar, halılarım pırıl pırıl ve mis gibi kokarak geri geldi. Kesinlikle tavsiye ederim.",
    rating: 5,
  },
  {
    name: "Mehmet Y.",
    location: "Adilcevaz",
    comment:
      "Koltuk yıkama hizmetinden çok memnun kaldık. Makinaları gerçekten endüstriyel, koltuklar yepyeni oldu. İletişimleri de son derece kibar ve profesyonel.",
    rating: 5,
  },
];

const SERVICES: Service[] = [
  {
    title: "Profesyonel Halı Yıkama",
    description:
      "Özel şampuanlar ve tam otomatik makinelerle halılarınızın dokusuna zarar vermeden derinlemesine temizlik.",
    icon: <Droplets className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Yerinde Koltuk Yıkama",
    description:
      "Koltuklarınızı yerinden kaldırmadan, sanayi tipi vakum makineleriyle evinizde hijyene kavuşturuyoruz.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Yorgan & Battaniye",
    description:
      "Ev tipi makinelerin yıkayamayacağı büyüklükteki yorgan ve battaniyeleriniz endüstriyel makinelerde yıkanır.",
    icon: <Wind className="w-8 h-8 text-blue-600" />,
  },
  {
    title: "Stor Perde Temizliği",
    description:
      "Kırılma ve yıpranma riskine karşı özel alanlarda, hassas fırçalama yöntemleriyle stor perde temizliği.",
    icon: <Sparkles className="w-8 h-8 text-blue-600" />,
  },
];

const NAV_LINKS = [
  { name: "Hizmetlerimiz", href: "#hizmetler" },
  { name: "Hakkımızda", href: "#hakkimizda" },
  { name: "Müşteri Yorumları", href: "#yorumlar" },
];

const FAQ_ITEMS = [
  {
    question: "Halı yıkama fiyatları ne kadar?",
    answer:
      "Halı yıkama hizmetimiz m² başına 80₺'den başlamaktadır. Kilim, yün halı, bambu ve ipek halılar için farklı fiyatlar uygulanmaktadır. Güncel fiyat listesini görmek için menüden Fiyatlarımız butonuna tıklayabilirsiniz.",
  },
  {
    question: "Ahlat'a servis yapıyor musunuz?",
    answer:
      "Evet! Ahlat'a her Salı, Perşembe ve Cumartesi günleri ücretsiz servis hizmeti sunmaktayız. Adilcevaz ilçesi için ise her gün servis imkânımız bulunmaktadır.",
  },
  {
    question: "Halılarım ne kadar sürede yıkanıp teslim edilir?",
    answer:
      "Halılarınız teslim alındıktan sonra genellikle 1-2 iş günü içinde yıkanıp teslim edilmektedir. Sürecin her aşamasında (teslim alma, net fiyatlandırma ve yola çıkma) SMS ile bilgilendirilirsiniz.",
  },
  {
    question: "Ödeme yöntemleri neler?",
    answer:
      "Kapıda nakit veya kredi kartı ile ödeme kabul edilmektedir. Ön ödeme talep edilmemektedir.",
  },
  {
    question: "Koltuk yıkama yerinde mi yapılıyor?",
    answer:
      "Evet, koltuk yıkama hizmetimiz evinizde, koltuklarınızı yerinden kaldırmadan yapılmaktadır. Sanayi tipi vakum makineleriyle derin temizlik sağlanır.",
  },
  {
    question: "Hangi ürünleri yıkayabiliyorsunuz?",
    answer:
      "Halı, kilim, yün halı, bambu halı, ipek halı, koltuk takımı, köşe takımı, yorgan, battaniye, stor perde, tül perde, yatak, baza ve araç koltuğu yıkama hizmetleri sunmaktayız.",
  },
];

const FEATURES: string[] = [
  "Ücretsiz Servis İmkanı",
  "Akıllı SMS Bilgilendirme",
  "Anti-Bakteriyel Şampuanlar",
  "Kapalı Alan Kurutma",
  "Kapıda Nakit/Kredi Kartı Ödeme",
  "Hijyenik Ambalajlama",
];

const GALLERY_IMAGES = [
  "/about1.jpeg",
  "/about2.jpeg",
  "/about3.jpeg",
  "/about4.jpeg",
  "/about5.jpeg",
  "/about6.jpeg",
  "/about7.jpeg",
  "/about8.jpeg",
  "/about9.jpeg",
  "/about10.jpeg",
  "/about11.jpeg",
];

const GALLERY_VIDEOS = [
  "/about-vd1.mp4",
  "/about-vd2.mp4",
  "/about-vd3.mp4",
  "/about-vd4.mp4",
  "/about-vd5.mp4",
  "/about-vd6.mp4",
  "/about-vd7.mp4",
];

const GALLERY_ITEMS = [
  ...GALLERY_VIDEOS.map((url) => ({ type: "video" as const, url })),
  ...GALLERY_IMAGES.map((url) => ({ type: "image" as const, url })),
];

const STATS = [
  { value: 5000, suffix: "+", label: "Memnun Aile", decimal: false },
  { value: 8, suffix: "+ Yıl", label: "Hizmet Deneyimi", decimal: false },
  { value: 49, suffix: "★", label: "Ortalama Puan", decimal: true },
  { value: 2, suffix: " İlçe", label: "Servis Bölgesi", decimal: false },
];

const MARQUEE_ITEMS = [
  "Ücretsiz Servis",
  "Anti-Bakteriyel Şampuan",
  "SMS Bilgilendirme",
  "Kapalı Alan Kurutma",
  "Kapıda Nakit/Kredi Kartı",
  "Hijyenik Ambalaj",
  "Endüstriyel Makineler",
  "Ekspres Teslimat",
];

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

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedMediaIdx, setSelectedMediaIdx] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"hali" | "koltuk">("hali");
  const [modalType, setModalType] = useState("randevu");
  const [formData, setFormData] = useState({
    name: "",
    location: "Adilcevaz",
    service: "Halı Yıkama",
    amount: "",
    address: "",
  });

  const navigateMedia = (direction: 1 | -1) => {
    setSelectedMediaIdx((prev) => {
      if (prev === null) return null;
      const next = prev + direction;
      if (next < 0) return GALLERY_ITEMS.length - 1;
      if (next >= GALLERY_ITEMS.length) return 0;
      return next;
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let message = "";
    if (modalType === "randevu") {
      message = `Merhaba, ben ${formData.name}. ${formData.location} bölgesinden ${formData.service} hizmeti için randevu oluşturmak istiyorum.${formData.address ? ` Adresim: ${formData.address}. Bu adresten halılarımın alınmasını istiyorum.` : ""}`;
    } else {
      message = `Merhaba, ben ${formData.name}. ${formData.service} hizmetiniz için güncel fiyat listenizi öğrenebilir miyim?${formData.amount ? ` (Tahmini miktar: ${formData.amount})` : ""}`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${CONTACT_INFO.phoneRaw}?text=${encodedMessage}`,
      "_blank",
    );
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMediaIdx === null) return;
      if (e.key === "ArrowLeft") navigateMedia(-1);
      if (e.key === "ArrowRight") navigateMedia(1);
      if (e.key === "Escape") setSelectedMediaIdx(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMediaIdx]);

  const currentMedia =
    selectedMediaIdx !== null ? GALLERY_ITEMS[selectedMediaIdx] : null;

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-200">
      {/* NAVBAR */}
      <header className="fixed w-full top-0 z-50 bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24 max-w-7xl mx-auto xl:px-4">
            <div
              className="flex items-center h-full py-3 shrink-0 z-50 relative min-w-[150px] mr-4 xl:mr-10 cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <Image
                src="/logo.jpeg"
                alt="Hijyen Halı Temizleme Logosu"
                width={150}
                height={70}
                className="object-contain h-[55px] sm:h-[70px] w-auto mix-blend-multiply"
                priority
              />
            </div>

            <nav className="hidden xl:flex items-center gap-6 2xl:gap-8 flex-1 justify-center">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="text-[12px] font-bold tracking-[0.15em] uppercase text-slate-500 hover:text-blue-600 transition-colors whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={() => {
                  setModalType("fiyat");
                  setIsModalOpen(true);
                }}
                className="text-[12px] font-bold tracking-[0.15em] uppercase text-slate-500 hover:text-blue-600 transition-colors whitespace-nowrap"
              >
                FİYATLARIMIZ
              </button>
            </nav>

            <div className="hidden lg:flex items-center gap-5 shrink-0 ml-auto">
              <div className="flex items-center gap-1.5 text-slate-800 font-bold text-base whitespace-nowrap">
                <Phone className="w-4 h-4 text-blue-600" />
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <button
                onClick={() => {
                  setModalType("randevu");
                  setIsModalOpen(true);
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-full text-[13px] font-bold tracking-wide flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Hızlı Randevu
              </button>
            </div>

            <button
              className="lg:hidden z-50 relative p-2 text-slate-700 outline-none focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-24 left-0 w-full bg-white border-t border-slate-100 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col px-4 py-6 gap-4">
                {NAV_LINKS.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); scrollTo(link.href); }}
                    className="text-lg font-medium text-slate-700 py-2 border-b border-slate-50 outline-none focus:outline-none"
                  >
                    {link.name}
                  </a>
                ))}

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setModalType("fiyat");
                    setIsModalOpen(true);
                  }}
                  className="text-lg font-medium text-slate-700 py-2 border-b border-slate-50 outline-none focus:outline-none text-left"
                >
                  Fiyatlarımız
                </button>

                <div className="flex flex-col gap-4 mt-4">
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 py-3 rounded-xl font-bold outline-none"
                  >
                    <Phone className="w-5 h-5" />
                    {CONTACT_INFO.phone}
                  </a>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setModalType("randevu");
                      setIsModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-bold shadow-md shadow-emerald-500/20 outline-none"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Hızlı Randevu
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            alt="Temiz Halı ve Çocuk"
            fill
            className="object-cover object-top"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#1a233a]/85 via-[#1a233a]/30 to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                Adilcevaz ve Ahlat&apos;ın en çok tercih edilen halı yıkama
                fabrikası
              </span>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl md:text-6xl text-white mb-4 tracking-tight leading-[1.1] drop-shadow-lg">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
                  &ldquo;Temizlik
                </span>{" "}
                <br />
                <span className="font-light text-slate-200">
                  Bizim İşimiz&rdquo;
                </span>
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed drop-shadow-md font-light"
            >
              Özel şampuanlar ve tam otomatik makinelerimizle halılarınızı
              sadece yüzeysel değil, derinlemesine temizliyoruz.
              <strong className="text-white font-medium">
                {" "}
                Sevdikleriniz güvenle temas etsin.
              </strong>
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <a
                href={`tel:${CONTACT_INFO.phoneRaw}`}
                className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-black/20"
              >
                <Phone className="w-5 h-5 text-blue-600" />
                Hemen Arayın
              </a>

              <button
                onClick={() => {
                  setModalType("fiyat");
                  setIsModalOpen(true);
                }}
                className="bg-white/5 hover:bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <ClipboardList className="w-5 h-5 text-slate-200" />
                Fiyat Listesini Gör
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-emerald-50/80 border border-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
              <CalendarDays className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-1 tracking-tight">
                Müjde! Ahlat Servisimiz Başladı!
              </h3>
              <p className="text-slate-500 font-medium text-sm md:text-base">
                Her <span className="text-emerald-600 font-semibold">Salı</span>
                ,{" "}
                <span className="text-emerald-600 font-semibold">Perşembe</span>{" "}
                ve{" "}
                <span className="text-emerald-600 font-semibold">
                  Cumartesi
                </span>{" "}
                günleri Ahlat&apos;a{" "}
                <span className="underline decoration-emerald-500/50 decoration-2 underline-offset-4">
                  ücretsiz servisimiz
                </span>{" "}
                bulunmaktadır.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setModalType("randevu");
              setIsModalOpen(true);
            }}
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
                key={index}
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
              Premium Temizlik Hizmetleri
            </h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              En son teknoloji makinelerimiz ve uzman kadromuzla sağlığınızı ve
              eşyalarınızı koruyan profesyonel çözümler sunuyoruz.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 border border-slate-100 group flex flex-col items-center text-center hover:-translate-y-1"
              >
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-all duration-500 relative">
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

      {/* HAKKIMIZDA */}
      <section
        id="hakkimizda"
        className="py-24 bg-white border-y border-slate-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative w-full px-4 sm:px-0"
            >
              <div className="aspect-[4/5] w-full max-w-md mx-auto relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 group bg-slate-100">
                <Image
                  src="/about1.jpeg"
                  alt="Hijyen Halı Temizleme Fabrikası"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center transition-all duration-300">
                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="flex flex-col items-center gap-2 sm:gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/30 text-white transition-all transform hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                      <Camera className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                    <span className="font-bold tracking-widest text-xs sm:text-sm uppercase text-center drop-shadow-md">
                      Tesisimizi İnceleyin
                    </span>
                  </button>
                </div>
              </div>

              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-4 md:right-4 bg-white p-4 sm:p-6 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 border border-slate-50 w-[85%] sm:w-auto z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-xl sm:text-2xl">⭐</span>
                </div>
                <div>
                  <div className="font-extrabold text-xl sm:text-2xl text-slate-900 leading-none mb-1">
                    5000+
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Memnun Aile
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
                Fabrikamızda Halılarınız <br />
                Nasıl Yıkanır?
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed font-light">
                Halılarınızı evinizden ücretsiz teslim alıyoruz. Sürecin her
                aşamasında{" "}
                <strong className="text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  SMS ile sizi bilgilendiriyoruz
                </strong>{" "}
                (Teslim alma, net fiyatlandırma ve yola çıkma). Fabrikamızda toz
                alma, özel leke müdahalesi, tam otomatik makinede yıkama ve
                kapalı alanda kurutma işlemlerinden sonra parfümleyip
                ambalajlıyoruz.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                {FEATURES.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="font-medium text-slate-700 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Inline galeri grid */}
              <div className="mt-10">
                <div className="grid grid-cols-4 gap-2">
                  {GALLERY_IMAGES.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedMediaIdx(GALLERY_VIDEOS.length + idx);
                      }}
                      className="aspect-square relative rounded-xl overflow-hidden group"
                    >
                      <Image
                        src={img}
                        alt={`Hijyen Halı Temizleme Fabrikası - Görsel ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 25vw, 12vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-300 rounded-xl" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="mt-3 w-full text-center text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center justify-center gap-2 py-3 border border-blue-100 rounded-xl hover:bg-blue-50 transition-all"
                >
                  <Camera className="w-4 h-4" />
                  Tüm Fotoğrafları Gör
                </button>
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
              Aklınıza takılan soruların cevaplarını burada bulabilirsiniz.
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
            <p className="text-slate-500 mb-4">
              Başka sorunuz mu var?
            </p>
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
            >
              <Phone className="w-5 h-5" />
              Bizi Arayın
            </a>
          </div>
        </div>
      </section>

      {/* MÜŞTERİ YORUMLARI */}
      <section
        id="yorumlar"
        className="py-24 bg-slate-50 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 tracking-tight">
              Müşterilerimiz Ne Diyor?
            </h2>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              Adilcevaz ve Ahlat bölgesinde yüzlerce ailenin evine hijyen
              taşıdık. İşte hizmetimizi deneyimleyen müşterilerimizin yorumları.
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
              href="https://www.instagram.com/stories/highlights/17913847877814639/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 px-8 py-4 rounded-full bg-white border border-slate-200 hover:border-fuchsia-400 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
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
                Adilcevaz ve Ahlat bölgesinin en modern, en titiz halı yıkama
                fabrikası. &quot;Temizlik Bizim İşimiz&quot; vizyonuyla
                hizmetinizdeyiz.
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
                      href={`tel:${CONTACT_INFO.phoneRaw}`}
                      className="text-lg font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      {CONTACT_INFO.phone}
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
                      {CONTACT_INFO.address}
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-4 pt-2">
                  <div className="p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 rounded-lg shrink-0 shadow-lg">
                    <InstagramIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-sm text-slate-400 mb-1">
                      Bizi Takip Edin
                    </span>
                    <a
                      href={`https://instagram.com/${CONTACT_INFO.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-medium text-white hover:text-fuchsia-400 transition-colors"
                    >
                      {CONTACT_INFO.instagram}
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
                  { label: "Hizmetlerimiz", href: "#hizmetler" },
                  { label: "Hakkımızda", href: "#hakkimizda" },
                  { label: "Müşteri Yorumları", href: "#yorumlar" },
                  { label: "Sık Sorulan Sorular", href: "#sss" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                      className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
                Çalışma & Servis Saatleri
              </h4>
              <ul className="space-y-3">
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Adilcevaz İçi:</span>
                  <span className="text-white font-medium">Her Gün Servis</span>
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

            <p className="text-slate-500 text-sm flex items-center gap-1.5 group">
              <span className="opacity-60">Frontend Architecture by</span>
              <a
                href="https://github.com/emrekesimemre"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-slate-400 group-hover:text-white transition-colors flex items-center gap-1"
              >
                Emre Kesim
                <Sparkles className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* FİYAT MODAL */}
      <AnimatePresence>
        {isModalOpen && modalType === "fiyat" && (
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
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="bg-white w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    Güncel Fiyat Listesi
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Fiyatlarımıza KDV dahildir.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex p-4 gap-2 bg-white border-b border-slate-100 shrink-0">
                <button
                  onClick={() => setActiveTab("hali")}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === "hali"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Halı & Tekstil
                </button>
                <button
                  onClick={() => setActiveTab("koltuk")}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeTab === "koltuk"
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Koltuk & Yatak
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/30 custom-scrollbar">
                <div className="grid grid-cols-1 gap-3">
                  {PRICING_DATA[activeTab].map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all group"
                    >
                      <span className="font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                        {item.name}
                      </span>
                      <div className="text-right flex flex-col items-end">
                        <span className="font-extrabold text-slate-900">
                          {item.price}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider mt-1">
                          /{item.unit}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-4 md:p-6 border-t border-slate-100 bg-white shrink-0">
                <a
                  href={`tel:${CONTACT_INFO.phoneRaw}`}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-slate-900/20"
                >
                  <Phone className="w-5 h-5" />
                  Hemen Randevu Al
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RANDEVU MODAL */}
      <AnimatePresence>
        {isModalOpen && modalType === "randevu" && (
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Adınız Soyadınız
                  </label>
                  <input
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
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Bölgeniz
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                    >
                      <option value="Adilcevaz">Adilcevaz</option>
                      <option value="Ahlat">Ahlat (Salı, Perş, Cmt)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Hizmet Türü
                    </label>
                    <select
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Adresiniz{" "}
                    <span className="text-slate-400 font-normal">
                      (isteğe bağlı)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Örn: Cumhuriyet Mah. Atatürk Cad. No: 12"
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

      {/* GALERİ MODAL */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col"
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex-1 overflow-y-auto w-full custom-scrollbar">
              <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 p-4 md:p-8 pt-20 md:pt-24">
                {GALLERY_VIDEOS.map((vid, idx) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    key={`vid-${idx}`}
                    onClick={() => setSelectedMediaIdx(idx)}
                    className="aspect-square relative rounded-xl overflow-hidden bg-slate-800 shadow-lg cursor-pointer group"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                    <video
                      src={vid}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                ))}

                {GALLERY_IMAGES.map((img, idx) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (GALLERY_VIDEOS.length + idx) * 0.1 }}
                    key={`img-${idx}`}
                    onClick={() =>
                      setSelectedMediaIdx(GALLERY_VIDEOS.length + idx)
                    }
                    className="aspect-square relative rounded-xl overflow-hidden bg-slate-800 shadow-lg group cursor-pointer"
                  >
                    <Image
                      src={img}
                      alt={`Hijyen Halı Temizleme Fabrikası - Galeri ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN MEDYA GÖRÜNTÜLEYICI */}
      <AnimatePresence>
        {currentMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedMediaIdx(null)}
          >
            <button
              onClick={() => setSelectedMediaIdx(null)}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all z-[70]"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia(-1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all z-[70]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateMedia(1);
              }}
              className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all z-[70]"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 text-sm z-[70]">
              {selectedMediaIdx !== null ? selectedMediaIdx + 1 : 0} /{" "}
              {GALLERY_ITEMS.length}
            </div>

            <motion.div
              key={selectedMediaIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {currentMedia.type === "video" ? (
                <video
                  src={currentMedia.url}
                  autoPlay
                  controls
                  playsInline
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={currentMedia.url}
                    alt="Hijyen Halı Temizleme - Fabrika Görseli"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING WHATSAPP */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.a
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={CONTACT_INFO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-[#25D366]/40 flex items-center justify-center group"
          >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute right-full mr-4 bg-slate-900 text-white text-sm font-medium py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Bize Ulaşın
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
