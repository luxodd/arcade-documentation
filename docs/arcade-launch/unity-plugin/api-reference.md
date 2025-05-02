---
sidebar_position: 7
title: API Reference
description: Detailed API documentation for the Unity plugin
---

# API Reference

## WebSocket Service

### Connection

```csharp
ConnectToServer(Action onSuccessCallback = null, Action onErrorCallback = null)
```

Establishes a WebSocket connection to the server and prepares the plugin for command exchange.

### Return to System

```csharp
WebSocketService.BackToSystem()
```

Sends a signal to exit the game and return control to the system or game launcher. Useful at the end of gameplay or from the main menu.

## Error Handling (ErrorHandlerService)

### Generic Error

```csharp
HandleError(string message, string error)
```

Generic method to report any kind of error with a description and optional code.

### Connection Error

```csharp
HandleConnectionError(string message)
```

Logs and handles errors related to WebSocket connection issues (e.g., connection loss).

### Credits Error

```csharp
HandleCreditsError(string message)
```

Handles errors that occur during credit operations like top-up or deduction.

### Game Error

```csharp
HandleGameError(string message)
```

Used to report issues within the game logic itself, such as invalid state transitions or crashes.

## Automatic Reconnection (ReconnectService)

### Reconnection Event

```csharp
// Subscribe to this event:
ReconnectStateChangedEvent
```

Triggers automatically when connection to the server is lost and attempts to restore it. You can monitor its status to provide user feedback or retry logic.

## Next Steps

- [Check arcade compatibility guidelines](./arcade-compatibility.md)
- [Return to integration guide](./integration.md)
