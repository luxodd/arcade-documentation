---
sidebar_position: 3
title: Configuration
description: Configure the Unity plugin for your development environment
---

# Configuration Guide

## Developer Token
To enable Debug Mode, enter your developer token:
1. Navigate to: Tools > Luxodd Plugin > Set Developer Token
2. Paste the token obtained during registration

![Developer Token Menu](./assets/image4.png)

## Server Environments
The plugin supports two environments:
- Staging (default, for testing)
- Production

To configure, edit the file at: `Assets/Luxodd.Game/Resources/NetworkSettingsDescriptor`

![Network Settings Descriptor](./assets/image1.png)

## Next Steps
- [Test the integration](./testing.md)
- [Start integrating the plugin](./integration.md) 