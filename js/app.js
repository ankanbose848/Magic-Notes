console.log("This is magic notes");

showNotes();

// If user adds a note, add it to local storage
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function(e){
  let addTitle = document.getElementById('addTitle')
  let addTxt = document.getElementById('addTxt')
  let notes = localStorage.getItem('notes')
  if(notes == null){
    notesObj = []
  }
  else{
    notesObj = JSON.parse(notes)
  }
  notesObj.push({title:addTitle.value, note:addTxt.value});
  localStorage.setItem('notes', JSON.stringify(notesObj))
  addTitle.value = "";
  addTxt.value = "";
  showNotes();
})

// Function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes")
  if(notes == null){
    notesObj = []
  }
  else{
    notesObj = JSON.parse(notes)
  }
  let html = "";
  notesObj.forEach((element,index) => {
    html = html + `
    <div class="noteCard card my-2 mx-3 " style="width: 18rem; background:#d5ebea; border: 2px solid #00678f; border-radius: 7px;">
      <div class="card-body">
        <h5 class="card-title" style="font-weight:bold;">${element.title}</h5>
        <p class="card-text">${element.note}</p>
        <button onClick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
      </div>
    </div>`;
  });
  let notesElm = document.getElementById('notes');
  if(notesObj.length != 0){
    notesElm.innerHTML = html;
  }
  else{
    notesElm.innerHTML = `<h3 style="color: gray; opacity: 0.6"> No notes to show. </h3>`
  }
}


// Function to delete a note
function deleteNote(index){
  let notes = localStorage.getItem('notes')
  if(notes == null){
    notesObj = []
  }
  else{
    notesObj = JSON.parse(notes)
  }
  // splice(x,y)--> deletes y number of elements starting from index x
  notesObj.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notesObj));
  showNotes();
}

// Function to search notes
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach((element) => {
    let cardTxt = element.getElementsByTagName('p')[0].textContent;
    cardTxt = cardTxt.toLowerCase();
    if (cardTxt.includes(inputVal)){
      element.style.display = "block"
    }
    else{
      element.style.display = "none"
    }
  });
})
