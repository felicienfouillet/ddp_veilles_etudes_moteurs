using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using UnityEngine;

public class GameController : MonoBehaviour
{

    public static bool gameStatus;

    public Button resumeButton;

    // Start is called before the first frame update
    void Start()
    {
        resumeButton.onClick.AddListener(delegate () { RestartGame(); });
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public static void PauseGame()
    {
        //Time.timeScale = 0;
        if (gameStatus)
        {
            SceneManager.LoadScene("PauseMenu");
            gameStatus = !gameStatus;
            Debug.Log("GameStaus: " + gameStatus);
        }

        //Disable scripts that still work while timescale is set to 0
    }

    public void RestartGame()
    {
        SceneManager.LoadScene("MainScene");
        gameStatus = !gameStatus;
        Debug.Log("GameStaus: " + gameStatus);
        //enable the scripts again
    }
}
