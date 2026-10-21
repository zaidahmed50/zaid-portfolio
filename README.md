# 🚀 Modern Professional Single-Page Portfolio

An ultra-modern, responsive, and performance-optimized single-page portfolio website built with clean HTML5, CSS3, and Vanilla JavaScript. Ready for instant 1-click deployment to **Vercel**.

---

## ✨ Features

- 🌓 **Dark & Light Mode Switcher**: Smooth transitions with preference saved in `localStorage`.
- ⌨️ **Dynamic Typing Animation**: Eye-catching animated role headlines.
- 🔮 **Modern Glassmorphism & Ambient Glow**: Premium visual aesthetics and subtle float animations.
- 📱 **100% Mobile Responsive**: Seamless across smartphones, tablets, laptops, and wide screens.
- 🎯 **Interactive Filterable Projects**: Filter projects smoothly by category (Web Apps, Full Stack, UI/UX).
- 📈 **Animated Statistics Counter**: Triggers on viewport scroll.
- 📬 **Interactive Contact Form**: With live client-side validation and toast notifications.
- ⚡ **SEO & Performance Ready**: Semantic tags, Open Graph meta headers, and optimized CSS/JS.

---

## 📁 Project Structure

```text
Portfolio/
├── index.html        # Main single-page HTML layout & structure
├── style.css         # Modern CSS tokens, dark/light themes, animations
├── script.js         # Interactive features, typing effect, theme logic
├── vercel.json       # Vercel deployment optimizations & headers
└── README.md         # Documentation & deployment guide
```

---

## 🌐 How to Deploy to Vercel (Free & Instant)

### Option 1: Via GitHub (Recommended)
1. Initialize git and push this repository to your GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   # Create a repo on GitHub, then link & push:
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
3. Click **"Add New..."** -> **"Project"**.
4. Select your newly pushed repository and click **"Deploy"**.
5. Your website is live in seconds with an SSL-secured `https://your-portfolio.vercel.app` domain!

---

### Option 2: Using Vercel CLI Directly
1. Install Vercel CLI globally (if not already installed):
   ```bash
   npm i -g vercel
   ```
2. In this project folder, run:
   ```bash
   vercel
   ```
3. Follow the prompts on your terminal, and your site will be live instantly!

---

## 🛠️ How to Customize

- **Change Name & Bio**: Open [index.html](file:///c:/Users/iboothme/Desktop/Portfolio/index.html) and update the text in `<section class="hero">` and `<section class="about">`.
- **Add Your Projects**: Replace project titles, descriptions, and URLs in the `<section class="projects">` container.
- **Link Your Resume (CV)**: Put your `resume.pdf` into this directory and link it directly in the download button (`href="resume.pdf" download`).
- **Update Contact Information**: Replace emails, phone numbers, and social links in the contact and footer sections.
