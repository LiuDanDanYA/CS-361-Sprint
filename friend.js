


var addFriend = document.getElementById('add-Friend');
var backdrop = document.getElementById('modal-backdrop');
var modal = document.getElementById('modal');
var closeBtn = document.getElementById('modal-close');
var acceptBtn = document.getElementById('modal-accept');

addFriend.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
acceptBtn.addEventListener('click', handleAdd);

function openModal() {
  modal.style.display = "block";
  backdrop.classList.toggle('hidden');
}

function closeModal() {
  modal.style.display = "none";
  backdrop.classList.toggle('hidden');
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    backdrop.classList.toggle('hidden');
  }
}

function addNewFriend() {
  var table = document.getElementById('friendTable');
  var aFirst = document.getElementById('firstName').value.trim();
  var aLast = document.getElementById('lastName').value.trim();
  var aTele = document.getElementById('telephone').value.trim();
  var aEmail = document.getElementById('email').value.trim();
  var aStat = document.getElementById('status');
  var opt = aStat.options[aStat.selectedIndex];

  aTele = aTele.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');

  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  cell1.innerHTML = aFirst;
  cell2.innerHTML = aLast;
  cell3.innerHTML = aTele;
  cell4.innerHTML = aEmail;
  cell5.innerHTML = opt.text;
  cell6.innerHTML = "<button id='editbtn';>Edit</button>";
  closeModal();
  clearAdd();
}

function handleAdd () {
  var aFirst = document.getElementById('firstName').value.trim();
  var aLast = document.getElementById('lastName').value.trim();
  var aTele = document.getElementById('telephone').value.trim();
  var aEmail = document.getElementById('email').value.trim();
  var aStat = document.getElementById('status');
  var opt = aStat.options[aStat.selectedIndex];

  if (!aFirst || !aLast || !aTele || !aEmail) {
    alert('All Fields Must Be Filled');
  } else {
    addNewFriend();
  }
}


function clearAdd() {
  postName = document.getElementById('firstName').value = "";
  postPhoto = document.getElementById('lastName').value = "";
  postPrice = document.getElementById('telephone').value = "";
  postCity = document.getElementById('email').value= "";
  postCondition = document.getElementById('status').selectedIndex = "Healthy";
}

function validateEmail(elementValue){
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return emailPattern.test(elementValue);
 }
 var UserID = "Ericdf";

 var Singleton = (function () {
     var instance;

     function createInstance() {
         var object = new Object(UserID);
         return object;
     }

     return {
         getInstance: function () {
             if (!instance) {
                 instance = createInstance();
             }
             return instance;
         }
     };
 })();

 console.log(Singleton.getInstance());
