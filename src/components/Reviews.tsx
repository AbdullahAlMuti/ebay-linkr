import { Star, Quote } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const reviews = [
  {
    name: 'Sarah Johnson',
    role: 'eBay Power Seller',
    rating: 5,
    quote: 'This tool has completely transformed my dropshipping business. I went from 5 listings a day to 50! The AI optimization is incredibly accurate.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    name: 'Mike Chen',
    role: 'E-commerce Entrepreneur',
    rating: 5,
    quote: 'The AI optimization is incredible. My conversion rate increased by 40% in just two weeks. Best investment I\'ve made for my business.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Online Retailer',
    rating: 5,
    quote: 'Great tool for scaling quickly. The auto-pricing feature alone is worth the subscription. My profit margins have never been better.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }
];

export const Reviews = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    const cards = carouselRef.current.querySelectorAll('.review-card');
    
    gsap.to(cards, {
      x: '-=400',
      duration: 20,
      repeat: -1,
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (cards.length * 400))
      }
    });
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-heading font-bold">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what successful sellers are saying about ListFlow AI
          </p>
        </div>

        {/* Desktop: Infinite carousel */}
        <div className="hidden md:block overflow-hidden">
          <div ref={carouselRef} className="flex gap-8 w-max">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="review-card w-[400px] glass glass-hover p-8 rounded-3xl flex-shrink-0"
              >
                <Quote className="w-12 h-12 text-primary/30 mb-6" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-lg mb-8 text-foreground/90 leading-relaxed">
                  "{review.quote}"
                </p>

                <div className="flex items-center gap-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-14 h-14 rounded-full border-2 border-primary/30"
                  />
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm text-muted-foreground">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="md:hidden space-y-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="glass glass-hover p-8 rounded-3xl"
            >
              <Quote className="w-12 h-12 text-primary/30 mb-6" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-lg mb-8 text-foreground/90 leading-relaxed">
                "{review.quote}"
              </p>

              <div className="flex items-center gap-4">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  className="w-14 h-14 rounded-full border-2 border-primary/30"
                />
                <div>
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};