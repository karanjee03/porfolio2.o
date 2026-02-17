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
├── assets/
│   ├── images/             ← Place profile photo and project screenshots here
│   └── icons/              ← Favicon and any icon assets
│
└── README.md               ← This file
```

## 🚀 Getting Started

Simply open `index.html` in your browser — no build step needed!

## 🎨 Customization

1. **Personal info**: Update name, bio, links in each HTML file
2. **Colors**: Change CSS variables in `css/style.css` (`:root` block)
3. **Profile photo**: Add your image to `assets/images/` and reference it in `about.html`
4. **Projects**: Add more project cards in `pages/projects.html`
5. **Contact**: Replace placeholder email, GitHub, and LinkedIn URLs throughout

## 📄 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with all sections |
| About | `pages/about.html` | Deep dive with timeline & values |
| Projects | `pages/projects.html` | All projects with tag filter |
| Skills | `pages/skills.html` | Animated skill bars & toolbox |
| Contact | `pages/contact.html` | Contact form + social links |

## 🛠️ Tech Used

- Pure HTML5, CSS3, JavaScript (no frameworks needed)
- Google Fonts: Syne + DM Mono
- CSS custom properties & animations
- Intersection Observer API (scroll effects)

## 📬 Contact

- Email: karan@example.com
- GitHub: github.com/username
- LinkedIn: linkedin.com/in/username
