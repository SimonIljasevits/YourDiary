const dbNotesUrl = "https://kool.krister.ee/chat/YourDiaryNotes"
/*
Db notes format is next:
Name:
Note:
Date:
*/
const dbTodoListUrl = "https://kool.krister.ee/chat/YourDiaryToDo"

function OpenDiary() {
    const nameField = document.getElementById("nameField");
    let name = nameField.value
    if (name == ""){
        name = prompt("Do not leave name field empty! It won't work you stupid. Write your name here.")
        //In case user won't write anything in prompt. I dont like to have an empty name LOL
        if (name == "")
            return;
    }
    window.open(`diary.html?name=${name}`, "_self");
}

function LoadDiary(){
    const name = new URLSearchParams(window.location.search).get('name');
    AddHelloMessage(name);
    AddDiaryNotesFromDb(name);
}

function AddHelloMessage(name){
    document.getElementById("helloMessage").innerHTML = "Hello, " + name + "!";
}

let diaryNotes;

async function AddDiaryNotesFromDb(name){
    const response = await fetch("https://kool.krister.ee/chat/" + name + "DiaryNotes");
    const data = await response.json();
    diaryNotes = data;
    data.reverse();

    for (const item of data){
       AddDiaryNote(item.date, item.title, item.note) 
    }
    const notes = document.querySelectorAll('.note');

    notes.forEach(note => {
        note.addEventListener('click', function() {
            for (const item of diaryNotes){
                if (item.title === this.querySelector("h1").innerHTML){
                    const name = new URLSearchParams(window.location.search).get('name');
                    window.open(`note.html?name=${name}&title=${item.title}&note=${item.note}`, "_self");
                }
             }
        });
    });
}
function AddDiaryNote(date, title, note){
    const notesBody = document.getElementById("notes");
    notesBody.innerHTML +=
    `<div class="note">
            <h2>${date}</h2>
            <h1 style=font-size:50px>${title}</h1>
            <p>${note.slice(0, 120) + "..."}</p>
    </div>`;
}

function OpenChooseElementPage(){
    const name = new URLSearchParams(window.location.search).get('name');
    window.open(`notecreator.html?name=${name}`, "_self");
}