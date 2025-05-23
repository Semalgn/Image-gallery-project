const searchForm = document.getElementById("searching-form");
const searchBox = document.getElementById("searching-box");
const searchResult = document.getElementById("searching-result");
const showMore = document.getElementById("show-more-btn");
const date = document.getElementById("copy-right");
const accessKey = "CY031egrWJedcTPcVe2MCHHurXOPsJaUvDyIucrmKsg";

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=6`;
  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;
  results.map((result) => {
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  showMore.style.display = "block";
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});
showMore.addEventListener("click", () => {
  page++;
  searchImages();
});

date.innerHTML = `<p>© Semalgn all rights reserved ${new Date().getFullYear()}</p>`;
