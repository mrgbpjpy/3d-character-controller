import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Html } from "@react-three/drei"
import { Player } from "./Player"

export default function App() {
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
        display: "block"
      }}
      camera={{ position: [0, 2, 6], fov: 50 }}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* UI Overlay */}
      <Html
        fullscreen
        style={{
          pointerEvents: "none" // IMPORTANT: doesn't block controls
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            padding: "10px 14px",
            background: "rgba(0, 0, 0, 0.6)",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "14px",
            borderRadius: "6px"
          }}
        >
          <strong>Movement:</strong> Up, Down, Left, Right Arrows
        </div>
      </Html>

      {/* Player */}
      <Suspense fallback={null}>
        <Player />
      </Suspense>
    </Canvas>
  )
}
