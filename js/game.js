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
        const scenario =
            SCENARIOS.find(
                s => s.level === this.level
            );

        if(!scenario)
        {
            this.gameClear();
            return;
        }

        this.currentScenario = scenario;

        this.updateUI();
    }

    updateUI()
    {
        const levelElement =
            document.getElementById("level");

        const scoreElement =
            document.getElementById("score");

        const missionElement =
            document.getElementById("mission-text");

        levelElement.textContent =
            `Lv.${this.level}`;

        scoreElement.textContent =
            `Score: ${this.score}`;

        missionElement.textContent =
            this.currentScenario.mission;

        this.updateTopology();
    }

    updateTopology()
    {
        const scenario =
            this.currentScenario;

        if(!scenario)
        {
            return;
        }

        const deviceIps =
            document.querySelectorAll(".device-ip");

        if(deviceIps.length >= 2)
        {
            deviceIps[0].textContent =
                scenario.topology.pcIp;

            deviceIps[1].textContent =
                scenario.topology.serverIp;
        }
    }

    submitAnswer(answer)
    {
        if(!answer)
        {
            return false;
        }

        const text =
            answer.toLowerCase();

        const keywords =
            this.currentScenario.keywords;

        let matched = 0;

        for(const keyword of keywords)
        {
            if(
                text.includes(
                    keyword.toLowerCase()
                )
            )
            {
                matched++;
            }
        }

        if(matched >= 1)
        {
            this.correctAnswer();

            return true;
        }

        this.wrongAnswer();

        return false;
    }

    correctAnswer()
    {
        this.score += 100;

        saveScore(this.score);

        this.showPingSuccess();

        window.cli.printSuccess();

        setTimeout(() =>
        {
            this.nextLevel();
        }, 2000);
    }

    wrongAnswer()
    {
        window.cli.printFailure();
    }

    showPingSuccess()
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

    resetPingStatus()
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

    nextLevel()
    {
        this.level++;

        saveLevel(this.level);

        const next =
            SCENARIOS.find(
                s => s.level === this.level
            );

        if(!next)
        {
            this.gameClear();
            return;
        }

        this.currentScenario = next;

        this.resetPingStatus();

        this.updateUI();

        window.cli.clear();

        window.cli.welcome();

        window.cli.printLevelUp(
            this.level
        );

        window.cli.printMission();
    }

    gameClear()
    {
        const output =
            document.getElementById(
                "console-output"
            );

        output.innerHTML +=
`
<div>
==================================
GAME CLEAR
==================================
全ステージクリア！

最終スコア: ${this.score}
==================================
</div>
`;

        alert(
            `ゲームクリア！\nスコア: ${this.score}`
        );
    }

    restart()
    {
        this.level = 1;

        this.score = 0;

        saveLevel(1);

        saveScore(0);

        this.loadScenario();

        this.resetPingStatus();

        window.cli.clear();

        window.cli.welcome();

        window.cli.printMission();
    }

    getCurrentLevel()
    {
        return this.level;
    }

    getCurrentScore()
    {
        return this.score;
    }
}
