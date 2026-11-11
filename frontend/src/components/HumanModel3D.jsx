import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Cylinder, Torus } from '@react-three/drei'
import * as THREE from 'three'

// ── Child body 3D model (stylized abstract human figure) ────────────────────
function HumanFigure({ status }) {
    const groupRef = useRef()
    const [t, setT] = useState(0)

    // Determine glow color based on status
    const statusColor = {
        Healthy: '#00f5a0',
        Risk: '#fbbf24',
        Malnourished: '#ef4444',
        default: '#00c3e3',
    }
    const color = statusColor[status] || statusColor.default

    useFrame((state) => {
        const elapsed = state.clock.elapsedTime
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(elapsed * 0.4) * 0.3
            groupRef.current.position.y = Math.sin(elapsed * 0.8) * 0.08
        }
        setT(elapsed)
    })

    const mat = (
        <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.35}
            roughness={0.3}
            metalness={0.4}
        />
    )

    return (
        <group ref={groupRef}>
            {/* Head */}
            <Sphere args={[0.28, 32, 32]} position={[0, 1.65, 0]}>
                {mat}
            </Sphere>

            {/* Neck */}
            <Cylinder args={[0.1, 0.12, 0.25, 16]} position={[0, 1.3, 0]}>
                {mat}
            </Cylinder>

            {/* Torso */}
            <Box args={[0.62, 0.85, 0.32]} position={[0, 0.75, 0]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} roughness={0.4} metalness={0.3} />
            </Box>

            {/* Pelvis */}
            <Box args={[0.55, 0.28, 0.28]} position={[0, 0.26, 0]}>
                {mat}
            </Box>

            {/* Left Arm */}
            <group position={[-0.42, 0.78, 0]} rotation={[0, 0, 0.3]}>
                <Cylinder args={[0.1, 0.09, 0.6, 12]} position={[0, -0.3, 0]}>{mat}</Cylinder>
                <Cylinder args={[0.09, 0.08, 0.55, 12]} position={[0, -0.9, 0]}>{mat}</Cylinder>
                <Sphere args={[0.1, 16, 16]} position={[0, -1.18, 0]}>{mat}</Sphere>
            </group>

            {/* Right Arm */}
            <group position={[0.42, 0.78, 0]} rotation={[0, 0, -0.3]}>
                <Cylinder args={[0.1, 0.09, 0.6, 12]} position={[0, -0.3, 0]}>{mat}</Cylinder>
                <Cylinder args={[0.09, 0.08, 0.55, 12]} position={[0, -0.9, 0]}>{mat}</Cylinder>
                <Sphere args={[0.1, 16, 16]} position={[0, -1.18, 0]}>{mat}</Sphere>
            </group>

            {/* Left Leg */}
            <group position={[-0.2, 0.1, 0]}>
                <Cylinder args={[0.13, 0.11, 0.7, 12]} position={[0, -0.35, 0]}>{mat}</Cylinder>
                <Cylinder args={[0.11, 0.09, 0.65, 12]} position={[0, -1.0, 0]}>{mat}</Cylinder>
                <Box args={[0.18, 0.12, 0.32]} position={[0, -1.42, 0.06]}>{mat}</Box>
            </group>

            {/* Right Leg */}
            <group position={[0.2, 0.1, 0]}>
                <Cylinder args={[0.13, 0.11, 0.7, 12]} position={[0, -0.35, 0]}>{mat}</Cylinder>
                <Cylinder args={[0.11, 0.09, 0.65, 12]} position={[0, -1.0, 0]}>{mat}</Cylinder>
                <Box args={[0.18, 0.12, 0.32]} position={[0, -1.42, 0.06]}>{mat}</Box>
            </group>
        </group>
    )
}

// ── Orbiting ring particles ──────────────────────────────────────────────────
function OrbitRing({ radius, speed, color }) {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.z = clock.elapsedTime * speed
    })
    return (
        <Torus ref={ref} args={[radius, 0.012, 8, 80]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.55} />
        </Torus>
    )
}

// ── Floating particles ───────────────────────────────────────────────────────
function Particles({ count = 60 }) {
    const points = useRef()
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 8
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    useFrame(({ clock }) => {
        if (points.current) points.current.rotation.y = clock.elapsedTime * 0.05
    })
    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color="#00c3e3" transparent opacity={0.5} />
        </points>
    )
}

// ── Main exported 3D Scene ───────────────────────────────────────────────────
export default function HumanModel3D({ status = null }) {
    return (
        <Canvas
            camera={{ position: [0, 0.4, 4.2], fov: 50 }}
            style={{ background: 'transparent' }}
        >
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#00f5a0" />
            <pointLight position={[-5, -3, -5]} intensity={0.8} color="#00c3e3" />
            <spotLight position={[0, 6, 2]} intensity={1} angle={0.4} penumbra={0.5} color="#ffffff" />

            {/* 3D Human Figure */}
            <HumanFigure status={status} />

            {/* Decorative rings */}
            <group position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <OrbitRing radius={1.4} speed={0.6} color="#00f5a0" />
                <OrbitRing radius={1.8} speed={-0.4} color="#00c3e3" />
                <OrbitRing radius={2.2} speed={0.3} color="#7c3aed" />
            </group>

            {/* Background particles */}
            <Particles count={80} />

            {/* Orbit controls (drag to rotate) */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.8}
            />
        </Canvas>
    )
}
