---
sidebar_position: 6
title: API Reference
description: Complete API reference for the Luxodd Godot plugin
---

# API Reference

All methods and signals are on the `Luxodd` autoload singleton.

## Connection

| Method | Description |
|---|---|
| `connect_to_server()` | Connect to the Luxodd WebSocket server |
| `disconnect_from_server()` | Disconnect and stop health checks |

| Signal | Description |
|---|---|
| `connected()` | Fired when WebSocket connection is established |
| `disconnected()` | Fired when connection is lost |
| `connection_failed(error: String)` | Fired on connection or reconnection failure |
| `reconnecting(attempt: int, max_attempts: int)` | Fired on each reconnection attempt |

## Host Bridge

Communication between the game iframe and the Luxodd host page.

| Method | Description |
|---|---|
| `notify_game_ready()` | Tell the host page the game has loaded and is ready |
| `notify_session_end()` | Tell the host to navigate away (end session) |
| `send_session_option(action: String)` | Ask the host to show continue/restart popup. `action`: `"both"`, `"continue"`, or `"restart"` |

| Signal | Description |
|---|---|
| `host_jwt_received(token: String)` | JWT token received from the host page |
| `host_action_received(action: String)` | Player chose an action from the host popup: `"continue"`, `"restart"`, or `"end"` |

## User

| Method | Description |
|---|---|
| `get_profile()` | Fetch the current user's profile |
| `get_balance()` | Fetch the current user's balance |
| `add_balance(amount: int, pin_code: int)` | Add funds to balance (requires PIN) |
| `charge_balance(amount: int, pin_code: int)` | Deduct funds from balance (requires PIN) |

| Signal | Description |
|---|---|
| `profile_received(profile: Dictionary)` | Profile data: `game_handle`, `email`, etc. |
| `balance_received(balance: Dictionary)` | Balance data: `balance` (float) |
| `balance_added()` | Funds added successfully |
| `balance_charged()` | Funds charged successfully |

## Gameplay

| Method | Description |
|---|---|
| `level_begin(level: int)` | Report that a level has started |
| `level_end(level, score, accuracy, time_taken, enemies_killed, completion_percentage)` | Report level completion. Only `level` and `score` are required; others default to `0`. |
| `get_leaderboard()` | Fetch the game leaderboard |
| `get_best_score()` | Fetch the current user's best score |
| `get_recent_games()` | Fetch the current user's recent games |

| Signal | Description |
|---|---|
| `level_begin_ok()` | Server acknowledged level start |
| `level_end_ok()` | Server acknowledged level end |
| `leaderboard_received(data: Dictionary)` | Leaderboard data with `leaderboard` array |
| `best_score_received(data: Dictionary)` | Best score data |
| `recent_games_received(data: Dictionary)` | Recent games data |

## User Data Storage

Persist arbitrary per-user data (save states, unlocks, preferences).

| Method | Description |
|---|---|
| `get_user_data()` | Fetch stored user data for this game |
| `set_user_data(data: Variant)` | Store user data (any JSON-serializable value) |

| Signal | Description |
|---|---|
| `user_data_received(data: Variant)` | Stored data returned |
| `user_data_set()` | Data stored successfully |

## Sessions and Betting

| Method | Description |
|---|---|
| `get_session_info()` | Fetch current game session info |
| `get_betting_session_missions()` | Fetch active betting missions |
| `send_strategic_betting_result(results: Array)` | Submit strategic betting results |

| Signal | Description |
|---|---|
| `session_info_received(info: Dictionary)` | Session info data |
| `betting_missions_received(missions: Dictionary)` | Betting missions data |
| `strategic_betting_result_sent()` | Results submitted successfully |

## Health Check

| Method | Description |
|---|---|
| `start_health_check(interval: float)` | Start periodic health pings. Default interval from config (~2s). |
| `stop_health_check()` | Stop health pings |

| Signal | Description |
|---|---|
| `health_check_ok()` | Health ping acknowledged |

## Errors

All command failures emit a single error signal:

```
command_error(command: String, status_code: int, message: String)
```

| Status Code | Meaning |
|---|---|
| `400` | Bad request (invalid payload) |
| `401` | Unauthorized (invalid or expired token) |
| `402` | Insufficient balance |
| `404` | Resource not found |
| `412` | Precondition failed (invalid PIN) |
| `500` | Server error |
