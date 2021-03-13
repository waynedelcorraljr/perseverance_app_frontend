const endPointEarthDates = "http://localhost:3000/api/v1/earthdates"
const endPointPhotos = "http://localhost:3000/api/v1/photos"

document.addEventListener('DOMContentLoaded', () => {
    fetch(endPointEarthDates)
    .then(response => response.json())
    .then(earthdates => {
        console.log(earthdates);
        createEarthDates(earthdates);
    });
});


function createEarthDates(earthdates) {
   const ed_div = document.querySelector(".ed");
   earthdates["data"].forEach((d) => {
    const ed_container = document.createElement("div");
    const ed_header = document.createElement('h3');
    const ed_p = document.createElement('p')
    ed_header.innerText = d["attributes"]["date"];
    ed_p.innerText = `Available Photos: ${d["attributes"]["total_photos"]}`;
    ed_container.appendChild(ed_header);
    ed_container.appendChild(ed_p);
    ed_div.appendChild(ed_container);
   })
    
}