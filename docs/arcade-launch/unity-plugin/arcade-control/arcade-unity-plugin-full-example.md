---
sidebar_position: 2
title: Full Working Example (2D Arcade Controls)
description: Complete, beginner-friendly example of arcade input integration
---

# Full Working Example: 2D Arcade Player Controller

This page contains a **complete, practical example** of how to implement arcade joystick and button controls in a 2D Unity game using the Luxodd Unity Plugin.

This example is intentionally **explicit and verbose** and is designed for:

- Junior developers
- Junior+ developers
- Developers new to arcade input

You can copy the example scripts as-is and use them as a foundation for real projects.

---

## 1. What This Example Demonstrates

The example implements the following gameplay actions:

- Horizontal movement using the arcade joystick
- Vertical movement on ladders when the player is nearby
- Jump action triggered by a button press
- Semi-automatic weapon firing (3 shots per second)
- Item usage (key → door interaction)

The example focuses on **clarity and correctness**, not brevity.

---

## 2. Scene Setup

Create a new Unity scene and add the following objects.

### Player GameObject

Add a `Player` GameObject with:

- `Rigidbody2D`
- `BoxCollider2D`
- `ArcadePlayerControlAdapter`
- `PlayerControlBehaviour`

Recommended Rigidbody2D settings:

- Gravity Scale: `1`
- Body Type: `Dynamic`
- Freeze Rotation Z: `true`

### Door GameObject (Optional)

Add a simple `Door` GameObject with:

- Collider (trigger or solid)
- `Door` script attached

This object is used to demonstrate item interaction.

---

## 3. Script Overview

The example is split into multiple scripts, each with a single responsibility.

### IPlayerControlAdapter

Defines **gameplay actions**, not physical buttons.

Purpose:

- Abstracts input source
- Keeps gameplay logic hardware-independent

---

### ArcadePlayerControlAdapter

Reads arcade input using `ArcadeControls` and translates it into gameplay actions.

Responsibilities:

- Read joystick direction
- Track button hold state for firing
- Raise events for jump and item usage

---

### PlayerControlBehaviour

Consumes the adapter and applies gameplay logic.

Responsibilities:

- Apply movement using `Rigidbody2D`
- Handle ladder state transitions
- Apply jump force
- Control fire rate
- Interact with doors using items

This class does **not** depend on arcade-specific APIs.

---

### Door

Minimal example of an interactable object.

Purpose:

- Demonstrate item usage
- Keep interaction logic explicit and readable

---

## 4. Execution Flow (High-Level)

1. Arcade hardware sends input
2. `ArcadeControls` reads raw input
3. `ArcadePlayerControlAdapter` converts input to gameplay actions
4. `PlayerControlBehaviour` applies physics and logic
5. Game reacts consistently regardless of input device

This separation is intentional and recommended.

---

## 5. How to Test the Example

1. Open the scene
2. Connect an arcade controller
3. Enter Play Mode
4. Verify:
   - Joystick moves the player left/right
   - Vertical joystick movement works near ladders
   - Jump triggers immediately on button press
   - Holding fire button shoots at a fixed rate
   - Item button interacts with a door when a key is available

---

## 6. Why This Example Works (Checklist)

Use this checklist to validate your own implementation.

### Input Architecture

- [ ] Gameplay code does not call `ArcadeControls` directly
- [ ] Input is abstracted via an adapter interface
- [ ] Button presses are handled as events where appropriate
- [ ] Button holds are handled as state

### Physics & Timing

- [ ] Movement is applied in `FixedUpdate`
- [ ] Input is read in `Update`
- [ ] Fire rate is time-based, not frame-based
- [ ] Jump force uses physics impulses

### Gameplay Logic

- [ ] Ladder logic is gated by proximity checks
- [ ] Ladder state disables gravity
- [ ] Jump exits ladder state cleanly
- [ ] Item usage checks context before acting

---

## 7. Common Mistakes to Avoid

- Reading joystick input in `FixedUpdate`
- Applying physics in `Update`
- Mixing input reading with gameplay logic
- Using button polling for one-shot actions
- Hard-coding fire rate into input code
- Assuming input hardware inside gameplay classes

---

## 8. When to Extend This Example

This example is a foundation. You may extend it with:

- Ground detection
- Animation handling
- Weapon systems
- AI-controlled players using the same adapter interface
- Rebindable controls (if required by the project)

Keep the **adapter boundary** intact when extending functionality.

---

## 9. Summary

This example demonstrates a **clean, maintainable approach** to arcade input handling:

- Arcade-specific logic stays in one place
- Gameplay logic remains reusable
- Junior developers can follow the flow step by step
- The example can be copied, run, and modified safely
