# Hostinger Deployment Guide

This guide will help you deploy your React + Vite application to Hostinger hosting.

## Prerequisites

1. **Hostinger Account**: You need an active Hostinger hosting account
2. **Supabase Project**: Your app uses Supabase, so you need your project URL and API key
3. **Domain**: A domain name (optional, you can use the free subdomain)

## Step 1: Prepare Your Environment Variables

Before deploying, you need to set up your Supabase environment variables:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy your:
   - Project URL (looks like: `https://your-project-id.supabase.co`)
   - Anon/Public key (starts with `eyJ...`)

4. Create a `.env` file in your project root with:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key-here
```

## Step 2: Build Your Application

Run the following commands in your project directory:

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist` folder with all the files you need to upload.

## Step 3: Upload to Hostinger

### Method 1: File Manager (Recommended for beginners)

1. **Login to Hostinger Control Panel**
   - Go to your Hostinger account
   - Access the hPanel (control panel)

2. **Navigate to File Manager**
   - In hPanel, find and click "File Manager"
   - Navigate to `public_html` folder (this is your website root)

3. **Upload Files**
   - Delete any existing files in `public_html` (if this is a new site)
   - Upload ALL contents from your `dist` folder to `public_html`
   - Make sure to upload:
     - `index.html`
     - `assets` folder (with CSS and JS files)
     - `favicon.ico`
     - `placeholder.svg`
     - `robots.txt`

### Method 2: FTP Client

1. **Get FTP Credentials**
   - In hPanel, go to "FTP Accounts"
   - Note down your FTP host, username, and password

2. **Use FTP Client**
   - Download FileZilla or similar FTP client
   - Connect using your FTP credentials
   - Navigate to `public_html` folder
   - Upload all contents from your `dist` folder

## Step 4: Configure Environment Variables

Since Hostinger doesn't support `.env` files directly, you have a few options:

### Option A: Hardcode in Build (Not Recommended for Production)
Modify your build process to include the environment variables directly.

### Option B: Use Hostinger's Environment Variables (If Available)
Some Hostinger plans support environment variables in the control panel.

### Option C: Use a Different Approach
Consider using a service like Vercel or Netlify for easier environment variable management.

## Step 5: Test Your Deployment

1. **Visit Your Website**
   - Go to your domain or the provided subdomain
   - Check if the site loads correctly

2. **Test Functionality**
   - Verify all features work
   - Check if Supabase connection is working
   - Test responsive design on mobile

## Step 6: Domain Configuration (Optional)

If you have a custom domain:

1. **Point Domain to Hostinger**
   - Update your domain's DNS settings
   - Point A record to Hostinger's IP address
   - Or use Hostinger's nameservers

2. **Add Domain in hPanel**
   - Go to "Domains" in hPanel
   - Add your custom domain
   - Set it as primary domain

## Troubleshooting

### Common Issues:

1. **404 Errors**
   - Make sure all files are uploaded to `public_html`
   - Check file permissions (should be 644 for files, 755 for folders)

2. **Supabase Connection Issues**
   - Verify environment variables are set correctly
   - Check Supabase project settings
   - Ensure your domain is added to Supabase's allowed origins

3. **CSS/JS Not Loading**
   - Check if `assets` folder is uploaded correctly
   - Verify file paths in `index.html`

4. **Slow Loading**
   - Enable Gzip compression in hPanel
   - Consider using a CDN

## Performance Optimization

1. **Enable Caching**
   - In hPanel, go to "Caching"
   - Enable browser caching and compression

2. **Use CDN**
   - Consider upgrading to a plan with CDN
   - Or use Cloudflare (free option)

## Security Considerations

1. **HTTPS**
   - Enable SSL certificate in hPanel
   - Force HTTPS redirect

2. **File Permissions**
   - Set correct file permissions
   - Don't upload sensitive files like `.env`

## Support

If you encounter issues:
1. Check Hostinger's knowledge base
2. Contact Hostinger support
3. Review the browser console for errors
4. Check Supabase logs for backend issues

## Alternative Deployment Options

If you find Hostinger challenging for this type of application, consider:
- **Vercel** (Free, excellent for React apps)
- **Netlify** (Free, easy deployment)
- **GitHub Pages** (Free, good for static sites)
- **Firebase Hosting** (Google's platform)

These platforms often have better support for modern React applications and environment variables.
