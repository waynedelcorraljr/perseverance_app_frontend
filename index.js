

const endPointEarthDates = "http://localhost:3000/api/v1/earthdates"
const endPointPhotos = "http://localhost:3000/api/v1/photos"
const emptyHeart = "♡" 
const fullHeart = "♥"

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
   ed_row.className = "row d-flex justify-content-evenly"
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
   document.getElementById('rover_gif').hidden = true;
}

function addHeartEvent(element, photo_id, current_likes) {
    element.addEventListener('click', () => {
        fetch(endPointPhotos + '/' + photo_id, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({photo_id: photo_id, likes: element["id"]})
        })
        
        if(element["id"] == "empty") {
            element.innerText = fullHeart + ` Total likes: ${current_likes += 1}`;
            element["id"] = "full";
        } else {
            element.innerText = emptyHeart + ` Total likes: ${current_likes -= 1}`;
            element["id"] = "empty";
        }
        console.log(photo_id)
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
        d["attributes"]["photos"].sort((a, b) => parseFloat(b["likes"]) - parseFloat(a["likes"])).forEach((p) => {
            const photo_container = document.createElement("div");
            const sol = document.createElement("p");
            const heart = document.createElement("p");
            addHeartEvent(heart, p["id"], p["likes"]);
            const img_elem = document.createElement("img");
            heart.id = "empty"
            heart.innerText = emptyHeart + ` Total likes: ${p["likes"]}`;
            sol.innerText = `Sol: ${p["sol"]}`;
            img_elem.src = p["img_src"];
            img_elem.className = "img-fluid img-thumbnail";
            addPopOutEvent(img_elem, p["img_src"])
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

function addPopOutEvent(element, img_src) {
    element.addEventListener('click', () => {
        openWindow(img_src);
    })
}

let w = 480, h = 340;
function openWindow(img_src){
if (document.getElementById) {
   w = screen.availWidth;
   h = screen.availHeight;
}  

const popW = 800, popH = 700;

const leftPos = (w-popW)/2;
const topPos = (h-popH)/2;

msgWindow = window.open('','popup','width=' + popW + ',height=' + popH + ',top=' + topPos + ',left=' + leftPos + ',       scrollbars=yes');
msgWindow.document.write 
    ('<HTML><HEAD><TITLE>Perseverance Rover Photo</TITLE></HEAD><BODY><FORM    NAME="photo">' +
    `<img src=${img_src}>` +
    ' Click the button below to close the window.<br />' +
    '<INPUT TYPE="button" VALUE="X"onClick="window.close();"></FORM></BODY>   </HTML>');
}