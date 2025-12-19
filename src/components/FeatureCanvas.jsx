// components/FeatureCanvas.jsx
"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { PCModel } from "./PCModel";

// Rotating wrapper (keeps previous behavior)


// Generic model loader for non-PC models
function GenericModel({ path, scale = 1, position = [0, 0, 0] }) {
  const ref = useRef();
  const { scene } = useGLTF(path);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.002;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scale}
      position={position}
    />
  );
}

// Minimal fallback shown inside the canvas while GLTF loads
function FallbackPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#858585" />
    </mesh>
  );
}

// Small error boundary to catch rendering errors inside Canvas
class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("Canvas error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#ff4444" />
        </mesh>
      );
    }
    return this.props.children;
  }
}

export default function FeatureCanvas({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  screenStatus, // optional: passed for the PC model
}) {
  const isPC = !!modelPath && modelPath.toLowerCase().includes("pc");

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <CanvasErrorBoundary>
        <Suspense fallback={<FallbackPlaceholder />}>
          {isPC ? (
            <PCModel modelPath={modelPath} screenStatus={screenStatus} scale={scale} position={position} />
          ) : (
            <GenericModel path={modelPath} scale={scale} position={position} />
          )}
        </Suspense>
      </CanvasErrorBoundary>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
