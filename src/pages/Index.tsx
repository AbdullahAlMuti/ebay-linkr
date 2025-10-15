import { Hero3D } from '@/components/Hero3D';
import { BusinessGrowthStats } from '@/components/BusinessGrowthStats';
import { FeatureBlocks } from '@/components/FeatureBlocks';
import { MediaShowcase } from '@/components/MediaShowcase';
import { Reviews } from '@/components/Reviews';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero3D />
      <BusinessGrowthStats />
      <FeatureBlocks />
      <MediaShowcase />
      <Reviews />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;