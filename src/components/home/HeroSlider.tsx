
"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    label: "WELCOME TO BOOKNOOK",
    title: "Every book holds a world. Find yours.",
    description:
      "Discover stories that inspire, ideas that challenge, and books that stay with you long after the last page.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A beautiful collection of books",
  },
  {
    label: "YOUR NEXT CHAPTER STARTS HERE",
    title: "A little reading can change everything.",
    description:
      "From timeless classics to exciting new discoveries, find the perfect book for your next reading adventure.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A carefully arranged stack of books",
  },
  {
    label: "READ. SHARE. REPEAT.",
    title: "Good stories are even better when shared.",
    description:
      "Explore our growing library, borrow your favorites, and let wonderful stories travel from one reader to another.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "A welcoming library filled with books",
  },
];

const HeroSlider = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-8 md:px-8 md:pt-12">
      <div className="relative overflow-hidden rounded-3xl">

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".hero-prev",
            nextEl: ".hero-next",
          }}
          pagination={{
            clickable: true,
            el: ".hero-pagination",
          }}
          className="group"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.label}>
              <div className="grid min-h-[520px] items-center gap-10 bg-[#F0EAE1] px-12 py-14 md:grid-cols-2 md:px-20 lg:min-h-[570px] lg:px-24">

                {/* Text Content */}
                <div className="relative z-10 max-w-xl">
                  <span className="mb-6 inline-flex rounded-full border border-[#B85C45]/30 bg-white/60 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-[#B85C45]">
                    {slide.label}
                  </span>

                  <h1 className="font-[family-name:var(--font-lora)] text-4xl font-semibold leading-[1.2] tracking-tight text-[#292421] sm:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  <p className="mt-6 max-w-lg text-base leading-8 text-[#77716B] md:text-lg">
                    {slide.description}
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-2 rounded-full bg-[#B85C45] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#9F4B38] hover:shadow-lg"
                    >
                      Browse Books
                      <ArrowRight size={18} />
                    </Link>

                    <span className="text-sm font-medium text-[#77716B]">
                      Discover your next favorite
                    </span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative mx-auto w-full max-w-md">
                  <div className="absolute -inset-4 rotate-3 rounded-3xl bg-[#87917B]/20" />

                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl md:aspect-[5/4]">
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292421]/20 to-transparent" />
                  </div>

                  <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white px-5 py-4 shadow-lg sm:block">
                    <p className="font-[family-name:var(--font-lora)] text-lg font-semibold text-[#292421]">
                      {index === 0
                        ? "Explore new worlds"
                        : index === 1
                          ? "Find your next read"
                          : "Share the joy of reading"}
                    </p>
                    <p className="mt-1 text-xs text-[#77716B]">
                      Your reading journey begins here.
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Previous Button */}
        <button
          type="button"
          aria-label="Previous slide"
          className="hero-prev absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8DED2] bg-white/90 text-[#292421] shadow-md transition-all hover:bg-[#B85C45] hover:text-white md:left-5 md:h-12 md:w-12"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next Button */}
        <button
          type="button"
          aria-label="Next slide"
          className="hero-next absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E8DED2] bg-white/90 text-[#292421] shadow-md transition-all hover:bg-[#B85C45] hover:text-white md:right-5 md:h-12 md:w-12"
        >
          <ChevronRight size={22} />
        </button>

        {/* Pagination */}
        <div className="hero-pagination absolute bottom-5 left-0 z-20 flex w-full items-center justify-center gap-2" />

      </div>
    </section>
  );
};

export default HeroSlider;
