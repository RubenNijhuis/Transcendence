import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, Vector3, useFrame } from "@react-three/fiber";

import { useRef, useEffect } from "react";
import { BasicShadowMap, Mesh } from "three";

interface BoxProps {
  boxRef?: React.RefObject<Mesh>;
  position: Vector3;
  args: any;
  color: string;
}

const Box = ({ boxRef, position, args, color }: BoxProps) => {
  return (
    <mesh ref={boxRef} position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
};

const BackgroundPlane = () => {
  const main = useRef<Mesh>(null!);
  const secondary = useRef<Mesh>(null!);

  const basePlanePos: Vector3 = [0, 0, 0];
  const layeredPlanePos: Vector3 = [0, 3, 0];

  const basePlaneSize: any = [50, 1, 28.5];
  const layeredPlaneSize: any = [40, 1, 20];

  return (
    <>
      {/* Base Plane */}
      <Box
        boxRef={secondary}
        position={basePlanePos}
        args={basePlaneSize}
        color="#721aff"
      />

      {/* Gameplay plane */}
      <Box
        boxRef={main}
        position={layeredPlanePos}
        args={layeredPlaneSize}
        color="#7c8dff"
      />
    </>
  );
};

const CustomCam = () => {
  const camRef = useRef<any>(null);

  useEffect(() => {
    camRef.current.lookAt(0, 0, 0);
  }, [camRef]);

  return (
    <PerspectiveCamera
      ref={camRef}
      makeDefault
      fov={70}
      position={[0, 23, 0]}
    />
  );
};

const BatObject = () => {
  const batRef = useRef<Mesh>(null!);

  return (
    <Box
      boxRef={batRef}
      position={[-15, 4, 0]}
      args={[1.5, 0.5, 8]}
      color="rgb(60,60,60)"
    />
  );
};

const NewPongGame = () => {
  return (
    <div id="canvas-container" style={{ height: "100%" }}>
      <Canvas shadows={{ type: BasicShadowMap }}>
        {/* Camera */}
        <CustomCam />

        {/* Lighting */}
        <ambientLight intensity={0.1} color="white" />
        {/* <pointLight
          position={[10, 10, 10]}
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
          intensity={0.1}
          castShadow
        />

        <pointLight
          position={[-10, 10, -10]}
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
          intensity={0.1}
          castShadow
        /> */}

        <pointLight
          position={[0, 10, 0]}
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
          intensity={0.25}
          castShadow
        />

        {/* Scene objects */}
        <BackgroundPlane />

        {/* Player objects*/}
        <BatObject />
      </Canvas>
    </div>
  );
};

export default NewPongGame;
