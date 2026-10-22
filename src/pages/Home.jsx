import Hero from '../components/Hero';
import FeaturedWork from '../components/FeaturedWork';
import PhotographerIntro from '../components/PhotographerIntro';
import ServicesPreview from '../components/ServicesPreview';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/Chatbot/BackToTop';
import Gallery from '../components/Gallery';
import ChatBot from '../components/Chatbot/ChatBot';

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
      <ChatBot />
    </>
  );
}