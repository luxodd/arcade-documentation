# Game Logic Architecture

## Architecture and Approaches Used in the Template

### Overview

The provided game template utilizes simple and well-known design patterns to ensure readable and scalable code. The project incorporates:

- **Singleton Pattern** \- [\[Link to description\]](https://refactoring.guru/design-patterns/singleton)
- **Builder Pattern** \- [\[Link to description\]](https://refactoring.guru/design-patterns/builder)
- **State Pattern** \- [\[Link to description\]](https://refactoring.guru/design-patterns/state)
- **Strategy Pattern** \- [\[Link to description\]](https://refactoring.guru/design-patterns/strategy)
- **Command Pattern** \- [\[Link to description\]](https://refactoring.guru/design-patterns/command)
- **Mediator Pattern** \- [\[Link to description\]](https://refactoring.guru/design-patterns/mediator)
- **Observer Pattern** \- [\[Link to description\]](https://refactoring.guru/design-patterns/observer)
- **Facade Pattern** \- [\[Link to description\]](https://refactoring.guru/design-patterns/facade)

Additionally, the project adheres to **SOLID principles** ([Wiki lin](https://en.wikipedia.org/wiki/SOLID)k).

### UI Management (ViewHandlerView)

To separate game logic from UI representation and keep UI classes clean, it is recommended to use one of the well-known MV\* patterns (MVC, MVP, MVVM, etc.). This improves code readability, reduces coupling, and distributes responsibilities among entities used in these approaches.

In the provided template, a simplified version of these patterns is used.

#### Main Components:

- **View** \- Classes that describe each specific UI window and the UI elements that interact (text, images, buttons, button handlers, or combinations of these). This is similar to Passive View in the MVP pattern: the **View** does not process logic but only transmits interactive player actions (button clicks) to the **Handler**.
- **Handler** \- Classes that handle user input from the **View** and relay it externally. They also set text values, images, or button actions. Essentially, the **Handler** acts as a mediator between data objects, controllers, and UI.

It is assumed that the data displayed in the UI exists somewhere in the game. For example, a level progression window might need level number data, which would be fetched from a **Player Progress Manager**.

#### BaseView:

##### Basic `View` class implementation

Overview  
This system defines a structured approach to managing UI views in the game, ensuring consistent behavior for showing, hiding, and organizing UI elements.

```
File Location: Assets\Scripts\Core\UI\BaseView.cs
```

Code:

```cs
public interface IView
{
   bool Visible { get; set; }

   void Show();
   void Hide();
}


public enum ViewType
{
   LoadingScreen,
   MainMenu,
   GameOverWindow,
   GameScreen,
   LeaderboardWindow,
   ReconnectionWindow,
   ContinueGameWindow,
   LevelCompleteWindow,
   NotEnoughMoneyWindow,
   CreditsWidget
}


public abstract class BaseView : MonoBehaviour, IView
{
   public bool Visible { get; set; }
   public abstract ViewType ViewType { get; }

   [SerializeField] private bool _hideOnAwake = true;

   public void Show()
   {
       Debug.Log($"[{GetType().Name}][{nameof(Show)}] OK");
       transform.SetAsLastSibling();
       gameObject.SetActive(true);

       OnShow();
   }


   public void Hide()
   {
       Debug.Log($"[{GetType().Name}][{nameof(Hide)}] OK");
       OnBeforeHide(() =>
       {
           transform.SetAsFirstSibling();
           gameObject.SetActive(false);

           OnHide();
       });

   }


   private void Awake()
   {
       if (_hideOnAwake)
       {
           Hide();
       }

       OnAwake();
   }


   private void OnDestroy()
   {
       OnDestroyInner();
   }

   protected virtual void OnShow(){}
   protected virtual void OnHide(){}
   protected virtual void OnAwake(){}
   protected virtual void OnDestroyInner(){}


   protected virtual void OnBeforeHide(Action onDone)
   {
       onDone?.Invoke();
   }
}
```

Description

##### `IView` Interface

The `IView` interface defines the essential methods and properties for UI elements.

Properties:

- **`Visible { get; set; }` → Indicates whether the view is currently visible.**

Methods:

- **`Show()`** → Displays the view.
- **`Hide()`** → Hides the view.

All views must implement this interface to ensure consistent UI management.

##### `ViewType` Enum

Defines the different types of UI views that can exist in the system.

Available View Types:

- `LoadingScreen` → The initial loading screen.
- `MainMenu` → The main menu of the game.
- `GameOverWindow` → The game over screen.
- `GameScreen` → The main in-game UI.
- `LeaderboardWindow` → The leaderboard screen.
- `ReconnectionWindow` → A window for handling reconnections.
- `ContinueGameWindow` → A window prompting the player to continue the game.
- `LevelCompleteWindow` → A screen showing level completion.
- `NotEnoughMoneyWindow` → A UI prompt when the player lacks funds.
- `CreditsWidget` → A UI widget displaying the player’s credits.

##### `BaseView` Abstract Class

The `BaseView` class serves as a foundation for all UI views, implementing `IView` and providing essential functionality.

Properties:

- `bool Visible` → Stores the visibility state of the view.
- `abstract ViewType ViewType` → Each derived view must specify its `ViewType`.

Serialized Fields:

- `_hideOnAwake (bool)` → Determines if the view should be hidden on `Awake()`. Defaults to `true`.

##### View Lifecycle Methods

Visibility Control:

- `Show()`
  - Logs the action (`Debug.Log`).
  - Moves the view to the top of the UI hierarchy (`transform.SetAsLastSibling()`).
  - Activates the GameObject (`gameObject.SetActive(true)`).
  - Calls the `OnShow()` method for additional functionality.
- `Hide()`
  - Logs the action.
  - Calls `OnBeforeHide()`, which allows optional pre-hide logic.
  - Moves the view to the bottom of the UI hierarchy (`transform.SetAsFirstSibling()`).
  - Deactivates the GameObject (`gameObject.SetActive(false)`).
  - Calls `OnHide()` after the hiding process.

Lifecycle Events:

- `Awake()`
  - Hides the view if `_hideOnAwake` is `true`.
  - Calls `OnAwake()` for additional setup logic.
- `OnDestroy()`
  - Calls `OnDestroyInner()` for cleanup operations.

##### Virtual Methods for Customization

Derived classes can override these methods to define custom behavior:

- `OnShow()` → Called when the view is shown.
- `OnHide()` → Called after the view is hidden.
- `OnAwake()` → Called during `Awake()`, for initialization.
- `OnDestroyInner()` → Called when the view is destroyed.
- `OnBeforeHide(Action onDone)` → Provides an optional pre-hide hook before hiding completes.

#### Concrete `View` implementation

File location:

```
Assets\Scripts\Game\UI\Views\ContinueGameWindowView.cs
```

Code:

```cs
public interface IContinueGameWindowView : IView
{
   void SetContinueButtonClickedCallback(System.Action callback);
   void SetCancelButtonClickedCallback(System.Action callback);

   void SetCreditsCount(int creditsCount);
}


public class ContinueGameWindowView : BaseView, IContinueGameWindowView
{
   public override ViewType ViewType => ViewType.ContinueGameWindow;

   [SerializeField] private TMP_Text _creditsCountText;

   [SerializeField] private Button _continueButton;
   [SerializeField] private Button _cancelButton;

   private string _creditsCountTextFormat;

   private System.Action _continueButtonClickedCallback;
   private System.Action _cancelButtonClickedCallback;

   public void SetContinueButtonClickedCallback(Action callback)
   {
       _continueButtonClickedCallback = callback;
   }


   public void SetCancelButtonClickedCallback(Action callback)
   {
       _cancelButtonClickedCallback = callback;
   }


   public void SetCreditsCount(int creditsCount)
   {
       _creditsCountText.text = string.Format(_creditsCountTextFormat, creditsCount);
   }


   protected override void OnAwake()
   {
       base.OnAwake();

       _creditsCountTextFormat = _creditsCountText.text;

       _continueButton.onClick.AddListener(OnContinueButtonClicked);
       _cancelButton.onClick.AddListener(OnCancelButtonClicked);
   }


   private void OnContinueButtonClicked()
   {
       _continueButtonClickedCallback?.Invoke();
   }


   private void OnCancelButtonClicked()
   {
       _cancelButtonClickedCallback?.Invoke();
   }
}

```

#### Concrete `Handler` implementation

File location:

```
Assets\Scripts\Game\UI\Handlers\ContinueGameWindowHandler.cs
```

Code:

```cs
public class ContinueGameWindowHandler : MonoBehaviour
{
   private IContinueGameWindowView _continueGameWindowView;


   public void PrepareContinueGameWindow(IContinueGameWindowView continueGameWindowView)
   {
       _continueGameWindowView = continueGameWindowView;
   }


   public void ShowContinueGameWindow()
   {
       _continueGameWindowView.Show();
   }


   public void HideContinueGameWindow()
   {
       _continueGameWindowView.Hide();
   }


   public void SetCreditsCount(int creditsCount)
   {
       _continueGameWindowView.SetCreditsCount(creditsCount);
   }


   public void SetContinueButtonClickCallback(System.Action callback)
   {
       _continueGameWindowView.SetContinueButtonClickedCallback(callback);
   }


   public void SetCancelButtonClickCallback(System.Action callback)
   {
       _continueGameWindowView.SetCancelButtonClickedCallback(callback);
   }
}

```
