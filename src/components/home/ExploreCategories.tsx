
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Landmark,
  Baby,
  Library,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Stories that take you beyond imagination.",
    icon: BookOpen,
    color: "#F5E5DF",
  },
  {
    name: "Novels",
    description: "Lose yourself in captivating literary journeys.",
    icon: BookOpen,
    color: "#E9E3F0",
    },
  {
    name: "Science",
    description: "Explore ideas, discoveries and innovation.",
    icon: FlaskConical,
    color: "#E7EBE2",
  },
  {
    name: "History",
    description: "Discover the stories that shaped our world.",
    icon: Landmark,
    color: "#F1EADB",
  },
  {
    name: "Kids",
    description: "Wonderful adventures for young readers.",
    icon: Baby,
    color: "#F4E6EA",
  },
  {
    name: "Others",
    description: "Find something unexpected to read.",
    icon: Library,
    color: "#E8EAF0",
  },
];

const ExploreCategories = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#B85C45]">
          Find Your Interest
        </p>

        <h2 className="text-3xl font-bold text-[#292421] md:text-4xl">
          Explore Categories
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-[#77716B]">
          Whatever you love to read, there is a little something
          waiting for you in our collection.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <Link
              key={category.name}
              href={`/books?category=${category.name}`}
              className="group flex items-center gap-5 rounded-2xl border border-[#E8DED2] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: category.color }}
              >
                <Icon size={29} strokeWidth={1.6} className="text-[#292421]" />
              </div>

              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-lora)] text-xl font-bold text-[#292421]">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#77716B]">
                  {category.description}
                </p>
              </div>

              <ArrowUpRight
                size={20}
                className="shrink-0 text-[#B85C45] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ExploreCategories;
