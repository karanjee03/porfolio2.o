// ============================================
//   KARAN JEE PORTFOLIO — BOOTSTRAP ENHANCEMENTS
// ============================================

$(document).ready(function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Smooth scroll for anchor links with Bootstrap offset
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Enhanced mobile menu with Bootstrap
    const $hamburger = $('#hamburger');
    const $mobileMenu = $('#mobileMenu');
    
    $hamburger.on('click', function() {
        $mobileMenu.toggleClass('active');
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('nav, .mobile-menu').length) {
            $mobileMenu.removeClass('active');
            $hamburger.removeClass('active');
        }
    });

    // Enhanced reveal animations with jQuery
    const revealElements = $('.reveal');
    
    function checkReveal() {
        revealElements.each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    // Check reveal on scroll and resize
    $(window).on('scroll resize', checkReveal);
    checkReveal(); // Initial check

    // Enhanced typing effect with jQuery
    const typedElements = $('.typed');
    typedElements.each(function() {
        const $this = $(this);
        const text = $this.text();
        $this.empty();
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                $this.text(text.substring(0, i + 1));
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        typeWriter();
    });

    // Counter animation for stats
    $('.stat-number').each(function() {
        const $this = $(this);
        const countTo = parseInt($this.data('count')) || 0;
        const suffix = $this.data('suffix') || '';
        let current = 0;
        
        $this.text('0' + suffix);
        
        function updateCounter() {
            if (current < countTo) {
                current++;
                $this.text(current + suffix);
                setTimeout(updateCounter, 50);
            }
        }
        
        // Start counter when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(this);
    });

    // Image loading animations
    $('.image-loading').each(function() {
        const $img = $(this);
        $img.on('load', function() {
            $(this).addClass('loaded');
        });
        
        // Fallback for cached images
        if ($img[0].complete) {
            $img.addClass('loaded');
        }
    });

    // Enhanced hover effects with jQuery
    $('.project-card, .skill-category, .stat-card').hover(
        function() {
            $(this).addClass('shadow-lg');
        },
        function() {
            $(this).removeClass('shadow-lg');
        }
    );

    // Form validation for contact form (if exists)
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        let isValid = true;
        $(this).find('input, textarea').each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (isValid) {
            // Show success message using Bootstrap alert
            const alertHtml = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> Your message has been sent.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
            $(this).prepend(alertHtml);
            this.reset();
        }
    });

    // Parallax scrolling effect for backgrounds
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        const parallaxElements = $('.hero-bg, .section-bg');
        
        parallaxElements.each(function() {
            const speed = $(this).hasClass('hero-bg') ? 0.5 : 0.3;
            const yPos = -(scrolled * speed);
            $(this).css('transform', `translateY(${yPos}px)`);
        });
    });

    // Enhanced gallery interactions
    $('.gallery-item').on('click', function() {
        const $item = $(this);
        const $img = $item.find('img');
        const $content = $item.find('.gallery-content');
        
        // Create lightbox effect
        if (!$('.lightbox-overlay').length) {
            $('body').append(`
                <div class="lightbox-overlay">
                    <div class="lightbox-content">
                        <img src="${$img.attr('src')}" alt="${$img.attr('alt')}">
                        <div class="lightbox-info">
                            <h3>${$content.find('h3').text()}</h3>
                            <p>${$content.find('p').text()}</p>
                        </div>
                        <button class="lightbox-close">&times;</button>
                    </div>
                </div>
            `);
            
            $('.lightbox-overlay').fadeIn(300).on('click', function(e) {
                if (e.target === this) {
                    $(this).fadeOut(300, function() {
                        $(this).remove();
                    });
                }
            });
            
            $('.lightbox-close').on('click', function() {
                $('.lightbox-overlay').fadeOut(300, function() {
                    $(this).remove();
                });
            });
        }
    });

    // Dynamic navbar background on scroll
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        const $navbar = $('nav');
        
        if (scrollTop > 100) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });

    // Initialize Bootstrap modals
    $('.modal').each(function() {
        new bootstrap.Modal(this);
    });

    // Enhanced project filtering (if needed)
    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');
        
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        $('.project-card').each(function() {
            if (filter === 'all' || $(this).hasClass(filter)) {
                $(this).fadeIn(300);
            } else {
                $(this).fadeOut(300);
            }
        });
    });
});
