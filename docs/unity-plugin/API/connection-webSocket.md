# WebSocket Connection Process

Since .NET's built-in `System.Net` sockets are not supported in WebGL, a lightweight JavaScript library was created to handle WebSocket communication. The script is located at:

```
Assets\Plugins\WebGL\websocket.jslib
```

#### JavaScript WebSocket Library

```javascript
mergeInto(LibraryManager.library, {
	ConnectWebSocket: function (urlPtr) {
		var url = UTF8ToString(urlPtr);
		var socket = new WebSocket(url);

		// Store socket instance globally
		window.UnityWebSocket = socket;

		// Connection Open Handler
		socket.onopen = function () {
			console.log("WebSocket connected to " + url);
			if (typeof unityInstance !== "undefined") {
				unityInstance.SendMessage("WebSocketHandler", "OnWebSocketOpen");
			} else {
				console.error("unityInstance is not defined");
			}
		};

		// Message Receive Handler
		socket.onmessage = function (event) {
			console.log("Message received: " + event.data);
			if (typeof unityInstance !== "undefined") {
				unityInstance.SendMessage(
					"WebSocketHandler",
					"OnWebSocketMessage",
					event.data
				);
			} else {
				console.error("unityInstance is not defined");
			}
		};

		// Connection Close Handler
		socket.onclose = function (event) {
			console.log(
				"WebSocket connection closed, code and reason:",
				event.code,
				event.reason
			);
			if (typeof unityInstance !== "undefined") {
				unityInstance.SendMessage(
					"WebSocketHandler",
					"OnWebSocketClose",
					event.code
				);
			} else {
				console.error("unityInstance is not defined");
			}
			// Clear the global reference
			window.UnityWebSocket = null;
		};

		// Error Handler
		socket.onerror = function (error) {
			console.error("WebSocket connection error: ", error);
			if (typeof unityInstance !== "undefined") {
				unityInstance.SendMessage(
					"WebSocketHandler",
					"OnWebSocketError",
					error.type
				);
			} else {
				console.error("unityInstance is not defined");
			}
		};
	},

	SendWebSocketMessage: function (messagePtr) {
		var message = UTF8ToString(messagePtr);
		if (window.UnityWebSocket) {
			console.log("Sending message: " + message);
			window.UnityWebSocket.send(message);
		} else {
			console.error("No active WebSocket connection");
		}
	},

	CloseWebSocket: function () {
		if (window.UnityWebSocket) {
			console.log("Closing WebSocket connection...");
			window.UnityWebSocket.close();
		} else {
			console.error("No active WebSocket connection to close");
		}
	},

	NavigateToHome: function () {
		var currentUrl = window.location.origin; // Get the current base URL
		var homeUrl = currentUrl + "/home"; // Construct the target URL
		console.log("Navigating to: " + homeUrl);
		window.location.href = homeUrl; // Redirect to the home page
	},
});
```

### **WebSocket Methods and Functions**

#### **`ConnectWebSocket(urlPtr)`**

**Description:** Establishes a new WebSocket connection using the specified URL. **Features:**

- Converts the pointer to a URL string using `UTF8ToString`.
- Stores the WebSocket instance globally in `window.UnityWebSocket`.
- Configures event handlers (`onopen`, `onmessage`, `onclose`, `onerror`).
- Notifies Unity via `SendMessage` when the connection is established.

#### **`socket.onopen`**

**Description:** Event handler for opening a WebSocket connection. **Features:**

- Logs a connection message to the console.
- Sends a message to Unity through `unityInstance.SendMessage` in `WebSocketHandler.OnWebSocketOpen`.

#### **`socket.onmessage`**

**Description:** Handles incoming WebSocket messages. **Features:**

- Logs received data to the console.
- Sends data to Unity through `WebSocketHandler.OnWebSocketMessage`.

#### **`socket.onclose`**

**Description:** Handles WebSocket disconnection. **Features:**

- Logs a disconnection message to the console.
- Notifies Unity via `WebSocketHandler.OnWebSocketClose`.

#### **`socket.onerror`**

**Description:** Handles WebSocket errors. **Features:**

- Logs errors to the console.
- Notifies Unity via `WebSocketHandler.OnWebSocketError`.

#### **`SendWebSocketMessage(messagePtr)`**

**Description:** Sends a message through WebSocket. **Features:**

- Converts a string pointer to a message string using `UTF8ToString`.
- Send the message through `window.UnityWebSocket`.

#### **`CloseWebSocket()`**

**Description:** Closes the current WebSocket connection. **Features:**

- Calls the `close()` method for the current WebSocket instance.
