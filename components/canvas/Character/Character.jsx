import * as THREE from "three";
import { useFrame, extend, MeshProps } from "@react-three/fiber"
import { useRef, useState } from "react"
import { shaderMaterial } from "@react-three/drei"
import GltfModel from '/components/GltfModel'

import vertex from "./shaders/shader.vert"
import fragment from "./shaders/shader.frag"

const ColorShiftMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0.08, 0.2, 0.025),
  },
  vertex,
  fragment
);

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
ColorShiftMaterial.key = THREE.MathUtils.generateUUID();

extend({ ColorShiftMaterial });


const Character = (props) => {
  return (
    <GltfModel modelPath='/marmelab.glb' />
  );
};


const Character = ({ modelPath, scale = 40, position = [0, 0, 0] }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        <GltfModel modelPath={modelPath} scale={scale} position={position} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export default Character