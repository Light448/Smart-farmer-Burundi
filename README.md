<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1l_to8OTqdvdGZQM0htPBhAQefbp-txut

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy for free

The app is a static Vite build. You can host it for free on **Vercel** or **Netlify**.

### Option A: Vercel (recommended)

1. Push your code to **GitHub** (create a repo and push).
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New** → **Project** and import your `smart-farmer-burundi` repo.
4. Before deploying, open **Settings** → **Environment Variables** and add:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key (same as in `.env.local`)
5. Click **Deploy**. Vercel will run `npm run build` and host the `dist` folder. Your app will be live at a `*.vercel.app` URL.

### Option B: Netlify

1. Push your code to **GitHub**.
2. Go to [netlify.com](https://netlify.com) and sign in with GitHub.
3. Click **Add new site** → **Import an existing project** and choose your repo.
4. Build settings are pre-filled by `netlify.toml`. Under **Site settings** → **Environment variables** add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key
5. Click **Deploy site**. Your app will be live at a `*.netlify.app` URL.

**Important:** Set `GEMINI_API_KEY` in the host’s environment variables so the built app can call the Gemini API. Don’t commit `.env.local` (it’s in `.gitignore`).
