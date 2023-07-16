
const commandPrefix = "Visitor@YREZEHI:/index$";

const DIRECTORY_COLOR = "#5a73b3";
const USER_COLOR = "#89a764";

var terminalCursor = document.getElementById("terminal-cursor");

const commands = {
    "help": {
        "output": `
            Usage: help [OPTION]...
            Display information about builtin commands.

            Options:
            ${paddedText("ls")}
            ${paddedText("cd")}
            ${paddedText("wget")}
        `
    }
};

function paddedText(text, value){
    return text.padEnd(value);
}

terminalCursor.onkeydown = function (event) {
    if (event.key === 'Enter'){
        parseCommand(terminalCursor.textContent);
        event.preventDefault();
    }
}

document.body.onclick = function (event) {
    terminalCursor.focus();
}

function buildCommandPrefix(){
    const userElement = document.createElement("span");
    userElement.textContent = "Visitor@YREZEHI:";
    document.body.appendChild(userElement);

    const cursorElement = document.createElement("span");
    cursorElement.id = "terminal-cursor";
    cursorElement.spellcheck = false;
    cursorElement.contentEditable = false;
    cursorElement.classList.add("min-w-fit w-2 ml-1 caret-transparent align-middle color-transparent text-white outline-0");
    document.body.appendChild(cursorElement);

    const directoryElement = document.createElement("span");
    directoryElement.classList.add(`text-[${DIRECTORY_COLOR}]`);
    document.body.appendChild(cursorElement);

    const suffixElement = document.createElement("span");
    suffixElement.classList.add("text-white");
    suffixElement.textContent = "$";
    document.body.appendChild(suffixElement);
}

function moveCaretToNewLine(){
    terminalCursor.contentEditable = false;
}

function parseCommand(command){
    if(commands.hasOwnProperty(command)){
        moveCaretToNewLine();
    }
}

buildCommandPrefix();