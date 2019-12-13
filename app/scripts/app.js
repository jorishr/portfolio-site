const toggle    = document.querySelector('.toggle');
const nav       = document.querySelector('nav'); 

console.log(toggle)
console.log(nav)

toggle.addEventListener('click', function(){    
    nav.classList.toggle('hidden');
});