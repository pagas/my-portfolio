# Modern Portfolio Website

A beautiful, responsive portfolio website built with the latest web technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 🎨 Customization

### Update Your Information

1. **Personal Details** - Edit these files:
   - `src/components/hero.tsx` - Name, title, description, and social links
   - `src/components/about.tsx` - About section, skills, and technologies
   - `src/components/contact.tsx` - Email and location
   - `src/components/footer.tsx` - Footer text
   - `src/app/layout.tsx` - Meta tags and SEO

### Add Your Projects

Edit `src/components/projects.tsx`:
- Update the `projects` array with your actual projects
- Replace placeholder images with real project images (add to `/public` folder)
- Update GitHub and live demo links

### Customize Colors

The portfolio uses a blue-to-purple gradient theme. To change colors:
- Edit gradient classes in components (search for `from-blue-600 to-purple-600`)
- Modify CSS variables in `src/app/globals.css`

### Add More Sections

Create new components in `src/components/` and import them into `src/app/page.tsx`.

## 📱 Sections

- **Navigation** - Sticky navbar with smooth scroll
- **Hero** - Eye-catching introduction with animations
- **About** - Personal information, skills, and technologies
- **Projects** - Showcase of your work with links
- **Contact** - Contact form and information
- **Footer** - Social links and copyright

## 🎭 Features

- ✅ Fully responsive design
- ✅ Dark mode support (automatic based on system preference)
- ✅ Smooth scroll animations
- ✅ Mobile-friendly navigation
- ✅ SEO optimized
- ✅ Performance optimized with Next.js
- ✅ Type-safe with TypeScript
- ✅ Modern UI with Tailwind CSS 4

## 📦 Build for Production

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Options

- **Netlify**: Connect your Git repository
- **Cloudflare Pages**: Connect your Git repository
- **Self-hosted**: Build and serve the `.next` folder

## 📄 Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with metadata
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── navigation.tsx   # Navigation component
│   │   ├── hero.tsx         # Hero section
│   │   ├── about.tsx        # About section
│   │   ├── projects.tsx     # Projects section
│   │   ├── contact.tsx      # Contact section
│   │   └── footer.tsx       # Footer component
│   └── lib/
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
└── package.json
```

## 🎨 Adding shadcn/ui Components

```bash
# Add a button component
pnpm dlx shadcn@latest add button

# Add a card component
pnpm dlx shadcn@latest add card
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Support

If you have questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Framer Motion
