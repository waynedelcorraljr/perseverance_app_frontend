class Earthdate {
    constructor(date, dateAttributes) {
        this.id = date.id,
        this.date = dateAttributes.date,
        this.total_photos = dateAttributes.total_photos
        Earthdate.all.push(this);
    }

    renderEarthdate() {
        let button = document.createElement('div');
        button.className = "p-2"
        addViewByDateEvent(button, this.date) // this id will match row id="this.date" that will be unhidden at event time.
        let ed_container = document.createElement("div");
        ed_container.className = "btn btn-info col-xs-6 col-sm-4 col-md-2 col-lg-2";
        let ed_header = document.createElement('h3');
        ed_header.innerText = this.date;
        let ed_p = document.createElement('p')
        ed_p.innerText = `Available Photos: ${this.total_photos}`;
        ed_container.appendChild(ed_header);
        ed_container.appendChild(ed_p);
        button.appendChild(ed_container);
        return button;
    }
}

Earthdate.all = [];