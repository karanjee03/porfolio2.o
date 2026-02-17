// ============================================
//   SITE MANAGER DASHBOARD - JAVASCRIPT
// ============================================

// Global state
let sites = [];
let currentTheme = 'dark';
let sidebarCollapsed = false;

// Initialize dashboard
$(document).ready(function() {
    initializeDashboard();
    loadSites();
    setupEventListeners();
    initializeCharts();
    updateStats();
});

// Initialize dashboard
function initializeDashboard() {
    // Load saved theme
    const savedTheme = localStorage.getItem('dashboard-theme') || 'dark';
    setTheme(savedTheme);
    
    // Load sidebar state
    const sidebarState = localStorage.getItem('sidebar-collapsed') === 'true';
    if (sidebarState) {
        toggleSidebar();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar toggle
    $('.sidebar-toggle').on('click', toggleSidebar);
    
    // Theme toggle
    $('.theme-btn').on('click', toggleTheme);
    
    // Navigation
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const section = $(this).attr('href').substring(1);
        navigateToSection(section);
    });
    
    // Search functionality
    $('.search-box input').on('input', debounce(handleSearch, 300));
    
    // Modal events
    $('#addSiteForm').on('submit', function(e) {
        e.preventDefault();
        addSite();
    });
}

// Toggle sidebar
function toggleSidebar() {
    $('.sidebar').toggleClass('collapsed');
    $('.main-content').toggleClass('expanded');
    sidebarCollapsed = !sidebarCollapsed;
    localStorage.setItem('sidebar-collapsed', sidebarCollapsed);
}

// Toggle theme
function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Set theme
function setTheme(theme) {
    currentTheme = theme;
    localStorage.setItem('dashboard-theme', theme);
    
    if (theme === 'light') {
        // Apply light theme styles
        $('body').addClass('light-theme');
        $('.theme-btn i').removeClass('fa-moon').addClass('fa-sun');
    } else {
        // Apply dark theme styles
        $('body').removeClass('light-theme');
        $('.theme-btn i').removeClass('fa-sun').addClass('fa-moon');
    }
}

// Navigate to section
function navigateToSection(section) {
    // Update active nav
    $('.nav-item').removeClass('active');
    $(`.nav-link[href="#${section}"]`).parent().addClass('active');
    
    // Update breadcrumb
    $('.breadcrumb').text(section.charAt(0).toUpperCase() + section.slice(1));
    
    // Load section content
    loadSectionContent(section);
}

// Load section content
function loadSectionContent(section) {
    const contentArea = $('.content-area');
    
    switch(section) {
        case 'dashboard':
            loadDashboardContent();
            break;
        case 'sites':
            loadSitesContent();
            break;
        case 'domains':
            loadDomainsContent();
            break;
        case 'analytics':
            loadAnalyticsContent();
            break;
        case 'deployments':
            loadDeploymentsContent();
            break;
        case 'backups':
            loadBackupsContent();
            break;
        case 'settings':
            loadSettingsContent();
            break;
    }
}

// Load sites data
function loadSites() {
    // Simulate API call
    sites = [
        {
            id: 1,
            name: 'Portfolio Website',
            domain: 'karanjee03.github.io',
            status: 'active',
            lastDeploy: '2024-01-15 14:30',
            visitors: 15234,
            performance: 95,
            type: 'portfolio',
            repoUrl: 'https://github.com/karanjee03/porfolio2.o'
        },
        {
            id: 2,
            name: 'Business Website',
            domain: 'example-business.com',
            status: 'active',
            lastDeploy: '2024-01-14 10:15',
            visitors: 8921,
            performance: 88,
            type: 'business',
            repoUrl: 'https://github.com/user/business-site'
        },
        {
            id: 3,
            name: 'Blog Platform',
            domain: 'myblog.tech',
            status: 'pending',
            lastDeploy: '2024-01-13 18:45',
            visitors: 5672,
            performance: 72,
            type: 'blog',
            repoUrl: 'https://github.com/user/blog'
        }
    ];
    
    renderSitesTable();
    populateDeploySiteSelect();
}

// Render sites table
function renderSitesTable() {
    const tbody = $('#sitesTableBody');
    tbody.empty();
    
    sites.forEach(site => {
        const row = `
            <tr>
                <td>
                    <div class="site-info">
                        <div class="site-icon">${site.name.charAt(0)}</div>
                        <div class="site-details">
                            <h4>${site.name}</h4>
                            <p>${site.type}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <a href="https://${site.domain}" target="_blank" class="text-decoration-none">
                        ${site.domain}
                        <i class="fas fa-external-link-alt ms-1"></i>
                    </a>
                </td>
                <td>
                    <span class="status-badge ${site.status}">
                        <i class="fas fa-circle" style="font-size: 0.5rem;"></i>
                        ${site.status}
                    </span>
                </td>
                <td>${formatDate(site.lastDeploy)}</td>
                <td>${formatNumber(site.visitors)}</td>
                <td>
                    <div class="performance-score">
                        <div class="performance-bar">
                            <div class="performance-fill ${getPerformanceClass(site.performance)}" 
                                 style="width: ${site.performance}%"></div>
                        </div>
                        <span>${site.performance}%</span>
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="viewSite(${site.id})" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="editSite(${site.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="deploySiteById(${site.id})" title="Deploy">
                            <i class="fas fa-rocket"></i>
                        </button>
                        <button class="action-btn" onclick="deleteSite(${site.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

// Populate deploy site select
function populateDeploySiteSelect() {
    const select = $('#deploySiteSelect');
    select.empty();
    
    sites.forEach(site => {
        select.append(`<option value="${site.id}">${site.name} (${site.domain})</option>`);
    });
}

// Initialize charts
function initializeCharts() {
    // Traffic Chart
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    new Chart(trafficCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Visitors',
                data: [3200, 4100, 3800, 5200, 4900, 6100, 5800],
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
    
    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Excellent', 'Good', 'Average', 'Poor'],
            datasets: [{
                data: [45, 30, 20, 5],
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#94a3b8'
                    }
                }
            }
        }
    });
}

// Update stats
function updateStats() {
    // Simulate real-time updates
    setInterval(() => {
        // Update visitor count
        const currentVisitors = parseInt($('.stat-number').eq(2).text().replace('K', '000'));
        const newVisitors = currentVisitors + Math.floor(Math.random() * 10);
        $('.stat-number').eq(2).text(formatNumber(newVisitors));
    }, 5000);
}

// Modal functions
function showAddSiteModal() {
    $('#addSiteModal').modal('show');
}

function showDeployModal() {
    $('#deployModal').modal('show');
}

function showBackupModal() {
    showToast('Backup feature coming soon!', 'info');
}

function showDomainModal() {
    showToast('Domain management coming soon!', 'info');
}

function showAnalyticsModal() {
    showToast('Detailed analytics coming soon!', 'info');
}

// Site management functions
function addSite() {
    const formData = $('#addSiteForm').serializeArray();
    const siteData = {};
    
    formData.forEach(field => {
        siteData[field.name] = field.value;
    });
    
    // Add new site
    const newSite = {
        id: sites.length + 1,
        ...siteData,
        status: 'pending',
        lastDeploy: new Date().toISOString(),
        visitors: 0,
        performance: 0
    };
    
    sites.push(newSite);
    renderSitesTable();
    populateDeploySiteSelect();
    
    $('#addSiteModal').modal('hide');
    $('#addSiteForm')[0].reset();
    
    showToast('Site added successfully!', 'success');
}

function deploySite() {
    const siteId = $('#deploySiteSelect').val();
    const site = sites.find(s => s.id == siteId);
    
    if (site) {
        // Simulate deployment
        showToast(`Deploying ${site.name}...`, 'info');
        
        setTimeout(() => {
            site.lastDeploy = new Date().toISOString();
            site.status = 'active';
            renderSitesTable();
            showToast(`${site.name} deployed successfully!`, 'success');
        }, 2000);
    }
    
    $('#deployModal').modal('hide');
}

function deploySiteById(siteId) {
    const site = sites.find(s => s.id === siteId);
    if (site) {
        showToast(`Deploying ${site.name}...`, 'info');
        
        setTimeout(() => {
            site.lastDeploy = new Date().toISOString();
            site.status = 'active';
            renderSitesTable();
            showToast(`${site.name} deployed successfully!`, 'success');
        }, 2000);
    }
}

function viewSite(siteId) {
    const site = sites.find(s => s.id === siteId);
    if (site) {
        window.open(`https://${site.domain}`, '_blank');
    }
}

function editSite(siteId) {
    showToast('Edit feature coming soon!', 'info');
}

function deleteSite(siteId) {
    if (confirm('Are you sure you want to delete this site?')) {
        sites = sites.filter(s => s.id !== siteId);
        renderSitesTable();
        populateDeploySiteSelect();
        showToast('Site deleted successfully!', 'success');
    }
}

// Search functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    
    if (query === '') {
        renderSitesTable();
        return;
    }
    
    const filteredSites = sites.filter(site => 
        site.name.toLowerCase().includes(query) ||
        site.domain.toLowerCase().includes(query) ||
        site.type.toLowerCase().includes(query)
    );
    
    const tbody = $('#sitesTableBody');
    tbody.empty();
    
    if (filteredSites.length === 0) {
        tbody.html('<tr><td colspan="7" class="text-center">No sites found</td></tr>');
        return;
    }
    
    filteredSites.forEach(site => {
        const row = `
            <tr>
                <td>
                    <div class="site-info">
                        <div class="site-icon">${site.name.charAt(0)}</div>
                        <div class="site-details">
                            <h4>${site.name}</h4>
                            <p>${site.type}</p>
                        </div>
                    </div>
                </td>
                <td>
                    <a href="https://${site.domain}" target="_blank" class="text-decoration-none">
                        ${site.domain}
                        <i class="fas fa-external-link-alt ms-1"></i>
                    </a>
                </td>
                <td>
                    <span class="status-badge ${site.status}">
                        <i class="fas fa-circle" style="font-size: 0.5rem;"></i>
                        ${site.status}
                    </span>
                </td>
                <td>${formatDate(site.lastDeploy)}</td>
                <td>${formatNumber(site.visitors)}</td>
                <td>
                    <div class="performance-score">
                        <div class="performance-bar">
                            <div class="performance-fill ${getPerformanceClass(site.performance)}" 
                                 style="width: ${site.performance}%"></div>
                        </div>
                        <span>${site.performance}%</span>
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn" onclick="viewSite(${site.id})" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn" onclick="editSite(${site.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" onclick="deploySiteById(${site.id})" title="Deploy">
                            <i class="fas fa-rocket"></i>
                        </button>
                        <button class="action-btn" onclick="deleteSite(${site.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tbody.append(row);
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function getPerformanceClass(score) {
    if (score >= 90) return 'excellent';
    if (score >= 75) return 'good';
    if (score >= 60) return 'average';
    return 'poor';
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

function showToast(message, type = 'info') {
    const toast = $(`
        <div class="toast ${type}">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `);
    
    $('.toast-container').append(toast);
    
    setTimeout(() => {
        toast.fadeOut(300, function() {
            $(this).remove();
        });
    }, 3000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Section content loaders
function loadDashboardContent() {
    // Dashboard content is already loaded
}

function loadSitesContent() {
    showToast('Sites management view coming soon!', 'info');
}

function loadDomainsContent() {
    showToast('Domain management coming soon!', 'info');
}

function loadAnalyticsContent() {
    showToast('Advanced analytics coming soon!', 'info');
}

function loadDeploymentsContent() {
    showToast('Deployment history coming soon!', 'info');
}

function loadBackupsContent() {
    showToast('Backup management coming soon!', 'info');
}

function loadSettingsContent() {
    showToast('Settings panel coming soon!', 'info');
}

// Mobile responsiveness
$(window).on('resize', function() {
    if (window.innerWidth > 768) {
        $('.sidebar').removeClass('show');
    }
});

// Initialize toast container
$('body').append('<div class="toast-container"></div>');
