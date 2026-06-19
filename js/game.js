class Game
{
    constructor()
    {
        this.level = getLevel();

        this.score = getScore();

        this.currentScenario = null;

        this.loadScenario();
    }

    loadScenario()
    {
        const index = this.level - 1;

        if(index >= SCENARIOS.length)
        {
            this.gameClear();
            return;
        }

        this.currentScenario =
            this.cloneScenario(
                SCENARIOS[index]
            );

        this.updateMission();

        this.updateTopology();

        this.updateHeader();

        this.setPingFailed();
    }

    cloneScenario(scenario)
    {
        return {

            ...scenario,

            state:
                JSON.parse(
                    JSON.stringify(
                        scenario.state
                    )
                )
        };
    }

    updateMission()
    {
        const element =
            document.getElementById(
                "mission-text"
            );

        element.textContent =
            this.currentScenario.mission;
    }

    updateTopology()
    {
        const deviceIps =
            document.querySelectorAll(
                ".device-ip"
            );

        if(deviceIps.length < 2)
        {
            return;
        }

        deviceIps[0].textContent =
            this.currentScenario.topology.pcIp;

        deviceIps[1].textContent =
            this.currentScenario.topology.serverIp;
    }

    updateHeader()
    {
        const levelElement =
            document.getElementById(
                "level"
            );

        const scoreElement =
            document.getElementById(
                "score"
            );

        levelElement.textContent =
            `Lv.${this.level}`;

        scoreElement.textContent =
            `Score: ${this.score}`;
    }

    getState()
    {
        return this.currentScenario.state;
    }

    isClear()
    {
        return this.currentScenario
            .clearCondition(
                this.currentScenario.state
            );
    }

    ping()
    {
        if(this.isClear())
        {
            this.setPingSuccess();

            return true;
        }

        return false;
    }

    setPingSuccess()
    {
        const status =
            document.getElementById(
                "ping-status"
            );

        status.textContent =
            "Ping成功";

        status.classList.remove(
            "status-fail"
        );

        status.classList.add(
            "status-success"
        );
    }

    setPingFailed()
    {
        const status =
            document.getElementById(
                "ping-status"
            );

        status.textContent =
            "Ping失敗";

        status.classList.remove(
            "status-success"
        );

        status.classList.add(
            "status-fail"
        );
    }

    completeStage()
    {
        this.score += 100;

        saveScore(
            this.score
        );

        this.updateHeader();

        if(window.cli)
        {
            window.cli.print(
                ""
            );

            window.cli.print(
`==================================
MISSION COMPLETE
==================================`
            );
        }

        setTimeout(
            () =>
            {
                this.nextStage();
            },
            1500
        );
    }

    nextStage()
    {
        this.level++;

        saveLevel(
            this.level
        );

        if(
            this.level >
            SCENARIOS.length
        )
        {
            this.gameClear();

            return;
        }

        this.loadScenario();

        if(window.cli)
        {
            window.cli.resetForStage();
        }
    }

    restart()
    {
        this.level = 1;

        this.score = 0;

        saveLevel(1);

        saveScore(0);

        this.loadScenario();

        if(window.cli)
        {
            window.cli.resetForStage();
        }
    }

    gameClear()
    {
        saveLevel(1);

        if(window.cli)
        {
            window.cli.print("");

            window.cli.print(
`==================================
GAME CLEAR
==================================`
            );

            window.cli.print(
                `Final Score : ${this.score}`
            );

            window.cli.print(
`==================================`
            );
        }

        alert(
            `ゲームクリア！\nスコア: ${this.score}`
        );
    }
}
