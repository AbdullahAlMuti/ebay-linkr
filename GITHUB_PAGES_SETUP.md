# GitHub Pages + Custom Domain Setup

## 🚀 Deploy Your App to GitHub Pages with Custom Domain

### Step 1: Enable GitHub Pages

1. **Go to your repository**: https://github.com/AbdullahAlMuti/ebay-linkr
2. **Click "Settings"** tab
3. **Scroll to "Pages"** section (left sidebar)
4. **Source**: Select "GitHub Actions"
5. **Save**

### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.VITE_SUPABASE_PUBLISHABLE_KEY }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Step 3: Add Environment Variables

1. **Go to repository Settings**
2. **Secrets and variables** → **Actions**
3. **New repository secret**:
   - Name: `VITE_SUPABASE_URL`
   - Value: Your Supabase project URL
4. **New repository secret**:
   - Name: `VITE_SUPABASE_PUBLISHABLE_KEY`
   - Value: Your Supabase anon key

### Step 4: Add Custom Domain

1. **In repository Settings** → **Pages**
2. **Custom domain**: Enter your domain (e.g., `yourdomain.com`)
3. **Enforce HTTPS**: Check this box
4. **Save**

### Step 5: Configure DNS

#### Option A: Apex Domain (yourdomain.com)

Add these DNS records:
```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

#### Option B: Subdomain (www.yourdomain.com)

Add these DNS records:
```
Type: CNAME
Name: www
Value: AbdullahAlMuti.github.io
```

### Step 6: Create CNAME File

Create `public/CNAME` file:
```
yourdomain.com
```

## 🎯 Benefits of GitHub Pages:

- ✅ **Free hosting**
- ✅ **Custom domain support**
- ✅ **Automatic HTTPS**
- ✅ **CDN included**
- ✅ **Automatic deployments**
- ✅ **No server management**

## ⚠️ Limitations:

- ❌ **No server-side code**
- ❌ **No environment variables** (use secrets)
- ❌ **Build time limits**
- ❌ **Static sites only**

## 🔧 Troubleshooting:

### Build Failures:
- Check Actions tab for error logs
- Verify environment variables are set
- Ensure build command works locally

### Domain Not Working:
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify CNAME file exists

### HTTPS Issues:
- Enable "Enforce HTTPS" in Pages settings
- Wait for certificate provisioning
- Check domain verification

## 📞 Support:

- **GitHub Pages Docs**: https://docs.github.com/en/pages
- **Actions Docs**: https://docs.github.com/en/actions
- **Custom Domain Guide**: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
