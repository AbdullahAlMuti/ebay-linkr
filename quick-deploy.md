# 🚀 Quick Local → Hostinger Deployment

## Your Current Workflow

### 1. Make Changes Locally
```bash
# Start development server
npm run dev
```
- Edit files in `src/` folder
- See changes instantly at `http://localhost:8080`
- Test everything works

### 2. Deploy to Hostinger
```bash
# Run the deployment script
deploy-to-hostinger.bat
```
This script will:
- ✅ Install dependencies
- ✅ Build production version
- ✅ Create `hostinger-deploy` folder
- ✅ Open folder for easy upload

### 3. Upload to Hostinger
1. Go to Hostinger hPanel
2. File Manager → `public_html`
3. Upload contents of `hostinger-deploy` folder
4. Your changes are live!

## 🔄 Complete Development Cycle

```bash
# 1. Development
npm run dev                    # Start dev server
# Make changes to your code
# Test at localhost:8080

# 2. Deploy
deploy-to-hostinger.bat        # Build and prepare
# Upload to Hostinger

# 3. Version Control (Optional)
git add .                      # Stage changes
git commit -m "Update feature" # Commit changes
git push                       # Push to GitHub
```

## ⚡ Pro Tips

### Fast Development
- Keep `npm run dev` running
- Make changes and see them instantly
- Only run `deploy-to-hostinger.bat` when ready to go live

### Environment Variables
- For development: Create `.env.local`
- For production: Hardcode in `client.ts` or use Hostinger's env vars

### Testing Before Deploy
- Always test locally first
- Check browser console for errors
- Verify all features work

## 🎯 Alternative: Switch to Netlify

For automatic deployment:
1. Push code to GitHub
2. Connect to Netlify
3. Every push = automatic deployment
4. No manual uploads needed!

**Current workflow is perfect for learning, but Netlify is better for production!**
