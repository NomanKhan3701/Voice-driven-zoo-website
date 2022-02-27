import * as anim from "./animalsDetails.js";

const animalContainer = document.querySelector(".animal-container");
const searchInput = document.querySelector(".search-container .search input");

for(var animal of anim.animals){
    animalContainer.innerHTML += `<div id="${animal.name}" class="animal">
                                    <div class="animal-img">
                                        <img loading="lazy" src="${animal.imgSrc}" alt="" srcset="">
                                    </div>
                                    <h2 class="animal-name">${animal.name}</h2>
                                    <div class="animal-info">${animal.info}</div>
                                    <div class="animal-read-more">
                                        <a href="${animal.readMoreSrc}" target="_blank">Read More</a>
                                    </div>
                                </div>`
}
