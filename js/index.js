var terminalCursor = document.getElementById("terminal-cursor");

document.getElementById("terminal-cursor").onkeydown = function (event) {
    if (event.key === 'Enter'){
        event.preventDefault();
    }
}