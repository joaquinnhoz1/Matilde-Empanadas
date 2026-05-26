import { Marquee } from '@/sections/Marquee/Marquee';
import { Hero } from '@/sections/Hero/Hero';
import { Pillars } from '@/sections/Pillars/Pillars';
import { About } from '@/sections/About/About';
import { Products } from '@/sections/Products/Products';
import { WhyUs } from '@/sections/WhyUs/WhyUs';
import { Branches } from '@/sections/Branches/Branches';
import { CtaFinal } from '@/sections/CtaFinal/CtaFinal';
import { Footer } from '@/sections/Footer/Footer';
import { DesktopStickyCta, MobileStickyCta } from '@/widgets/StickyCta/StickyCta';

export default function App() {
  return (
    <>
      <Marquee />
      <Hero />
      <Pillars />
      <About />
      <Products />
      <WhyUs />
      <Branches />
      <CtaFinal />
      <Footer />
      <DesktopStickyCta />
      <MobileStickyCta />
    </>
  );
}
