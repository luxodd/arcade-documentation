---
sidebar_position: 6
title: Integration Guide
description: Step-by-step guide to integrate the Unity plugin into your game
---

# Integration Guide

Below are the required steps and code changes to integrate your game into our system:

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

After the game connects to the server, enable the health status check command by using HealthStatusCheckService and its Activate/Deactivate methods:

```csharp
HealthStatusCheckService.Activate()
HealthStatusCheckService.Deactivate()
```

:::tip
By default, the command is sent every 2 seconds. You can change this interval in the service script within the prefab in the Unity Editor.
![ChangeHealtchCheckCadense.png](./assets/image20.png)
:::

## 4. Obtaining Player Profile Data

Use the command to request basic player info such as username and profile data:

```csharp
WebSocketCommandHandler.SendProfileRequestCommand(Action<string> onSuccessCallback, Action<int, string> onFailureCallback)
```

## 5. Obtaining the Player's Credit Balance

Use the command to retrieve the player's current credit balance:

```csharp
WebSocketCommandHandler.SendUserBalanceRequestCommand(Action<int> onSuccessCallback, Action<int, string> onFailureCallback)
```

## 6. Tracking Game Events

At the beginning of each level, send the command that notifies the system that the player has started a level.:

```csharp
WebSocketCommandHandler.SendLevelBeginRequestCommand(int level, Action onSuccessCallback, Action<int, string> onFailureCallback)
```

At the end of each level or during game over, make sure to send:

```csharp
WebSocketCommandHandler.SendLevelEndRequestCommand(int level, int score, Action onSuccessCallback, Action<int, string> onFailureCallback)
```

## 7. Credit Operations (Optional)

If your game requires various operations with in-game currency, use the following:

Add credits to a player (if the player does not have enough credits for an operation):

```csharp
WebSocketCommandHandler.SendAddBalanceRequestCommand(int amount, int pinCode, Action onSuccess, Action<int, string> onFailureCallback)
```

Deduct credits from a player (for in-game purchases, unlocking content, etc.):

```csharp
WebSocketCommandHandler.SendChargeUserBalanceRequestCommand(int amount, int pinCode, Action onSuccess, Action<int, string> onFailureCallback)
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

## 8. Leaderboards

To generate the leaderboard, it is mandatory to send the commands described in Step 6, particularly SendLevelEndRequestCommand with the player's score as one of the parameters.

If everything is done correctly and the end-of-level command is sent successfully with the score, a leaderboard will be formed on the server.

To fetch the leaderboard, use:

```csharp
WebSocketCommandHandler.SendLeaderboardRequestCommand(Action<LeaderboardDataResponse> onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Fetches the latest leaderboard data to show top players and their ranks.
:::

## 9. User State (Optional)

If your game needs to save any player state (such as settings, current level, level completion status, purchases, completed missions, etc.), use these commands to get and set user state:

```csharp
WebSocketCommandHandler.SendGetUserDataRequestCommand(Action<object> onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Requests the user state from the server. On the first request, the value may be `null` if no state is stored yet.
:::

```csharp
WebSocketCommandHandler.SendSetUserDataRequestCommand(object userData, Action onSuccessCallback, Action<int, string> onFailureCallback)
```

:::tip
Sends a new user state object to the server to be saved. Can be used to persist user-specific parameters.
:::

:::note

### Tips for Using User State

- It is recommended to use a simple class containing primitive types (`int`, `float`, `string`) that can be easily serialized into JSON.
- For more flexible or dynamic data structures, use:
  `csharp
    Dictionary<string, object> userData
    `
  This key–value format makes it easier to handle complex state updates and partial modifications.
  :::

## Next Steps

- [Review API documentation](./api-reference.mdx)
