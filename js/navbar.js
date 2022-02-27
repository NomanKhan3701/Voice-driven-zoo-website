// Animals navbar

const navbar = document.querySelector('.navbar');
const pageLink = document.querySelectorAll('.page-link a');
const navLink = document.querySelector('.nav-links');
const toggleNavLink = document.querySelector('.toggle-nav-link');
var screenWidth = document.body.clientWidth;

window.addEventListener('resize',function(){
    screenWidth = document.body.clientWidth;
    if(screenWidth>686){
        if(navLink.style.display==="none"){
            navLink.style.display="flex";
        }
    }
    else if(screenWidth<686){
        if(navLink.style.display==="flex"){
            navLink.style.display="none";
        }
    }
});

pageLink.forEach(element => {
    element.addEventListener('click',()=>{
        pageLink.forEach(element=>{
            element.classList.remove('active');
        });
        element.classList.add('active');
        screenWidth = document.body.clientWidth;
        if(screenWidth<686){
            toggleNav();
        }
    });
});

toggleNavLink.addEventListener('click',toggleNav);

function toggleNav(){
    if(navLink.style.display==="flex"){
        navLink.style.display="none";
        toggleNavLink.children[0].classList.replace("fa-times","fa-bars");
    }
    else{
        navLink.style.display="flex";
        toggleNavLink.children[0].classList.replace("fa-bars","fa-times");
    }
}