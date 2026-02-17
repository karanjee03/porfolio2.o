# Karan Jee — Portfolio Website

A modern, dark-themed personal portfolio website for Karan Jee, Web Developer.

## 📁 Folder Structure

```
karan-portfolio/
│
├── index.html              ← Homepage (Hero, About, Skills, Experience, Projects, Education)
│
├── pages/
│   ├── about.html          ← Full About page with timeline & values
│   ├── projects.html       ← All projects with filter functionality
│   ├── skills.html         ← Skills with animated progress bars
│   └── contact.html        ← Contact form + social links
│
├── css/
│   ├── style.css           ← Global styles, variables, reset, layout
│   ├── nav.css             ← Navigation styles (desktop + mobile)
│   └── components.css      ← Reusable components (cards, tags, footer, forms)
│
├── js/
│   ├── main.js             ← Scroll reveal, nav, cursor glow, typed effect
│   └── animations.js       ← Parallax, counters, scroll progress bar
│
├── scss/
│   ├── main.scss           ← Main SASS file
│   ├── _variables.scss     ← Colors, fonts, spacing
│   ├── _base.scss          ← Reset and typography
│   ├── _components.scss    ← Reusable components
│   ├── _navigation.scss    ← Navigation and footer
│   ├── _hero.scss          ← Hero section styles
│   ├── _images.scss        ← Image styling and gallery
│   └── _responsive.scss    ← Media queries
│
├── assets/
│   ├── images/             ← Profile photos, project screenshots, backgrounds
│   │   ├── backgrounds/    ← Hero and section backgrounds
│   │   ├── personal/       ← Large personal photos
│   │   ├── projects/       ← Project screenshots
│   │   ├── logos/          ← Company and university logos
│   │   └── tech/           ← Technology stack icons
│   └── icons/              ← Favicon and any icon assets
│
├── package.json            ← Node.js dependencies and scripts
├── .gitignore              ← Git ignore file
└── README.md               ← This file
```

## 🚀 Getting Started

### With Node.js (Recommended)
```bash
# Install dependencies
npm install

# Compile SASS
npm run build

# Watch for changes (development)
npm run dev
```

### Without Node.js
Simply open `index.html` in your browser — the compiled CSS is already included!

## 🎨 Features

### ✨ Modern Technologies
- **SASS/SCSS** for maintainable styling
- **Bootstrap 5** for responsive components
- **jQuery** for enhanced interactions
- **Modern fonts**: Inter, Poppins, DM Mono
- **Responsive design** for all devices

### 🖼️ Rich Visual Elements
- **Animated backgrounds** with parallax effects
- **Professional images**: Profile, workspace, coding sessions
- **Project screenshots** with hover effects
- **Tech stack icons** for visual appeal
- **Lightbox gallery** for image viewing

### 🎯 Interactive Features
- **Smooth scrolling** navigation
- **Scroll reveal animations**
- **Counter animations** for statistics
- **Mobile menu** with hamburger
- **Form validation** with Bootstrap
- **Dynamic navbar** on scroll

## 🎨 Customization

1. **Personal info**: Update name, bio, links in each HTML file
2. **Colors**: Change SASS variables in `scss/_variables.scss`
3. **Profile photo**: Replace images in `assets/images/personal/`
4. **Projects**: Add more project cards with screenshots
5. **Contact**: Replace placeholder email, GitHub, and LinkedIn URLs
6. **Backgrounds**: Modify SVG files in `assets/images/backgrounds/`

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with all sections |
| About | `pages/about.html` | Deep dive with timeline & values |
| Projects | `pages/projects.html` | All projects with tag filter |
| Skills | `pages/skills.html` | Animated skill bars & toolbox |
| Contact | `pages/contact.html` | Contact form + social links |

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (SASS), JavaScript (ES6+)
- **Frameworks**: Bootstrap 5, jQuery 3.7
- **Build Tools**: Node.js, SASS compiler
- **Fonts**: Google Fonts (Inter, Poppins, DM Mono)
- **Icons**: Custom SVG icons and tech logos
- **Animations**: CSS animations, JavaScript Intersection Observer

## 📬 Contact

- Email: karan@example.com
- GitHub: github.com/karanjee03
- LinkedIn: linkedin.com/in/username

## 🌐 Live Demo

**Portfolio Live Link**: https://karanjee03.github.io/porfolio2.o/

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
