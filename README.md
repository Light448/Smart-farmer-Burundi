# 🌱 Smart Farmer Burundi

AI-powered agriculture app for Burundi: crop doctor, soil advisor, crop recommendations by region, and farmer marketplace.

## Run locally

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Create `.env.local` and set your Gemini API key:
   ```
   GEMINI_API_KEY=your_key_here
   ```
3. Start the app: `npm run dev`  
   Open http://localhost:3000

## Push to GitHub

Run these in **PowerShell** from the project folder:

```powershell
cd C:\Users\user.DESKTOP-OMQ89VA\Downloads\smart-farmer-burundi
git add .
git status
git commit -m "Smart Farmer Burundi - ready for deploy"
git push origin main
```

If the repo is new or you haven’t added the remote yet:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/smart-farmer-burundi.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Deploy for free (Vercel or Netlify)

The app is a static Vite build. Host it for free on **Vercel** or **Netlify**.

### Option A: Vercel (recommended)

1. Push your code to GitHub (see above).
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New** → **Project** and import your `smart-farmer-burundi` repo.
4. Before or right after first deploy, go to **Settings** → **Environment Variables** and add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key (same as in `.env.local`)
5. Click **Deploy**. Your app will be live at `https://your-project.vercel.app`.

### Option B: Netlify

1. Push your code to GitHub.
2. Go to [netlify.com](https://netlify.com) and sign in with GitHub.
3. Click **Add new site** → **Import an existing project** and choose your repo.
4. Build settings are in `netlify.toml`. In **Site settings** → **Environment variables** add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key
5. Click **Deploy site**. Your app will be at `https://something.netlify.app`.

**Important:** Set `GEMINI_API_KEY` on the host so the app can use the Gemini API. Do not commit `.env.local` (it’s in `.gitignore`).
