

const endPointEarthDates = "http://localhost:3000/api/v1/earthdates"
const endPointPhotos = "http://localhost:3000/api/v1/photos"

document.addEventListener('DOMContentLoaded', () => {
    fetch(endPointEarthDates)
    .then(response => response.json())
    .then(earthdates => {
        console.log(earthdates);
        createEarthDates(earthdates);
        createPhotos(earthdates);
    });
});


function createEarthDates(earthdates) {
   const ed_div = document.querySelector("#ed");
   ed_div.className = "container-fluid";
   const ed_row = document.createElement("div");
   ed_row.className = "row"
   earthdates["data"].forEach((d) => {
    const ed_container = document.createElement("div");
    ed_container.className = "col-sm"
    const ed_header = document.createElement('h4');
    const ed_p = document.createElement('p')
    ed_header.innerText = d["attributes"]["date"];
    ed_p.innerText = `Available Photos: ${d["attributes"]["total_photos"]}`;
    ed_container.appendChild(ed_header);
    ed_container.appendChild(ed_p);
    ed_row.appendChild(ed_container);
    ed_div.appendChild(ed_row);
   })
    
}

function createPhotos(earthdates) {
    const photos_div = document.querySelector("#photos");
    photos_div.className = "container-fluid";
    earthdates["data"].forEach((d) => {
        const earthdate_row = document.createElement("div");
        earthdate_row.className = "row"
        earthdate_row.id = d["id"];
        d["attributes"]["photos"].forEach((p) => {
            const photo_container = document.createElement("div");
            const sol = document.createElement("p");
            const img_elem = document.createElement("img");
            sol.innerText = `Sol: ${p["sol"]}`;
            img_elem.src = p["img_src"];
            img_elem.className = "img-fluid img-thumbnail";
            photo_container.className = "col-2 col-md-4"
            photo_container.id = p["id"]
            photo_container.appendChild(img_elem);
            photo_container.appendChild(sol);
            earthdate_row.appendChild(photo_container);
            photos_div.appendChild(earthdate_row);
        })
    })
}