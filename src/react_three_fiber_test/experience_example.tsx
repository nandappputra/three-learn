import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { BoxGeometry } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

extend({ OrbitControls });
// must be placed within Canvas component
export default function ExperienceExample() {
  const { camera, gl } = useThree();

  const cubeRef = useRef<BoxGeometry | null>(null);

  // animate the cube using reference
  useFrame((state, delta) => {
    cubeRef?.current?.rotateZ(delta);
  });

  // Draw the scene using default configurations
  return (
    <>
      {/* supply the args */}
      <orbitControls args={[camera, gl.domElement]} />
      <group>
        <mesh position-x={4}>
          <sphereGeometry />
          <meshBasicMaterial color={"#FF0000"} />
        </mesh>
        <mesh position-x={-2} scale={2}>
          <boxGeometry ref={cubeRef} />
          <meshBasicMaterial color={"#BEBEBE"} />
        </mesh>
      </group>
    </>
  );
}
