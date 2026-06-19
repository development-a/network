class CLI
{
    constructor()
    {
        this.outputElement =
            document.getElementById("console-output");

        this.inputElement =
            document.getElementById("command-input");

        this.commandHistory = [];

        this.historyIndex = -1;

        this.registerEvents();
    }

    registerEvents()
    {
        this.inputElement.addEventListener(
            "keydown",
            (event) =>
            {
                if(event.key === "Enter")
                {
                    this.execute();
                }

                if(event.key === "ArrowUp")
                {
                    this.historyUp();
                }

                if(event.key === "ArrowDown")
                {
                    this.historyDown();
                }
            }
        );
    }

    execute()
    {
        const command =
            this.inputElement.value.trim();

        if(command === "")
        {
            return;
        }

        this.commandHistory.push(command);

        this.historyIndex =
            this.commandHistory.length;

        this.print(
            `> ${command}`
        );

        const result =
            this.processCommand(command);

        this.print(result);

        this.inputElement.value = "";
    }

    processCommand(command)
    {
        if(!window.game)
        {
            return "ゲーム初期化中...";
        }

        const scenario =
            window.game.currentScenario;

        if(!scenario)
        {
            return "シナリオがありません";
        }

        const commands =
            scenario.commands;

        if(commands[command])
        {
            return commands[command];
        }

        if(command.startsWith("ping "))
        {
            return this.handlePing(command);
        }

        return `% Unknown command:
${command}

help を入力してください`;
    }

    handlePing(command)
    {
        const scenario =
            window.game.currentScenario;

        if(
            scenario.commands[command]
        )
        {
            return scenario.commands[command];
        }

        return "Request timed out";
    }

    print(text)
    {
        const line =
            document.createElement("div");

        line.textContent = text;

        this.outputElement.appendChild(line);

        this.outputElement.scrollTop =
            this.outputElement.scrollHeight;
    }

    clear()
    {
        this.outputElement.innerHTML = "";
    }

    historyUp()
    {
        if(
            this.commandHistory.length === 0
        )
        {
            return;
        }

        this.historyIndex--;

        if(this.historyIndex < 0)
        {
            this.historyIndex = 0;
        }

        this.inputElement.value =
            this.commandHistory[
                this.historyIndex
            ];
    }

    historyDown()
    {
        if(
            this.commandHistory.length === 0
        )
        {
            return;
        }

        this.historyIndex++;

        if(
            this.historyIndex >=
            this.commandHistory.length
        )
        {
            this.historyIndex =
                this.commandHistory.length;

            this.inputElement.value = "";

            return;
        }

        this.inputElement.value =
            this.commandHistory[
                this.historyIndex
            ];
    }

    welcome()
    {
        this.print(
`==================================
Pingを通せ！
障害切り分けシミュレーター
==================================`
        );

        this.print(
            "help と入力してください"
        );

        this.print("");
    }

    printMission()
    {
        const scenario =
            window.game.currentScenario;

        if(!scenario)
        {
            return;
        }

        this.print(
`------------------------------
ミッション
------------------------------
${scenario.mission}`
        );

        this.print("");
    }

    printSuccess()
    {
        this.print("");

        this.print(
`################################
MISSION COMPLETE
################################`
        );

        this.print(
            "Ping通信が復旧しました"
        );

        this.print("");
    }

    printFailure()
    {
        this.print("");

        this.print(
            "不正解です"
        );

        this.print(
            "再度調査してください"
        );

        this.print("");
    }

    printLevelUp(level)
    {
        this.print("");

        this.print(
            `Level Up !!
現在レベル: ${level}`
        );

        this.print("");
    }
}

window.cli = new CLI();
