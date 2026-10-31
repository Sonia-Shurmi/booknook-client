
import {
  LibraryBig,
  Clock3,
  HeartHandshake,
} from "lucide-react";

const benefits = [
  {
    icon: LibraryBig,
    title: "A Growing Collection",
    description:
      "Discover books across different genres, from timeless classics to exciting new reads. There is always something new to explore.",
  },
  {
    icon: Clock3,
    title: "Borrow with Ease",
    description:
      "Find an available book, borrow it in just a few steps, and keep track of your reading with your personal library.",
  },
  {
    icon: HeartHandshake,
    title: "Stories Worth Sharing",
    description:
      "Every returned book gets another chance to inspire someone. Be part of a community that keeps stories moving.",
  },
];

const WhyBookNook = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C45]">
            More Than Just Books
          </p>

          <h2 className="max-w-lg text-3xl font-bold leading-tight text-[#292421] md:text-5xl">
            A little space for your next big discovery.
          </h2>

          <p className="mt-5 max-w-lg leading-8 text-[#77716B]">
            We believe great stories and valuable knowledge should
            be easy to access. BookNook brings readers and books
            together, one chapter at a time.
          </p>
        </div>

        <div className="space-y-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex gap-5 rounded-2xl border border-[#E8DED2] bg-white p-6 transition duration-300 hover:shadow-md"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F0EAE1] text-[#B85C45]">
                  <Icon size={26} strokeWidth={1.7} />
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-lora)] text-xl font-bold text-[#292421]">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#77716B]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyBookNook;

