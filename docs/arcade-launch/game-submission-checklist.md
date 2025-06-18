---
sidebar_position: 4
title: Game Submission Checklist
description: Complete validation requirements for submitting games to the WebGL Arcade Platform
---

# Game Submission Checklist

## 1\. General Requirements

| No. | Requirement              | Description                                                                                                       |
| :-- | :----------------------- | :---------------------------------------------------------------------------------------------------------------- |
| 1   | **Game Build Format**    | Must be a WebGL build (Unity WebGL)                                                                               |
| 2   | **Game Resolution**      | Responsive or target fixed resolution (e.g., 1080x1920 portrait \- Approximate. Exact values will be given later) |
| 3   | **File Size Limit**      | Total build size must not exceed 100 MB                                                                           |
| 4   | **Game Version Tagging** | Version number must be included in build metadata                                                                 |

## 2\. Session and Security

| No. | Requirement                 | Description                                                                                                                                                                                                                   |
| :-- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5   | **Session Token Handling**  | The game must validate and use session tokens passed by the arcade launcher                                                                                                                                                   |
| 6   | **Health Check Status**     | The game must check with the game server every 5 seconds. If 3 missed checks the server will automatically redirect the session back to the Luxodd game launch list of games.                                                 |
| 7   | **Data Egress Validation**  | Luxodd whitelists all games from call non-Luxodd services.All external data calls must be declared and documented (URLs, endpoints, purpose). Email admin@luxodd.com with this information to build in external dependencies. |
| 8   | **PIN Handling (if used)**  | PIN must be hashed (done automatically using the plugin command) The entry field must mask input. Only an off-screen keypad allowed                                                                                           |
| 9   | **Leaderboard Integration** | The game must have a leaderboard and leverage the [leaderboard Plugin API](unity-plugin/integration.md#7-leaderboard-access).                                                                                                 |

## 3\. Game Flow and UX

| No. | Requirement                 | Description                                                                                |
| :-- | :-------------------------- | :----------------------------------------------------------------------------------------- |
| 10  | Game End Callback           | On game completion, must use the command WebSocketService.BackToSystem()                   |
| 11  | State Restoration (if used) | The game must be able to load and resume from user state if saved                          |
| 12  | Arcade Joystick Support     | All game menus and gameplay must be navigable via a joystick only                          |
| 13  | Timeout Handling            | All menus must include countdown timers to auto-return to the arcade menu (max 30 seconds) |
| 14  | Start Trigger Limit         | Max time to wait for input before game force-starts: 1 minute                              |

## 4\. Quality Assurance

| No. | Requirement           | Description                                                                          |
| :-- | :-------------------- | :----------------------------------------------------------------------------------- |
| 15  | Game Load Performance | Must load within 1 minute (configurable) on target hardware                          |
| 16  | Crash Handling        | The game must fail gracefully and return control to the arcade launcher              |
| 17  | Asset Optimization    | All assets optimized (compressed textures, sound formats, minimal shaders)           |
| 18  | Logs & Debug          | Debug logging is disabled in production builds. Console clear unless an error occurs |

**Notes**

- Games not following these requirements may be rejected or sent back with a revision request.
- The platform provides helper libraries that you can see in the [plugin documentation](unity-plugin/overview.md)
  - communication with the WebSocket server
  - sessionToken management
  - healthCheck() integration
  - user profile
  - user credits commands
  - game complete call
  - Leaderboard communication
  - user data state store
