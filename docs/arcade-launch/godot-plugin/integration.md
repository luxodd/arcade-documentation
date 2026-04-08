---
sidebar_position: 4
title: Integration Guide
description: Step-by-step guide to integrating the Luxodd plugin into your Godot game
---

# Integration Guide

This guide walks through wiring up the Luxodd plugin in your game, from connection to session management.

## Minimal Integration

```gdscript
extends Node

func _ready() -> void:
    # Connect signals
    Luxodd.connected.connect(_on_connected)
    Luxodd.connection_failed.connect(_on_connection_failed)
    Luxodd.profile_received.connect(_on_profile)
    Luxodd.balance_received.connect(_on_balance)
    Luxodd.command_error.connect(_on_error)
    Luxodd.host_action_received.connect(_on_host_action)

    # Start connection
    Luxodd.connect_to_server()

func _on_connected() -> void:
    # Tell the host page the game is ready
    Luxodd.notify_game_ready()
    # Fetch player data
    Luxodd.get_profile()
    Luxodd.get_balance()
    # Start health check pings
    Luxodd.start_health_check()

func _on_profile(profile: Dictionary) -> void:
    var name = profile.get("game_handle", "Player")
    print("Welcome, %s!" % name)

func _on_balance(balance: Dictionary) -> void:
    var amount = balance.get("balance", 0)
    print("Balance: $%s" % str(amount))

func _on_connection_failed(error: String) -> void:
    push_error("Connection failed: %s" % error)

func _on_error(command: String, code: int, message: String) -> void:
    push_warning("Command error [%s] %d: %s" % [command, code, message])
```

## Game Session Flow

The typical session flow for a pay-to-play game:

### 1. Charge Balance (Start Game)

```gdscript
func _on_play_pressed() -> void:
    Luxodd.balance_charged.connect(_on_charged, CONNECT_ONE_SHOT)
    Luxodd.charge_balance(100, pin_code)  # 100 = $1.00

func _on_charged() -> void:
    start_gameplay()
```

### 2. Report Level Progress

```gdscript
func _on_level_started(level: int) -> void:
    Luxodd.level_begin(level)

func _on_level_completed(level: int, score: int) -> void:
    Luxodd.level_end(level, score, accuracy, time_taken)
```

### 3. Session End (Continue/Restart/End)

When the game ends, ask the host to show the continue/restart popup:

```gdscript
func _on_game_over() -> void:
    Luxodd.level_end(1, final_score)

    # Wait so the player can see their score
    await get_tree().create_timer(3.0).timeout

    # Ask host to show continue/restart options
    Luxodd.send_session_option("both")  # "both", "continue", or "restart"
```

The host page shows a popup. When the player chooses, the game receives a `host_action_received` signal:

```gdscript
func _on_host_action(action: String) -> void:
    match action:
        "restart":
            reset_game()
            start_gameplay()
        "continue":
            start_gameplay()  # resume from current state
        "end":
            Luxodd.notify_session_end()  # tells host to navigate away
```

:::warning
Do not call `notify_session_end()` directly on game over. This causes the host to navigate away immediately, skipping the continue screen. Use `send_session_option()` instead and let the player choose.
:::

## Leaderboard

```gdscript
func _show_leaderboard() -> void:
    Luxodd.leaderboard_received.connect(_on_leaderboard, CONNECT_ONE_SHOT)
    Luxodd.get_leaderboard()

func _on_leaderboard(data: Dictionary) -> void:
    var entries = data.get("leaderboard", [])
    for entry in entries:
        print("%s: %d" % [entry.get("game_handle", ""), entry.get("total_score", 0)])
```

## User Data Storage

Persist arbitrary data per-user (save states, preferences, unlocks):

```gdscript
# Save
Luxodd.set_user_data({"level": 5, "coins": 120, "unlocks": ["hat_red"]})

# Load
Luxodd.user_data_received.connect(func(data): print("Loaded: ", data))
Luxodd.get_user_data()
```

## Free Play Mode

For local testing without a server connection, detect the connection state and fall back:

```gdscript
func _on_connection_failed(_error: String) -> void:
    # No server — enter free play mode
    free_play = true
    balance = 999999
    start_menu()
```

The example game (Void Run) demonstrates this pattern.
