---
sidebar_position: 2
title: Game Submission Checklist
description: Complete validation requirements for submitting games to the WebGL Arcade Platform
---

# Game Submission Checklist

## 1\. General Requirements

| No. | Requirement              | Description                                                                                                       |
| :-- | :----------------------- | :---------------------------------------------------------------------------------------------------------------- |
| 1   | **Game Build Format**    | Must be a WebGL build (Unity WebGL)                                                                               |
| 2   | **Game Resolution**      | Responsive or target fixed resolution (e.g., 1080x1920 portrait \- Approximate. Exact values will be given later) |
| 3   | **File Size Limit**      | Total build size must not exceed X MB (e.g., 100 MB, adjustable)                                                  |
| 4   | **Game Version Tagging** | Version number must be included in build metadata                                                                 |

## 2\. Session and Security

| No. | Requirement                 | Description                                                                                                                       |
| :-- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| 5   | **Session Token Handling**  | The game must validate and use session tokens passed by the arcade launcher                                                       |
| 6   | **Health Check Status**     | The game must use a command to send it to the server. Otherwise, it will automatically redirect to the system's list of games.    |
| 7   | **Data Egress Validation**  | All external data calls must be declared and documented (URLs, endpoints, purpose)                                                |
| 8   | **PIN Handling (if used)**  | PIN must be hashed (done automatically using the plugin command) The entry field must mask input Only an on-screen keypad allowed |
| 9   | **Leaderboard Integration** | The game must support client-side leaderboard API (See game example)                                                              |

## 3\. Game Flow and UX

| No. | Requirement                 | Description                                                                                    |
| :-- | :-------------------------- | :--------------------------------------------------------------------------------------------- |
| 10  | Game End Callback           | On game completion, must use the command WebSocketService.BackToSystem()                       |
| 11  | State Restoration (if used) | The game must be able to load and resume from user state if saved                              |
| 12  | Arcade Joystick Support     | All game menus and gameplay must be navigable via a joystick only                              |
| 13  | Timeout Handling            | All menus must include countdown timers to auto-return to the arcade menu (max 2 minutes idle) |
| 14  | Start Trigger Limit         | Max time to wait for input before game force-starts or times out: 2 minutes                    |

## 4\. Quality Assurance

| No. | Requirement           | Description                                                                          |
| :-- | :-------------------- | :----------------------------------------------------------------------------------- |
| 15  | Game Load Performance | Must load within 10 seconds (configurable) on target hardware                        |
| 16  | Crash Handling        | The game must fail gracefully and return control to the arcade launcher              |
| 17  | Asset Optimization    | All assets optimized (compressed textures, sound formats, minimal shaders)           |
| 18  | Logs & Debug          | Debug logging is disabled in production builds. Console clear unless an error occurs |

**Notes**

- Games not following these requirements may be rejected or sent back with a revision request.
- The platform provides helper libraries that you can see in this([link to the documentation](https://staging-docs.luxodd.com/docs/arcade-launch/unity-plugin/overview)):
  - communication with the WebSocket server
  - sessionToken management
  - healthCheck() integration
  - user profile
  - user credits commands
  - game complete call
  - Leaderboard communication
  - user data state store
