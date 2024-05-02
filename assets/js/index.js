import { BASE_URL } from "./api.js";

let tBobdy = document.querySelector("tbody");
let searchInput = document.getElementById("search");
let ascBtn = document.querySelector(".btn-asc");
let descBtn = document.querySelector(".btn-desc");
let defaultBtn = document.querySelector(".btn-default");

async function getAllData(endpoint) {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);

    filterProductsByTitle(response.data);

    ascendingList(response.data);

    descendingList(response.data);

    defaultProductsList(response.data);

    renderList(response.data);
  } catch (error) {
    console.log(error);
  }
}

function renderList(array) {
  tBobdy.innerHTML = "";

  array.forEach((element) => {
    let trElem = document.createElement("tr");
    trElem.innerHTML = `
                <td>${element.id}</td>
                <td><img src="${element.image}"></td>
                <td>${element.title}</td>
                <td>${element.category}</td>
                <td>${element.description}</td>
                <td>${element.price}$</td>
                <td><a class="btn btn-primary" href="details.html?id=${element.id}">details</a></td>
        `;

    tBobdy.append(trElem);
  });
}

function filterProductsByTitle(products) {
  searchInput.addEventListener("input", function (e) {
    let filteredProducts = products.filter((item) =>
      item.title
        .toLowerCase()
        .trim()
        .includes(e.target.value.toLowerCase().trim())
    );
    renderList(filteredProducts);
  });
}

function ascendingList(products) {
  ascBtn.addEventListener("click", function () {
    let sortProductByAsc = products.sort((a, b) => a.price - b.price);
    renderList(sortProductByAsc);
  });
}

function descendingList(products) {
  descBtn.addEventListener("click", function () {
    let sortProductByAsc = products.sort((a, b) => b.price - a.price);
    renderList(sortProductByAsc);
  });
}

function defaultProductsList(products) {
  defaultBtn.addEventListener("click", function () {
    renderList(products);
  });
}

getAllData("products");
