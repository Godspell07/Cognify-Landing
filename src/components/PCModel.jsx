// components/PCModel.jsx
"use client";

import React, { useMemo, useEffect } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";

export function PCModel({
  modelPath = "/models/pc.glb",
  screenStatus = "idle",
  ...props
}) {
  const { nodes, materials } = useGLTF(modelPath);

  // load textures
  const idleTex = useTexture("/textures/screen-idle.png");
  const loadingTex = useTexture("/textures/screen-loading.png");
  const successTex = useTexture("/textures/screen-success.png");
  const errorTex = useTexture("/textures/screen-error.png");

  // choose the right texture
  const screenTexture = useMemo(() => {
    if (screenStatus === "loading") return loadingTex;
    if (screenStatus === "success") return successTex;
    if (screenStatus === "error") return errorTex;
    return idleTex;
  }, [screenStatus, idleTex, loadingTex, successTex, errorTex]);

  // Apply texture to the existing material (do not replace mesh)
  useEffect(() => {
    // name of the material used in your converted model is materials.M_screen_blue
    const matName = "M_screen_blue";
    const mat = materials?.[matName];

    if (!mat) {
      // debug: material not found
      console.warn(
        "[PCModel] material",
        matName,
        "not found. materials:",
        Object.keys(materials || {})
      );
      return;
    }

    // prepare texture for GLTF (fix orientation and wrapping)
    if (screenTexture) {
      screenTexture.flipY = false; // glTF textures need flipY=false
      screenTexture.wrapS = screenTexture.wrapT = THREE.ClampToEdgeWrapping;
      screenTexture.repeat.set(1, 1);
      screenTexture.offset.set(0, 0);
      screenTexture.encoding = THREE.sRGBEncoding; // if colors look too dark/bright try this
      screenTexture.needsUpdate = true;
    }

    // assign map + emissive to make it glow like a screen
    mat.map = null;
    mat.emissiveMap = screenTexture;
    mat.emissive = new THREE.Color(1, 1, 1);
    mat.emissiveIntensity = 0.8;
    mat.needsUpdate = true;

    // cleanup not necessary; we intentionally mutate the material for performance
  }, [screenTexture, materials]);

  return (
    <group {...props} dispose={null}>
      <group position={[-0.001, -0.013, 0.002]}>
        <mesh
          geometry={nodes.mousepad.geometry}
          material={materials.M_lam_teal}
        />
        <mesh
          geometry={nodes.keyboard_1.geometry}
          material={materials.M_lam_browngreylighter}
        />
        <mesh
          geometry={nodes.keyboard_2.geometry}
          material={materials.M_plastic_bone}
        />
        <mesh
          geometry={nodes.keyboard_keys.geometry}
          material={materials.M_lam_browngreylighter}
        />
        <mesh
          geometry={nodes.monitor_and_body_1.geometry}
          material={materials.M_plastic_bone}
        />
        <mesh
          geometry={nodes.monitor_and_body_2.geometry}
          material={materials.M_lam_darkgrey}
        />
        <mesh
          geometry={nodes.monitor_and_body_3.geometry}
          material={materials.M_plastic_bone_shad}
        />

        {/* IMPORTANT: keep the original mesh with its material; we mutated materials.M_screen_blue above */}
        <mesh
          geometry={nodes.monitor_and_body_4.geometry}
          material={materials.M_screen_blue}
          castShadow
          receiveShadow
        />

        <mesh
          geometry={nodes.mouse_1.geometry}
          material={materials.M_plastic_bone}
        />
        <mesh
          geometry={nodes.mouse_2.geometry}
          material={materials.M_lam_browngrey}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/pc.glb");
