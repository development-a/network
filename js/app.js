document.addEventListener(
    "DOMContentLoaded",
    initGame
);



/*
----------------------------------
 初期化
----------------------------------
*/

function initGame()
{
    window.game = new Game();

    window.cli = new CLI(
        window.game
    );


    window.cli.welcome();


    updateScreen();


    focusCommandInput();
}



/*
----------------------------------
 入力欄フォーカス
----------------------------------
*/

function focusCommandInput()
{
    const input =
        document.getElementById(
            "command-input"
        );


    if(input)
    {
        input.focus();
    }
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


    if(level)
    {
        level.textContent =
            `Lv.${window.game.level}`;
    }


    if(score)
    {
        score.textContent =
            `Score: ${window.game.score}`;
    }
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


    if(window.game)
    {
        window.game.restart();
    }


    if(window.cli)
    {
        window.cli.reset();
        window.cli.welcome();
    }


    updateScreen();

    focusCommandInput();
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


    if(
        typeof clearAllData === "function"
    )
    {
        clearAllData();
    }


    location.reload();
}



/*
----------------------------------
 キーボード補助
----------------------------------
*/

document.addEventListener(
    "keydown",
    function(event)
    {

        if(event.key === "/")
        {
            event.preventDefault();

            focusCommandInput();
        }


        if(
            event.key === "F2"
        )
        {
            event.preventDefault();

            restartGame();
        }

    }
);
