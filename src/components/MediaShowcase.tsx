import { Play, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const mediaItems = [
  {
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    title: 'How ListFlow AI Works',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    title: 'Success Story: From 10 to 1000 Listings',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&h=600&fit=crop',
    title: 'Advanced Features Tutorial',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export const MediaShowcase = () => {
  const [selectedMedia, setSelectedMedia] = useState<typeof mediaItems[0] | null>(null);

  return (
    <section id="media" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-heading font-bold">
            See It <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how sellers are transforming their businesses with ListFlow AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mediaItems.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div 
                  className="group cursor-pointer glass glass-hover rounded-3xl overflow-hidden"
                  onClick={() => setSelectedMedia(item)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform pulse-glow">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-heading font-semibold group-hover:gradient-text transition-all">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
                <div className="relative aspect-video rounded-2xl overflow-hidden glass">
                  <iframe
                    src={item.url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};