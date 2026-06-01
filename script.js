document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // json data loading
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('خطا در خواندن فایل data.json');
            }
            return response.json();
        })
        .then(data => {
            renderPortfolio(data);
        })
        .catch(error => {
            console.error('مشکل در بارگذاری اطلاعات:', error);
            
            const portfolioGrid = document.querySelector('.portfolio-grid');
            if (portfolioGrid) {
                portfolioGrid.innerHTML = '<p>خطا در بارگذاری نمونه‌کارها. لطفاً فایل data.json را بررسی کنید.</p>';
            }
        });
});


function renderPortfolio(items) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (!portfolioGrid) return;

    portfolioGrid.innerHTML = '';

    items.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
           portfolioItem.innerHTML = `
              <img src="${item.image}" alt="${item.title}">
              <div class="portfolio-details">
                  <p>${item.title}</p>
                  <a href="${item.link}" target="_blank" class="btn view-btn">مشاهده</a>
              </div>
          `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

