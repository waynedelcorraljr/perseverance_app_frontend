

const endPointEarthDates = "http://localhost:3000/api/v1/earthdates"
const endPointPhotos = "http://localhost:3000/api/v1/photos"
const emptyHeart = "♡" 
const filledHeart = "♥"

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
   ed_row.className = "row d-flex justify-content-center"
   ed_row.id = "override"
   earthdates["data"].forEach((d) => {
        const button = document.createElement('div');
        button.className = "p-2"
        const ed_container = document.createElement("div");
        ed_container.className = "btn btn-primary col-xs-6 col-sm-4 col-md-2 col-lg-2";
        const ed_header = document.createElement('h3');
        const ed_p = document.createElement('p')
        ed_header.innerText = d["attributes"]["date"];
        ed_p.innerText = `Available Photos: ${d["attributes"]["total_photos"]}`;
        ed_container.appendChild(ed_header);
        ed_container.appendChild(ed_p);
        button.appendChild(ed_container);
        ed_row.appendChild(button);
        ed_div.appendChild(ed_row);
   })
    
}

function createPhotos(earthdates) {
    const photos_div = document.querySelector("#photos");
    photos_div.className = "container-fluid";
    earthdates["data"].forEach((d) => {
        const earthdate_row = document.createElement("div");
        earthdate_row.className = "row border"
        earthdate_row.id = d["id"];
        const earthdate_row_header = document.createElement("h4");
        earthdate_row_header.innerText = d["attributes"]["date"];
        earthdate_row_header.className = "text-center";
        earthdate_row.appendChild(earthdate_row_header);
        d["attributes"]["photos"].forEach((p) => {
            const photo_container = document.createElement("div");
            const sol = document.createElement("p");
            const heart = document.createElement("p");
            const img_elem = document.createElement("img");
            heart.id = "empty"
            heart.innerText = emptyHeart + ` Total likes: ${p["likes"]}`;
            sol.innerText = `Sol: ${p["sol"]}`;
            img_elem.src = p["img_src"];
            img_elem.className = "img-fluid img-thumbnail";
            photo_container.className = "col-1 col-md-2"
            photo_container.id = p["id"]
            photo_container.appendChild(img_elem);
            photo_container.appendChild(heart)
            photo_container.appendChild(sol);
            earthdate_row.appendChild(photo_container);
            photos_div.appendChild(earthdate_row);
        })
    })
}

function patchFetch(photo_id) {
    fetch(endPointPhotos + '/' + photo_id, () => {
        METHOD: "PATCH"
    })
}