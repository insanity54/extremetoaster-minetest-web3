
import React, { useRef, useMemo } from 'react'
import { useTexture, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function CharacterModel(props) {
  const texture = useTexture(props.texture) 
  texture.magFilter = THREE.NearestFilter
  const group = useRef()
  const { nodes, materials } = useGLTF('/character.glb')
  const mappedMaterial = Object.assign(materials.Character, { map: texture })
  console.log(mappedMaterial.map.source)
  return (
    <group 
      ref={group} 
      {...props} 
      dispose={null} 
    >
      <group name="Scene">
        <group name="Armature" >
          <primitive position={[0, -2, 0]} object={nodes.Body} />
          <skinnedMesh 
            name="Player" 
            geometry={nodes.Player.geometry} 
            material={materials.Character} 
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/character.glb')
