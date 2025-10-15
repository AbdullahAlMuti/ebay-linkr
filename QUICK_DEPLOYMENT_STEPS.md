# Quick Deployment Steps for Hostinger

## 🚀 Fast Track Deployment

### 1. Get Your Supabase Keys
- Go to [Supabase Dashboard](https://supabase.com/dashboard)
- Select your project → Settings → API
- Copy: Project URL and Anon Key

### 2. Build Your App
```bash
npm install
npm run build
```

### 3. Prepare Files (Windows)
Double-click `prepare-for-hostinger.bat` or run:
```bash
# Create deployment folder
mkdir hostinger-deploy
# Copy dist files
xcopy dist\* hostinger-deploy\ /E /I /Y
```

### 4. Upload to Hostinger
1. Login to Hostinger → hPanel
2. File Manager → public_html
3. Upload ALL files from `hostinger-deploy` folder
4. Set environment variables (if supported by your plan)

### 5. Configure Environment Variables
Since Hostinger doesn't support .env files easily, you have these options:

**Option A: Modify the build (Quick Fix)**
Edit `src/integrations/supabase/client.ts` and replace:
```typescript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
```

With your actual values:
```typescript
const SUPABASE_URL = "https://your-project-id.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "your-anon-key-here";
```

Then rebuild: `npm run build`

**Option B: Use a Different Host (Recommended)**
Consider deploying to:
- **Vercel** (Free, perfect for React apps)
- **Netlify** (Free, easy environment variables)
- **Firebase Hosting** (Google's platform)

### 6. Test Your Site
- Visit your domain
- Check browser console for errors
- Test all functionality

## ⚠️ Important Notes

- **File Permissions**: Set files to 644, folders to 755
- **HTTPS**: Enable SSL certificate in hPanel
- **Caching**: Enable browser caching for better performance
- **CDN**: Consider using Cloudflare for faster loading

## 🆘 Need Help?

1. Check browser console for errors
2. Verify Supabase project settings
3. Contact Hostinger support
4. Consider alternative hosting platforms

## 📁 Files to Upload
Upload these files/folders to `public_html`:
- `index.html`
- `assets/` (folder with CSS and JS)
- `favicon.ico`
- `placeholder.svg`
- `robots.txt`
