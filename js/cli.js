class CLI
{
    constructor()
    {
        this.output =
            document.getElementById(
                "console-output"
            );

        this.input =
            document.getElementById(
                "command-input"
            );

        this.promptElement =
            document.getElementById(
                "cli-prompt"
            );

        this.mode = "exec";

        this.history = [];

        this.historyIndex = 0;

        this.registerEvents();
    }

    registerEvents()
    {
        this.input.addEventListener(
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
            this.input.value.trim();

        if(command === "")
        {
            return;
        }

        this.history.push(command);

        this.historyIndex =
            this.history.length;

        this.print(
            `${this.getPrompt()} ${command}`
        );

        const result =
            this.processCommand(command);

        if(result)
        {
            this.print(result);
        }

        this.input.value = "";
    }

    processCommand(command)
    {
        const scenario =
            window.game.currentScenario;

        /* ------------------
           exec mode
        ------------------- */

        if(command === "conf t")
        {
            this.mode = "config";

            this.updatePrompt();

            return "Enter configuration mode";
        }

        if(command === "exit")
        {
            if(this.mode === "interface")
            {
                this.mode = "config";
            }
            else if(this.mode === "config")
            {
                this.mode = "exec";
            }

            this.updatePrompt();

            return "";
        }

        if(
            command ===
            "interface gi0/2"
        )
        {
            this.mode =
                "interface";

            this.updatePrompt();

            return "";
        }

        /* ------------------
           show commands
        ------------------- */

        if(
            scenario.showCommands[
                command
            ]
        )
        {
            return scenario
                .showCommands[
                    command
                ];
        }

        /* ------------------
           config commands
        ------------------- */

        if(
            scenario.configCommands[
                command
            ]
        )
        {
            scenario
                .configCommands[
                    command
                ](
                    scenario.state
                );

            return "OK";
        }

        /* ------------------
           ping
        ------------------- */

        if(
            command.startsWith(
                "ping "
            )
        )
        {
            return this.handlePing();
        }

        return "% Invalid command";
    }

    handlePing()
    {
        const success =
            window.game.ping();

        if(success)
        {
            setTimeout(
                () =>
                {
                    window.game
                        .completeStage();
                },
                500
            );

            return `
Reply from destination
Reply from destination
Reply from destination

Success rate 100%
`;
        }

        return `
Request timed out
Request timed out
Request timed out

Success rate 0%
`;
    }

    getPrompt()
    {
        switch(this.mode)
        {
            case "config":
                return "R1(config)#";

            case "interface":
                return "R1(config-if)#";

            default:
                return "R1#";
        }
    }

    updatePrompt()
    {
        this.promptElement.textContent =
            this.getPrompt();
    }

    print(text)
    {
        const line =
            document.createElement("div");

        line.textContent = text;

        this.output.appendChild(line);

        this.output.scrollTop =
            this.output.scrollHeight;
    }

    clear()
    {
        this.output.innerHTML = "";
    }

    welcome()
    {
        this.print(
`==================================
Pingを通せ！
障害復旧シミュレーター
==================================`
        );

        this.print(
            window.game
                .currentScenario
                .mission
        );

        this.print("");
    }

    resetForStage()
    {
        this.mode = "exec";

        this.updatePrompt();

        this.clear();

        this.welcome();
    }

    historyUp()
    {
        if(
            this.history.length === 0
        )
        {
            return;
        }

        this.historyIndex--;

        if(this.historyIndex < 0)
        {
            this.historyIndex = 0;
        }

        this.input.value =
            this.history[
                this.historyIndex
            ];
    }

    historyDown()
    {
        if(
            this.history.length === 0
        )
        {
            return;
        }

        this.historyIndex++;

        if(
            this.historyIndex >=
            this.history.length
        )
        {
            this.historyIndex =
                this.history.length;

            this.input.value = "";

            return;
        }

        this.input.value =
            this.history[
                this.historyIndex
            ];
    }
}
