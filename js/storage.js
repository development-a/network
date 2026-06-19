const STORAGE_KEYS = {

    CURRENT_LEVEL:
        "networkSimulatorCurrentLevel",

    CURRENT_SCORE:
        "networkSimulatorCurrentScore",

    HIGH_SCORE:
        "networkSimulatorHighScore"
};

/* ==========================
   Level
========================== */

function saveLevel(level)
{
    localStorage.setItem(
        STORAGE_KEYS.CURRENT_LEVEL,
        String(level)
    );
}

function getLevel()
{
    const value =
        localStorage.getItem(
            STORAGE_KEYS.CURRENT_LEVEL
        );

    if(value === null)
    {
        return 1;
    }

    return Number(value);
}

/* ==========================
   Score
========================== */

function saveScore(score)
{
    localStorage.setItem(
        STORAGE_KEYS.CURRENT_SCORE,
        String(score)
    );

    const highScore =
        getHighScore();

    if(score > highScore)
    {
        localStorage.setItem(
            STORAGE_KEYS.HIGH_SCORE,
            String(score)
        );
    }
}

function getScore()
{
    const value =
        localStorage.getItem(
            STORAGE_KEYS.CURRENT_SCORE
        );

    if(value === null)
    {
        return 0;
    }

    return Number(value);
}

/* ==========================
   High Score
========================== */

function getHighScore()
{
    const value =
        localStorage.getItem(
            STORAGE_KEYS.HIGH_SCORE
        );

    if(value === null)
    {
        return 0;
    }

    return Number(value);
}

/* ==========================
   Reset
========================== */

function clearProgress()
{
    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_LEVEL
    );

    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_SCORE
    );
}

function clearAllData()
{
    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_LEVEL
    );

    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_SCORE
    );

    localStorage.removeItem(
        STORAGE_KEYS.HIGH_SCORE
    );
}
