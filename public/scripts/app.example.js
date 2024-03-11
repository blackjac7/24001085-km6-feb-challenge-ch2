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
        let carElement = "";
        Car.list.forEach((car) => {
            carElement += `
              <div class="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center align-items-center">
                  <div class="card flex-column" style="width: 18rem">
                      <img
                          src="${car.image}"
                          class="card-img-top"
                          alt="car-img"
                          style="width: 100%; height: 200px; object-fit: cover;"

                      />
                      <div class="card-body flex-grow-1">
                          <h5 class="card-title">${car.manufacture} ${car.model}</h5>
                          <p class="card-text price">Rp ${car.rentPerDay} / hari</p>
                          <p class="card-text" style="height: 6rem">
                              ${car.description}
                          </p>
                          <p>
                              <img src="img/fi_users.png" alt="users" /><span
                                  class="ps-2"
                                  >${car.capacity}</span
                              >
                          </p>
                          <p>
                              <img
                                  src="img/fi_settings.png"
                                  alt="users"
                              /><span class="ps-2">${car.transmission}</span>
                          </p>
                          <p>
                              <img
                                  src="img/fi_calendar.png"
                                  alt="users"
                              /><span class="ps-2">Tahun ${car.year}</span>
                          </p>
                          <a href="#" class="btn btn-success btn-pilih"
                              >Pilih Mobil</a
                          >
                      </div>
                  </div>
              </div>
        `;
        });
        this.carCard.innerHTML = carElement;
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

            if (date && new Date(car.availableAt) > new Date(date)) {
                return false;
            }

            if (passengerCount && carCapacity < numPassengerCount + 1) {
                return false;
            }

            return true;
        });

        this.displayCars(filteredCars);
    };

    displayCars(filteredCars) {
        let carElement = "";
        filteredCars.forEach((car) => {
            carElement += `
              <div class="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center align-items-center">
                  <div class="card flex-column" style="width: 18rem">
                      <img
                          src="${car.image}"
                          class="card-img-top"
                          alt="car-img"
                          style="width: 100%; height: 200px; object-fit: cover;"
                      />
                      <div class="card-body flex-grow-1">
                          <h5 class="card-title">${car.manufacture} ${car.model}</h5>
                          <p class="card-text price">Rp ${car.rentPerDay} / hari</p>
                          <p class="card-text" style="height: 6rem">
                              ${car.description}
                          </p>
                          <p>
                              <img src="img/fi_users.png" alt="users" /><span
                                  class="ps-2"
                                  >${car.capacity}</span
                              >
                          </p>
                          <p>
                              <img
                                  src="img/fi_settings.png"
                                  alt="users"
                              /><span class="ps-2">${car.transmission}</span>
                          </p>
                          <p>
                              <img
                                  src="img/fi_calendar.png"
                                  alt="users"
                              /><span class="ps-2">Tahun ${car.year}</span>
                          </p>
                          <a href="#" class="btn btn-success btn-pilih"
                              >Pilih Mobil</a
                          >
                      </div>
                  </div>
              </div>
        `;
        });
        this.carCard.innerHTML = carElement;
    }

    async load() {
        const cars = await Binar.listCars();
        Car.init(cars);
        this.displayCars(Car.list);
    }

    clear = () => {
        let child = this.carContainerElement.firstElementChild;

        while (child) {
            child.remove();
            child = this.carContainerElement.firstElementChild;
        }
    };
}
