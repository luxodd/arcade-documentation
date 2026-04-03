---
sidebar_position: 3
title: Configuration
description: Configure the Luxodd Godot plugin for development and production
---

# Configuration

The plugin is configured through a `LuxoddConfig` resource. There are two config files:

- **`addons/luxodd/config/luxodd_config.tres`** — Default config shipped with the plugin. Used in production HTML5 builds.
- **`luxodd_dev_config.tres`** (project root) — Local dev config with your debug token. Created by **Tools > Set Luxodd Dev Token**. Gitignored.

The plugin loads config in this priority order:
1. `res://luxodd_config.tres` (project root override)
2. `res://luxodd_dev_config.tres` (dev config, skipped in web builds)
3. `res://addons/luxodd/config/luxodd_config.tres` (plugin default)

## Config Properties

Edit the config resource in the Godot inspector:

| Property | Default | Description |
|---|---|---|
| `server_address` | `wss://game-server.luxodd.com` | Backend WebSocket URL |
| `developer_debug_token` | `""` | JWT token for local testing (editor only) |
| `max_reconnect_attempts` | `3` | Reconnection attempts before giving up |
| `reconnect_delay_seconds` | `0.5` | Delay between reconnection attempts |
| `health_check_interval_seconds` | `2.0` | Health ping interval |
| `command_timeout_seconds` | `4.0` | Command response timeout |

## Production vs Development

In **production** (HTML5 web builds), the plugin ignores the dev config and reads the JWT token and WebSocket host from URL query parameters set by the Luxodd embed page:

- `?token=<jwt>` — Authentication token
- `?wsHost=<hostname>` — WebSocket server hostname

In **development** (Godot editor or desktop builds), the plugin uses `developer_debug_token` and `server_address` from the config resource.

You do not need to change any config for production — the Luxodd platform handles it automatically.
