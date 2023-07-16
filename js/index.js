
const commandPrefix = "Visitor@YREZEHI:/index$";

var terminalCursor = document.getElementById("terminal-cursor");

terminalCursor.onkeydown = function (event) {
    if (event.key === 'Enter'){
        event.preventDefault();
    }
}

document.body.onclick = function (event) {
    terminalCursor.focus();
}