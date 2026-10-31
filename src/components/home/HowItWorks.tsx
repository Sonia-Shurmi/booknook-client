
import {
  Search,
  BookOpen,
  RotateCcw,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover a Book",
    description:
      "Explore our growing collection and find a story that matches your interests.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow Your Favorite",
    description:
      "Choose an available book and borrow it for a few days with just a few clicks.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Read & Return",
    description:
      "Enjoy your reading journey and return the book so another reader can discover it.",
    icon: RotateCcw,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#F0EAE1]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C45]">
            Simple & Enjoyable
          </p>

          <h2 className="text-3xl font-bold text-[#292421] md:text-4xl">
            How BookNook Works
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[#77716B]">
            Your next great read is only a few steps away.
            Getting started is easy.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-[#E8DED2] bg-[#FAF7F2] p-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="absolute right-6 top-5 font-[family-name:var(--font-lora)] text-3xl font-bold text-[#E8DED2]">
                  {step.number}
                </span>

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B85C45] text-white">
                  <Icon size={28} strokeWidth={1.7} />
                </div>

                <h3 className="font-[family-name:var(--font-lora)] text-xl font-bold text-[#292421]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#77716B]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
