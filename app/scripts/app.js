(() => {
const toggle        = document.querySelector('.toggle');
const nav           = document.querySelector('nav'); 
const toggleIcons   = document.querySelectorAll('header i');
const faders        = document.querySelectorAll('.fade-in');
const scrollIndicator   = document.querySelector('.scroll-indicator');
const scrollIndicatorBg = document.querySelector('.scroll-indicator__bg');

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

//add or remove scrollindicator; fill bg color based on scroll height
window.addEventListener('scroll', throttle(()=>{
    let windowHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight, 	
        document.documentElement.clientHeight
    );
    let currentScroll = window.pageYOffset;  
    let scrollHeightPercent = Math.ceil((currentScroll / windowHeight) * 100 + 6); 
    //console.log(scrollHeightPercent);
    if(scrollHeightPercent >= 10){
        scrollIndicator.classList.add('reveal');
        scrollIndicatorBg.style.height = `${scrollHeightPercent}%`; 
        //console.log(scrollIndicatorBg.style.height)
    } else {
        scrollIndicator.classList.remove('reveal');
    }
}, 50))

//click scroll to top
scrollIndicator.addEventListener('click', () => {
    window.scrollTo(0,0);
})

//throttle helper function
function throttle(fn, delay){
    let flag = true;
    return function(){
        let args = arguments;
        let context = this;
        if(flag){
            fn.apply(context, args);
            flag = false;
            setTimeout(()=>{
                flag = true;
            }, delay);
        }
    }
} 
//set height for first site section, accounts for mobile browser menu's
//get the viewport innerHeight 
let vh = window.innerHeight - 135;  //header height
const landing = document.querySelector('.hero-section');
landing.style.height = `${vh}px`;
})();