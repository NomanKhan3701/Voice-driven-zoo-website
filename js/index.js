const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
});

const texts = ['the world','your life'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type(){
    if(count === texts.length){
        count=0;
    }
    currentText = texts[count];
    letter = currentText.slice(0,++index);
    document.querySelector('.typing').textContent = letter;
    if(letter.length == currentText.length){
        count++;
        index=0;
    }
    setTimeout(type,400);
}
type();
