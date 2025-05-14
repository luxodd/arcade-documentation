---
sidebar_position: 4
title: Testing
description: Test the Unity plugin integration with the example scene
---

# Testing the Integration

## Example Scene
Open the example scene to test plugin functionality:
`Assets > Luxodd.Game > Example > Scenes > ExampleScene`

![Example Scene](./assets/image10.png)

## Available Test Functions
Use the following buttons in the scene: test
- Connect to Server — initiates a server connection
- Get User Profile — requests the user's profile and credit balance
- Toggle Health Check — sends a health_status_check every 2 seconds
- Add Credits Request — adds 5 credits (requires PIN input)
- Charge Credits Request — deducts 3 credits (requires PIN input)

![Connect to Server Button](./assets/image12.png)
![Get User Profile Button](./assets/image6.png)
![Toggle Health Check Button](./assets/image8.png)
![Add Credits Button](./assets/image5.png)
![Charge Credits Button](./assets/image11.png)

:::note
Error handling for incorrect PIN codes is not implemented in this sample.
:::

## Next Steps
- [Start integrating the plugin](./integration.md)
- [Review API documentation](./api-reference.md) 
