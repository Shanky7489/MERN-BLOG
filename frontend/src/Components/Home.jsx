import Devotional from "../home/Devotional";
import Hero from "../home/Hero";
import Trending from "../home/Trending";
import Creators from "../home/Creators";

const Home = () => {
  return (
    <div>
      <Hero />
      <Trending />
      <Devotional />
      <Creators />
    </div>
  );
};

export default Home;
