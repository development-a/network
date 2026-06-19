document.addEventListener(
    "DOMContentLoaded",
    () =>
    {
        startGame();
    }
);


function startGame()
{
    window.game =
        new Game();


    window.cli =
        new CLI();


    window.cli.welcome();


    updateScreen();


    const input =
        document.getElementById(
            "command-input"
        );


    input.focus();
}



/*
----------------------------------
 画面更新
----------------------------------
*/

function updateScreen()
{
    if(!window.game)
    {
        return;
    }


    const level =
        document.getElementById(
            "level"
        );


    const score =
        document.getElementById(
            "score"
        );


    level.textContent =
        `Lv.${window.game.level}`;


    score.textContent =
        `Score: ${window.game.score}`;
}



/*
----------------------------------
 リスタート
----------------------------------
*/

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


    updateScreen();
}



/*
----------------------------------
 データ削除
----------------------------------
*/

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


    clearAllData();


    location.reload();
}



/*
----------------------------------
 キーボード補助
----------------------------------
*/

document.addEventListener(
    "keydown",
    (event)=>
    {
        if(event.key === "/")
        {
            event.preventDefault();

            document
            .getElementById(
                "command-input"
            )
            .focus();
        }
    }
);
