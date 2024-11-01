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
}

function AddHelloMessage(name){
    document.getElementById("helloMessage").innerHTML = "Hello, " + name + "!";
}