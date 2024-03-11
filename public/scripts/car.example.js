class Car {
    static list = [];

    static init(cars) {
        this.list = cars.map((i) => new this(i));
    }

    constructor({
        id,
        plate,
        manufacture,
        model,
        image,
        rentPerDay,
        capacity,
        description,
        transmission,
        available,
        type,
        year,
        options,
        specs,
        availableAt,
    }) {
        this.id = id;
        this.plate = plate;
        this.manufacture = manufacture;
        this.model = model;
        this.image = image;
        this.rentPerDay = rentPerDay;
        this.capacity = capacity;
        this.description = description;
        this.transmission = transmission;
        this.available = available;
        this.type = type;
        this.year = year;
        this.options = options;
        this.specs = specs;
        this.availableAt = availableAt;
    }

    render() {
        return `
            <div class="card flex-column" style="width: 18rem">
                <img
                    src="${this.image}"
                    class="card-img-top"
                    alt="car-img"
                    style="width: 100%; height: 200px; object-fit: cover;"

                />
                <div class="card-body flex-grow-1">
                    <h5 class="card-title">${this.manufacture} ${this.model}</h5>
                    <p class="card-text price">Rp ${this.rentPerDay} / hari</p>
                    <p class="card-text" style="height: 7rem">
                        ${this.description}
                    </p>
                    <p>
                        <img src="img/fi_users.png" alt="users" /><span
                            class="ps-2"
                            >${this.capacity}</span
                        >
                    </p>
                    <p>
                        <img
                            src="img/fi_settings.png"
                            alt="users"
                        /><span class="ps-2">${this.transmission}</span>
                    </p>
                    <p>
                        <img
                            src="img/fi_calendar.png"
                            alt="users"
                        /><span class="ps-2">Tahun ${this.year}</span>
                    </p>
                    <a href="#" class="btn btn-success btn-pilih"
                        >Pilih Mobil</a
                    >
                </div>
            </div>
        `;
    }
}
