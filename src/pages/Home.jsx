import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import RecentProjects from "../components/RecentProjects";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <About />
      <WhyChooseUs />
      <RecentProjects />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;
