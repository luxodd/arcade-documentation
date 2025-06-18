---
sidebar_position: 4
title: Game Sample – Developer Guide
description: A compact but complete handbook for newcomers who will extend our arcade platform
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Game Sample – Developer Guide

Link to the repository: [Github Link](https://github.com/luxodd/example-game-arcade-shooter)

_A compact but complete handbook for newcomers who will extend our arcade platform._

## 1. Purpose of the Sample Project

:::info
This small vertical shooter (think _Raiden 2_) is a **live showcase** for our Arcade SDK.
:::

This project demonstrates:

- WebGL build running inside an arcade shell
- Pure joystick navigation (no mouse/keyboard)
- Error handling and return-to-menu flow
- Clean, commented code that beginners can follow

Use it as both a **tutorial** and a **Unity plugin** for your own arcade games.

## 2. Project & Scene Layout

| Item             | Location                  | Notes                                                |
| ---------------- | ------------------------- | ---------------------------------------------------- |
| **MainScene**    | `Assets/Scenes/MainScene` | The only scene. Levels load from prefabs at runtime. |
| **CameraParent** | Scene root                | Holds the top-down gameplay camera.                  |
| **UIMain**       | Prefab in scene           | Two canvases: HUD + pop-ups.                         |
| **Controllers**  | Prefab group              | Spawners, input, managers, etc.                      |

Folders follow Unity defaults; dependencies are injected with `[SerializeField]` in the Inspector.

## 3. Architectural Layers

1. **Game Layer** – gameplay logic, enemies, scoring
2. **UI Layer** – views & handlers
3. **Infrastructure Layer** – WebSocket client, analytics, health-check pings

:::tip Architecture Rule
A higher layer may call into the layer directly beneath it, but layers at the same level should never depend on or communicate with each other.
:::

## 4. Game-State Machine

`ApplicationStateBehaviour` drives a finite-state machine:

| State                    | Responsibility                        |
| ------------------------ | ------------------------------------- |
| **Bootstrap**            | Wire services, connect WebSocket      |
| **MainMenu**             | Show profile/credits, wait for _Play_ |
| **PrepareGame**          | Spawn level & player ship             |
| **Gameplay**             | Core loop, boss checks, pause         |
| **GameOver**             | Show stats, await input               |
| **Restart / BackToMenu** | Clean up, change scene or state       |

Enemy AI re-uses a mini FSM inside each `EnemyBaseBehaviour`.

## 5. Key Design Patterns & Utility Helpers

### 5.1 Why patterns matter

:::note
Game projects - even small prototypes - tend to balloon in complexity as features are added.
:::

Patterns give you:

- **Low coupling / high cohesion** – easier unit tests
- **Predictable onboarding** – juniors recognise familiar idioms
- **Safe refactors** – clear seams for future features

| Pattern               | Purpose in this project                   | Where used                                        |
| --------------------- | ----------------------------------------- | ------------------------------------------------- |
| **Singleton**         | One global point for cross-scene services | `CoroutineManager`, `AudioService`                |
| **Observer / Event**  | Fire-and-forget notifications             | `SimpleEvent`, `EventAggregator`                  |
| **Reactive Property** | Auto-update UI when data changes          | `CustomProperty<T>`                               |
| **State**             | Game flow & enemy brains                  | `ApplicationStateBehaviour`, `EnemyBaseBehaviour` |
| **Command**           | Queue/undo server actions                 | `*RequestCommandHandler`                          |
| **Strategy**          | Swap movement/shooting                    | enemy subclasses                                  |
| **Mediator / Facade** | Hide complex subsystems                   | `WebSocketService`, `SpendCreditsUseCase`         |

### 5.2 Code snapshots

#### Singleton + Helper (CoroutineManager)

```csharp
public class CoroutineManager : MonoBehaviour
{
    private static CoroutineManager _instance;
    public static CoroutineManager Instance
    {
        get
        {
            if (_instance == null)
                _instance = new GameObject(nameof(CoroutineManager))
                            .AddComponent<CoroutineManager>();
            return _instance;
        }
    }

    public static void DelayedAction(float seconds, Action action) =>
        Instance.StartCoroutine(DelayedActionInner(seconds, action));

    private static IEnumerator DelayedActionInner(float delay, Action action)
    {
        yield return new WaitForSeconds(delay);
        action?.Invoke();
    }
}
```

#### Observer / Mediator (EventAggregator)

```csharp
public interface IEventData { }

public static class EventAggregator
{
    public static void Subscribe<T>(Action<object,T> cb) where T : IEventData =>
        Holder<T>.Event += cb;

    public static void Unsubscribe<T>(Action<object,T> cb) where T : IEventData =>
        Holder<T>.Event -= cb;

    public static void Post<T>(object sender, T data) where T : IEventData =>
        Holder<T>.Post(sender, data);

    private static class Holder<T> where T : IEventData
    {
        public static event Action<object,T> Event;
        public static void Post(object sender, T data) => Event?.Invoke(sender, data);
    }
}
```

#### Reactive Property (IntProperty)

```csharp
public class IntProperty : CustomProperty<int>
{
    public static IntProperty operator +(IntProperty p, int v)
    { p.SetValue(p.Value + v); return p; }
}
```

### 5.3 When to pick which helper?

| Scenario                 | Recommended Helper                |
| ------------------------ | --------------------------------- |
| **Inside one subsystem** | `SimpleEvent`                     |
| **Cross-cutting events** | `EventAggregator`                 |
| **Data mirrored in UI**  | `CustomProperty<T>`               |
| **One-off delays**       | `CoroutineManager.DelayedAction`  |
| **Long tasks**           | own MonoBehaviour + FSM/coroutine |

## 6. UI Architecture – MVP-Lite

### 6.1 Concept recap

| Role                         | Knows about                | Has logic?                           |
| ---------------------------- | -------------------------- | ------------------------------------ |
| **View** (`BaseView`)        | Buttons, texts, animations | **No** – raises callbacks            |
| **Handler** (`*ViewHandler`) | Game services, View        | **Yes** – fills data, handles clicks |

:::info Key Pattern
The pattern is **Passive View**: logic never lives in View.
:::

### 6.2 Core API (excerpt)

```csharp
public interface IView
{
    bool Visible { get; set; }
    void Show();
    void Hide();
}

public abstract class BaseView : MonoBehaviour, IView
{
    [SerializeField] bool _hideOnAwake = true;
    public bool Visible { get; set; }

    public void Show() { gameObject.SetActive(true); OnShow(); }
    public void Hide()
    { OnBeforeHide(() => { gameObject.SetActive(false); OnHide(); }); }

    protected virtual void OnShow() {}
    protected virtual void OnHide() {}
    protected virtual void OnBeforeHide(Action done) { done?.Invoke(); }
}
```

### 6.3 Example window – _Continue-Game_ popup

```csharp
// View
public class ContinueGameWindowView : BaseView
{
    [SerializeField] TMP_Text _credits;
    [SerializeField] Button _continue, _cancel;

    public void SetCredits(int c) => _credits.text = c.ToString();
    public void OnContinue(Action cb) => _continue.onClick.AddListener(()=>cb());
    public void OnCancel(Action cb)   => _cancel.onClick.AddListener(()=>cb());
}

// Handler
public class ContinueGameWindowHandler : MonoBehaviour
{
    [SerializeField] ContinueGameWindowView _view;

    public void Show(int credits, Action onOk, Action onCancel)
    {
        _view.SetCredits(credits);
        _view.OnContinue(onOk);
        _view.OnCancel(onCancel);
        _view.Show();
    }
}
```

### 6.4 Joystick navigation glue

Add a `VirtualKeyboardNavigator` to the window's root, list the `KeyButtonItem` controls, and call:

```csharp
navigator.Activate();   // on window open
navigator.Deactivate(); // on window close
```

No mouse required.

### 6.5 Checklist for your own windows

1. Create prefab under **`Assets/Prefabs/UI`**
2. Add `BaseView` subclass, expose controls
3. Add `*ViewHandler`, wire data & callbacks
4. Add `VirtualKeyboardNavigator` if stick-navigable
5. Open/close from the relevant game state or use-case

## 7. Arcade-Style Input & Navigation

### Constraints

- Physical joystick + **6 buttons** (`JoystickButton0-5`) only
- No nested, mouse-driven menus

### Solution

- `NavigableItem` (abstract) → highlight, unhighlight, execute
  - `KeyButtonItem` (button)
  - `InputFieldItem` (numeric PIN, etc.)
- `VirtualKeyboardNavigator` – polls joystick axes, moves focus, fires `OnKeySubmitted`
- When a child window opens, deactivate the parent navigator to freeze focus

### Usage recipe

1. Add `KeyButtonItem` to each button
2. Drop a `VirtualKeyboardNavigator` on the common parent, list items **top-to-bottom** (or left-to-right)
3. Call `Activate()` on show, `Deactivate()` on hide
4. If a child window opens, `SetFocus(false)` on the parent navigator

## 8. Game Flow & Credit Logic

1. **Bootstrap → MainMenu** (download profile & balance)
2. Player hits _Play_ → `PrepareGame` → `Gameplay` (server logs `LevelBegin`)
3. On death, show _Continue_ popup:
   - Enough credits → ask for PIN, run `SpendCreditsUseCase`, resume
   - Not enough → top-up window, then PIN
   - Four wrong PINs → eject to the game selection page in the arcade
4. On boss defeat / quit → send `LevelEnd`, return to the game selection page in the arcade

## 9. Building for WebGL

:::caution WebGL Requirements
Keep memory under 2048 MB and test in Chrome & Edge; some browsers block cross-origin WebSockets.
:::

- Enable compression (Gzip) in **Build Settings → Player → Publishing Settings**
- Map joystick axes/buttons in **Input Manager**; mouse input is _off_ by default

## 10. Next Steps for New Developers

1. **Clone & Play** – open `MainScene`, hit _Play_
2. Explore `ApplicationStateBehaviour`, then drill into states
3. Add a new UI popup following the checklist in §6.5
4. Use `CustomProperty` & `SimpleEvent` for reactive data
5. Dive into `Infrastructure` to study WebSocket parsing and retries

🎉 Welcome to the Arcade platform - happy coding!
