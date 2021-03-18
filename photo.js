class Photo {
    constructor(photo) {
        this.id = photo.id,
        this.sol = photo.sol,
        this.status = photo.status,
        this.img_src = photo.img_src,
        this.earth_date = photo.earth_date,
        this.earthdate_id = photo.earthdate_id,
        this.likes = photo.likes
        Photo.all.push(this)

    }

    renderPhoto() {
        let photo_container = document.createElement("div");
        let sol = document.createElement("p");
        let heart = document.createElement("p");
        heart.className = "btn";
        addHeartEvent(heart, this.id, this.likes);
        let img_elem = document.createElement("img");
        heart.id = "empty";
        heart.innerText = emptyHeart + ` Total likes: ${this.likes}`;
        sol.innerText = `Sol: ${this.sol}`;
        img_elem.src = this.img_src;
        img_elem.className = "img-fluid img-thumbnail";
        addPopOutEvent(img_elem, this.img_src);
        photo_container.className = "col-1 col-md-2";
        photo_container.id = this.id;
        photo_container.appendChild(img_elem);
        photo_container.appendChild(heart);
        photo_container.appendChild(sol);
    
    return photo_container;
    }
}

Photo.all = [];