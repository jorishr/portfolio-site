const toggle    = document.querySelector('.toggle');
const nav       = document.querySelector('nav'); 
const toggleIcons = document.querySelectorAll('header i');

toggle.addEventListener('click', function(){    
    nav.classList.toggle('hidden');
    toggleIcons.forEach(icon => icon.classList.toggle('hidden'))
});