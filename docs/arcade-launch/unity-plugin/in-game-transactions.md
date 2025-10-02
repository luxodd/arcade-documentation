---
sidebar_position: 6
title: In-Game Transactions
description: How to integrate and use the in-game transaction popup in your Unity game
---

# In-Game Transactions

The Unity Plugin provides a built-in **in-game transaction popup**.  
This popup allows the player to choose what to do when the game session ends (for example, when the player runs out of lives or time).

With this popup, the player can:

- **Continue** the game from the same place
- **Restart** the game without leaving the system menu
- **End** the game and return to the system game menu
- **Cancel** the transaction (treated as a final Game Over)

The system automatically handles credit checks.  
If the player does not have enough credits, the popup will show a recharge flow automatically. Developers don’t need to add any extra logic for this.

---

## 1. New API Methods

The following methods were added to `WebSocketService`:

```csharp
public void SendSessionOptionContinue(Action<SessionOptionAction> callback)

public enum SessionOptionAction
{
   Restart,
   Continue,
   End,
   Cancel
}
```

- `SessionOptionAction` is an **enum** representing the possible choices.
- It serves a dual purpose:
  1. Sends the selected command type to the server.
  2. Provides the response back to the game with the player’s choice.

---

## 2. How to Use in Your Game

The logic is simple:

1. Detect when the game reaches **Game Over** (no lives, no time, etc.).
2. Trigger the **in-game transaction popup**.
3. Wait for the callback with the player’s decision.
4. Perform the appropriate action in your game.

---

## 3. Example Script

Here’s a full Unity C# example that shows how to implement this flow:

```csharp
// Add this using statement to access the plugin classes and services
using Luxodd.Game.Scripts.Network;
using UnityEngine;
using System;

public class InGameTransactionTestBehaviour : MonoBehaviour
{
    [SerializeField] private WebSocketService _webSocketService;

    // Triggered when the player loses or the timer ends
    private void OnGameOverEventHandler()
    {
        // Ask the system to display the transaction popup
        _webSocketService.SendSessionOptionContinue(OnSessionOptionContinueCallback);
    }

    // Handle the player's choice
    private void OnSessionOptionContinueCallback(SessionOptionAction sessionOptionAction)
    {
        Debug.Log($"[Transaction Callback] Player choice: {sessionOptionAction}");

        switch (sessionOptionAction)
        {
            case SessionOptionAction.Restart:
                DoRestartGameStuff();
                break;
            case SessionOptionAction.Continue:
                DoContinueGameStuff();
                break;
            case SessionOptionAction.End:
                DoEndGameStuff();
                break;
            case SessionOptionAction.Cancel:
                DoCancelInGameTransactionStuff();
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(sessionOptionAction), sessionOptionAction, null);
        }
    }

    // Example methods for each option
    private void DoRestartGameStuff()
    {
        Debug.Log("Restarting the game...");
        // Implement restart logic here
    }

    private void DoContinueGameStuff()
    {
        Debug.Log("Continuing the game...");
        // Implement continue logic here
    }

    private void DoEndGameStuff()
    {
        Debug.Log("Ending the game and returning to menu...");
        // Implement end logic here
    }

    private void DoCancelInGameTransactionStuff()
    {
        Debug.Log("Player canceled the transaction (Game Over).");
        // IMPORTANT: when Cancel is selected, you must also send `Level_end` to the server
        // so the system properly registers the end of the session.
    }
}
```

---

---

## 4. Demo Project Reference

For a **real-life implementation example**, check our demo game repository:  
[example-game-arcade-shooter on GitHub](https://github.com/luxodd/example-game-arcade-shooter)

This repository contains working code and shows how the transaction popup is integrated in a real arcade-style game.  
It can be useful to review actual usage patterns and navigation glue code.

---

## 5. Important Notes

- The popup has a **30-second timer**.  
  If the player does not make a choice, the system automatically triggers **End**.

- Always handle the **Cancel** case on the client.  
  This is how your game should recognize that the player has officially reached **Game Over**.  
  At this point, send the `Level_end` event to the server with the appropriate parameters.

- The system automatically handles credit validation.  
  Developers don’t need to write extra code for balance checks.

---

:::tip
This feature ensures a smooth experience for arcade players - they can immediately choose how to proceed without leaving the game context.
:::
