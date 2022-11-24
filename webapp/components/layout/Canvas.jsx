import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Stats } from "@react-three/drei";

const Controls = () => {
  const control = useRef(null);
  return <OrbitControls ref={control} />;
};
const CanvasWrapper = ({ children }) => {
  return (
    <>
      <Canvas
        // Is this deprecated or typed wrong? Ignoring for now.
        mode="concurrent"
        style={{
          position: "relative",
          height: "50vh"
        }}
      >
        {/*<Stats />*/}
        <Controls />
        <Preload all />
        {children}
      </Canvas>
    </>
  );
};

export default CanvasWrapper;