import Hero from '../components/Hero';
import FeaturedWork from '../components/FeaturedWork';
import PhotographerIntro from '../components/PhotographerIntro';
import ServicesPreview from '../components/ServicesPreview';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Gallery from '../components/Gallery';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <PhotographerIntro />
      <ServicesPreview />
      <Gallery />
      <Testimonials />
      <CTASection />
    </>
  );
}