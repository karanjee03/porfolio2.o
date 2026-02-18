// ============================================
//   AI SITE BUILDER - FRONTEND CONTROLLER
// ============================================

let aiGenerator;
let selectedTemplate = null;
let currentStep = 1;

// Initialize builder
$(document).ready(function() {
    aiGenerator = new AISiteGenerator();
    realDeployer = new RealSiteDeployer();
    loadTemplates();
});

// Load templates
function loadTemplates() {
    const templates = [
        {
            id: 'portfolio',
            name: 'Portfolio',
            description: 'Professional portfolio with projects and skills',
            icon: 'fa-user',
            color: '#6366f1',
            features: ['Responsive', 'Gallery', 'Contact Form', 'Animations']
        },
        {
            id: 'business',
            name: 'Business',
            description: 'Corporate website with services and team',
            icon: 'fa-briefcase',
            color: '#10b981',
            features: ['Services', 'Team', 'Testimonials', 'FAQ']
        },
        {
            id: 'blog',
            name: 'Blog',
            description: 'Modern blog with categories and comments',
            icon: 'fa-blog',
            color: '#f59e0b',
            features: ['Posts', 'Categories', 'Comments', 'Search']
        },
        {
            id: 'ecommerce',
            name: 'E-commerce',
            description: 'Online store with products and cart',
            icon: 'fa-shopping-cart',
            color: '#ef4444',
            features: ['Products', 'Cart', 'Checkout', 'Payments']
        },
        {
            id: 'landing',
            name: 'Landing Page',
            description: 'High-converting marketing landing page',
            icon: 'fa-rocket',
            color: '#8b5cf6',
            features: ['Hero Section', 'Features', 'Testimonials', 'CTA']
        },
        {
            id: 'saas',
            name: 'SaaS App',
            description: 'Software application interface',
            icon: 'fa-cloud',
            color: '#3b82f6',
            features: ['Dashboard', 'Auth', 'API', 'Analytics']
        }
    ];

    const templateGrid = $('#templateGrid');
    templateGrid.empty();

    templates.forEach(template => {
        const templateCard = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="template-card card h-100" onclick="selectTemplate('${template.id}')" data-template="${template.id}">
                    <div class="card-body text-center">
                        <div class="template-icon mb-3" style="color: ${template.color}; font-size: 3rem;">
                            <i class="fas ${template.icon}"></i>
                        </div>
                        <h5 class="card-title">${template.name}</h5>
                        <p class="card-text text-muted">${template.description}</p>
                        <div class="features-list">
                            ${template.features.map(feature => `
                                <span class="badge bg-light text-dark me-1 mb-1">${feature}</span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        templateGrid.append(templateCard);
    });
}

// Select template
function selectTemplate(templateId) {
    // Remove previous selection
    $('.template-card').removeClass('selected');
    
    // Add selection to clicked template
    $(`.template-card[data-template="${templateId}"]`).addClass('selected');
    
    selectedTemplate = templateId;
    $('#buildBtn').prop('disabled', false);
}

// Show templates step
function showTemplates() {
    const siteName = $('#siteName').val();
    
    if (!siteName) {
        showNotification('Please enter a site name', 'warning');
        return;
    }
    
    showStep(2);
}

// Build site
async function buildSite() {
    if (!selectedTemplate) {
        showNotification('Please select a template', 'warning');
        return;
    }
    
    const siteData = {
        siteName: $('#siteName').val(),
        domain: $('#siteDomain').val(),
        description: $('#siteDescription').val(),
        template: selectedTemplate
    };
    
    showStep(3);
    
    try {
        // Use real deployer instead of AI generator
        const result = await realDeployer.deploySite(siteData, updateProgress);
        
        if (result.success) {
            showSuccess(result);
        } else {
            throw new Error('Site generation failed');
        }
        
    } catch (error) {
        console.error('Build error:', error);
        showNotification('Site build failed. Please try again.', 'error');
        showStep(2);
    }
}

// Update progress
function updateProgress(progress, status) {
    $('#buildProgress').css('width', progress + '%');
    $('#progressText').text(progress + '%');
    $('#aiStatusText').text(status);
    
    // Update process steps
    const steps = $('#processSteps li');
    const stepIndex = Math.floor((progress / 100) * steps.length);
    
    steps.each(function(index) {
        if (index < stepIndex) {
            $(this).removeClass('text-muted').html('<i class="fas fa-check text-success"></i> ' + $(this).text());
        } else if (index === stepIndex) {
            $(this).removeClass('text-muted').html('<i class="fas fa-circle-notch fa-spin"></i> ' + $(this).text());
        }
    });
    
    // Update preview when site is ready
    if (progress >= 80) {
        updatePreview(siteData);
    }
}

// Update preview
function updatePreview(siteData) {
    const previewHTML = `
        <html>
        <head>
            <style>
                body { margin: 0; padding: 20px; font-family: Arial; background: linear-gradient(135deg, #667eea, #764ba2); }
                .preview-content { background: white; padding: 40px; border-radius: 10px; text-align: center; }
                .preview-title { color: #6366f1; margin-bottom: 20px; }
                .preview-description { color: #666; margin-bottom: 30px; }
                .preview-features { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
                .feature-badge { background: #6366f1; color: white; padding: 5px 10px; border-radius: 20px; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="preview-content">
                <h1 class="preview-title">${siteData.siteName}</h1>
                <p class="preview-description">${siteData.description || 'Your amazing website is ready!'}</p>
                <div class="preview-features">
                    <span class="feature-badge">✨ Modern Design</span>
                    <span class="feature-badge">📱 Responsive</span>
                    <span class="feature-badge">🚀 Fast Loading</span>
                    <span class="feature-badge">🎯 SEO Optimized</span>
                </div>
            </div>
        </body>
        </html>
    `;
    
    $('#previewFrame').attr('srcdoc', previewHTML);
}

// Show success
function showSuccess(result) {
    showStep(4);
    
    // Add live links
    const linksHTML = `
        <a href="${result.url}" target="_blank" class="live-link">
            <i class="fas fa-external-link-alt"></i> View Live Site
        </a>
        <a href="${result.ideUrl}" target="_blank" class="live-link">
            <i class="fas fa-code"></i> Edit in IDE
        </a>
    `;
    
    $('#liveLinks').html(linksHTML);
    
    // Add performance metrics
    const metrics = result.testResults;
    const metricsHTML = `
        <div class="row">
            <div class="col-6 col-md-3">
                <div class="text-center">
                    <div class="h4 text-white">${metrics.performance}</div>
                    <small>Performance</small>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="text-center">
                    <div class="h4 text-white">${metrics.accessibility}</div>
                    <small>Accessibility</small>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="text-center">
                    <div class="h4 text-white">${metrics.bestPractices}</div>
                    <small>Best Practices</small>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="text-center">
                    <div class="h4 text-white">${metrics.seo}</div>
                    <small>SEO</small>
                </div>
            </div>
        </div>
    `;
    
    $('#performanceMetrics').html(metricsHTML);
    
    // Save site to local storage
    saveSiteToHistory(result);
}

// Save site to history
function saveSiteToHistory(result) {
    let history = JSON.parse(localStorage.getItem('ai-built-sites') || '[]');
    
    const siteRecord = {
        id: Date.now(),
        name: $('#siteName').val(),
        template: selectedTemplate,
        url: result.url,
        ideUrl: result.ideUrl,
        createdAt: new Date().toISOString(),
        performance: result.testResults
    };
    
    history.unshift(siteRecord);
    
    // Keep only last 10 sites
    history = history.slice(0, 10);
    
    localStorage.setItem('ai-built-sites', JSON.stringify(history));
}

// Show step
function showStep(step) {
    $('.builder-step').hide();
    $(`#step${step}`).show();
    currentStep = step;
}

// Create another site
function createAnother() {
    // Reset form
    $('#siteConfigForm')[0].reset();
    $('.template-card').removeClass('selected');
    selectedTemplate = null;
    $('#buildBtn').prop('disabled', true);
    
    // Show first step
    showStep(1);
}

// View dashboard
function viewDashboard() {
    window.location.href = 'index.html';
}

// Show notification
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

// Add keyboard shortcuts
$(document).keydown(function(e) {
    // Ctrl/Cmd + Enter to build site
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (currentStep === 2 && selectedTemplate) {
            buildSite();
        }
    }
    
    // Escape to go back
    if (e.key === 'Escape') {
        if (currentStep > 1) {
            showStep(currentStep - 1);
        }
    }
});

// Add form validation
$('#siteName').on('input', function() {
    const value = $(this).val();
    const isValid = value.length >= 3;
    
    if (isValid) {
        $(this).removeClass('is-invalid').addClass('is-valid');
    } else {
        $(this).removeClass('is-valid').addClass('is-invalid');
    }
});

// Auto-generate domain suggestion
$('#siteName').on('input', function() {
    const siteName = $(this).val();
    const domain = siteName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    if (domain && !$('#siteDomain').val()) {
        $('#siteDomain').val(domain + '.github.io');
    }
});
