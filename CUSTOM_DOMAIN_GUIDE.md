# 🌐 Custom Domain Setup Guide

## 🎯 Your Options for Custom Domain

### Option 1: GitHub Pages (Recommended - Free)
- ✅ **Free hosting** with custom domain
- ✅ **Automatic HTTPS**
- ✅ **CDN included**
- ✅ **Automatic deployments**

### Option 2: Netlify (Best for React Apps)
- ✅ **Free hosting** with custom domain
- ✅ **Easy environment variables**
- ✅ **Automatic builds**
- ✅ **Better performance**

### Option 3: Vercel (Professional)
- ✅ **Free hosting** with custom domain
- ✅ **Excellent for React**
- ✅ **Automatic deployments**
- ✅ **Edge functions**

## 🚀 Option 1: GitHub Pages Setup

### Step 1: Enable GitHub Pages
1. Go to: https://github.com/AbdullahAlMuti/ebay-linkr/settings/pages
2. **Source**: Select "GitHub Actions"
3. **Save**

### Step 2: Add Environment Variables
1. Go to: https://github.com/AbdullahAlMuti/ebay-linkr/settings/secrets/actions
2. **New repository secret**:
   - Name: `VITE_SUPABASE_URL`
   - Value: Your Supabase project URL
3. **New repository secret**:
   - Name: `VITE_SUPABASE_PUBLISHABLE_KEY`
   - Value: Your Supabase anon key

### Step 3: Push the Workflow
```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push
```

### Step 4: Add Custom Domain
1. Go to: https://github.com/AbdullahAlMuti/ebay-linkr/settings/pages
2. **Custom domain**: Enter your domain (e.g., `yourdomain.com`)
3. **Enforce HTTPS**: Check this box
4. **Save**

### Step 5: Configure DNS

#### For Apex Domain (yourdomain.com):
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

#### For Subdomain (www.yourdomain.com):
```
Type: CNAME
Name: www
Value: AbdullahAlMuti.github.io
```

## 🚀 Option 2: Netlify Setup (Recommended)

### Step 1: Deploy to Netlify
1. Go to: https://netlify.com
2. **"New site from Git"**
3. **Connect GitHub** → Select `AbdullahAlMuti/ebay-linkr`
4. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy**

### Step 2: Add Environment Variables
1. **Site settings** → **Environment variables**
2. Add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = your anon key

### Step 3: Add Custom Domain
1. **Domain management** → **Add custom domain**
2. Enter your domain
3. **Configure DNS**:
   - **Option A**: Use Netlify nameservers
   - **Option B**: Add DNS records

## 🚀 Option 3: Vercel Setup

### Step 1: Deploy to Vercel
1. Go to: https://vercel.com
2. **"New Project"**
3. **Import from GitHub** → Select `AbdullahAlMuti/ebay-linkr`
4. **Deploy**

### Step 2: Add Environment Variables
1. **Project settings** → **Environment Variables**
2. Add your Supabase credentials

### Step 3: Add Custom Domain
1. **Domains** → **Add domain**
2. Enter your domain
3. **Configure DNS** as instructed

## 🔧 DNS Configuration Guide

### Common DNS Providers:

#### GoDaddy:
1. **DNS Management**
2. **Add/Edit Records**
3. **Save changes**

#### Namecheap:
1. **Advanced DNS**
2. **Add New Record**
3. **Save All Changes**

#### Cloudflare:
1. **DNS** tab
2. **Add record**
3. **Save**

### DNS Record Types:

#### A Record (for apex domain):
```
Type: A
Name: @
Value: [IP Address]
TTL: 3600
```

#### CNAME Record (for subdomain):
```
Type: CNAME
Name: www
Value: [target domain]
TTL: 3600
```

## ⚡ Quick Setup Commands

### For GitHub Pages:
```bash
# Push the workflow
git add .
git commit -m "Add GitHub Pages deployment"
git push

# Your site will be available at:
# https://AbdullahAlMuti.github.io/ebay-linkr
```

### For Netlify:
```bash
# No commands needed - just connect GitHub repo
# Your site will be available at:
# https://your-site-name.netlify.app
```

## 🎯 Recommendation

**For your React + Supabase app, I recommend Netlify because:**
- ✅ Easier environment variable management
- ✅ Better performance for React apps
- ✅ Automatic deployments
- ✅ Free custom domain
- ✅ Built-in CDN

**GitHub Pages is great for:**
- ✅ Free hosting
- ✅ Simple static sites
- ✅ Learning purposes

## 📞 Need Help?

1. **GitHub Pages**: https://docs.github.com/en/pages
2. **Netlify**: https://docs.netlify.com
3. **Vercel**: https://vercel.com/docs
4. **DNS Help**: Contact your domain registrar

Choose the option that works best for you!
