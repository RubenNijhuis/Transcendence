import { Canvas, Vector3, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Mesh } from "three";

interface BoxProps {
    boxRef: React.RefObject<Mesh>;
    position: Vector3;
    args: any;
}

const Box = ({ boxRef, position, args }: BoxProps) => {
    return (
        <mesh ref={boxRef} position={position}>
            <boxGeometry attach={"geometry"} args={args} />
            <meshBasicMaterial attach="material" color="red" />
        </mesh>
    );
};

const BackgroundPlane = () => {
    const main = useRef<any>(null);
    const secondary = useRef<any>(null);

    // const secondarySize: Vector3 = [1, 1, 1];
    const mainSize: Vector3 = [0, 0, 0];

    useEffect(() => {
        console.log(main);
    }, [main, secondary]);

    useFrame(() => {
        main.current.rotation.x += 0.01;
        main.current.rotation.y += 0.01;
    });

    return (
        <>
            {/*First layer */}
            <Box boxRef={main} position={mainSize} args={[1, 1, 1]} />

            {/*Second layer */}
            {/* <Box boxRef={secondary} position={secondarySize} args={[2, 1, 1]} /> */}
        </>
    );
};

const NewPongGame = () => {
    return (
        <div id="canvas-container" style={{ height: "100%" }}>
            <Canvas>
                <ambientLight intensity={0.1} />
                <pointLight position={[0, 10, 0]} intensity={0.5} />
                <directionalLight color="red" position={[0, 0, 5]} />
                <BackgroundPlane />
            </Canvas>
        </div>
    );
};

export default NewPongGame;
