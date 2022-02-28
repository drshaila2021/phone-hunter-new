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
phones.forEach(phone => {
    const div=document.createElement("div");
});

}

//getPhone('iphone')