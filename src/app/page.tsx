import ExploreCategories from "@/components/home/ExploreCategories";
import HeroSlider from "@/components/home/HeroSlider";
import HowItWorks from "@/components/home/HowItWorks";
import NewArrivals from "@/components/home/NewArrivals";
import WhyBookNook from "@/components/home/WhyBookNook";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <HeroSlider />
      <NewArrivals />
      <ExploreCategories/>
      <HowItWorks/>
      <WhyBookNook/>
    </div>
  );
}
