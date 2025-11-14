---
sidebar_position: 6
title: In-Game Transactions
description: Integration and usage of in-game transaction popups in Unity after API update
---

# In-Game Transactions

The Unity plugin provides built-in **in-game transaction popups**. After the API update, the behavior has been split into **two independent popups**:

- **Continue Popup** — for continuing the current session (buttons: **Continue**, **End**)
- **Restart Popup** — for starting a new session (buttons: **Restart**, **End**)

The system still **automatically handles balance/credit checks**, triggering the built-in top-up flow if needed — no extra logic is required on the game side.

---

## 1) New/Updated API Methods

In `WebSocketService`, you can call the appropriate popups and handle the player's choice through callbacks:

```csharp
public void SendSessionOptionContinue(Action<SessionOptionAction> callback);
public void SendSessionOptionRestart(Action<SessionOptionAction> callback);

public enum SessionOptionAction
{
    Restart,
    Continue,
    End
}
```

**Key changes:**

- `SessionOptionAction` reflects the **player’s actual choice** and is returned in your callback.
- **Cancel** has been removed from the enum — it no longer needs to be handled.

---

## 2) When to Call Each Popup

### Continue Popup

This popup is used when the player can **continue the current game session**, for example when all lives, time, or attempts are over.

- Call `_webSocketService.SendSessionOptionContinue(OnSessionOptionContinueCallback)` to show the popup with **Continue** and **End** buttons.

**Behavior:**

- If the player selects **Continue** → returns `SessionOptionAction.Continue`. The game developer should implement the logic for resuming the game (e.g., adding lives, extra time, or other continuation mechanics).
- If the player selects **End** → returns `SessionOptionAction.End`. In this case, the game developer must:

  1. Prepare and send the current player session statistics to the server using the command `_webSocketCommandHandler.SendLevelEndRequestCommand`.
  2. After receiving a successful callback from this command, call `_webSocketService.BackToSystem()` to return control back to the system.

### Restart Popup

This popup is used when the player can **restart** and begin a new game session.

- Call `_webSocketService.SendSessionOptionRestart(OnSessionOptionRestartCallback)` to show the popup with **Restart** and **End** buttons.

**Behavior:**

- Before showing the Restart popup, the game developer **must send the current session results to the server** using `_webSocketCommandHandler.SendLevelEndRequestCommand`. This is important because if the player chooses **Restart**, a new session will start and the previous progress will be lost.
- If the player selects **Restart** → the **system automatically processes the choice** and **creates a new game session**. The game does **not** receive any callback or response — no additional logic is required on the game side beyond sending the session results beforehand.
- If the player selects **End** → returns `SessionOptionAction.End`. In this case, control is returned back to the game, and the developer should call `_webSocketService.BackToSystem()` to return control to the system.

> **Important:** The Restart flow is fully automated after sending session results. The game should not attempt to manually restart or reinitialize the session.

> **Tip:** Use a unified handler for results and route behavior with a simple `switch` for Continue popups only.

---

## 3) Basic Integration Flow

1. Detect the **Game Over** state (no lives, timer expired, etc.).
2. Depending on your UX, call either the **Continue** or **Restart** popup.
3. Wait for the callback returning a `SessionOptionAction` (for Continue popups only).
4. Execute the appropriate logic:

   - Continue → resume gameplay.
   - Restart → ensure results are sent; the system will automatically create a new session.
   - End → send session results, then return to system.

---

## 4) Example Script (Unity C#)

```csharp
using System;
using UnityEngine;
using Luxodd.Game.Scripts.Network; // service namespace

public class InGameTransactionExample : MonoBehaviour
{
    [SerializeField] private WebSocketService _webSocketService;
    [SerializeField] private WebSocketCommandHandler _webSocketCommandHandler;

    private void OnGameOver()
    {
        // Option A: offer to continue
        _webSocketService.SendSessionOptionContinue(OnSessionOptionContinueCallback);

        // Option B: offer to restart
        // Before calling this popup, always send session results first
        // _webSocketCommandHandler.SendLevelEndRequestCommand(() =>
        // {
        //     _webSocketService.SendSessionOptionRestart(OnSessionOptionRestartCallback);
        // });
    }

    private void OnSessionOptionContinueCallback(SessionOptionAction action)
    {
        Debug.Log($"[Continue Popup] Player choice: {action}");
        switch (action)
        {
            case SessionOptionAction.Continue:
                HandleContinue();
                break;
            case SessionOptionAction.End:
                HandleEndToSystem();
                break;
        }
    }

    private void OnSessionOptionRestartCallback(SessionOptionAction action)
    {
        Debug.Log($"[Restart Popup] Player choice: {action}");

        // Note: if player selects Restart, the system handles it automatically — no callback will be returned
        if (action == SessionOptionAction.End)
        {
            _webSocketService.BackToSystem();
        }
    }

    private void HandleContinue()
    {
        // Resume the game: unpause, restore state, lives/time, update UI, etc.
        Debug.Log("Continuing the game...");
    }

    private void HandleRestartNewSession()
    {
        // No manual restart logic is needed — handled automatically by the system
        Debug.Log("Restart choice handled automatically by system.");
    }

    private void HandleEndToSystem()
    {
        // Send results before returning control to the system
        _webSocketCommandHandler.SendLevelEndRequestCommand(() =>
        {
            _webSocketService.BackToSystem();
        });
    }
}
```

---

## 5) UX & Stability Notes

- Display **only one popup at a time**. If you have your own overlays/pauses, block additional input while the popup is active.
- Handlers should be **idempotent**: if a repeated response or signal arrives, it should not break the game state.
- Always handle **End** as a fallback in all game states (even during pause or scene transitions).
- For **Restart**, remember: the system restarts automatically — the game only needs to send results before showing the popup.

---

## 6) Demo Project Example

See the working demo integration in **example-game-arcade-shooter** (transaction popup sections, navigation glue code, etc.).

---

## 7) FAQ

**Do I need to check the balance manually?**
No. The system performs all balance checks and top-up flows automatically.

**Do I need to send events on End?**
Yes. You must send session results using `_webSocketCommandHandler.SendLevelEndRequestCommand`, and then call `_webSocketService.BackToSystem()` to correctly finalize the session.

**What about Restart?**
Before showing the popup, send session results. If the player chooses Restart, the system automatically creates a new session — no response is returned to the game.

**What about old code expecting `Cancel`?**
Remove any `Cancel` handling in `switch` statements and related logic. Replace UX with explicit **End**.

---
