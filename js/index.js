
const commandPrefix = "Visitor@YREZEHI:/index$";

const DIRECTORY_COLOR = "#5a73b3";
const USER_COLOR = "#89a764";

const TERMINAL_CURSOR = "terminal-cursor";
const TERMINAL_CARET = "terminal-caret";

var terminalWindow = document.getElementById("terminal-window");

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

document.getElementById(TERMINAL_CARET).onkeydown = function (event) {
    if (event.key === 'Enter'){
        parseCommand(document.getElementById(TERMINAL_CARET).textContent);
        event.preventDefault();
    }
}

document.body.onclick = function (event) {
    document.getElementById(TERMINAL_CARET).focus();
}

function buildCommandPrefix(){
    moveCaretToNewLine();

    const userElement = document.createElement("span");
    userElement.classList.add(`text-[${USER_COLOR}]`);
    userElement.textContent = "Visitor@YREZEHI:";
    terminalWindow.appendChild(userElement);

    const directoryElement = document.createElement("span");
    directoryElement.classList.add(`text-[${DIRECTORY_COLOR}]`);
    directoryElement.textContent = "/";
    terminalWindow.appendChild(directoryElement);

    const suffixElement = document.createElement("span");
    suffixElement.textContent = "$";
    suffixElement.classList.add("text-white");
    terminalWindow.appendChild(suffixElement);

    const caretElement = document.createElement("span");
    caretElement.id = TERMINAL_CARET;
    caretElement.spellcheck = false;
    caretElement.contentEditable = true;
    caretElement.classList.add("min-w-fit", "w-2", "caret-transparent", "align-middle", "color-transparent", "text-white", "outline-0");
    terminalWindow.appendChild(caretElement);

    const cursorElement = document.createElement("span");
    cursorElement.id = TERMINAL_CURSOR;
    cursorElement.classList.add("animate-pulse", "bg-white", "w-2", "h-4", "mt-1");
    terminalWindow.appendChild(cursorElement);
}

function moveCaretToNewLine(){
    document.getElementById(TERMINAL_CARET).contentEditable = false;
    document.getElementById(TERMINAL_CURSOR).remove();
}

function parseCommand(command){
    if(commands.hasOwnProperty(command)){
        moveCaretToNewLine();
    }
}

buildCommandPrefix();