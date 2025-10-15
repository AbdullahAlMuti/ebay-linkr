-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create landing content table for CMS
CREATE TABLE public.landing_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL UNIQUE,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.landing_content ENABLE ROW LEVEL SECURITY;

-- Landing content policies (public read, admin write)
CREATE POLICY "Anyone can view landing content"
  ON public.landing_content FOR SELECT
  USING (true);

CREATE POLICY "Admins can update landing content"
  ON public.landing_content FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert landing content"
  ON public.landing_content FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  quote TEXT NOT NULL,
  video_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage reviews"
  ON public.reviews FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create media items table
CREATE TABLE public.media_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('video', 'image')),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;

-- Media policies
CREATE POLICY "Anyone can view media"
  ON public.media_items FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage media"
  ON public.media_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create pricing plans table
CREATE TABLE public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  billing_period TEXT NOT NULL CHECK (billing_period IN ('monthly', 'yearly', 'lifetime')),
  features JSONB NOT NULL,
  stripe_price_id TEXT,
  display_order INTEGER DEFAULT 0,
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

-- Pricing policies
CREATE POLICY "Anyone can view pricing"
  ON public.pricing_plans FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage pricing"
  ON public.pricing_plans FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create user subscriptions table
CREATE TABLE public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES public.pricing_plans(id),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due', 'incomplete')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Subscription policies
CREATE POLICY "Users can view their own subscription"
  ON public.user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
  ON public.user_subscriptions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user signups
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Insert default landing content
INSERT INTO public.landing_content (section, content) VALUES
('hero', '{
  "headline": "Auto-list from Amazon to eBay — 10x faster",
  "subheadline": "Generate optimized eBay listings automatically and boost your revenue",
  "ctaPrimary": "Try Free",
  "ctaSecondary": "See Demo"
}'::jsonb),
('features', '{
  "title": "Powerful Features",
  "items": [
    {
      "icon": "Zap",
      "title": "1-Click Amazon → eBay",
      "description": "Instantly convert Amazon listings to optimized eBay listings with a single click"
    },
    {
      "icon": "TrendingUp",
      "title": "Auto Price Optimization",
      "description": "AI-powered pricing that maximizes your profit margins automatically"
    },
    {
      "icon": "Image",
      "title": "Image & Title Optimizer",
      "description": "Automatically enhance product images and create compelling titles that sell"
    },
    {
      "icon": "Tag",
      "title": "Auto Category Mapping",
      "description": "Smart category detection ensures your products appear in the right searches"
    }
  ]
}'::jsonb),
('theme', '{
  "primaryGradient": ["#7b61ff", "#ff6ec7"],
  "accent": "#FFD166",
  "fontHeading": "Poppins",
  "fontBody": "Inter"
}'::jsonb);

-- Insert default pricing plans
INSERT INTO public.pricing_plans (name, price, billing_period, features, display_order) VALUES
('Free', 0.00, 'monthly', '["10 listings per month", "Basic optimization", "Email support", "Community access"]'::jsonb, 1),
('Pro', 5.00, 'monthly', '["100 listings per month", "Advanced AI optimization", "Priority support", "Custom templates", "Analytics dashboard"]'::jsonb, 2),
('Enterprise', 15.00, 'monthly', '["Unlimited listings", "Premium AI optimization", "24/7 dedicated support", "Custom integrations", "Advanced analytics", "API access"]'::jsonb, 3);

-- Insert sample reviews
INSERT INTO public.reviews (name, rating, quote, featured) VALUES
('Sarah Johnson', 5, 'This tool has completely transformed my dropshipping business. I went from 5 listings a day to 50!', true),
('Mike Chen', 5, 'The AI optimization is incredible. My conversion rate increased by 40% in just two weeks.', true),
('Emily Rodriguez', 4, 'Great tool for scaling quickly. The auto-pricing feature alone is worth the subscription.', false);

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_landing_content_updated_at BEFORE UPDATE ON public.landing_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON public.media_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pricing_updated_at BEFORE UPDATE ON public.pricing_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();