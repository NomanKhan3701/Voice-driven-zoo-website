import * as anim from "./animalsDetails.js";

function makeNode(ch){
    this.ch = ch;  
    this.isTerminal = false;
    this.map = {};
    this.words = [];
}

function add(str, i, root){
    if(i === str.length){
        root.isTerminal = true;
        return;
    }
    if(!root.map[str[i]])
        root.map[str[i]] = new makeNode(str[i]);

    root.words.push(str);
    add(str, i+1, root.map[str[i]]);
}

function search(str, i, root){
    if(i===str.length)
        return root.words;

    if(!root.map[str[i]])
        return [];

    return search(str, i+1, root.map[str[i]]);
    
}

const items = [];

//Initializing items array with all the animals name
for(const animal of anim.animals){
    items.push(animal.name.toLocaleLowerCase());
}

const textBox = document.getElementById("text-box");
const recommendList = document.getElementById("recommend-list");
const animalContainer = document.querySelector(".animal-container");

const root = new makeNode('\0');
for(const item of items)
    add(item, 0, root);

textBox.addEventListener("keydown",searchInputHandler);
textBox.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        recommendList.style.display="none";
    }
})

function searchInputHandler(e){

    const str = e.target.value.toLocaleLowerCase();
    const predictions = search(str, 0, root);

    if(recommendList.style.display==="none"&&(e.key!=="Enter")){
        recommendList.style.display="block";
    }

    recommendList.innerHTML = "";
    for(const prediction of predictions){
        const predFirstUp = prediction.substring(0,1).toLocaleUpperCase()+prediction.substring(1);
        recommendList.innerHTML += `<li onclick="recommendListClick(this)">${predFirstUp}</li>`;
    }

    //Animal container elements visibility as per search input
    if(recommendList.innerHTML===""){
        animalContainer.style.display="none";
    }
    else{
        animalContainer.style.display="grid";
        for(var i=0;i<animalContainer.children.length;i++){
            animalContainer.children[i].style.display="none";
        }
        for(var j=0;j<recommendList.children.length;j++){
            const prediction = recommendList.children[j].innerHTML.toLocaleLowerCase();
            for(var i=0;i<animalContainer.children.length;i++){
                const id = animalContainer.children[i].id.toLocaleLowerCase();
                if(id===prediction){
                    animalContainer.children[i].style.display="block";
                }
            }
        }
    } 
}

window.recommendListClick = function(e){
    const text = e.innerHTML;
    textBox.value = text;
}


textBox.addEventListener("keyup", searchInputHandler);

const body = document.querySelector("body");

body.addEventListener("click",(e)=>{
    if(!(e.target===textBox||e.target===recommendList)&&(recommendList.style.display==="block")){
        recommendList.style.display="none";
    }
    else if(e.target===textBox||e.target===recommendList){
        recommendList.style.display="block";
    }
});