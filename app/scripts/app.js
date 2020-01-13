const toggle        = document.querySelector('.toggle');
const nav           = document.querySelector('nav'); 
const toggleIcons   = document.querySelectorAll('header i');
const faders        = document.querySelectorAll('.fade-in');

//hamburger menu toggle
toggle.addEventListener('click', function(){    
    nav.classList.toggle('hidden');
    toggleIcons.forEach(icon => icon.classList.toggle('hidden'))
});

//fade-in with intersection observer API
const appearOptions = {
    threshold: 0,
    rootMargin: '0px 0px -150px 0px'
};

//the appearOnScroll function 
const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
        ){
            entries.forEach(entry => {
                if(!entry.isIntersecting){ return; }
                else {
                    entry.target.classList.add('reveal');
                    appearOnScroll.unobserve(entry.target);
                }
            })	
        },	
    appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})