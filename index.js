

const endPointEarthDates = "http://localhost:3000/api/v1/earthdates"
const endPointPhotos = "http://localhost:3000/api/v1/photos"
const emptyHeart = "♡" 
const fullHeart = "❤️"

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
        let button = new Earthdate(d, d.attributes);
        ed_row.appendChild(button.renderEarthdate());
    })
    ed_div.appendChild(ed_row);
   document.getElementById('rover_gif').hidden = true;
}



function createPhotos(earthdates) {
    const photos_div = document.querySelector("#photos");
    photos_div.className = "container-fluid";
    earthdates["data"].forEach((d) => {
        let earthdate_row = renderEarthdateRow(d);
            d["attributes"]["photos"].sort((a, b) => parseFloat(b["likes"]) - parseFloat(a["likes"])).forEach((p) => {
                let newPhoto = new Photo(p);
                earthdate_row.appendChild(newPhoto.renderPhoto());
            })
        photos_div.appendChild(earthdate_row);
    })
}

function renderEarthdateRow(d) {
    let earthdate_row = document.createElement("div");
        earthdate_row.className = "row border";
        earthdate_row.id = d["attributes"]["date"];
        earthdate_row.hidden = true;
        let earthdate_row_header = document.createElement("h4");
        earthdate_row_header.innerText = d["attributes"]["date"];
        earthdate_row_header.className = "text-center";
        earthdate_row.appendChild(earthdate_row_header);
    return earthdate_row;
}

function addViewByDateEvent(element, row_id_date) {
    element.addEventListener('click', () => {
        if (document.getElementById(`${row_id_date}`).hidden == true) {
            document.getElementById(`${row_id_date}`).hidden = false;
        } else {
            document.getElementById(`${row_id_date}`).hidden = true;
        }
    })
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