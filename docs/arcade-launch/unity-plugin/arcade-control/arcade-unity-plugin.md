---
sidebar_position: 1
title: Arcade Unity Plugin
description: Understanding arcade joystick and button mapping in Unity
---

# Arcade Unity Plugin

This section explains how the Luxodd Unity Plugin helps developers understand and work with arcade joystick and button inputs in Unity.

The plugin provides tools to **visualize**, **document**, and **debug** arcade controls, while keeping full control of gameplay input logic in your code.

---

## 1. Overview and Concepts

![Arcade Control Panel](../assets/image24.png)

Arcade cabinets use a fixed physical control panel consisting of:

- A joystick
- Multiple colored buttons
- A numeric keypad (used for system-level input such as PIN entry)

In Unity, these physical controls are exposed as **standard joystick inputs**.  
However, without a visual reference, understanding which physical button maps to which Unity input can be confusing and error-prone.

The Arcade Unity Plugin solves this by providing:

- A clear visual representation of the arcade control panel
- A consistent arcade-to-Unity button mapping
- A developer-facing editor tool to label and document controls
- A runtime overlay for debugging and player instructions

### Important

> The Arcade Bindings window is a **visual reference and debugging tool only**.  
> It does **not** automatically bind arcade buttons to gameplay actions.
>
> All gameplay input logic must be implemented in code using Unity input APIs.

---

## 2. Arcade Control Panel Structure

The arcade control panel can be logically divided into several parts:

### Joystick

- The primary input device
- Used for character movement, navigation, or directional input
- Exposed in Unity as a 2D vector

### Colored Buttons

- Multiple colored buttons are available
- Some buttons are **reserved by the system**:
  - **Orange** — system overlay / help
  - **White** — back / cancel
  - **Black** — default confirmation
- The central colored buttons are intended for gameplay actions

### Numeric Keypad

- Used for system interactions such as PIN input
- Not intended for gameplay controls

---

## 3. Arcade Button Mapping

The following table shows the fixed mapping between physical arcade buttons and Unity joystick inputs:

| Arcade Button Color | Unity Input     |
| ------------------- | --------------- |
| Black               | JoystickButton0 |
| Red                 | JoystickButton1 |
| Green               | JoystickButton2 |
| Yellow              | JoystickButton3 |
| Blue                | JoystickButton4 |
| Purple              | JoystickButton5 |
| Orange              | JoystickButton8 |
| White               | JoystickButton9 |

This mapping is consistent across the SDK and should be treated as the single source of truth.

---

## 4. Arcade Bindings Editor

After installing the plugin, you can open the Arcade Bindings window:

**Luxodd Unity Plugin → Control → Binding Editor**

This editor allows you to:

- See a visual representation of the arcade control panel
- Select individual buttons
- View the corresponding Unity `JoystickButton` code
- Assign **Action Labels** for overlays and help screens
- Preview joystick direction in Play Mode

### Action Labels

Action labels are descriptive names (e.g. _Jump_, _Shoot_, _Use Item_) that:

- Appear in the runtime overlay
- Help explain controls to players
- Serve as documentation for your team

They **do not** create or change input bindings.

---

## 5. Practical Gameplay Example

To demonstrate how arcade input can be used in a real game, consider a simple 2D action game with the following actions:

- Move left / right
- Climb ladders (up / down when near a ladder)
- Jump
- Shoot a weapon
- Use an item (e.g. a key to open a door)

### Why use an Adapter

Instead of reading input directly in gameplay code, we define an adapter interface that represents **game actions**, not buttons.

This makes input handling:

- Easier to read
- Easier to test
- Independent from the specific input device

### Input Adapter Interface

```csharp
public interface IPlayerControlAdapter
{
    Vector2 MovementVector { get; }
    event Action JumpButtonPressed;
    event Action UseItemButtonPressed;
    bool IsFireButtonPressed { get; }
}
```

The interface defines **game actions**, not physical buttons.

### Arcade Adapter Implementation

```csharp
public class ArcadePlayerControlAdapter : MonoBehaviour, IPlayerControlAdapter
{
    public Vector2 MovementVector { get; private set; }
    public event Action JumpButtonPressed;
    public event Action UseItemButtonPressed;
    public bool IsFireButtonPressed { get; private set; }

    void Update()
    {
        var stickData = ArcadeControls.GetStick();
        MovementVector = stickData.Vector;

        if (ArcadeControls.GetButtonDown(ArcadeButtonColor.Red))
            IsFireButtonPressed = true;
        else if (ArcadeControls.GetButtonUp(ArcadeButtonColor.Red))
            IsFireButtonPressed = false;

        if (ArcadeControls.GetButtonDown(ArcadeButtonColor.Black))
            JumpButtonPressed?.Invoke();

        if (ArcadeControls.GetButtonDown(ArcadeButtonColor.Green))
            UseItemButtonPressed?.Invoke();
    }
}

```

### Gameplay Control Logic

The gameplay component:

- Reads movement from the adapter
- Applies physics via `Rigidbody2D`
- Handles ladder state
- Applies jump force
- Controls weapon fire rate (3 bullets per second)
- Uses items such as keys to interact with doors

Gameplay code does not depend on arcade hardware details.

### Full Gameplay Test Scene

For a complete, runnable example, the plugin provides a **dedicated gameplay test scene**.

This scene includes:

- A controllable player character
- Ladder zones
- Jumping and movement physics
- Weapon firing with a fixed fire rate
- Item pickup and door interaction

The scene is implemented using the same adapter-based architecture described above and is intended to be:

- Readable
- Copyable
- Safe to modify for experimentation

A step-by-step breakdown of this scene is available in the **Full Working Example** section.
