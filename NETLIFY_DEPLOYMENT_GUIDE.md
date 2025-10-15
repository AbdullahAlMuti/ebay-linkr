# Netlify Deployment Guide with Custom Domain

This guide will help you deploy your React + Vite application to Netlify with a custom domain.

## Why Netlify is Better for Your App

✅ **Free hosting** with generous limits  
✅ **Easy environment variables** management  
✅ **Automatic HTTPS** with free SSL certificates  
✅ **Custom domain support** with simple setup  
✅ **Automatic deployments** from Git  
✅ **Built-in CDN** for fast global loading  
✅ **Form handling** and serverless functions  
✅ **Branch previews** for testing  

## Step 1: Prepare Your Repository

### Option A: Deploy from Git (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

### Option B: Manual Deploy

1. **Build your app locally**
   ```bash
   npm install
   npm run build
   ```

2. **Zip the `dist` folder** for manual upload

## Step 2: Deploy to Netlify

### Method 1: Git Integration (Recommended)

1. **Go to [Netlify](https://netlify.com)**
   - Sign up/login with your Git provider account

2. **Create New Site**
   - Click "New site from Git"
   - Connect your Git provider
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18` (or latest)

4. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase project URL
     - `VITE_SUPABASE_PUBLISHABLE_KEY` = your Supabase anon key

5. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Method 2: Manual Deploy

1. **Go to [Netlify](https://netlify.com)**
   - Sign up/login

2. **Drag and Drop**
   - Drag your `dist` folder to the deploy area
   - Or click "Browse to upload"

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add your Supabase credentials

## Step 3: Set Up Custom Domain

### Step 3.1: Add Domain in Netlify

1. **Go to Site Settings**
   - In your Netlify dashboard, click on your site
   - Go to "Domain management"

2. **Add Custom Domain**
   - Click "Add custom domain"
   - Enter your domain (e.g., `yourdomain.com`)
   - Click "Verify"

### Step 3.2: Configure DNS

You have two options:

#### Option A: Use Netlify Nameservers (Easiest)

1. **Get Netlify Nameservers**
   - In Domain management, you'll see nameservers like:
     - `dns1.p01.nsone.net`
     - `dns2.p01.nsone.net`

2. **Update at Your Domain Registrar**
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Change nameservers to Netlify's nameservers
   - Wait 24-48 hours for propagation

#### Option B: Use DNS Records (Keep Current Nameservers)

1. **Get Netlify DNS Records**
   - In Domain management, click "Check DNS configuration"
   - You'll see required DNS records

2. **Add DNS Records at Your Current Provider**
   - Add A record: `@` → Netlify IP (e.g., `75.2.60.5`)
   - Add CNAME record: `www` → `your-site-name.netlify.app`

### Step 3.3: Enable HTTPS

1. **Automatic SSL**
   - Netlify automatically provisions SSL certificates
   - Go to Domain management → HTTPS
   - Click "Verify DNS configuration"
   - Wait for certificate provisioning (usually 5-10 minutes)

2. **Force HTTPS**
   - In Site settings → Domain management
   - Enable "Force HTTPS"

## Step 4: Advanced Configuration

### Custom Headers (Optional)

Create `_headers` file in your `public` folder:

```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### Redirects (Optional)

Create `_redirects` file in your `public` folder:

```
# Redirect all traffic to HTTPS
http://yourdomain.com/* https://yourdomain.com/:splat 301!

# Handle SPA routing
/* /index.html 200
```

### Environment-Specific Builds

You can have different environment variables for different branches:

- **Production**: `main` branch
- **Staging**: `develop` branch
- **Preview**: Any other branch

## Step 5: Continuous Deployment

### Automatic Deployments

1. **Every push to main** → Production deployment
2. **Pull requests** → Preview deployments
3. **Other branches** → Branch previews

### Build Hooks

You can trigger builds via webhooks:
- Go to Site settings → Build & deploy → Build hooks
- Create a build hook URL
- Use it to trigger deployments from external services

## Step 6: Performance Optimization

### Netlify Features

1. **Automatic Image Optimization**
   - Enable in Site settings → Build & deploy → Post processing

2. **Edge Functions**
   - For server-side logic
   - Create `netlify/functions/` folder

3. **Form Handling**
   - Netlify automatically handles form submissions
   - No backend needed for simple forms

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check build logs in Netlify dashboard
   - Verify Node version compatibility
   - Check environment variables

2. **Domain Not Working**
   - Verify DNS configuration
   - Check nameserver propagation (use `nslookup`)
   - Wait up to 48 hours for full propagation

3. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Redeploy after adding variables
   - Check variable names match exactly

4. **404 Errors on Refresh**
   - Add redirect rule: `/* /index.html 200`
   - Or use the `netlify.toml` configuration

## Cost Comparison

### Netlify Free Plan:
- 100GB bandwidth/month
- 300 build minutes/month
- Custom domains
- SSL certificates
- Form handling (100 submissions/month)

### Netlify Pro Plan ($19/month):
- 1TB bandwidth/month
- 3,000 build minutes/month
- Advanced features
- Priority support

## Migration from Hostinger

If you're currently on Hostinger:

1. **Export your domain DNS settings**
2. **Deploy to Netlify** (follow steps above)
3. **Update DNS** to point to Netlify
4. **Test thoroughly** before canceling Hostinger

## Support

- **Netlify Docs**: https://docs.netlify.com
- **Community**: https://community.netlify.com
- **Status Page**: https://www.netlifystatus.com

Netlify is much more suitable for modern React applications than traditional shared hosting like Hostinger!
