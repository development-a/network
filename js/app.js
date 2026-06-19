document.addEventListener(
    "DOMContentLoaded",
    () =>
    {
        initializeGame();
    }
);

function initializeGame()
{
    window.game = new Game();

    initializeAnswerForm();

    initializeKeyboard();

    updateHeader();

    window.cli.welcome();

    window.cli.printMission();
}

function initializeAnswerForm()
{
    const submitButton =
        document.getElementById(
            "submit-answer"
        );

    const answerInput =
        document.getElementById(
            "answer-input"
        );

    submitButton.addEventListener(
        "click",
        () =>
        {
            submitAnswer();
        }
    );

    answerInput.addEventListener(
        "keydown",
        (event) =>
        {
            if(
                event.key === "Enter" &&
                !event.shiftKey
            )
            {
                event.preventDefault();

                submitAnswer();
            }
        }
    );
}

function initializeKeyboard()
{
    const commandInput =
        document.getElementById(
            "command-input"
        );

    commandInput.focus();

    document.addEventListener(
        "click",
        () =>
        {
            commandInput.focus();
        }
    );
}

function submitAnswer()
{
    const answerInput =
        document.getElementById(
            "answer-input"
        );

    const answer =
        answerInput.value.trim();

    if(answer === "")
    {
        alert(
            "障害原因を入力してください"
        );

        return;
    }

    const result =
        window.game.submitAnswer(
            answer
        );

    if(result)
    {
        answerInput.value = "";

        updateHeader();
    }
}

function updateHeader()
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
        `Lv.${window.game.level}`;

    scoreElement.textContent =
        `Score: ${window.game.score}`;
}

function restartGame()
{
    if(
        !confirm(
            "最初からやり直しますか？"
        )
    )
    {
        return;
    }

    window.game.restart();

    updateHeader();
}

function resetProgress()
{
    if(
        !confirm(
            "保存データを削除しますか？"
        )
    )
    {
        return;
    }

    localStorage.clear();

    location.reload();
}

window.restartGame =
    restartGame;

window.resetProgress =
    resetProgress;
