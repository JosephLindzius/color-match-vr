import React, {useEffect, useRef, useState} from 'react';
import {Plane, Sky, Stars, Text} from '@react-three/drei'
import {DefaultXRControllers, Interactive, useXR} from "@react-three/xr";
import {useFrame} from "@react-three/fiber";

const TitleScreen = ({setParentScene}, props) => {

      const { player } = useXR()

      useEffect(() => {
               player.position.y = 0.10;
               player.position.z = 3.50;
            console.log("effect")
      }, [])


    function SelectBox({ color, size, scale, children, ...rest }) {
        const mesh = useRef()
        useFrame(()=>{
          //  mesh.current.rotation.x += 0.01;
          })

        return (
            <mesh ref={mesh} scale={scale} {...rest}>
                <boxBufferGeometry attach="geometry" args={size} />
                <meshPhongMaterial attach="material" color={color} />
                {children}
            </mesh>
        )
    }

    function Button() {

        const [color, setColor] = useState(0x244e233)

        const onSelect = () => {
            setColor((Math.random() * 0xffffff) | 0)
            setParentScene(2)
        }


        return (
            <Interactive onSelect={onSelect}>
                <SelectBox color={color} size={[2.5, 1.1, 1.1]} {...props}>
                    <Text {...props} position={[0, 0, 1]} fontSize={0.4} color="#000" anchorX="center" anchorY="bottom-baseline">
                        Start Game
                    </Text>
                </SelectBox>
            </Interactive>
        )
    }

      return (
          <>
                <DefaultXRControllers/>
                <ambientLight intensity={1} />
                <spotLight position={[1, 8, 1]} angle={0.3} penumbra={1} intensity={1} />
                <Stars />
                <Sky />
                <Text position={[0, 1.25, -0.5]} fontSize={0.5} color="#000" anchorX="center" anchorY="middle">Hi, welcome to Color Match!</Text>
                <Button position={[0, -0.5, -1]} castShadow/>
                <Plane position={[0,-3,0]} args={[10,10]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
                    <meshLambertMaterial attach="material" color="grey"/>
                </Plane>
          </>
      );
}

TitleScreen.propTypes = {};

TitleScreen.defaultProps = {};

export default TitleScreen;
