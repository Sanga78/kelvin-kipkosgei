
let about = document.getElementById('about_content');
let content = document.getElementById('view_more');

if (about.style.display= "none"){
    content.addEventListener('click', function() {
        about.style.display= "block";
    }); 
}
else{
    content.addEventListener('click', function() {
        about.style.display= "none";
    }); 
}
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.5}s`;
        section.classList.add('fade-in');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-btn');
    const nav = document.querySelector('header nav');

    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});
