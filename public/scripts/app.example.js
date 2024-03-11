class App {
    constructor() {
        this.clearButton = document.getElementById("clear-btn");
        this.loadButton = document.getElementById("load-btn");
        this.carCard = document.getElementById("car-card");
        this.filterForm = document.getElementById("filter-form");
    }

    async init() {
        await this.load();
        this.filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this.filterCars();
        });

        // // Register click listener
        // this.clearButton.onclick = this.clear;
        // this.loadButton.onclick = this.run;
    }

    run = () => {
        Car.list.forEach((car) => {
            const div = document.createElement("div");
            div.className =
                "col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center align-items-center";
            div.innerHTML = car.render();
            this.carCard.appendChild(div);
        });
    };

    showError = (message) => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
            confirmButtonColor: "#d63031",
        });
    };

    filterCars = () => {
        const filteredCars = Car.list.filter((car) => {
            const driverType =
                this.filterForm.querySelector("#tipe-sopir").value;
            const date = this.filterForm.querySelector("#tanggal").value;
            const pickupTime =
                this.filterForm.querySelector("#waktu-jemput").value;
            const passengerCount =
                this.filterForm.querySelector("#jumlah-penumpang").value;
            const numPassengerCount = Number(passengerCount);
            let carCapacity = Number(car.capacity);

            // * Validate form input
            if (!driverType) {
                this.showError("Tipe Driver tidak boleh kosong");
                return;
            }

            if (!date) {
                this.showError("Tanggal tidak boleh kosong");
                return;
            }

            if (!pickupTime) {
                this.showError("Waktu jemput tidak boleh kosong");
                return;
            }

            // * Filter cars based on form input
            if (date && new Date(car.availableAt) > new Date(date)) {
                return false;
            }

            if (passengerCount && carCapacity < numPassengerCount + 1) {
                return false;
            }

            return true;
        });
        // * Clear the car card before displaying the filtered cars
        this.clear();
        this.displayCars(filteredCars);
    };

    displayCars(filteredCars) {
        filteredCars.forEach((car) => {
            const div = document.createElement("div");
            div.className =
                "col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center align-items-center";
            div.innerHTML = car.render();
            this.carCard.appendChild(div);
        });
    }

    async load() {
        console.log("masuk load");
        const cars = await Binar.listCars();
        Car.init(cars);
    }

    clear = () => {
        let child = this.carCard.firstElementChild;

        while (child) {
            child.remove();
            child = this.carCard.firstElementChild;
        }
    };
}
