---
sidebar_position: 1
title: Overview
description: Introduction to the Luxodd Godot plugin and its core features
---

# Godot Plugin Overview

The Luxodd Godot plugin provides a lightweight integration for building Godot 4.3+ games on the Luxodd arcade platform. It handles server communication, authentication, session management, and host page interop so you can focus on your game.

## Plugin Features

- Single autoload singleton (`Luxodd`) for all platform communication
- WebSocket transport with automatic reconnection
- Host page bridge for iframe communication (JWT, session flow)
- Editor tools: dev token dialog, HTML5 export validation
- Signal-based API matching Godot conventions
- Example game (Void Run) demonstrating a complete integration

## Requirements

- Godot 4.3 or higher
- HTML5 export templates installed (for production builds)

## Quick Start

1. [Installation](./installation.md) - Add the plugin to your project
2. [Configuration](./configuration.md) - Set up your development environment
3. [Integration Guide](./integration.md) - Wire up the plugin in your game
4. [Testing](./testing.md) - Test locally and in the browser
5. [API Reference](./api-reference.md) - Full signal and method reference
