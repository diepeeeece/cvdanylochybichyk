const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            
            const fill = entry.target.querySelector('.fill');
            if (fill) {
                fill.style.width = entry.target.parentElement.dataset.width + '%';
            }
        }
    });
}, observerOptions);


document.querySelectorAll('.reveal, .skill-card, .project-card').forEach(el => {
    observer.observe(el);
});