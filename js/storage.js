const STORAGE_KEYS = {

    HIGH_SCORE: "networkGameHighScore",

    CURRENT_SCORE: "networkGameCurrentScore",

    CURRENT_LEVEL: "networkGameCurrentLevel"
};

function saveScore(score)
{
    localStorage.setItem(
        STORAGE_KEYS.CURRENT_SCORE,
        score
    );

    const highScore = getHighScore();

    if(score > highScore)
    {
        localStorage.setItem(
            STORAGE_KEYS.HIGH_SCORE,
            score
        );
    }
}

function getScore()
{
    return Number(
        localStorage.getItem(
            STORAGE_KEYS.CURRENT_SCORE
        ) || 0
    );
}

function getHighScore()
{
    return Number(
        localStorage.getItem(
            STORAGE_KEYS.HIGH_SCORE
        ) || 0
    );
}

function saveLevel(level)
{
    localStorage.setItem(
        STORAGE_KEYS.CURRENT_LEVEL,
        level
    );
}

function getLevel()
{
    return Number(
        localStorage.getItem(
            STORAGE_KEYS.CURRENT_LEVEL
        ) || 1
    );
}

function resetProgress()
{
    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_SCORE
    );

    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_LEVEL
    );
}
