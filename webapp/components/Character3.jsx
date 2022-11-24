import React, { useRef } from "react";
import { useGLTF, useAnimations, useTexture } from "@react-three/drei";
import * as THREE from 'three'
import FileSaver from 'file-saver'


export function Character3(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/character_modded.glb");

  const texture = useTexture('/images/SirYakari_with_clothes_by_SirYakari.png')

  texture.encoding = THREE.sRGBEncoding;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestMipmapNearestFilter;
  texture.format = THREE.RGBAFormat;
  texture.flipY = false;
  let customMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.FrontSide,
      roughness: 0.5,
      encoding: 3001,
 })

  // export for debugging
  var badData = new Blob([JSON.stringify(texture.toJSON(), 0, 2)], { type: 'application/json' })
  var goodData = new Blob([JSON.stringify(materials.Character.map.toJSON(), 0, 2)], { type: 'application/json' })

  saveAs(badData, 'bad_data.json')
  saveAs(goodData, 'good_data.json')

  // console.log(materials.Character.map)
  // const customMat = materials.Character.clone()
  materials.Character.setValues({
    transparent: true,
    opacity: 1,
    envMapIntensity: 0
  })
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <primitive position={[0, -2, 0]} object={nodes.Body} />
          <skinnedMesh
            name="Player"
            geometry={nodes.Player.geometry}
            material={customMaterial}
            // material={materials.Character}
            skeleton={nodes.Player.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/character_modded.glb");

