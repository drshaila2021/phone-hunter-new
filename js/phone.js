const displayDetailContainer = document.getElementById("detail-container");
const displayAllContainer = document.getElementById("display-field-container");
const displayLoader = document.getElementById("loader");
const displayInvalidInput = document.getElementById("phone-invalid");
const displayAllDataBtn = document.getElementById("show-all-btn");

// Search phone
const searchPhone = () => {
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;
  displayDetailContainer.textContent = "";
  const searchText = searchFieldText.toLowerCase();
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayPhone(data));

  searchField.value = "";
};

// Display 20 phone scarch result
const displayPhone = (phones) => {
  if (phones.status === false) {
    displayInvalidInput.style.display = "block";
    displayDetailContainer.textContent = "";
    displayAllContainer.textContent = "";
    displayLoader.style.display = "none";
  } else {
    displayInvalidInput.style.display = "none";
    displayLoader.style.display = "none";
    const displayPhoneContainer = document.getElementById(
      "display-field-container"
    );
    displayPhoneContainer.textContent = "";

    const phoneAll = phones.data;
    const phone20 = phones.data.slice(0, 20);

    phone20.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
    <div class="card h-100">
    <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-3" alt="...">
    <div class="card-body">
      <h5 class="card-title">Name: ${phone.phone_name}</h5>
      <h5 class="card-title">Brand: ${phone.brand}</h5>
     <button class="rounded btn btn-secondary w-125" onclick="getDetail('${phone.slug}')" >Show Detail</button>
    </div>
  </div>
    `;
      displayPhoneContainer.appendChild(div);
    });

    if (phoneAll.length > 20) {
      displayAllDataBtn.style.display = "block";
    }
  }
};

// get single phone detail
const getDetail = (phoneId) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then((res) => res.json())
    .then((data) => displayDetail(data.data));
};

// display single phone detail
const displayDetail = (detailData) => {
  const displayDetailContainer = document.getElementById("detail-container");
  displayDetailContainer.textContent = "";
  const detailDiv = document.createElement("div");
  detailDiv.classList.add("card");
  detailDiv.innerHTML = `
<img src="${detailData.image}" class="card-img-top w-50 mx-auto mt-3" alt="...">
<div class="card-body">
  <h4 class="card-title text-center">${detailData.name}</h4>
  <hr>
  <p class="card-text"><b>Brand:</b> ${detailData.brand}</p>
  <p class="card-text"><b>Release Date:</b> ${
    detailData.releaseDate ? detailData.releaseDate : "Not available"
  }</p>
  <p class="card-text"><b>Storage:</b> ${detailData.mainFeatures.storage}</p>
  <p class="card-text"><b>Memory:</b> ${detailData.mainFeatures.memory}</p>
  <p class="card-text"><b>Display-Size:</b> ${
    detailData.mainFeatures.displaySize
  }</p>
  <p class="card-text"><b>Chip-Set:</b> ${detailData.mainFeatures.chipSet}</p>
  <ul class="card-text" id="sensor-data"><b>Sensors:</b><br></ul>
  <ul class="card-text" id="others-data"><b>Others:</b><br></ul>
</div>
`;
  displayDetailContainer.appendChild(detailDiv);

  //sensor data of single phone
  const sensorsData = detailData.mainFeatures.sensors;
  for (const sensor of sensorsData) {
    const li = document.createElement("li");
    li.innerText = `${sensor}`;
    document.getElementById("sensor-data").appendChild(li);
  }

  //other data of single phone
  for (const [key, value] of Object.entries(detailData.others)) {
    const li = document.createElement("li");
    li.innerText = `${key}: ${value}`;
    document.getElementById("others-data").appendChild(li);
  }
};
