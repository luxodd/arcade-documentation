---
sidebar_position: 5
title: Testing
description: How to test your Luxodd Godot game locally and in the browser
---

# Testing

## Testing in the Godot Editor

1. Set your dev token via **Tools > Set Luxodd Dev Token**
2. Press **F5** to run the project
3. The plugin connects to the staging server using the token from your dev config
4. All commands work in the editor — profile, balance, level begin/end, leaderboard

If the server is unreachable, the plugin fires `connection_failed` and your game should fall back to free-play mode.

## Testing as HTML5 in Browser

1. Create an HTML5 export preset: **Project > Export > Add > Web**
2. Export the project
3. Serve the exported files locally:
   ```bash
   cd your-export-folder
   python -m http.server 8080
   ```
4. Open `http://localhost:8080` in Chrome

In a standalone browser tab (not embedded in the Luxodd platform), the plugin reads the token from the dev config. This lets you test the full WebGL build locally.

## Testing on Staging

To test your game embedded in the actual Luxodd platform:

1. Upload your HTML5 export to a game entry on the staging admin panel
2. Navigate to your game on `staging-app.luxodd.com`
3. The embed page provides the JWT token and WebSocket host via URL parameters — no dev config needed

## Automated Tests

The plugin repository includes a test suite in `tests/` that validates all protocol commands against a mock server. Run them with:

```bash
cd godot-plugin
godot --headless --script tests/run_tests.gd
```

The CI pipeline runs these tests on every push. If you modify the plugin, ensure tests pass before submitting.
