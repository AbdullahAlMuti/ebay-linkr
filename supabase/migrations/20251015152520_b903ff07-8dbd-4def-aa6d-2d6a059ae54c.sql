-- Drop all triggers first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_landing_content_updated_at ON public.landing_content;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
DROP TRIGGER IF EXISTS update_user_subscriptions_updated_at ON public.user_subscriptions;

-- Drop tables (order matters due to foreign keys)
DROP TABLE IF EXISTS public.user_subscriptions CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.pricing_plans CASCADE;
DROP TABLE IF EXISTS public.media_items CASCADE;
DROP TABLE IF EXISTS public.landing_content CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.has_role(_user_id uuid, _role app_role);
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Drop enum type
DROP TYPE IF EXISTS public.app_role CASCADE;