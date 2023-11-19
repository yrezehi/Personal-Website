(function () {

    const commandPrefix = "Visitor@YREZEHI:";

    const DIRECTORY_COLOR = "#5a73b3";
    const USER_COLOR = "#89a764";

    const TERMINAL_CURSOR = "terminal-cursor";
    const TERMINAL_CARET = "terminal-caret";

    var terminalWindow = document.getElementById("terminal-window");

    const contexts = ["blog posts", "resume", "aboutme"];

    const blogs = [
        {
            "title": "Backup MongoDB every night in NodeJS",
            "url": "/blogs/backup_mongodb.md"
        }
    ];

    var relativePath = "";

    const commands = {
        "help": {
            "action": "print",
            "output":
                `Usage: help [OPTION]...
    Display information about builtin commands.

    Options:
      ${paddedText("ls", 10)} lists available context according to current context
      ${paddedText("cd", 10)} navigate back and forth to available context
      ${paddedText("wget", 10)} retreives content acording to current context`
        },
        "ls": {
            "action": "print",
            "output":
                `${contexts.map(context => paddedText(context, 10)).join("")}`
        },
        "clear": {
            "action": "clear",
        },
        "cd": {
            "action": "navigatie",
            "requires_multi": true
        },
        "aboutme": {
            "action": "print",
            "output":
                `Hi there!, My name is Yasser and brief introduction about myself. 
        
        I'm just a simple coder who codes for fun in his free time, all what I do is eat, play and code
        `
        },
        "blog": {
            "action": "print",
            "options": {
                "--list": `${blogs.map(blog => paddedText(`'${blog}'`, 10)).join(" ")}`,
                "--help":
                    `Usage: blog [OPTION]... [TITLE]...

            Explore personal blog posts, learn something.

                ${paddedText("--list")} lists available blog posts
                ${paddedText("--read")} read specific blog post
            `
            },
            "output":
                `blog: missing operand
    Try 'blog --help' for more information
        `
        }
    };

    function paddedText(text, value) {
        return text.padEnd(value);
    }

    function attachTerminalCaret() {
        document.getElementById(TERMINAL_CARET).onkeydown = function (event) {
            if (event.key === 'Enter') {
                parseCommand(document.getElementById(TERMINAL_CARET).textContent);
                event.preventDefault();
            }
        }
    }

    document.body.onclick = function (event) {
        document.getElementById(TERMINAL_CARET).focus();
    }

    document.body.addEventListener("keydown", function (event) {
        event ??= window.event;

        var keyPress = event.which || event.keyCode;
        var ctrlPress = event.ctrlKey ?? key === 17;

        if (keyPress === 67 && ctrlPress)
            buildNewCommandPrefix();

    }, false);

    function buildNewCommandPrefix() {
        moveCaretToNewLine();

        const wrapperElement = document.createElement("div");
        wrapperElement.classList.add("flex");

        const userElement = document.createElement("span");
        userElement.classList.add(`text-[${USER_COLOR}]`);
        userElement.textContent = commandPrefix;
        wrapperElement.appendChild(userElement);

        const directoryElement = document.createElement("span");
        directoryElement.classList.add(`text-[${DIRECTORY_COLOR}]`);
        directoryElement.textContent = relativePath;
        wrapperElement.appendChild(directoryElement);

        const suffixElement = document.createElement("span");
        suffixElement.textContent = "$";
        suffixElement.classList.add("text-white");
        wrapperElement.appendChild(suffixElement);

        const caretElement = document.createElement("span");
        caretElement.id = TERMINAL_CARET;
        caretElement.spellcheck = false;
        caretElement.contentEditable = true;
        caretElement.classList.add("overflow-hidden", "text-clip", "min-w-fit", "w-2", "caret-transparent", "align-middle", "color-transparent", "text-white", "outline-0");
        wrapperElement.appendChild(caretElement);

        const cursorElement = document.createElement("span");
        cursorElement.id = TERMINAL_CURSOR;
        cursorElement.classList.add("animate-pulse", "bg-white", "w-2", "h-4", "mt-1");
        wrapperElement.appendChild(cursorElement);

        terminalWindow.appendChild(wrapperElement);

        document.getElementById(TERMINAL_CARET).focus();
        attachTerminalCaret();
    }

    function moveCaretToNewLine() {
        var currentCaret = document.getElementById(TERMINAL_CARET);
        // ditching current caret
        if (currentCaret) {
            currentCaret.contentEditable = false;
            currentCaret.id = "";
        }
        var currentCursor = document.getElementById(TERMINAL_CURSOR);
        if (currentCursor)
            currentCursor.remove();
    }

    function parseCommand(command) {

        if (isMultiCommand(command))
            handleMultiCommand(command);
        else
            handleCommand(command);

        buildNewCommandPrefix();
    }

    function handleCommand(command) {
        if (commands.hasOwnProperty(command)) {
            const instruction = commands[command];
            switch (instruction.action) {
                case "print":
                    printCommand(instruction.output);
                    break;
                case "clear":
                    clearCommands();
                    break;
                case "navigatie":
                    navigateToRoot();
                    break;
            }
        } else if (command) {
            commandNotFound(command);
        }
    }

    function navigateToRoot() {
        relativePath = "";
    }

    function handleMultiCommand(command) {
        const parsedCommands = command.split(/\s+/);
        const mainCommand = parsedCommands[0];

        if (commands.hasOwnProperty(mainCommand)) {
            const instruction = commands[mainCommand];

            if (!instruction.hasOwnProperty("options")) { return; }

            const targetOptions = instruction.options[parsedCommands[1]];
            console.log(targetOptions);
            if (targetOptions) {

            } else {
                optionNotFound(mainCommand, targetOptions);
            }

        } else if (command) {
            commandNotFound(command);
        }
    }

    function parseOptions(command) {

    }

    function isMultiCommand(command) {
        var spacingRegex = /([\s]+)/g;

        return spacingRegex.test(command) && command.trim().match(spacingRegex).length > 1;
    }

    function optionNotFound(command, option) {
        printCommand(`${command}: unknown option ${option}`);
    }

    function commandNotFound(command) {
        printCommand(`bash: ${command}: command not found`);
    }

    function printCommand(content) {
        var contentElement = document.createElement("pre");
        contentElement.innerHTML = content;
        terminalWindow.appendChild(contentElement);
    }

    function clearCommands() {
        terminalWindow.innerHTML = "";
    }

    // initial command
    buildNewCommandPrefix();
})();