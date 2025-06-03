---
sidebar_position: 7
title: API Reference
description: Complete API reference for the Unity plugin
---

# API Reference

## WebSocketLibraryWrapper

A wrapper class for the JavaScript WebSocket library used to connect to the server.

### Main methods:

| Method                                   | Description                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| `StartWebSocket(string url)`             | Establishes a WebSocket connection to the server at the specified URL.                       |
| `CloseWebSocketConnection()`             | Closes the WebSocket connection.                                                             |
| `SendMessageToWebSocket(string message)` | Sends a message to the server.                                                               |
| `NotifySessionEnd()`                     | Ends the WebGL game session and returns control to the system, showing the game list screen. |

### Callbacks from JS:

| Callback                             | Description                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| `OnWebSocketOpen()`                  | Triggered when the connection is successfully established.                     |
| `OnWebSocketError(string error)`     | Triggered on connection error. The error argument contains a description.      |
| `OnWebSocketMessage(string message)` | Triggered when a message is received from the server.                          |
| `OnWebSocketClose(int code)`         | Triggered when the WebSocket connection is closed, providing the closure code. |

## WebSocketService

A service class that manages all interactions with the `WebSocketLibraryWrapper`, including establishing connections and handling its events.

### Main methods:

| Method                                                                                                                   | Description                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ConnectToServer(Action onSuccessCallback = null, Action onErrorCallback = null)`                                        | Establishes a connection to the WebSocket server using the settings specified in `Assets\Luxodd.Game\Resources\NetworkSettingsDescriptor`. Default server URL: `wss://app.luxodd.com/ws`. Use this method to connect your game to the server. |
| `BackToSystem(), BackToSystemWithError(string message, string error)`                                                    | Ends the current session and optionally logs an error message.                                                                                                                                                                                |
| `SendCommand(CommandRequestType commandRequestType, string commandRequestJson, Action<CommandRequestHandler> onSuccess)` | Sends a command to the server. Used by `WebSocketCommandHandler` to prepare and process commands.                                                                                                                                             |

## ReconnectService

A background service that automatically reconnects to the server if the connection is lost.  
 This service does not expose public methods and works automatically via event listeners.

## FetchUrlQueryString

A wrapper class for reading parameters from the browser's address bar using JS.  
Used for obtaining the player's session token when launching the game.

### Property:

| Property | Description                                      |
| -------- | ------------------------------------------------ |
| `Token`  | The token value retrieved from the query string. |

## WebSocketCommandHandler

Contains the logic for sending, receiving, and processing commands between the client and server, providing user-friendly methods for plugin developers.

### Profile Methods:

| Method                                                                                               | Description                                         |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `SendProfileRequestCommand(Action<string> onSuccessCallback, Action<int, string> onFailureCallback)` | Requests the player profile (usually the nickname). |

### Balance Management Methods:

| Method                                                                                                                  | Description                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `SendUserBalanceRequestCommand(Action<int> onSuccessCallback, Action<int, string> onFailureCallback)`                   | Requests the player's current credit balance.                                                               |
| `SendAddBalanceRequestCommand(int amount, int pinCode, Action onSuccess, Action<int, string> onFailureCallback)`        | Requests to add funds to the player's balance. Uses the player's system PIN code (not the credit card PIN). |
| `SendChargeUserBalanceRequestCommand(int amount, int pinCode, Action onSuccess, Action<int, string> onFailureCallback)` | Requests to deduct funds from the player's balance. Also requires the player's system PIN.                  |

### System Methods:

| Method                                                                                                                    | Description                                      |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `SendHealthCheckStatusCommand(Action onSuccessCallback, Action<int, string> onFailureCallback)`                           | Sends a heartbeat to check system/server status. |
| `SendLeaderboardRequestCommand(Action<LeaderboardDataResponse> onSuccessCallback, Action<int, string> onFailureCallback)` | Requests leaderboard data.                       |

### Analytics Methods:

| Method                                                                                                              | Description                                                   |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `SendLevelBeginRequestCommand(int level, Action onSuccessCallback, Action<int, string> onFailureCallback)`          | Sends analytics about the beginning of a game level.          |
| `SendLevelEndRequestCommand(int level, int score, Action onSuccessCallback, Action<int, string> onFailureCallback)` | Sends analytics about finishing a level, including the score. |

### User Data Methods:

| Method                                                                                                            | Description                                                     |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `SendGetUserDataRequestCommand(Action<object> onSuccessCallback, Action<int, string> onFailureCallback)`          | Requests custom user data (returns null if not previously set). |
| `SendSetUserDataRequestCommand(object userData, Action onSuccessCallback, Action<int, string> onFailureCallback)` | Sends and stores user data on the server.                       |

## HealthStatusCheckService

Automatically sends a Health Check Status command at regular intervals (default: every 2 seconds).

### Methods:

| Method         | Description                           |
| -------------- | ------------------------------------- |
| `Activate()`   | Starts sending health check commands. |
| `Deactivate()` | Stops sending health check commands.  |

## ErrorHandlerService

Service for logging errors and returning the player from the game to the system.

### Methods:

| Method                                      | Description                                           |
| ------------------------------------------- | ----------------------------------------------------- |
| `HandleError(string message, string error)` | General error logging with message and error details. |
| `HandleConnectionError(string message)`     | Logs connection errors.                               |
| `HandleCreditsError(string message)`        | Logs errors related to credit operations.             |
| `HandleGameError(string message)`           | Logs game logic errors.                               |

## LoggerHelper

A wrapper over the standard Unity logger, enabling or disabling log output.

### Methods:

| Method                       | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `Log(string message)`        | Logs informational messages (Info channel). |
| `LogWarning(string message)` | Logs warnings (Warning channel).            |
| `LogError(string message)`   | Logs errors (Error channel, always sent).   |
