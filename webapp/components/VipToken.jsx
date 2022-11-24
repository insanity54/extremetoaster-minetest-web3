
// import React from "react";
// import dynamic from "next/dynamic";
// import ModelViewer from './ModelViewer'



import styles from '../styles/Home.module.css'
import { Suspense } from 'react'

export default function VipToken({ title }) {
  return (
  	<div className={styles.card}>
  		<h2>{title}</h2>
  		<p>{image}</p>
  		<img src={image} />
	    <button>RENT NOW</button>
	</div>
  )
}
