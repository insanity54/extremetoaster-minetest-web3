
// import React from "react";
// import dynamic from "next/dynamic";
// import ModelViewer from './ModelViewer'



import { OrbitControls, Stage } from '@react-three/drei'
import styles from '../styles/Home.module.css'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Model } from './Model'

export default function Token({ title, image, type }) {
  return (
  	<div className={styles.card}>
  		<h2>{title}</h2>
  		{type === 'skin' ?
		    <Canvas >
		    	<ambientLight intensity={0.2} />
		    	<directionalLight />
		      <Suspense fallback={null}>
		      	<Stage
		      		adjustCamera
		      		contactShadow={false}
		      	>
	        		<Model texture={image} />
		        </Stage>
		      </Suspense>
		      <OrbitControls autoRotate={true} />
		    </Canvas>
		   :
  			<div><img src={image} className="thumbnail" /></div>
		  }
	    <button>BUY NOW</button>
	</div>
  )
}


