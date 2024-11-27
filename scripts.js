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
    AddDiaryNotes(name);
}

function AddHelloMessage(name){
    document.getElementById("helloMessage").innerHTML = "Hello, " + name + "!";
}

async function AddDiaryNotes(name){
    const response = await fetch("https://kool.krister.ee/chat/" + name + "DiaryNotes");
    const data = await response.json();
    data.reverse();

    for (const item of data){
       AddDiaryNote(item.date, item.title, item.note) 
    }
}
function AddDiaryNote(date, title, note){
    document.getElementById("notes").innerHTML +=
    `<div class="note">
            <h2>${date}</h2>
            <h1 style=font-size:50px>${title}</h1>
            <p>${note.slice(0, 120) + "..."}</p>
    </div>`;
}

function OpenChooseElementPage(){
    const name = new URLSearchParams(window.location.search).get('name');
    window.open(`chooseelement.html?name=${name}`, "_self");
}