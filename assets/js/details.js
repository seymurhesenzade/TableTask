
import { BASE_URL } from "./api.js";


let cardBaseDiv = document.querySelector(".col-3");

let url = new URLSearchParams(window.location.search)
let id = url.get("id");



async function getDataById() {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`)
        createCard(response.data)

    } catch (error) {
        console.log(error);
    }
}


function createCard(product) {
    cardBaseDiv.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="${product.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text" style="margin:0; font-size:16px">${product.description}</p>
                  <span style="color:teal; font-size:14px">${product.category}</span>
                  <p class="card-text">${product.price}$</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>
    `

    let backBtn = document.querySelector(".btn-primary");
    backBtn.addEventListener("click",function(){
        window.history.back()
    })

}

getDataById();