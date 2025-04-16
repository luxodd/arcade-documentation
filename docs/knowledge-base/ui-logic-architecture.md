# UI logic architecture

### CustomProperty

To simplify working with dynamic variables and their UI representation, a **reactive property** approach is recommended (`CustomProperty` and its variations like `IntProperty`, `FloatProperty`, etc.). This ensures that any change in a property immediately triggers an event that updates the UI accordingly. Example use cases:

- Displaying the number of credits in the main menu.
- Updating the score dynamically during gameplay.

#### Example Implementation:

File location: Assets\Scripts\Utils\Property.cs

Code:

```cs
public interface IReadOnlyProperty<out T>
{
   T Value { get; }
   void AddListener(System.Action<T> listener);
   bool RemoveListener(System.Action<T> listener);
}


public interface IProperty<T> : IReadOnlyProperty<T>
{
   void SetValue(T value, bool notify = true, bool force = false);
}

public interface IIntReadOnlyProperty : IReadOnlyProperty<int>{}
public interface IIntProperty : IIntReadOnlyProperty, IProperty<int>{}

public class CustomProperty<T> : IProperty<T>
{
   private readonly List<Action<T>> _listeners = new List<Action<T>>();
   private readonly List<Action<T>> _safeListeners = new List<Action<T>>();
   public T Value { get; private set; }


   public CustomProperty()
   {
       Value = default(T);
   }


   public CustomProperty(T value)
   {
       Value = value;
   }

   public void AddListener(Action<T> listener)
   {
       _listeners.Add(listener);
   }


   public bool RemoveListener(Action<T> listener)
   {
        return _listeners.Remove(listener);
   }


   public void SetValue(T value, bool notify = true, bool force = false)
   {
       if (object.Equals(value, Value) == false || force)
       {
           Value = value;
       }


       if (notify)
       {
           NotifyListeners();
       }
   }


   private void NotifyListeners()
   {
       _safeListeners.Clear();


       ValidateListeners();

       foreach (var listener in _listeners)
       {
           _safeListeners.Add(listener);
       }

       _safeListeners.ForEach(listener => listener?.Invoke(Value));
   }


   private void ValidateListeners()
   {
       lock (_listeners)
       {

           var listenersCopy = new List<System.Action<T>>(_listeners);


           for (int i = listenersCopy.Count - 1; i >= 0; i--)
           {
               if (listenersCopy[i] != null) continue;

               _listeners.RemoveAt(i);
           }
       }
   }
}

public class IntProperty : CustomProperty<int>, IIntProperty
{
   public static IntProperty operator +(IntProperty property, int value)
   {
       property.SetValue(property.Value + value);

       return property;
   }
   public static IntProperty operator -(IntProperty property, int value)
   {
       property.SetValue(property.Value - value);
       return property;
   }
   public static IntProperty operator ++(IntProperty property)
   {
       property.SetValue(property.Value + 1);
       return property;
   }
   public static IntProperty operator --(IntProperty property)
   {
       property.SetValue(property.Value - 1);
       return property;
   }


   public static void Add(IntProperty property, int value)
   {
       property.SetValue(property.Value + value);
   }


   public static void Subtract(IntProperty property, int value)
   {
       property.SetValue(property.Value - value);
   }
}

```

### SimpleEvent

To simplify event handling and reduce subscription-related errors, the `SimpleEvent` class is used:

- **`SimpleEvent`** \- A class that signals an event occurrence without parameters.
- **`SimpleEvent<T>`** \- A generic class that signals an event and passes an object of type `T` as an argument.

This event system is recommended for use between classes that interact through **composition** or **aggregation**.

#### Example Implementation:

File location: Assets\Scripts\Utils\SimpleEvent.cs

Code:

```cs
public interface ISimpleEvent
{
   void AddListener(System.Action callback);
   void RemoveListener(System.Action callback);
   void RemoveAllListeners();
}


public interface ISimpleEvent<out T>
{
   void AddListener(System.Action<T> callback);
   void RemoveListener(System.Action<T> callback);
   void RemoveAllListeners();
}


public class SimpleEvent : ISimpleEvent
{
   private List<System.Action> _eventListeners = new List<System.Action>();
   private List<System.Action> _eventListenersSafe = new List<System.Action>();


   public void AddListener(System.Action listener)
   {
       _eventListeners.Add(listener);
   }


   public void RemoveListener(System.Action listener)
   {
       _eventListeners.Remove(listener);
   }


   public void RemoveAllListeners()
   {
       _eventListeners.Clear();
   }


   public void Notify()
   {
       _eventListenersSafe.Clear();
       _eventListenersSafe.AddRange(_eventListeners);

       _eventListenersSafe.ForEach(listener => listener?.Invoke());
   }


   private void ValidateListeners()
   {
       lock (_eventListeners)
       {

           var listenersCopy = new List<System.Action>(_eventListeners);


           for (int i = listenersCopy.Count - 1; i >= 0; i--)
           {
               if (listenersCopy[i] != null) continue;

               _eventListeners.RemoveAt(i);
           }
       }
   }
}


public class SimpleEvent<T> : ISimpleEvent<T>
{
   private List<System.Action<T>> _eventListeners = new List<System.Action<T>>();
   private List<System.Action<T>> _eventListenersSafe = new List<System.Action<T>>();


   public void AddListener(System.Action<T> listener)
   {
       _eventListeners.Add(listener);
   }


   public void RemoveListener(System.Action<T> listener)
   {
       _eventListeners.Remove(listener);
   }


   public void RemoveAllListeners()
   {
       _eventListeners.Clear();
   }


   public void Notify(T value)
   {
       _eventListenersSafe.Clear();

       ValidateListeners();

       _eventListenersSafe.AddRange(_eventListeners);

       _eventListenersSafe.ForEach(listener => listener?.Invoke(value));
   }


   private void ValidateListeners()
   {
       lock (_eventListeners)
       {

           var listenersCopy = new List<System.Action<T>>(_eventListeners);


           for (int i = listenersCopy.Count - 1; i >= 0; i--)
           {
               if (listenersCopy[i] != null) continue;

               _eventListeners.RemoveAt(i);
           }
       }
   }
}

```

### EventAggregator

For cases where an event needs to be handled by unrelated entities (e.g., updating the score when an enemy is defeated), an **EventAggregator** pattern is used. This pattern utilizes a static class that provides methods for event management, acting as a mediator between event generators and event consumers.

#### Example Implementation:

File location: Assets\Scripts\Utils\EventAggregator.cs

Code:

```cs
public interface IEventData { }


public static class EventAggregator
{
   public static void Subscribe<T>(System.Action<object, T> callback) where T : IEventData
   {
       EventHolder<T>.Event += callback;
   }


   public static void Unsubscribe<T>(System.Action<object, T> callback) where T : IEventData
   {
       EventHolder<T>.Event -= callback;
   }


   public static void Post<T>(object sender, T eventData) where T : IEventData
   {
       EventHolder<T>.Post(sender, eventData);
   }


   private static class EventHolder<T> where T : IEventData
   {
       public static event System.Action<object, T> Event;


       public static void Post(object sender, T eventData)
       {
           Event?.Invoke(sender, eventData);
       }
   }
}

```

### CoroutineManager

A **static class** that allows coroutines to be invoked from anywhere and provides useful utility functions:

- **`DelayedAction(float delay, Action action)`** \- Executes an action after a delay (in seconds).
- **`NextFrameAction(int frameCount, Action action)`** \- Executes an action after skipping a specified number of frames.

#### Example Implementation:

File location: Assets\Scripts\Utils\EventAggregator.cs

Code:

```cs
public class CoroutineManager : MonoBehaviour
{
   private static CoroutineManager _instanceInner;


   private static CoroutineManager _instance
   {
       get
       {
           if (_instanceInner == null)
           {
               var go = new GameObject("CoroutineManager");
               _instanceInner = go.AddComponent<CoroutineManager>();
           }
           return _instanceInner;
       }
   }

   private void Awake()
   {
       _instanceInner = this;
   }


   public static Coroutine StartCoroutineMethod(IEnumerator routine)
   {
       return _instance.StartCoroutine(routine);
   }


   public static void StopCoroutineMethod(Coroutine routine)
   {
       _instance.StopCoroutine(routine);
   }


   public static void DelayedAction(float seconds, System.Action action)
   {
       _instance.StartCoroutine(DelayedActionInner(seconds, action) );
   }


   public static void NextFrameAction(int ftameCount, System.Action action)
   {
       _instance.StartCoroutine( _instance.NextFrameActionInner(ftameCount, action) );
   }


   private static IEnumerator DelayedActionInner(float delay, System.Action action)
   {
       yield return new WaitForSeconds(delay);
       action?.Invoke();
   }


   private IEnumerator NextFrameActionInner(int frameCount, System.Action action)
   {
       while (frameCount > 0)
       {
           yield return new WaitForEndOfFrame();
           frameCount--;
       }

       action?.Invoke();
   }
}

```

### State Machine Documentation

#### Overview

To effectively manage game states, it is recommended to use the **State** pattern in a simple implementation. This approach ensures modular, maintainable, and scalable state transitions throughout the game.

`IState` Interface

The `IState` interface defines the necessary methods for managing game states:

```cs
public interface IState
{
   void OnStateEnter();
   void OnStateExit();

   void SetOnCompleteAction(Action<ApplicationState> action);
}

```

Method Descriptions:

- **`OnStateEnter()`** → Called when entering the state. It can contain any initialization logic, such as event subscriptions, UI updates, or preparing game elements.
- **`OnStateExit()`** → Called when transitioning to another state. Typically used to unsubscribe from events and free resources.
- **`SetOnCompleteAction(Action<ApplicationState> action)`** → Specifies an action to be executed when the state completes. This is useful for triggering another state transition or executing state-specific logic.

#### BaseState

```cs
public abstract class BaseState : MonoBehaviour, IState
{
   public abstract void OnStateEnter();
   public abstract void OnStateExit();


   protected void CompleteState(ApplicationState nextState)
   {
       Debug.Log($"[{DateTime.Now}][{GetType().Name}][{nameof(CompleteState)}] OK, nextState: {nextState}");
       _onCompleteAction?.Invoke(nextState);
   }

   private Action<ApplicationState> _onCompleteAction;
   public void SetOnCompleteAction(Action<ApplicationState> action)
   {
       _onCompleteAction = action;
   }
}

```

#### Simple State Machine Implementation

To manage game states efficiently, a **Finite State Machine (FSM)** can be used. The following is a simplified implementation:

```cs
public class ApplicationStateBehaviour : MonoBehaviour
{
   [Header("States")]
   [SerializeField] private BootstrapState _bootstrapState;
   [SerializeField] private MainMenuState _mainMenuState;
   [SerializeField] private LaunchLoadingState _launchLoadingState;
   [SerializeField] private PrepareGameState _prepareGameState;
   [SerializeField] private GameplayState _gameplayState;
   [SerializeField] private GameOverState _gameOverState;
   [SerializeField] private BackToMainMenuState _backToMainMenuState;
   [SerializeField] private RestartGameState _restartGameState;

   [Header("Other")]
   [SerializeField] private ApplicationState _startState = ApplicationState.Bootstrap;


   private ApplicationState _currentState = ApplicationState.Bootstrap;
   private IState _currentStateBehaviour;


   private IEnumerator Start()
   {
       yield return new WaitForSeconds(0.1f);
       Debug.Log($"[{GetType().Name}][{nameof(Start)}] OK");
       SwitchState(_startState, true);
   }


   private void UpdateState()
   {
       Debug.Log($"[{GetType().Name}][{nameof(UpdateState)}] OK, {_currentState}");
       switch (_currentState)
       {
           case ApplicationState.Bootstrap:
               OnBootstrap();
               break;
           case ApplicationState.LaunchLoading:
               OnLaunchLoading();
               break;
           case ApplicationState.MainMenu:
               OnMainMenu();
               break;
           case ApplicationState.PrepareGame:
               OnPrepareGame();
               break;
           case ApplicationState.Gameplay:
               OnGameplay();
               break;
           case ApplicationState.GameOver:
               OnGameOver();
               break;
           case ApplicationState.BackToMainMenu:
               OnBackToMainMenu();
               break;
           case ApplicationState.Leaderboard:
               OnLeaderboard();
               break;
           case ApplicationState.RestartGame:
               OnRestartGame();
               break;
           default:
               throw new ArgumentOutOfRangeException();
       }
   }


   private void SwitchState(ApplicationState newState, bool force = false)
   {
       Debug.Log(
           $"[{GetType().Name}][{nameof(SwitchState)}] OK, was: {_currentState}, newState: {newState} force: {force}");
       if (_currentState == newState && force == false)
       {
           return;
       }

       _currentStateBehaviour?.OnStateExit();
       _currentState = newState;


       UpdateState();
   }


   private void OnBootstrap()
   {
   }


   private void OnLaunchLoading()
   {
   }


   private void OnMainMenu()
   {
   }


   private void OnPrepareGame()
   {
   }


   private void OnGameplay()
   {
       _currentStateBehaviour = _gameplayState;

       _gameplayState.SetOnCompleteAction(StateCompleteHandler);
       _gameplayState.OnStateEnter();
   }


   private void OnGameOver()
   {
   }


   private void OnBackToMainMenu()
   {
   }


   private void OnRestartGame()
   {
   }




   private void StateCompleteHandler(ApplicationState nextState)
   {
       Debug.Log($"[{DateTime.Now}][{GetType().Name}][{nameof(StateCompleteHandler)}] OK, nextState: {nextState}");
       SwitchState(nextState);
   }
}

```

The state machine is implemented in the project at: Assets/Scripts/Core/States/ApplicationStateBehaviour.cs

#### Explanation:

- `GameStates` → Enum listing all possible game states.
- `SwitchState(GameStates newState, bool force = false)` → Manages state transitions.
  - Check if the new state is different from the current one.
  - If it is the same and `force` is false, the transition is skipped.
  - Calls `OnStateExit()` on the previous state.
  - Updates `_currentGameState` and calls `UpdateState()`.
- `UpdateState()` → Determines which state should be active based on `_currentGameState`.

For large-scale projects, it is advisable to encapsulate state logic into separate classes for better **code readability and maintainability**.

#### Key States in the Game:

1. **`Bootstrap`** → Initializes core non-MonoBehaviour objects, injects dependencies where required.
2. **`LaunchLoading`** → Displays the loading screen and performs preloading operations.
3. **`MainMenu`** → Handles UI interactions, such as the Play button and score display.
4. **`PrepareGame`** → Instantiates the game level and player ship, displays the loading screen.
5. **`Gameplay`** → Activates and manages the main game loop, handling events and mechanics.
6. **`GameOver`** → Disables all active game processes upon player defeat.
7. **`RestartGame`** → Cleans up all event subscriptions, removes game objects (player, enemies, projectiles), and transitions back to `PrepareGame`.
8. **`BackToMainMenu`** → Similar to `RestartGame`, but transitions the player to the **Main Menu** instead.

### Player Statistics

#### Overview

Player statistics are an essential tool in the game that allow tracking the player’s progress and skill improvement over time. By collecting relevant data, we can display which aspects of the game the player has improved or worsened in, as well as provide some motivational feedback.

#### Tracked Statistics

The game collects the following statistics:

- **Total Score** – The number of points earned.
- **Enemies Killed** – The number of defeated opponents.
- **Accuracy (%)** – The percentage of successful shots.
- **Level Progress (%)** – The distance covered in the level as a percentage of total level length.
- **Completion Time** – The total time spent completing the level.

In different types of games, the tracked statistics may vary, but generally, the number of tracked parameters remains limited to the most critical aspects of gameplay.

#### Tracking System Implementation

To implement player statistics tracking within game levels, dedicated tracker classes were created for each specific parameter:

- `ScoreManager` \- Tracks the player's total score.
- `PlayerEnemyKillsTracker` \- Tracks the number of defeated enemies
- `PlayerAccuracyTracker` \- Tracks the player's shooting accuracy.
- `PlayerLevelProgressTracker` \- Tracks the player's progress within a level.
- `PlayerLevelTimeTracker` \- Tracks the time spent in the level.

To provide a **convenient way to manage all these trackers in one place**, a **facade class** `PlayerStatisticTrackingController` was created.

#### File Location

All classes related to player statistics are located at: Assets\\Scripts\\Game\\Statistics

The following section will describe the functionality of `PlayerStatisticTrackingController` in detail.

#### PlayerStatisticTrackingController

##### Overview

The `PlayerStatisticTrackingController` acts as a **facade** for managing and tracking various player statistics throughout the game. It centralizes **accuracy, level time, enemy kills, and level progress tracking**, ensuring that all related subsystems work together efficiently.

This class:

- **Collects and updates statistics** based on gameplay events.
- **Manages lifecycle** of individual trackers.
- **Subscribes and unsubscribes from relevant game events** to keep data accurate.

#####

##### Properties

These **read-only** properties provide access to different tracked statistics:

- `Accuracy` \- Returns the player's shooting accuracy (`PlayerAccuracyTracker`).
- `TotalSeconds` \- Returns the total time spent in the level (`PlayerLevelTimeTracker`).
- `EnemiesKilled` \- Returns the number of enemies defeated (`PlayerEnemyKillsTracker`).
- `LevelProgress` \- Returns the player's current progress in the level (`PlayerLeveProgressTracker`).

Each of these properties retrieves values from their respective **tracker components.**

#####

##### Trackers (Private Fields)

These fields represent different subsystems that handle individual aspects of tracking:

- `_playerAccuracyTracker` \- Tracks the player's shooting accuracy.
- `_playerLevelTimeTracker` \- Tracks how long the player spends in a level.
- `_playerEnemyKillsTracker` \- Tracks the number of enemies defeated.
- `_playerLeveProgressTracker` \- Tracks the player's progress within the level.

These instances are **initialized in `PrepareTrackers()`** and are responsible for processing statistics in their respective areas.

#####

##### Lifecycle Methods

`Awake()`

- Calls `PrepareTrackers()` to initialize all statistic trackers.
- Ensures trackers are ready **before the game starts**.

`StartTracking()`

- **Subscribes to game events** (`SubscribeToEvents()`).
- Calls `StartTracking()` on each **statistic tracker** to begin data collection.

`StopTracking()`

- Calls `StopTracking()` on all trackers to halt data collection.
- **Unsubscribes from all game events** (`UnsubscribeFromEvents()`).

##### Event Subscription Management

`SubscribeToEvents()`

Subscribes the controller to important game events using EventAggregator, allowing the system to react dynamically:

| Event                    | Handler Method                    | Purpose                                     |
| :----------------------- | :-------------------------------- | :------------------------------------------ |
| `ProjectileDestroyEvent` | `OnProjectileDestroyEventHandler` | Tracks player's hit accuracy.               |
| `PlayerShotEvent`        | `OnPlayerShotEventHandler`        | Tracks when the player fires a shot.        |
| `EnemyDeathEvent`        | `OnEnemyDeathEventHandler`        | Tracks enemy kills.                         |
| `LevelPreparedEvent`     | `OnLevelPreparedEventHandler`     | Initializes level progress tracking.        |
| `GameOverEvent`          | `OnGameOverEventHandler`          | Updates progress if the level is lost.      |
| `LevelCompletionEvent`   | `OnLevelCompletionEventHandler`   | Updates progress if the level is completed. |

`UnsubscribeFromEvents()`

Ensures that the controller **removes all event subscriptions** when stopping tracking to prevent memory leaks and unnecessary event handling.

##### Event Handlers

Each event handler processes data **when a relevant game event occurs**:

Projectile Events

- **`OnProjectileDestroyEventHandler()`**
  - Increases **hit count** if the projectile belongs to the player and was destroyed by a hit.
- **`OnPlayerShotEventHandler()`**
  - Increases **shot count**, contributing to accuracy tracking.

Enemy Death Event

- **`OnEnemyDeathEventHandler()`**
  - Increases the kill count when an enemy is defeated.

Level Events

- **`OnLevelPreparedEventHandler()`**
  - Sets up the level's **start and end points** for progress tracking.
- **`OnGameOverEventHandler()`**
  - Updates the player's **last known position** in the level when the game ends.
- **`OnLevelCompletionEventHandler()`**
  - If the level is completed, marks the level as **finished** in progress tracking.

##### Tracker Initialization

`PrepareTrackers()`

- Initializes instances of:
  - `PlayerAccuracyTracker`
  - `PlayerLevelTimeTracker`
  - `PlayerEnemyKillsTracker`
  - `PlayerLeveProgressTracker`
- Ensures all subsystems are **ready before tracking starts**.
