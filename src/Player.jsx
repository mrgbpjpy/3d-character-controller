import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

export function Player() {
  const group = useRef()
  const armature = useRef()

  const { scene, animations } = useGLTF("/Player.glb")
  const { actions } = useAnimations(animations, armature)

  const [isMoving, setIsMoving] = useState(false)

  const speed = 1.5
  const turnSpeed = 1.5
  const velocity = useRef(new THREE.Vector3())

  // ───────── INPUT ─────────
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false
  })

  useEffect(() => {
    const down = e => {
      if (e.code === "ArrowUp") keys.current.forward = true
      if (e.code === "ArrowDown") keys.current.backward = true
      if (e.code === "ArrowLeft") keys.current.left = true
      if (e.code === "ArrowRight") keys.current.right = true
    }
    const up = e => {
      if (e.code === "ArrowUp") keys.current.forward = false
      if (e.code === "ArrowDown") keys.current.backward = false
      if (e.code === "ArrowLeft") keys.current.left = false
      if (e.code === "ArrowRight") keys.current.right = false
    }

    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [])

  // ───────── START IDLE (ONLY REAL ONE) ─────────
  useEffect(() => {
    if (!actions) return

    console.log("Available actions:", Object.keys(actions))
    const idle = actions["Idle_State"]

    if (!idle) return

    idle.reset().fadeIn(0.3).play()
    return () => idle.stop()
  }, [actions])

  // ───────── IDLE ⇄ WALK BLEND ─────────
  useEffect(() => {
    if (!actions) return

    const idle = actions["Idle_State"]
    const walk = actions["Walking"]

    if (!idle || !walk) return

    if (isMoving) {
      idle.fadeOut(0.2)
      walk.reset().fadeIn(0.2).play()
    } else {
      walk.fadeOut(0.2)
      idle.reset().fadeIn(0.2).play()
    }
  }, [isMoving, actions])

  // ───────── MOVEMENT + TRIG ─────────
  useFrame((_, dt) => {
    if (!group.current) return

    velocity.current.set(0, 0, 0)

    if (keys.current.left) {
      group.current.rotation.y += turnSpeed * dt
    }
    if (keys.current.right) {
      group.current.rotation.y -= turnSpeed * dt
    }

    const θ = group.current.rotation.y
    const forward = new THREE.Vector3(
      Math.sin(θ),
      0,
      Math.cos(θ)
    )

    if (keys.current.forward) velocity.current.add(forward)
    if (keys.current.backward) velocity.current.sub(forward)

    if (velocity.current.lengthSq() > 0) {
      velocity.current.normalize().multiplyScalar(speed * dt)
      group.current.position.add(velocity.current)
      setIsMoving(true)
    } else {
      setIsMoving(false)
    }
  })

  return (
    <group ref={group}>
      {/* Armature target for animations */}
      <group ref={armature}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload("/Player.glb")