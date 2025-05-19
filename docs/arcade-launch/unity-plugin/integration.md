---
sidebar_position: 5
title: Integration Guide
description: Step-by-step guide to integrate the Unity plugin into your game
---

# Integration Guide

## 1. Add Plugin Prefab
Drag the Network prefab to your scene: `Assets/Luxodd.Game/Prefabs/Network`
This prefab contains all essential components to initialize the plugin.

## 2. WebSocket Connection
Use WebSocketService to connect to the server:

```csharp
ConnectToServer(Action onSuccessCallback = null, Action onErrorCallback = null)
```

:::tip
Establishes a WebSocket connection to the server and prepares the plugin for command exchange.
:::

## 3. Health Status Check
Activate game status checks via:

```csharp
HealthStatusCheckService.Activate()
HealthStatusCheckService.Deactivate()
```

:::tip
Sends the health_status_check command every 2 seconds to indicate the game is active and responsive.
:::

## 4. Retrieve Player Data
Use WebSocketCommandHandler:

```csharp
SendProfileRequestCommand(Action<string> onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Requests basic player info such as username and profile data.
:::

```csharp
SendUserBalanceRequestCommand(Action<int> onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Retrieves the player's current credit balance.
:::

## 5. Track Game Session
Start and end level tracking:

```csharp
SendLevelBeginRequestCommand(int level, Action onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Notifies the system that the player has started a level.
:::

```csharp
SendLevelEndRequestCommand(int level, int score, Action onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Reports the end of a level and the score achieved by the player.
:::

## 6. Credit Transactions
To deduct/add credits (requires PIN):

```csharp
SendAddBalanceRequestCommand(int amount, int pinCode, Action onSuccess, Action<int, string> onFailureCallback)
```

:::tip
Adds credits to the player's account.
:::

```csharp
SendChargeUserBalanceRequestCommand(int amount, int pinCode, Action onSuccess, Action<int, string> onFailureCallback)
```

:::tip
Deducts credits from the player's account. Used for retrying or continuing gameplay.
:::

:::note
Always display a popup for PIN code input before credit-related operations.

Errors:
- Incorrect PIN → error code 412
- Other credit errors → handle with retry logic
:::

## 7. Leaderboard Access
Retrieve leaderboard rankings:

```csharp
SendLeaderboardRequestCommand(Action<LeaderboardDataResponse> onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Fetches the latest leaderboard data to show top players and their ranks.
:::

## 8. Working with User State
To get and set user-defined persistent state stored on the server:

```csharp
SendGetUserDataRequestCommand(Action<object> onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Requests the user state from the server. On the first request, the value may be `null` if no state is stored yet.
:::

```csharp
SendSetUserDataRequestCommand(object userData, Action onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Sends a new user state object to the server to be saved. Can be used to persist user-specific parameters.
:::

:::note
### Tips for Using User State
- It is recommended to use a simple class containing primitive types (`int`, `float`, `string`) that can be easily serialized into JSON.
- For more flexible or dynamic data structures, use:
    ```csharp
    Dictionary<string, object> userData
    ```
    This key–value format makes it easier to handle complex state updates and partial modifications.
:::



## Next Steps
- [Review API documentation](./api-reference.md)
- [Check arcade compatibility guidelines](./arcade-compatibility.md) 