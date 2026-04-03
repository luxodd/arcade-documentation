---
sidebar_position: 2
title: Installation
description: How to install the Luxodd Godot plugin in your project
---

# Installation

## Step 1: Copy the Plugin

Copy the `addons/luxodd/` folder from the [plugin repository](https://github.com/luxodd/godot-plugin) into your Godot project's `addons/` directory.

Your project structure should look like:

```
your-game/
├── addons/
│   └── luxodd/
│       ├── plugin.cfg
│       ├── plugin.gd
│       ├── luxodd.gd
│       ├── config/
│       ├── network/
│       ├── bridge/
│       ├── data/
│       ├── editor/
│       └── icons/
├── project.godot
└── your_game.gd
```

## Step 2: Enable the Plugin

1. Open your project in Godot
2. Go to **Project > Project Settings > Plugins**
3. Find **Luxodd** in the list and check **Enable**

This automatically registers the `Luxodd` autoload singleton. You can access it from any script via `Luxodd`.

## Step 3: Set a Dev Token

For local testing, you need a JWT token from the Luxodd platform:

1. Go to **Tools > Set Luxodd Dev Token** in the Godot editor menu
2. Paste your JWT token from the Luxodd web app (found in browser dev tools under the `authToken` cookie)
3. Click **Save**

This creates a `luxodd_dev_config.tres` file in your project root. This file is gitignored by default — do not commit it.

## Step 4: Install HTML5 Export Templates

Production games run as HTML5 (WebGL) builds. If you haven't already:

1. Go to **Editor > Manage Export Templates**
2. Download the templates for your Godot version
3. Create an HTML5 export preset in **Project > Export**

The plugin includes an export validation step that warns if required settings are misconfigured.
