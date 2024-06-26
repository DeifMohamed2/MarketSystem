  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  get,
  update,
  remove,
  push,
  onChildAdded, onChildChanged, onChildRemoved,
  query,orderByChild,  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDikvmh9qA4gdx7gXgYf9eOefKQoPIRKE8",
    authDomain: "marketsystem-7.firebaseapp.com",
    projectId: "marketsystem-7",
    storageBucket: "marketsystem-7.appspot.com",
    messagingSenderId: "171170577755",
    appId: "1:171170577755:web:672b527f4c16c96086ae7e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);


const mainForm = document.getElementById('mainForm');
const tbody = document.getElementById('tbody')

// totals
const HTotalOfCash = document.getElementById('TotalOfCash')
const HTotalOfCreidt = document.getElementById('TotalOfCreidt')
const HTotalOfBothDeposit = document.getElementById('TotalOfBothDeposit')
const HTotalOfCashWithdraw = document.getElementById('TotalOfCashWithdraw')
const HTotalOfCreidtWithdraw = document.getElementById('TotalOfCreidtWithdraw')
const HTotalOfBothWithdraw = document.getElementById('TotalOfBothWithdraw')
const HTotalOfCashAndCashWithdraw = document.getElementById('TotalOfCashAndCashWithdraw')
const HTotalOfCreidtAndCreidtWithdraw = document.getElementById('TotalOfCreidtAndCreidtWithdraw')
const HTOTAL = document.getElementById('TOTAL')


let currentDate = new Date();
let options = { weekday: 'long' }; // You can use 'short' or 'narrow' for different lengths
let dayName = currentDate.toLocaleDateString('en-US', options);

let day = currentDate.getDate();
let month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1.
let year = currentDate.getFullYear();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds(); 
let amOrPm = hours >= 12 ? 'PM' : 'AM';
// Convert hours to 12-hour format
hours = hours % 12;
hours = hours ? hours : 12; // 0 should be converted to 12 in 12-hour format

// Format the date as a string in the desired format (MM/DD/YYYY or DD/MM/YYYY).
let formattedDat2 = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${amOrPm}`;

mainForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  document.getElementById('AddBtn').setAttribute('disabled',true)
  const Cash = mainForm['Cash'] ;
  const CashNote = mainForm['CashNote'] ;
  const CashWithdraw = mainForm['CashWithdraw'] ;
  const CashWithdrawNote = mainForm['CashWithdrawNote'] ;
  const Creidt = mainForm['Creidt'] ;
  const CreidtNote = mainForm['CreidtNote'] ;
  const CreidtWithdraw = mainForm['CreidtWithdraw'] ;
  const CreidtWithdrawNote = mainForm['CreidtWithdrawNote'] ;
  
     currentDate = new Date();
     options = { weekday: 'long' }; // You can use 'short' or 'narrow' for different lengths
     dayName = currentDate.toLocaleDateString('en-US', options);

     day = currentDate.getDate();
     month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1.
     year = currentDate.getFullYear();
     hours = currentDate.getHours();
     minutes = currentDate.getMinutes();
     seconds = currentDate.getSeconds(); 
     amOrPm = hours >= 12 ? 'PM' : 'AM';
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be converted to 12 in 12-hour format

    // Format the date as a string in the desired format (MM/DD/YYYY or DD/MM/YYYY).
     formattedDat2 = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${amOrPm}`;


  if ((!Cash.value=="")||(!CashWithdraw.value=="")||(!Creidt.value=="")||(!CreidtWithdraw.value=="")) {


     let ID = Math.floor((Math.random() * 4000) + 6000);
     let TOTALOFALL = (((+Cash.value)+ (+Creidt.value)) - ((+CreidtWithdraw.value)+(+CashWithdraw.value))) 
    set(ref(db, "MarketData1/"+"ByDays/" + `${day}-${month}-${year}/` +ID   ), {
      Cash:+Cash.value||0,
      CashNote:+CashNote.value||0,
      CashWithdraw:+CashWithdraw.value||0,
      CashWithdrawNote:CashWithdrawNote.value,
      Creidt:+Creidt.value||0,
      TOTALCashAndCredit :((+Cash.value)+ (+Creidt.value)||0) ,
      CreidtNote:CreidtNote.value,
      CreidtWithdraw:+CreidtWithdraw.value||0,
      CreidtWithdrawNote:CreidtWithdrawNote.value,
      TOTALCashAndCreditWithDraw:(+CreidtWithdraw.value)+(+CashWithdraw.value)||0,
      TOTALOFALL :TOTALOFALL,
      ID:ID,
      dayName :dayName,
      Date :formattedDat2 ,
      MakedAt :serverTimestamp(),
      updateAt : serverTimestamp(),
    }).then(()=>{
          tbody.innerHTML+=`
          <tr>
                              <th scope="row">1</th>
                              <td>${Cash.value||0}<span> $</span></td>
                              <td>${Creidt.value||0}<span> $</span></td>
                              <td>${(+Cash.value)+ (+Creidt.value)||0}<span> $</span></td>
                              <td>${CashWithdraw.value||0}<span> $</span></td>
                              <td>${CreidtWithdraw.value||0}<span> $</span></td>
                              <td>${(+CreidtWithdraw.value)+(+CashWithdraw.value)||0}<span> $</span></td>
                              <td>${TOTALOFALL||0}<span> $</span></td>
                              <td>${formattedDat2}</td>

                              <td><button onclick="module.Update(this.id)" id=${ID} >Update</button></td>
                              <td><button class="del">Delete</button></td>
                            </tr>
      
      `
      const dbRef2 = ref(
        db,
        "MarketData1/" + "ByDays/" + `${day}-${month}-${year}/`   
      );
      let TotalOfCash = 0
      let TotalOfCreidt = 0
      let TotalOfBothDeposit = 0
      let TotalOfCashWithdraw = 0
      let TotalOfCreidtWithdraw = 0
      let TotalOfBothWithdraw = 0
      let TotalOfCashAndCashWithdraw = 0
      let TotalOfCreidtAndCreidtWithdraw = 0
      let TOTAL = 0
      onValue(
        dbRef2,
        (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            TotalOfCash +=childData.Cash
            TotalOfCreidt +=childData.Creidt
            TotalOfBothDeposit+=childData.TOTALCashAndCredit
            TotalOfCashWithdraw += childData.CashWithdraw
            TotalOfCreidtWithdraw += childData.CreidtWithdraw
            TotalOfBothWithdraw += childData.TOTALCashAndCreditWithDraw
            TotalOfCashAndCashWithdraw = (TotalOfCash - TotalOfCashWithdraw)
            TotalOfCreidtAndCreidtWithdraw = (TotalOfCreidt - TotalOfCreidtWithdraw)

            TOTAL= (TotalOfBothDeposit - TotalOfBothWithdraw)

          });
          HTotalOfCash.innerHTML=TotalOfCash
          HTotalOfCreidt.innerHTML=TotalOfCreidt
          HTotalOfBothDeposit.innerHTML=TotalOfBothDeposit
          HTotalOfCashWithdraw.innerHTML=TotalOfCashWithdraw
          HTotalOfCreidtWithdraw.innerHTML=TotalOfCreidtWithdraw
          HTotalOfBothWithdraw.innerHTML=TotalOfBothWithdraw
          HTotalOfCashAndCashWithdraw.innerHTML=TotalOfCashAndCashWithdraw
          HTotalOfCreidtAndCreidtWithdraw.innerHTML=TotalOfCreidtAndCreidtWithdraw
          HTOTAL.innerHTML=TOTAL
        },
        {
          onlyOnce: true,
        }
      );
      

      mainForm.reset()  
      document.getElementById('AddBtn').removeAttribute('disabled')


    })



  }else{
    console.log("notdone")
    document.getElementById('message').innerHTML = "You should Enter one Value at least"
  }

 
});


let TotalOfCash = 0
let TotalOfCreidt = 0
let TotalOfBothDeposit = 0
let TotalOfCashWithdraw = 0
let TotalOfCreidtWithdraw = 0
let TotalOfBothWithdraw = 0
let TotalOfCashAndCashWithdraw = 0
let TotalOfCreidtAndCreidtWithdraw = 0
let TOTAL = 0
const dbRef = query(ref(db,"MarketData1/"  +"ByDays/" +`${day}-${month}-${year}/`), orderByChild("MakedAt"))

onValue(
  dbRef,
  (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      TotalOfCash += childData.Cash
      TotalOfCreidt += childData.Creidt
      TotalOfBothDeposit+=childData.TOTALCashAndCredit
      TotalOfCashWithdraw += childData.CashWithdraw
      TotalOfCreidtWithdraw += childData.CreidtWithdraw
      TotalOfBothWithdraw += childData.TOTALCashAndCreditWithDraw
      TotalOfCashAndCashWithdraw = (TotalOfCash - TotalOfCashWithdraw)
      TotalOfCreidtAndCreidtWithdraw = (TotalOfCreidt - TotalOfCreidtWithdraw)

      TOTAL = (TotalOfBothDeposit - TotalOfBothWithdraw)

      tbody.innerHTML+=`
        <tr>
                            <th scope="row">1</th>
                            <td>${childData.Cash}<span> $</span></td>
                            <td>${childData.Creidt}<span> $</span></td>
                            <td>${childData.TOTALCashAndCredit}<span> $</span></td>
                            <td>${childData.CashWithdraw}<span> $</span></td>
                            <td>${childData.CreidtWithdraw}<span> $</span></td>
                            <td>${childData.TOTALCashAndCreditWithDraw}<span> $</span></td>
                            <td>${childData.TOTALOFALL}<span> $</span></td>
                            <td>${childData.Date}</td>

                            <td><button onclick="module.Update(this.id)" id=${childData.ID}>Update</button></td>
                            <td><button class="del">Delete</button></td>
                          </tr>
    
      `

    });
    HTotalOfCash.innerHTML= TotalOfCash
    HTotalOfCreidt.innerHTML=TotalOfCreidt
    HTotalOfBothDeposit.innerHTML=TotalOfBothDeposit
    HTotalOfCashWithdraw.innerHTML=TotalOfCashWithdraw
    HTotalOfCreidtWithdraw.innerHTML=TotalOfCreidtWithdraw
    HTotalOfBothWithdraw.innerHTML=TotalOfBothWithdraw
    HTotalOfCashAndCashWithdraw.innerHTML=TotalOfCashAndCashWithdraw
    HTotalOfCreidtAndCreidtWithdraw.innerHTML=TotalOfCreidtAndCreidtWithdraw
    HTOTAL.innerHTML=TOTAL
  },
  {
    onlyOnce: true,
  }
);

 function Update(ID){
  console.log(ID ,`${day}-${month}-${year}/`  )
  const dbRef = ref(db);  
  get(child(dbRef,  "MarketData1/"  +"ByDays/" +`${day}-${month}-${year}/` +ID  ))
  
  
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val() )
      document.getElementById('Cash').value =  snapshot.val().Cash 
      document.getElementById('CashNote').value = snapshot.val().CashNote
      document.getElementById('CashWithdraw').value = snapshot.val().CashWithdraw
      document.getElementById('CashWithdrawNote').value = snapshot.val().CashWithdrawNote
      document.getElementById('Creidt').value = snapshot.val().Creidt
      document.getElementById('CreidtNote').value = snapshot.val().CreidtNote
      document.getElementById('CreidtWithdraw').value = snapshot.val().CreidtWithdraw
      document.getElementById('CreidtWithdrawNote').value = snapshot.val().CreidtWithdrawNote

      document.getElementById('AddBtn').style.display ='none'
      document.querySelector('.UpdateBTN').style.display ="inline"
      document.querySelector('.UpdateBTN').setAttribute('id',ID)
    }})

  scroll({
    top: 0,
    behavior: "smooth",
  });
  
}

module.Update=Update


function saveUpdate(ID){
  document.querySelector('.UpdateBTN').setAttribute('disabled',true)

  let Cash = document.getElementById('Cash')
  let CashNote = document.getElementById('CashNote')
  let CashWithdraw = document.getElementById('CashWithdraw')
  let CashWithdrawNote = document.getElementById('CashWithdrawNote') 
  let Creidt = document.getElementById('Creidt')
  let CreidtNote =  document.getElementById('CreidtNote')
  let CreidtWithdraw = document.getElementById('CreidtWithdraw')
  let CreidtWithdrawNote =  document.getElementById('CreidtWithdrawNote')  
  let TOTALOFALL = (((+Cash.value)+ (+Creidt.value)) - ((+CreidtWithdraw.value)+(+CashWithdraw.value))) 

  update(ref(db, "MarketData1/"+"ByDays/" + `${day}-${month}-${year}/` +ID   ), {
    Cash:+Cash.value||0,
    CashNote:+CashNote.value||"",
    CashWithdraw:+CashWithdraw.value||0,
    CashWithdrawNote: CashWithdrawNote.value ||"",
    Creidt:+Creidt.value||0,
    TOTALCashAndCredit :((+Cash.value)+ (+Creidt.value)||0) ,
    updateAt : serverTimestamp(),
    CreidtNote:CreidtNote.value||"" ,
    CreidtWithdraw:+CreidtWithdraw.value || 0,
    CreidtWithdrawNote: CreidtWithdrawNote.value|| '',
    TOTALCashAndCreditWithDraw:(+CreidtWithdraw.value)+(+CashWithdraw.value)||0,
    TOTALOFALL :TOTALOFALL
  }).then(()=>{
      window.location.reload()
      document.querySelector('.UpdateBTN').style.display ="none"
      document.querySelector('.UpdateBTN').setAttribute('id',0)
      document.querySelector('.UpdateBTN').remove('disabled')

  })

}
module.saveUpdate=saveUpdate

