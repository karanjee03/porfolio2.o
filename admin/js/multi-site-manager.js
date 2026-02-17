// ============================================
//   MULTI-SITE MANAGER - ADVANCED JAVASCRIPT
// ============================================

// Global state
let sites = [];
let templates = [];
let currentFilter = 'all';
let sortBy = 'name';

// Initialize multi-site manager
$(document).ready(function() {
    initializeManager();
    loadSites();
    loadTemplates();
    setupEventListeners();
    updateStats();
    renderSitesGrid();
});

// Initialize manager
function initializeManager() {
    // Load data from localStorage
    const savedSites = localStorage.getItem('multi-sites');
    if (savedSites) {
        sites = JSON.parse(savedSites);
    } else {
        // Initialize with sample data
        initializeSampleData();
    }
}

// Load sites
function loadSites() {
    renderSitesGrid();
    updateStats();
}

// Load templates
function loadTemplates() {
    templates = [
        {
            id: 'portfolio',
            name: 'Portfolio',
            description: 'Personal portfolio website with projects, skills, and contact sections',
            icon: 'fa-user',
            color: '#6366f1',
            features: ['responsive', 'animations', 'contact-form', 'gallery'],
            technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap']
        },
        {
            id: 'business',
            name: 'Business',
            description: 'Professional business website with services and team sections',
            icon: 'fa-briefcase',
            color: '#10b981',
            features: ['responsive', 'testimonials', 'services', 'team'],
            technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap']
        },
        {
            id: 'blog',
            name: 'Blog',
            description: 'Modern blog platform with categories and comments',
            icon: 'fa-blog',
            color: '#f59e0b',
            features: ['responsive', 'markdown', 'categories', 'comments'],
            technologies: ['HTML', 'CSS', 'JavaScript', 'Markdown']
        },
        {
            id: 'ecommerce',
            name: 'E-commerce',
            description: 'Online store with product catalog and shopping cart',
            icon: 'fa-shopping-cart',
            color: '#ef4444',
            features: ['responsive', 'products', 'cart', 'checkout'],
            technologies: ['HTML', 'CSS', 'JavaScript', 'Stripe API']
        },
        {
            id: 'landing',
            name: 'Landing Page',
            description: 'High-converting landing page for products/services',
            icon: 'fa-rocket',
            color: '#8b5cf6',
            features: ['responsive', 'hero', 'testimonials', 'cta'],
            technologies: ['HTML', 'CSS', 'JavaScript']
        },
        {
            id: 'saas',
            name: 'SaaS Application',
            description: 'Software as a service application interface',
            icon: 'fa-cloud',
            color: '#3b82f6',
            features: ['responsive', 'dashboard', 'auth', 'api'],
            technologies: ['React', 'Node.js', 'MongoDB', 'API']
        }
    ];
}

// Initialize sample data
function initializeSampleData() {
    sites = [
        {
            id: 1,
            name: 'Portfolio Website',
            domain: 'karanjee03.github.io',
            template: 'portfolio',
            status: 'active',
            technology: 'react',
            platform: 'github-pages',
            visitors: 15234,
            performance: 95,
            lastDeploy: '2024-01-15T14:30:00Z',
            createdAt: '2024-01-01T00:00:00Z',
            features: ['analytics', 'seo', 'pwa'],
            repoUrl: 'https://github.com/karanjee03/porfolio2.o',
            description: 'Personal portfolio showcasing projects and skills'
        },
        {
            id: 2,
            name: 'Tech Blog',
            domain: 'blog.tech.example.com',
            template: 'blog',
            status: 'active',
            technology: 'nextjs',
            platform: 'vercel',
            visitors: 8921,
            performance: 88,
            lastDeploy: '2024-01-14T10:15:00Z',
            createdAt: '2024-01-05T00:00:00Z',
            features: ['analytics', 'seo', 'cms'],
            repoUrl: 'https://github.com/user/tech-blog',
            description: 'Technology blog with tutorials and articles'
        },
        {
            id: 3,
            name: 'E-commerce Store',
            domain: 'shop.example.com',
            template: 'ecommerce',
            status: 'pending',
            technology: 'react',
            platform: 'netlify',
            visitors: 5672,
            performance: 72,
            lastDeploy: '2024-01-13T18:45:00Z',
            createdAt: '2024-01-10T00:00:00Z',
            features: ['analytics', 'ecommerce', 'pwa'],
            repoUrl: 'https://github.com/user/ecommerce-store',
            description: 'Online store with modern shopping experience'
        }
    ];
    
    saveSites();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        
        const section = $(this).attr('href').substring(1);
        loadSection(section);
    });
    
    // Filter and sort
    $('#filterSelect, #sortSelect').on('change', function() {
        currentFilter = $('#filterSelect').val();
        sortBy = $('#sortSelect').val();
        renderSitesGrid();
    });
    
    // Search
    $('#searchInput').on('input', debounce(handleSearch, 300));
}

// Render sites grid
function renderSitesGrid() {
    const grid = $('#sitesGrid');
    grid.empty();
    
    let filteredSites = filterSites(sites);
    filteredSites = sortSites(filteredSites);
    
    if (filteredSites.length === 0) {
        grid.html(`
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-server fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">No sites found</h4>
                    <p class="text-muted">Create your first site to get started</p>
                    <button class="btn btn-primary" onclick="showCreateSiteModal()">
                        <i class="fas fa-plus"></i> Create Site
                    </button>
                </div>
            </div>
        `);
        return;
    }
    
    filteredSites.forEach(site => {
        const siteCard = createSiteCard(site);
        grid.append(siteCard);
    });
}

// Create site card
function createSiteCard(site) {
    const template = templates.find(t => t.id === site.template);
    const statusColor = getStatusColor(site.status);
    const performanceColor = getPerformanceColor(site.performance);
    
    return `
        <div class="col-xl-4 col-lg-6 col-md-12 mb-4">
            <div class="card site-card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <div class="site-icon me-3" style="background: ${template.color}">
                            <i class="fas ${template.icon}"></i>
                        </div>
                        <div>
                            <h6 class="mb-0">${site.name}</h6>
                            <small class="text-muted">${site.domain}</small>
                        </div>
                    </div>
                    <span class="badge bg-${statusColor}">${site.status}</span>
                </div>
                <div class="card-body">
                    <p class="card-text">${site.description}</p>
                    
                    <div class="row mb-3">
                        <div class="col-6">
                            <small class="text-muted">Technology</small>
                            <div class="fw-bold">${site.technology.toUpperCase()}</div>
                        </div>
                        <div class="col-6">
                            <small class="text-muted">Platform</small>
                            <div class="fw-bold">${site.platform.replace('-', ' ').toUpperCase()}</div>
                        </div>
                    </div>
                    
                    <div class="row mb-3">
                        <div class="col-6">
                            <small class="text-muted">Visitors</small>
                            <div class="fw-bold">${formatNumber(site.visitors)}</div>
                        </div>
                        <div class="col-6">
                            <small class="text-muted">Performance</small>
                            <div class="fw-bold text-${performanceColor}">${site.performance}%</div>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <small class="text-muted">Features</small>
                        <div class="d-flex flex-wrap gap-1">
                            ${site.features.map(feature => `
                                <span class="badge bg-light text-dark">${feature}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            Last deploy: ${formatDate(site.lastDeploy)}
                        </small>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary" onclick="viewSite(${site.id})" title="View">
                                <i class="fas fa-external-link-alt"></i>
                            </button>
                            <button class="btn btn-outline-info" onclick="showSiteDetails(${site.id})" title="Details">
                                <i class="fas fa-info-circle"></i>
                            </button>
                            <button class="btn btn-outline-success" onclick="deploySite(${site.id})" title="Deploy">
                                <i class="fas fa-rocket"></i>
                            </button>
                            <button class="btn btn-outline-warning" onclick="editSite(${site.id})" title="Edit">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-danger" onclick="deleteSite(${site.id})" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Filter sites
function filterSites(sites) {
    if (currentFilter === 'all') return sites;
    
    return sites.filter(site => {
        switch(currentFilter) {
            case 'active':
                return site.status === 'active';
            case 'pending':
                return site.status === 'pending';
            case 'inactive':
                return site.status === 'inactive';
            default:
                return true;
        }
    });
}

// Sort sites
function sortSites(sites) {
    return [...sites].sort((a, b) => {
        switch(sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'visitors':
                return b.visitors - a.visitors;
            case 'performance':
                return b.performance - a.performance;
            case 'lastDeploy':
                return new Date(b.lastDeploy) - new Date(a.lastDeploy);
            default:
                return 0;
        }
    });
}

// Update stats
function updateStats() {
    $('#totalSites').text(sites.length);
    $('#activeSites').text(sites.filter(s => s.status === 'active').length);
    $('#totalVisitors').text(formatNumber(sites.reduce((sum, site) => sum + site.visitors, 0)));
    $('#totalDeployments').text(sites.reduce((sum, site) => sum + (site.deployments || 0), 0) || sites.length * 10);
}

// Modal functions
function showCreateSiteModal() {
    $('#createSiteModal').modal('show');
}

function showSiteDetails(siteId) {
    const site = sites.find(s => s.id === siteId);
    if (!site) return;
    
    const template = templates.find(t => t.id === site.template);
    
    const detailsHtml = `
        <div class="row">
            <div class="col-md-8">
                <h5>${site.name}</h5>
                <p class="text-muted">${site.description}</p>
                
                <div class="row mb-3">
                    <div class="col-md-6">
                        <strong>Domain:</strong><br>
                        <a href="https://${site.domain}" target="_blank">${site.domain}</a>
                    </div>
                    <div class="col-md-6">
                        <strong>Repository:</strong><br>
                        <a href="${site.repoUrl}" target="_blank">${site.repoUrl}</a>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-md-4">
                        <strong>Template:</strong><br>
                        ${template.name}
                    </div>
                    <div class="col-md-4">
                        <strong>Technology:</strong><br>
                        ${site.technology}
                    </div>
                    <div class="col-md-4">
                        <strong>Platform:</strong><br>
                        ${site.platform}
                    </div>
                </div>
                
                <div class="mb-3">
                    <strong>Features:</strong><br>
                    <div class="d-flex flex-wrap gap-2 mt-2">
                        ${site.features.map(feature => `
                            <span class="badge bg-primary">${feature}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h6>Site Statistics</h6>
                        
                        <div class="mb-3">
                            <small class="text-muted">Status</small>
                            <div><span class="badge bg-${getStatusColor(site.status)}">${site.status}</span></div>
                        </div>
                        
                        <div class="mb-3">
                            <small class="text-muted">Total Visitors</small>
                            <div class="h5">${formatNumber(site.visitors)}</div>
                        </div>
                        
                        <div class="mb-3">
                            <small class="text-muted">Performance Score</small>
                            <div class="h5 text-${getPerformanceColor(site.performance)}">${site.performance}%</div>
                        </div>
                        
                        <div class="mb-3">
                            <small class="text-muted">Created</small>
                            <div>${formatDate(site.createdAt)}</div>
                        </div>
                        
                        <div class="mb-3">
                            <small class="text-muted">Last Deploy</small>
                            <div>${formatDate(site.lastDeploy)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#siteDetailsContent').html(detailsHtml);
    $('#siteDetailsModal').modal('show');
}

// Site management functions
function createSite() {
    const formData = $('#createSiteForm').serializeArray();
    const siteData = {};
    
    formData.forEach(field => {
        if (field.name === 'features') {
            if (!siteData.features) siteData.features = [];
            siteData.features.push(field.value);
        } else {
            siteData[field.name] = field.value;
        }
    });
    
    const newSite = {
        id: sites.length + 1,
        ...siteData,
        status: 'pending',
        visitors: 0,
        performance: 0,
        lastDeploy: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        deployments: 0
    };
    
    sites.push(newSite);
    saveSites();
    renderSitesGrid();
    updateStats();
    
    $('#createSiteModal').modal('hide');
    $('#createSiteForm')[0].reset();
    
    // Auto-deploy the new site
    setTimeout(() => deploySite(newSite.id), 1000);
    
    showNotification('Site created successfully! Deploying...', 'success');
}

function deploySite(siteId) {
    const site = sites.find(s => s.id === siteId);
    if (!site) return;
    
    showNotification(`Deploying ${site.name}...`, 'info');
    
    // Simulate deployment process
    setTimeout(() => {
        site.status = 'active';
        site.lastDeploy = new Date().toISOString();
        site.deployments = (site.deployments || 0) + 1;
        site.performance = Math.floor(Math.random() * 30) + 70; // Random performance 70-100
        
        saveSites();
        renderSitesGrid();
        updateStats();
        
        showNotification(`${site.name} deployed successfully!`, 'success');
    }, 2000);
}

function viewSite(siteId) {
    const site = sites.find(s => s.id === siteId);
    if (site) {
        window.open(`https://${site.domain}`, '_blank');
    }
}

function editSite(siteId) {
    showNotification('Edit feature coming soon!', 'info');
}

function deleteSite(siteId) {
    if (confirm('Are you sure you want to delete this site? This action cannot be undone.')) {
        sites = sites.filter(s => s.id !== siteId);
        saveSites();
        renderSitesGrid();
        updateStats();
        showNotification('Site deleted successfully!', 'success');
    }
}

// Utility functions
function getStatusColor(status) {
    const colors = {
        active: 'success',
        pending: 'warning',
        inactive: 'danger',
        error: 'danger'
    };
    return colors[status] || 'secondary';
}

function getPerformanceColor(performance) {
    if (performance >= 90) return 'success';
    if (performance >= 75) return 'info';
    if (performance >= 60) return 'warning';
    return 'danger';
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (query === '') {
        renderSitesGrid();
        return;
    }
    
    const filteredSites = sites.filter(site => 
        site.name.toLowerCase().includes(query) ||
        site.domain.toLowerCase().includes(query) ||
        site.description.toLowerCase().includes(query) ||
        site.template.toLowerCase().includes(query)
    );
    
    const grid = $('#sitesGrid');
    grid.empty();
    
    if (filteredSites.length === 0) {
        grid.html(`
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">No sites found</h4>
                    <p class="text-muted">Try adjusting your search criteria</p>
                </div>
            </div>
        `);
        return;
    }
    
    filteredSites.forEach(site => {
        const siteCard = createSiteCard(site);
        grid.append(siteCard);
    });
}

function showNotification(message, type = 'info') {
    const alertClass = {
        success: 'alert-success',
        error: 'alert-danger',
        warning: 'alert-warning',
        info: 'alert-info'
    }[type] || 'alert-info';
    
    const notification = $(`
        <div class="alert ${alertClass} alert-dismissible fade show position-fixed" 
             style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `);
    
    $('body').append(notification);
    
    setTimeout(() => {
        notification.fadeOut(300, function() {
            $(this).remove();
        });
    }, 5000);
}

function saveSites() {
    localStorage.setItem('multi-sites', JSON.stringify(sites));
}

function exportData() {
    const data = {
        sites: sites,
        templates: templates,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `multi-sites-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                
                if (data.sites && Array.isArray(data.sites)) {
                    sites = data.sites;
                    saveSites();
                    renderSitesGrid();
                    updateStats();
                    showNotification('Data imported successfully!', 'success');
                } else {
                    showNotification('Invalid data format!', 'error');
                }
            } catch (error) {
                showNotification('Error importing data!', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function loadSection(section) {
    // This would load different sections based on the navigation
    console.log('Loading section:', section);
}

function updateTemplatePreview() {
    const templateId = $('#createSiteForm select[name="template"]').val();
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
        // Update template preview in the modal
        // This could show a preview image or description
        console.log('Template selected:', template);
    }
}
