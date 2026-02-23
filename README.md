# ◈ GlassForge v2.0

> **CSS Glassmorphism Generator** — Generate pixel-perfect glass UI components in real-time. Built with Next.js 14, Tailwind CSS, and React 18.

![GlassForge](https://img.shields.io/badge/GlassForge-v2.0-e4ff3c?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind](https://img.shields.io/badge/Tailwind-v3-38bdf8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- **16+ UI Components** — Cards, Buttons, Modals, Tooltips, Toasts, Dropdowns, Badges, Charts, Forms, Tables, Sidebar, Tabs, Navbar, Avatar, Progress, Sliders
- **Real-time Preview** — Every slider instantly updates the live preview
- **4 Export Formats** — CSS, Tailwind JIT, React style object, CSS Variables
- **7 Color Swatches** + custom color picker
- **7 Background Presets** for testing
- **8 Quick Presets** (Subtle, Frosted, Deep Ice, etc.)
- **Fully Responsive** — Optimized for PC, Tablet, and Mobile
- **Zero Dependencies** — No external CSS libraries

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- **Node.js** v18.17.0 or higher ([Download](https://nodejs.org))
- **npm** v9+ or **yarn** or **pnpm**

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/glassforge.git
cd glassforge
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 🌐 Deploy to Vercel

### Option A — One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/glassforge)

### Option B — Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

From inside the project directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → `Y`
- **Which scope?** → Select your account
- **Link to existing project?** → `N`
- **Project name?** → `glassforge` (or any name)
- **Directory?** → `./` (press Enter)
- **Override settings?** → `N`

#### Step 4: Deploy to Production

```bash
vercel --prod
```

Your app will be live at `https://glassforge-xxx.vercel.app` ✅

---

### Option C — GitHub + Vercel (Auto-deploy)

1. Push your code to a GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit — GlassForge v2.0"
git remote add origin https://github.com/yourusername/glassforge.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repository
4. Vercel auto-detects Next.js — click **Deploy**
5. ✅ Done! Every `git push` triggers auto-deploy.

---

## 📁 Project Structure

```
glassforge/
├── src/
│   ├── app/
│   │   ├── layout.jsx              # Root layout
│   │   ├── page.jsx                # Home page (component gallery)
│   │   └── customize/
│   │       └── [component]/
│   │           └── page.jsx        # Dynamic component customizer page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx          # Sticky responsive header + nav
│   │   │   └── Footer.jsx          # Footer with links
│   │   ├── ui/
│   │   │   ├── index.jsx           # Shared UI: Panel, Slider, Toggle, CodeBlock, etc.
│   │   │   └── ControlsPanel.jsx   # Left sidebar controls (sliders, swatches, presets)
│   │   └── customizers/
│   │       ├── CardCustomizer.jsx  # Card component preview + code
│   │       ├── ButtonCustomizer.jsx
│   │       ├── ModalCustomizer.jsx
│   │       └── OtherCustomizers.jsx # Toast, Tooltip, Dropdown, Badge, Form, Table...
│   ├── lib/
│   │   ├── glassState.js           # useGlassState hook, buildGlassStyle, buildCode
│   │   └── components.js           # Component registry (all 16 components)
│   └── styles/
│       └── globals.css             # Tailwind base + custom CSS vars + animations
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## 🎨 Customizable Properties

| Property | Range | Description |
|----------|-------|-------------|
| Blur | 0–60px | `backdrop-filter: blur()` |
| Opacity | 0–80% | Background transparency |
| Border Opacity | 0–80% | Border translucency |
| Border Radius | 0–60px | Corner rounding |
| Shadow Depth | 0–100% | Box shadow intensity |
| Saturation | 100–300% | `backdrop-filter: saturate()` |
| Brightness | 50–200% | `backdrop-filter: brightness()` |
| Tint Color | 8 presets + custom | RGB color of the glass tint |

---

## 🧩 Supported Components

| ID | Component | Description |
|----|-----------|-------------|
| `card` | Cards | Content containers |
| `button` | Buttons | Interactive CTAs |
| `modal` | Modals | Dialog overlays |
| `tooltip` | Tooltips | Hover hints |
| `toast` | Toasts | Notifications |
| `dropdown` | Dropdowns | Selection menus |
| `badge` | Badges | Status labels |
| `chart` | Charts | Data visualization |
| `form` | Forms | Input elements |
| `table` | Tables | Data tables |
| `sidebar` | Sidebar | Navigation pane |
| `tabs` | Tabs | Panel switcher |
| `navbar` | Navbar | Top navigation |
| `avatar` | Avatar | User profile |
| `progress` | Progress | Progress bars |
| `slider` | Slider | Range controls |

---

## 🔧 Environment Variables

No environment variables required for basic usage.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) (App Router)
- **UI**: [React 18](https://react.dev)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Font**: [Geist](https://vercel.com/font) by Vercel
- **Deployment**: [Vercel](https://vercel.com)

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, compact controls |
| Tablet | 640–1024px | 2-column grid, medium spacing |
| Desktop | > 1024px | Full sidebar + main content layout |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Commit changes: `git commit -m 'Add new component customizer'`
4. Push to branch: `git push origin feature/new-component`
5. Open a Pull Request

---

## 📄 License

MIT License — free for personal and commercial use.

---

**Made with ◈ by GlassForge** — [glassforge.vercel.app](https://glassforge.vercel.app)
