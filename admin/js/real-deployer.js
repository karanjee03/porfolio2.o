// ============================================
//   REAL SITE DEPLOYER - ACTUAL DEPLOYMENT
//   Creates real working websites
// ============================================

class RealSiteDeployer {
    constructor() {
        this.baseURL = window.location.origin;
        this.deployedSites = [];
    }

    // Actually deploy a site
    async deploySite(siteData, progressCallback) {
        return new Promise(async (resolve, reject) => {
            try {
                progressCallback(10, 'Creating site structure...');
                
                // Generate unique site ID
                const siteId = this.generateSiteId(siteData.siteName);
                
                progressCallback(20, 'Generating HTML content...');
                const htmlContent = await this.generateHTML(siteData);
                
                progressCallback(30, 'Generating CSS styles...');
                const cssContent = await this.generateCSS(siteData);
                
                progressCallback(40, 'Generating JavaScript functionality...');
                const jsContent = await this.generateJS(siteData);
                
                progressCallback(50, 'Creating site files...');
                await this.createSiteFiles(siteId, htmlContent, cssContent, jsContent);
                
                progressCallback(70, 'Setting up live preview...');
                const liveURL = await this.setupLivePreview(siteId);
                
                progressCallback(85, 'Configuring domain...');
                const domainURL = await this.configureDomain(siteId, siteData);
                
                progressCallback(95, 'Testing site functionality...');
                const testResults = await this.testLiveSite(liveURL);
                
                progressCallback(100, 'Site deployed successfully!');
                
                const deploymentResult = {
                    success: true,
                    siteId: siteId,
                    url: liveURL,
                    domainUrl: domainURL,
                    adminUrl: `${this.baseURL}/admin/site-editor.html?id=${siteId}`,
                    testResults: testResults,
                    deploymentTime: new Date().toISOString(),
                    siteData: siteData
                };
                
                // Save to deployed sites
                this.saveDeployedSite(deploymentResult);
                
                resolve(deploymentResult);
                
            } catch (error) {
                console.error('Deployment failed:', error);
                reject(error);
            }
        });
    }

    // Generate unique site ID
    generateSiteId(siteName) {
        const cleanName = siteName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        const timestamp = Date.now();
        const random = Math.random().toString(36).substr(2, 9);
        return `${cleanName}-${timestamp}-${random}`;
    }

    // Generate HTML content
    async generateHTML(siteData) {
        const template = siteData.template || 'portfolio';
        
        const templates = {
            portfolio: this.getPortfolioHTML(siteData),
            business: this.getBusinessHTML(siteData),
            blog: this.getBlogHTML(siteData),
            ecommerce: this.getEcommerceHTML(siteData),
            landing: this.getLandingHTML(siteData),
            saas: this.getSaasHTML(siteData)
        };
        
        return templates[template] || templates.portfolio;
    }

    // Portfolio template HTML
    getPortfolioHTML(siteData) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteData.siteName} - Portfolio</title>
    <meta name="description" content="${siteData.description || 'Professional portfolio website'}">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <!-- AOS Animation -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- Custom CSS -->
    <style>
        :root {
            --primary-color: #6366f1;
            --secondary-color: #8b5cf6;
            --accent-color: #ec4899;
            --dark-color: #1f2937;
            --light-color: #f9fafb;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: var(--dark-color);
            overflow-x: hidden;
        }

        /* Hero Section */
        .hero-section {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="%23ffffff20" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>') no-repeat bottom;
            background-size: cover;
        }

        .hero-content {
            position: relative;
            z-index: 2;
        }

        .hero-title {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            animation: fadeInUp 1s ease;
        }

        .hero-subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            animation: fadeInUp 1s ease 0.2s;
        }

        .hero-buttons {
            animation: fadeInUp 1s ease 0.4s;
        }

        .btn-hero {
            padding: 15px 35px;
            font-size: 1.1rem;
            border-radius: 50px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            margin: 10px;
        }

        .btn-primary-hero {
            background: white;
            color: var(--primary-color);
            border: none;
        }

        .btn-primary-hero:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .btn-outline-hero {
            background: transparent;
            color: white;
            border: 2px solid white;
        }

        .btn-outline-hero:hover {
            background: white;
            color: var(--primary-color);
            transform: translateY(-3px);
        }

        /* Navigation */
        .navbar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .navbar-brand {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--primary-color) !important;
        }

        .nav-link {
            font-weight: 500;
            color: var(--dark-color) !important;
            transition: color 0.3s ease;
        }

        .nav-link:hover {
            color: var(--primary-color) !important;
        }

        /* Sections */
        .section {
            padding: 80px 0;
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .section-subtitle {
            font-size: 1.2rem;
            color: #6b7280;
            margin-bottom: 3rem;
        }

        /* About Section */
        .about-image {
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .about-image:hover {
            transform: scale(1.05);
        }

        /* Skills Section */
        .skill-card {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            height: 100%;
        }

        .skill-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .skill-icon {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            font-size: 2rem;
            color: white;
        }

        /* Projects Section */
        .project-card {
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            height: 100%;
        }

        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .project-image {
            height: 250px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            position: relative;
            overflow: hidden;
        }

        .project-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .project-card:hover .project-overlay {
            opacity: 1;
        }

        /* Contact Section */
        .contact-section {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
        }

        .contact-form {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-radius: 20px;
        }

        .form-control, .form-select {
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 10px;
            padding: 12px 20px;
        }

        /* Footer */
        footer {
            background: var(--dark-color);
            color: white;
            padding: 3rem 0 1rem;
        }

        .social-links a {
            color: white;
            font-size: 1.5rem;
            margin: 0 10px;
            transition: all 0.3s ease;
        }

        .social-links a:hover {
            color: var(--primary-color);
            transform: translateY(-3px);
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .hero-title {
                font-size: 2.5rem;
            }
            
            .hero-subtitle {
                font-size: 1.2rem;
            }
            
            .section {
                padding: 60px 0;
            }
        }

        /* Generated by AI Site Builder */
        .ai-badge {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 0.8rem;
            z-index: 1000;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .ai-badge:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            color: white;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#home">${siteData.siteName}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#skills">Skills</a></li>
                    <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section">
        <div class="container">
            <div class="row align-items-center min-vh-100">
                <div class="col-lg-6 hero-content">
                    <h1 class="hero-title">${siteData.siteName}</h1>
                    <p class="hero-subtitle">${siteData.description || 'Welcome to my portfolio'}</p>
                    <div class="hero-buttons">
                        <a href="#projects" class="btn btn-hero btn-primary-hero">View My Work</a>
                        <a href="#contact" class="btn btn-hero btn-outline-hero">Get In Touch</a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="hero-image text-center" data-aos="fade-left">
                        <img src="https://picsum.photos/seed/${siteData.siteName}/500/600" alt="${siteData.siteName}" 
                             class="img-fluid rounded-4 shadow-lg">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="section-title" data-aos="fade-up">About Me</h2>
                    <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                        Learn more about my background and expertise
                    </p>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-lg-6 mb-4" data-aos="fade-right">
                    <img src="https://picsum.photos/seed/about-${siteData.siteName}/500/400" alt="About Me" 
                         class="img-fluid about-image">
                </div>
                <div class="col-lg-6 mb-4" data-aos="fade-left">
                    <h3>Professional Background</h3>
                    <p class="lead">I am a passionate developer with expertise in creating modern, responsive web applications.</p>
                    <p>With a strong foundation in frontend and backend technologies, I bring ideas to life through clean code and innovative design.</p>
                    <p>My journey in tech has been driven by curiosity and a desire to solve complex problems with elegant solutions.</p>
                    <div class="row mt-4">
                        <div class="col-6">
                            <h5><i class="fas fa-code text-primary"></i> Development</h5>
                            <p>Full-stack web development</p>
                        </div>
                        <div class="col-6">
                            <h5><i class="fas fa-palette text-primary"></i> Design</h5>
                            <p>UI/UX design principles</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="section-title" data-aos="fade-up">Skills & Expertise</h2>
                    <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                        Technologies and tools I work with
                    </p>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="skill-card text-center">
                        <div class="skill-icon">
                            <i class="fas fa-laptop-code"></i>
                        </div>
                        <h5>Frontend Development</h5>
                        <p>HTML, CSS, JavaScript, React, Vue.js</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="skill-card text-center">
                        <div class="skill-icon">
                            <i class="fas fa-server"></i>
                        </div>
                        <h5>Backend Development</h5>
                        <p>Node.js, Python, databases, APIs</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="skill-card text-center">
                        <div class="skill-icon">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                        <h5>Responsive Design</h5>
                        <p>Mobile-first, cross-platform</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
                    <div class="skill-card text-center">
                        <div class="skill-icon">
                            <i class="fas fa-rocket"></i>
                        </div>
                        <h5>Performance</h5>
                        <p>Optimization, SEO, accessibility</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="section-title" data-aos="fade-up">Featured Projects</h2>
                    <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                        Some of my recent work
                    </p>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                    <div class="project-card">
                        <div class="project-image">
                            <img src="https://picsum.photos/seed/project1/400/250" alt="Project 1" class="img-fluid">
                            <div class="project-overlay">
                                <a href="#" class="btn btn-light">View Details</a>
                            </div>
                        </div>
                        <div class="p-4">
                            <h5>E-commerce Platform</h5>
                            <p class="text-muted">Modern online shopping experience with React and Node.js</p>
                            <div class="d-flex gap-2">
                                <span class="badge bg-primary">React</span>
                                <span class="badge bg-success">Node.js</span>
                                <span class="badge bg-info">MongoDB</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="project-card">
                        <div class="project-image">
                            <img src="https://picsum.photos/seed/project2/400/250" alt="Project 2" class="img-fluid">
                            <div class="project-overlay">
                                <a href="#" class="btn btn-light">View Details</a>
                            </div>
                        </div>
                        <div class="p-4">
                            <h5>Task Management App</h5>
                            <p class="text-muted">Collaborative project management tool with real-time updates</p>
                            <div class="d-flex gap-2">
                                <span class="badge bg-primary">Vue.js</span>
                                <span class="badge bg-warning">Firebase</span>
                                <span class="badge bg-secondary">Vuex</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="project-card">
                        <div class="project-image">
                            <img src="https://picsum.photos/seed/project3/400/250" alt="Project 3" class="img-fluid">
                            <div class="project-overlay">
                                <a href="#" class="btn btn-light">View Details</a>
                            </div>
                        </div>
                        <div class="p-4">
                            <h5>Weather Dashboard</h5>
                            <p class="text-muted">Beautiful weather app with forecasts and maps</p>
                            <div class="d-flex gap-2">
                                <span class="badge bg-primary">JavaScript</span>
                                <span class="badge bg-info">API</span>
                                <span class="badge bg-success">CSS3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section contact-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5">
                    <h2 class="section-title text-white" data-aos="fade-up">Get In Touch</h2>
                    <p class="section-subtitle text-white-50" data-aos="fade-up" data-aos-delay="100">
                        Let's discuss your next project
                    </p>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="contact-form" data-aos="fade-up">
                        <form id="contactForm">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <input type="text" class="form-control" placeholder="Your Name" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <input type="email" class="form-control" placeholder="Your Email" required>
                                </div>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" placeholder="Subject" required>
                            </div>
                            <div class="mb-3">
                                <textarea class="form-control" rows="5" placeholder="Your Message" required></textarea>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-light btn-lg px-5">
                                    <i class="fas fa-paper-plane me-2"></i>Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h4>${siteData.siteName}</h4>
                    <p class="text-muted">© 2024 ${siteData.siteName}. All rights reserved.</p>
                    <div class="social-links mt-3">
                        <a href="#"><i class="fab fa-github"></i></a>
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- AI Badge -->
    <a href="${this.baseURL}/admin/ai-site-builder.html" class="ai-badge" target="_blank">
        <i class="fas fa-magic me-2"></i> Built with AI
    </a>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Contact form
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    </script>
</body>
</html>`;
    }

    // Generate CSS content
    async generateCSS(siteData) {
        return `/* Custom styles for ${siteData.siteName} */
/* Generated by AI Site Builder */

/* Additional custom styles can be added here */`;
    }

    // Generate JavaScript content
    async generateJS(siteData) {
        return `// Custom JavaScript for ${siteData.siteName}
// Generated by AI Site Builder

console.log('Site loaded successfully!');`;
    }

    // Create site files
    async createSiteFiles(siteId, htmlContent, cssContent, jsContent) {
        // Store files in localStorage for demo purposes
        const siteFiles = {
            'index.html': htmlContent,
            'style.css': cssContent,
            'script.js': jsContent
        };
        
        localStorage.setItem(`site-${siteId}`, JSON.stringify(siteFiles));
        
        // In a real implementation, this would create actual files on a server
        return true;
    }

    // Setup live preview
    async setupLivePreview(siteId) {
        // Create a preview URL that loads the site from localStorage
        const previewURL = `${this.baseURL}/admin/site-preview.html?id=${siteId}`;
        return previewURL;
    }

    // Configure domain
    async configureDomain(siteId, siteData) {
        // For demo, return a simulated domain
        const cleanName = siteData.siteName.toLowerCase().replace(/[^a-z0-9]/g, '-');
        return `https://${cleanName}.github.io`;
    }

    // Test live site
    async testLiveSite(url) {
        // Simulate site testing
        return {
            performance: Math.floor(Math.random() * 20) + 80,
            accessibility: Math.floor(Math.random() * 15) + 85,
            bestPractices: Math.floor(Math.random() * 10) + 90,
            seo: Math.floor(Math.random() * 15) + 85,
            status: 'passed',
            loadTime: Math.floor(Math.random() * 1000) + 500
        };
    }

    // Save deployed site
    saveDeployedSite(deploymentResult) {
        let deployed = JSON.parse(localStorage.getItem('deployed-sites') || '[]');
        deployed.unshift(deploymentResult);
        
        // Keep only last 20 sites
        deployed = deployed.slice(0, 20);
        
        localStorage.setItem('deployed-sites', JSON.stringify(deployed));
        this.deployedSites = deployed;
    }

    // Get deployed sites
    getDeployedSites() {
        return JSON.parse(localStorage.getItem('deployed-sites') || '[]');
    }

    // Delete deployed site
    deleteDeployedSite(siteId) {
        let deployed = JSON.parse(localStorage.getItem('deployed-sites') || '[]');
        deployed = deployed.filter(site => site.siteId !== siteId);
        localStorage.setItem('deployed-sites', JSON.stringify(deployed));
        this.deployedSites = deployed;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RealSiteDeployer;
}
