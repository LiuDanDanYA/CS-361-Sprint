


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
  var check = document.getElementById('box').checked;

  aTele = aTele.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3');

  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);

  cell1.innerHTML = aFirst;
  cell2.innerHTML = aLast;
  cell3.innerHTML = aTele;
  cell4.innerHTML = aEmail;
  cell5.innerHTML = opt.text;
  if (check == true) {
    cell6.innerHTML = "<input type='checkbox'  id='box' checked></input>";
  } else {
    cell6.innerHTML = "<input type='checkbox'  id='box'></input>";
  }
  cell7.innerHTML = "<button id='editbtn';>Edit</button>";
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

 var databaseSingleton = (function () {
     var instance;

     function createInstance() {
       var databaseCon = {
        host: "classmysql.engr.oregonstate.edu",
        user: "cs340_hoanger",
        password: "Ironman1",
        database : 'cs340_hoanger'};
         return databaseCon;
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

 console.log(databaseSingleton.getInstance());
