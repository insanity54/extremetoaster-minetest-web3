import { Layout } from '/components/layout/Layout'
import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import Link from "next/link"
import { OrbitControls, Stage } from '@react-three/drei'
import styles from '../styles/Home.module.css'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Character3 } from '/components/Character3'
import { useTexture, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function Character ({ props }) {
    const { scene } = useGLTF('/character.glb')
    const texture = useTexture('/images/SirYakari_with_clothes_by_SirYakari.png', (texture) => {
        console.log(texture)
        texture.magFilter = THREE.NearestFilter;
        texture.version = 8;
    })

    const group = useRef()
    const { nodes, materials } = useGLTF('/character.glb')

    // const texture = new THREE.CanvasTexture(imageBitmap)
    // texture.magFilter = THREE.NearestFilter

    const customMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.FrontSide
    })
    console.log(texture)
    // return (
    //     <group 
    //         ref={group} 
    //         {...props} 
    //         dispose={null} 
    //     >
    //         <group name="Scene">
    //             <group name="Armature" >
    //                 <primitive position={[0, -2, 0]} object={nodes.Body} />
    //                 <skinnedMesh 
    //                     name="Player" 
    //                     geometry={nodes.Player.geometry} 
    //                     skeleton={nodes.Player.skeleton}
    //                     material={customMaterial}
    //                 />
    //             </group>
    //         </group>
    //     </group>
    // )


    return (
        // <>
        //   <primitive
        //     ref={ref}
        //     object={gltf.scene}
        //     position={position}
        //     scale={scale}
        //     map={map}
        //   />
        // </>


        <group 
            ref={group} 
            {...props} 
            dispose={null} 
        >
            <group name="Scene">
                <group name="Armature" >
                    {/*<primitive position={[0, -2, 0]} object={nodes.Body} />*/}
                    <skinnedMesh 
                        name="Player" 
                        geometry={nodes.Player.geometry} 
                        skeleton={nodes.Player.skeleton}
                        material={customMaterial}
                    />
                </group>
            </group>
        </group>
    )
}



export default function Create() {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('')
    const [imageHeight, setImageHeight] = useState(0)
    const [imageWidth, setImageWidth] = useState(0)
    // const previewImg = useRef()

    const { 
        formState: { 
            isDirty, 
            dirtyFields, 
            isSubmitted, 
            isValid, 
            errors 
        }, 
        setError, 
        trigger, 
        watch,
        handleSubmit,
        getValues,
        register
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            imageFile: '',
            name: ''
        },
        delayError: 250
    })



    // watch('imageFile')

    useEffect(() => {
        trigger('imageFile')
    }, [imageHeight, imageWidth])


    const getImageDimensions = (async (dataUrl) => {
        const tmpImage = new Image()
        tmpImage.src = dataUrl

        return new Promise((resolve) => {
            tmpImage.onload = function () {
                resolve({ height: tmpImage.height, width: tmpImage.width })
            }
        })
    })



    // greets https://codepen.io/hartzis/pen/VvNGZP?editors=0010
    const handleChange = (async (evt) => {
        if (!evt.target.files) return
        const loadedImageUrl = await loadFile(evt.target.files[0])
        const { height, width } = await getImageDimensions(loadedImageUrl)
        setImagePreviewUrl(loadedImageUrl)
        setImageHeight(height)
        setImageWidth(width)
    })

    const loadFile = (async (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader()

            console.log('loadImage()')
            console.log(file)

            reader.onloadend = () => {
                resolve(reader.result)
            }

            reader.readAsDataURL(file)
        })
    })


    

    const onSubmit = ((data) => {
        alert(JSON.stringify(data, 0, 2));

        // @todo call minting function on smart contract
    })

    return (
        <div className="main">
            <div className="section">
                <h2 className="title">Create Skin NFT</h2>
                <div className="subtitle">
                Create a Character skin which you can wear in-game, trade with friends or sell in the <Link href="/shop">Shop</Link>.
                </div>

                <div className="tile is-12">
                    <div className="tile is-vertical">
                        

                        <form onChange={handleChange} onSubmit={handleSubmit(onSubmit)}>
                            <label className="text-label">Skin Name
                                <input
                                    className="input text-input"
                                    type="text"
                                    placeholder={getValues('name')}
                                    {...register("name", { 
                                        required: 'Skin must have a name',
                                        maxLength: {
                                            value: 128,
                                            message: "Name must be less than 129 characters long"
                                        }
                                    })}
                                />

                            </label>
                            <div className="has-text-danger">
                                <ErrorMessage errors={errors} name="name" />
                            </div>
                            <div className={(dirtyFields.imageFile && errors.imageFile) ? 'file is-boxed is-danger' : 'file is-boxed'}>
                                <label className="file-label">
                                    <input 
                                        className="file-input"
                                        type="file"
                                        {...register("imageFile", { 
                                            validate: {
                                                exists: (files) => typeof files[0] !== 'undefined' || "Upload an image...",
                                                dimensions: async (files) => {
                                                    let url = await loadFile(files[0])
                                                    const { width, height } = await getImageDimensions(url)
                                                    return (width === 64 && height === 32) || `Image must be exactly 64x32 pixels. (Yours was ${width}x${height})`
                                                },
                                                type: (files) => files[0]?.type === 'image/png' || `Image must be a PNG. Yours was ${files[0]?.type}`,
                                                size: (files) => files[0]?.size < 10000000 || 'Image must be less than 10MB.'
                                            }
                                        })}
                                        
                                    />
                                    <span className="file-cta m-5">
                                        <span className="file-icon">
                                            <FontAwesomeIcon icon={faUpload} />
                                        </span>
                                        <img src={imagePreviewUrl} className={imagePreviewUrl ? 'm-5' : 'is-hidden'} />
                                        <span className="file-label">
                                        {isValid && 
                                            <>Looks great!</>
                                        }
                                        <ErrorMessage errors={errors} name="imageFile" />
                                        <div>
                                        </div>
                                        </span>
                                    </span>




                                </label>
                            </div>

                            <button 
                                className="button is-primary"
                                disabled={!isValid}
                            >
                                Create
                            </button>
                        </form>

                    </div>

                    <div className="tile is-vertical is-9">
                        
                        <Canvas>
                            <ambientLight intensity={0.5} />
                            <directionalLight />

                          <ambientLight intensity={0.2} />
                          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                          <pointLight position={[-10, -10, -10]} />

                              <Suspense fallback={null}>
                                <Stage
                                    adjustCamera
                                    contactShadow={false}
                                >
                                    <Character3 texture={imagePreviewUrl} />
                                </Stage>
                              </Suspense>
                          <OrbitControls autoRotate={true} />
                        </Canvas>
                        
                    </div>
                </div> {/* end of rows div */}

            </div>
        </div>
    )
}


Create.Layout = Layout