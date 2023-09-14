var mylead=[]
const inputEl=document.querySelector("#input-el");
let ulEl=document.querySelector("#ul-el");
let del=document.querySelector("#delete");
const save=document.querySelector("#save");
 const leadsfromlocalstorage=JSON.parse(localStorage.getItem("mylead"))

if(leadsfromlocalstorage){
  mylead=leadsfromlocalstorage
  render(mylead);
}
document.querySelector("#input-btn").addEventListener("click",function(){
mylead.push(inputEl.value);
inputEl.value="";
localStorage.setItem("mylead",JSON.stringify(mylead))
render(mylead);
});
function render(lead){
 let leads="";
for(let i=0;i<lead.length;i++){
  leads+=`<li><a href=${lead[i]}>${lead[i]}</a></li>`;
}
ulEl.innerHTML=leads
}
inputEl.addEventListener("keyup", function (e) {
    let key = e.key;
    if (key === "Enter") {
      mylead.push(inputEl.value);
      inputEl.value = ""; // Clear the input field
      localStorage.setItem("mylead",JSON.stringify(mylead))
      render(mylead); // Update the list
    }
  }); 
  del.addEventListener("dblclick",function(){
    localStorage.clear();
    mylead=leadsfromlocalstorage;
    ulEl.innerHTML="";
  })
  save.addEventListener("click",function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
      mylead.push(tabs[0].url)
      localStorage.setItem("mylead",JSON.stringify(mylead))
      render(mylead)
    })
  })
