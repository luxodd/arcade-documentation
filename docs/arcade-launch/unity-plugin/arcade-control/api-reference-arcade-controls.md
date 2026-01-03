---
sidebar_position: 3
title: API Reference arcade controls
description: API reference for arcade controls
---

## ArcadeControls

Low-level static API for reading arcade input.

### GetStick()

Returns joystick data.

```csharp
StickData ArcadeControls.GetStick();
```

### GetButtonDown

```csharp
bool ArcadeControls.GetButtonDown(ArcadeButtonColor button);
```

- Returns `true` on the frame the button is pressed
- Suitable for trigger-based actions (jump, confirm, use item)

### GetButtonUp

```csharp
bool ArcadeControls.GetButtonUp(ArcadeButtonColor button);
```

- Returns `true` on the frame the button is released

### ArcadeButtonColor

```csharp
public enum ArcadeButtonColor
{
    Black,
    Red,
    Green,
    Yellow,
    Blue,
    Purple,
    Orange,
    White
}
```

Use this enum when querying button states to keep code readable and consistent.

### Usage Notes

- This API does not enforce gameplay behavior
- Fire rate, cooldowns, and action logic must be implemented in gameplay code
- For maintainable architecture, prefer using an adapter over direct API calls

**End of documentation.**
