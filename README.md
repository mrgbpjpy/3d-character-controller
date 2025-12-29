# R3F Character Controller
**Live Demo:** [R3F Character Controller – Live Demo](https://game-ohy52q85c-mrgbpjpygmailcoms-projects.vercel.app/)

A **third-person character controller** built with **React Three Fiber (Three.js)** that demonstrates
**trigonometry-based movement**, **armature-correct skeletal animation**, and **clean gameplay architecture**.

This project is intentionally designed as a **portfolio-quality gameplay system**, not a toy demo.

---

## ✨ Features

- Trigonometry-based forward and backward movement
- Y-axis (yaw) rotation for character facing
- Idle → Walk animation blending
- Skeletal animations bound correctly to the armature
- Keyboard-driven input handling
- Frame-rate–independent motion using `deltaTime`
- Fullscreen WebGL canvas
- HUD legend rendered using Drei `<Html />`
- Clean separation of concerns between scene setup and gameplay logic

---

## 🎮 Controls

| Key | Action |
|----|------|
| ↑ Arrow | Move Forward |
| ↓ Arrow | Move Backward |
| ← Arrow | Rotate Left |
| → Arrow | Rotate Right |

---

## 🧠 Technical Overview

### Movement System
- Player movement is calculated using **sine and cosine** derived from the character’s yaw rotation.
- Trigonometry is applied at the **group (transform) level**, ensuring movement always aligns with facing direction.
- All motion is scaled by `deltaTime` to maintain consistent behavior across frame rates.

### Animation System
- Skeletal animations are bound directly to the **armature**, not the movement group.
- Only valid animation clips are used (`Idle_State`, `Walking`).
- Smooth transitions are handled using `fadeIn` / `fadeOut`.
- Idle animation plays automatically on load.

### Architecture
- `App.jsx` handles scene setup, lighting, and canvas configuration.
- `Player.jsx` encapsulates:
  - Keyboard input handling
  - Trigonometric movement logic
  - Rotation logic
  - Animation state transitions

This structure mirrors real-world engine and gameplay system design patterns.

---

## 📁 Project Structure

```
src/
 ├─ App.jsx        # Scene setup and rendering
 ├─ Player.jsx     # Character controller logic
 ├─ main.jsx
 ├─ index.css
public/
 └─ Player.glb     # Character model with skeletal animations
```

---

## 🚀 Getting Started

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm run dev
```

Then open:
```
http://localhost:5173
```

---

## 🧪 Lessons Learned

- **Not all animation clips in a GLB are usable**  
  Some clips may be empty or object-level artifacts from export pipelines.

- **Skeletal animations must target the armature**  
  Binding animations to a transform group results in bind-pose (A-pose) failures.

- **Gameplay motion should be independent from animation playback**  
  Movement logic and animation logic should remain decoupled.

- **Trigonometry is sufficient at the gameplay layer**  
  Matrix math is handled internally by the engine and does not need to be exposed at this level.

- **Animations do not auto-play**  
  All animation states must be explicitly started and managed.

- **Clear separation of concerns improves debuggability**  
  Isolating responsibilities simplifies iteration and maintenance.

---

## 🔮 Future Improvements

- Run animation with speed-based blending
- Jump physics with gravity integration
- Third-person camera follow with smoothing
- Mobile / touch input support
- Root-motion vs in-place movement comparison
- Expanded animation state machine (Jump, Fall, Land)

---

## 👤 Author

**Erick Esquilin**

Built as part of a professional portfolio to demonstrate gameplay systems,
3D animation handling, and engine-agnostic movement logic.
