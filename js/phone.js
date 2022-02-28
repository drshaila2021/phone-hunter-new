const searchPhone = ()=>{
    const searchField=document.getElementById("search-field");
   const searchFieldText=searchField.value;
  const searchFieldTextToLower= searchFieldText.toLowerCase();
  getPhone(searchFieldTextToLower);
 searchField.value='';
  // console.log(searchFieldTextToLower)

}

const getPhone = (searchName)=>{
   // console.log(phone)
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchName}`)
    .then(res=>res.json())
    .then(data=>displayPhone(data.data))

}
const displayPhone=(phones)=>{
console.log(phones);
const displayPhoneContainer = document.getElementById("display-field-container");
displayPhoneContainer.innerText='';
phones.forEach(phone => {
    
    const div=document.createElement("div");
    div.classList.add('col')
    div.innerHTML=`
    <div class="card h-100">
    <img src="${phone.image}" class="card-img-top" alt="...">
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
// get detail
const getDetail=(phoneId)=>{
    console.log(phoneId)
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res=>res.json())
    .then(data=>console.log(data.data))
}
// display detail
const displayDetail =(detailData)=>{

}

//getPhone('iphone')