import { Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out the platform',
    features: [
      '10 listings per month',
      'Basic optimization',
      'Email support',
      'Community access'
    ],
    cta: 'Start Free',
    popular: false
  },
  {
    name: 'Pro',
    price: 5,
    period: 'month',
    description: 'Best for growing sellers',
    features: [
      '100 listings per month',
      'Advanced AI optimization',
      'Priority support',
      'Custom templates',
      'Analytics dashboard'
    ],
    cta: 'Start Pro Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 15,
    period: 'month',
    description: 'For high-volume sellers',
    features: [
      'Unlimited listings',
      'Premium AI optimization',
      '24/7 dedicated support',
      'Custom integrations',
      'Advanced analytics',
      'API access'
    ],
    cta: 'Start Enterprise',
    popular: false
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-heading font-bold">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade as you grow. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative glass p-8 rounded-3xl ${
                plan.popular 
                  ? 'glass-hover glow-primary scale-105 md:scale-110' 
                  : 'glass-hover'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full animated-gradient text-white text-sm font-semibold">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan name */}
                <div>
                  <h3 className="text-2xl font-heading font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-heading font-bold gradient-text">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground mb-2">/ {plan.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  className={`w-full text-lg py-6 ${
                    plan.popular 
                      ? 'animated-gradient glow-primary' 
                      : 'glass glass-hover'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => {
                    if (plan.name === 'Pro') {
                      window.open('https://buy.stripe.com/eVq9AU3jY2aE8me2l68ww01', '_blank');
                    } else {
                      window.open(`https://buy.stripe.com/test_demo_${plan.name.toLowerCase()}`, '_blank');
                    }
                  }}
                >
                  {plan.cta}
                </Button>
              </div>

              {/* Corner decoration */}
              {plan.popular && (
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-primary to-secondary opacity-20 rounded-full blur-3xl" />
              )}
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            🔒 Secure payment processing • 💳 All major cards accepted • 🔄 Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};