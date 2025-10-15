# Local Development → Hostinger Deployment Workflow

## 🔄 Development Workflow Options

### Option 1: Manual Deployment (Current Setup)

**Workflow:**
1. Make changes locally
2. Run `deploy-to-hostinger.bat`
3. Upload `hostinger-deploy` folder to Hostinger
4. Changes go live

**Pros:** Simple, works with any hosting
**Cons:** Manual upload required

### Option 2: Git + Hostinger Integration

**Setup:**
1. Push code to GitHub
2. Use Hostinger's Git integration (if available)
3. Automatic deployment on push

**Pros:** Automatic deployment
**Cons:** Limited Git integration on Hostinger

### Option 3: FTP/SFTP Automation

**Setup:**
1. Use FTP client with sync feature
2. Automatically upload changes
3. Real-time deployment

**Pros:** Near real-time updates
**Cons:** Requires FTP setup

### Option 4: CI/CD Pipeline

**Setup:**
1. GitHub Actions
2. Automatic build and deploy
3. Professional workflow

**Pros:** Professional, automated
**Cons:** More complex setup

## 🚀 Recommended: Hybrid Approach

### For Development:
1. **Local Development Server**
   ```bash
   npm run dev
   ```
   - Make changes
   - See live updates at `http://localhost:8080`

2. **Quick Deploy Script**
   ```bash
   deploy-to-hostinger.bat
   ```
   - Builds and prepares files
   - Opens deployment folder

3. **Upload to Hostinger**
   - Drag files to hPanel File Manager
   - Or use FTP client

### For Production:
- Use Netlify (automatic Git deployment)
- Or Vercel (automatic Git deployment)
- Much easier than Hostinger!

## 📝 Development Tips

### 1. Environment Variables
Create `.env.local` for development:
```env
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_PUBLISHABLE_KEY=your-dev-key
```

### 2. Hot Reload
```bash
npm run dev
```
- Changes reflect immediately
- No need to rebuild constantly

### 3. Build Optimization
```bash
npm run build
```
- Only run when ready to deploy
- Check build output for errors

### 4. Version Control
```bash
git add .
git commit -m "Update feature X"
git push
```
- Track all changes
- Easy rollback if needed

## 🔧 Advanced: Automated Deployment

### GitHub Actions (Professional)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Hostinger
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build
    - name: Deploy to Hostinger
      uses: SamKirkland/FTP-Deploy-Action@4.0.0
      with:
        server: your-hostinger-ftp-server
        username: your-username
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: dist/
        server-dir: public_html/
```

### FTP Sync Script
Create `sync-to-hostinger.js`:
```javascript
const ftp = require('basic-ftp');
const fs = require('fs');

async function deploy() {
    const client = new ftp.Client();
    try {
        await client.access({
            host: 'your-hostinger-ftp.com',
            user: 'your-username',
            password: 'your-password'
        });
        
        await client.uploadFromDir('dist', '/public_html');
        console.log('Deployment complete!');
    } catch (err) {
        console.error('Deployment failed:', err);
    }
    client.close();
}

deploy();
```

## 🎯 Best Practice Recommendation

**For Learning/Personal Projects:**
- Use the manual script approach
- Learn the deployment process
- Understand how builds work

**For Production/Professional:**
- Switch to Netlify or Vercel
- Automatic Git deployment
- Better performance and features
- Free custom domains

## 📞 Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
deploy-to-hostinger.bat # Prepare for deployment

# Git workflow
git add .               # Stage changes
git commit -m "Update"  # Commit changes
git push                # Push to GitHub
```

The key is finding the right balance between development speed and deployment convenience!
