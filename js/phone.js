// get search text
const searchPhone = ()=>{

    const searchField=document.getElementById("search-field");
   const searchFieldText=searchField.value;

   const displayDetailContainer=document.getElementById('detail-container');
displayDetailContainer.textContent="";
  
 
  const searchFieldTextToLower= searchFieldText.toLowerCase();
 // getPhone(searchFieldTextToLower);
 
  // console.log(searchFieldTextToLower)

    // console.log(phone)
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFieldTextToLower}`)
    .then(res=>res.json())
    .then(data=>displayPhone(data));
    searchField.value='';

}
// display scarch result

const displayPhone=(phones)=>{

    if(phones.status ===false) {
        console.log('9')
    } else {

console.log(phones);
const displayPhoneContainer = document.getElementById("display-field-container");
displayPhoneContainer.innerHTML='';

phones.data.slice(0,20).forEach(phone => {
    const div=document.createElement("div");
    div.classList.add('col');
    div.innerHTML=`
    <div class="card h-100">
    <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
    <div class="card-body">
      <h5 class="card-title">Name-${phone.phone_name}</h5>

      <h5 class="card-title"> Brand-${phone.brand}</h5>

     <button class="rounded btn btn-secondary" onclick="getDetail('${phone.slug}')" >DETAIL</button>
    </div>
  </div>
    `
displayPhoneContainer.appendChild(div)




});
}

}
// get detail
const getDetail=(phoneId)=>{
    console.log(phoneId)
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res=>res.json())
    .then(data=>displayDetail(data.data))
}
// display detail
const displayDetail =(detailData)=>{
  console.log(detailData)
const displayDetailContainer=document.getElementById('detail-container');
displayDetailContainer.innerHTML='';
const detailDiv=document.createElement("div");
detailDiv.classList.add("card");
detailDiv.innerHTML=`
<img src="${detailData.image}" class="card-img-top w-50 mx-auto" alt="...">
<div class="card-body">
  <h5 class="card-title">${detailData.name}</h5>
  <p class="card-text">Release Date:${detailData.releaseDate?detailData.releaseDate:'Not available'}</p>
  <p>Storage:${detailData.mainFeatures.storage}</p>
  <p> Memory:${detailData.mainFeatures.memory}</p>
  <p> Display-Size:${detailData.mainFeatures.displaySize}</p>
  <p> Chip-Set:${detailData.mainFeatures.chipSet}</p>
  <ul id="sensor-data">Sensors</ul>
</div>
`
displayDetailContainer.appendChild(detailDiv);
const sensorData = detailData.mainFeatures.sensors;

for (let i=0; i < sensorData.length; i++){
    const li = document.createElement('li');
    li.innerText = detailData.mainFeatures.sensors[i];
    document.getElementById("sensor-data").appendChild(li);
}

}

//getPhone('iphone')