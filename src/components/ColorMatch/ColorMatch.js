import React, {useEffect, useRef, useState} from 'react';
import {DefaultXRControllers, useXR, useXREvent} from "@react-three/xr";
import {Plane, Sky, Stars} from "@react-three/drei";
import {generateUUID} from "three/src/math/MathUtils";
import {gsap} from "gsap";
import {useFrame, useThree} from "@react-three/fiber";
import {Color, Mesh} from "three";
import GamePiece from "../GamePiece/GamePiece";

const initSelection = {
    one: {
        controllerId: null,
        mesh: new Mesh(),
        secretColor: new Color(0xfff000)
    },
    two: {
        controllerId: null,
        mesh: new Mesh(),
        secretColor: new Color(0xeeee00)
    },
}

const ColorMatch = () => {
    const [selectedGamePieces, setSelectedGamePieces] = useState(initSelection)
    const { player } = useXR()
    const {scene} = useThree()

    function gamePieceSelected(e, deselect){
        let selection = {
            one: {
                controllerId: null,
                mesh: new Mesh(),
                secretColor: new Color(0xfff000)
            },
            two: {
                controllerId: null,
                mesh: new Mesh(),
                secretColor: new Color(0xeeee00)
            },
        }
        const mesh = e.intersection.object
        if(deselect){
            console.log('deselected')
        }

        if(selectedGamePieces.one.controllerId === null && selectedGamePieces.two.controllerId === null) {
            selection.one.controllerId = e.controller.controller.uuid
            selection.one.mesh = mesh
            selection.one.secretColor = mesh.secretColor
            setSelectedGamePieces(selection)
        }
        if(selectedGamePieces.two.controllerId === null && selectedGamePieces.one.controllerId !== null && selectedGamePieces.one.controllerId !== e.controller.controller.uuid) {
            selection.one.controllerId = selectedGamePieces.one.controllerId
            selection.one.mesh = selectedGamePieces.one.mesh
            selection.one.secretColor = selectedGamePieces.one.secretColor
            selection.two.controllerId = e.controller.controller.uuid
            selection.two.mesh = mesh
            selection.two.secretColor = mesh.secretColor
            setSelectedGamePieces(selection)
        }
        //todo see what is the bug here Secret color disappears
       /* if(selectedGamePieces.one.controllerId === e.controller.controller.uuid){
            selection.one.controllerId = selectedGamePieces.one.controllerId
            selection.one.mesh = mesh
            selection.one.secretColor = mesh.secretColor
            selection.two.controllerId = selectedGamePieces.two.controllerId
            selection.two.mesh = selectedGamePieces.two.mesh
            selection.two.secretColor = selectedGamePieces.two.secretColor
            setSelectedGamePieces(selection)
        }
        if(selectedGamePieces.two.controllerId === e.controller.controller.uuid){
            selection.two.controllerId = selectedGamePieces.two.controllerId
            selection.two.mesh = mesh
            selection.two.secretColor = mesh.secretColor
            selection.one.controllerId = selectedGamePieces.one.controllerId
            selection.one.mesh = selectedGamePieces.one.mesh
            selection.one.secretColor = selectedGamePieces.one.secretColor
            setSelectedGamePieces(selection)
        } */

        console.log(selectedGamePieces)
    }

    useEffect(() => {
        player.position.y = 0.10;
        player.position.z = 3.50;
    }, [])


    useFrame((state,delta, d) => {
        gsap.ticker.tick()
    });

    useXREvent('squeezestart', ()=>{
        if(selectedGamePieces.one.secretColor.r === selectedGamePieces.two.secretColor.r
            && selectedGamePieces.one.secretColor.b === selectedGamePieces.two.secretColor.b
            && selectedGamePieces.one.secretColor.g === selectedGamePieces.two.secretColor.g){
            console.log("match!")
        }
    })
    useEffect(() => {

    }, [selectedGamePieces]);

    return (
      <>
          <DefaultXRControllers/>
          <ambientLight intensity={1} />
          <spotLight position={[1, 8, 1]} angle={0.3} penumbra={1} intensity={1} />
          <Stars />
          <Sky />
          {[...Array(4)].map((_, i) => (
              [...Array(5)].map((_, j) => (
                 <GamePiece key={generateUUID()} i={i} j={j} gamePieceSelected={gamePieceSelected}/>
              ))
          ))}
          <Plane position={[0,-3,0]} args={[10,10]} rotation={[-Math.PI/2, 0, 0]} receiveShadow>
              <meshLambertMaterial attach="material" color="grey"/>
          </Plane>
      </>
);
}

ColorMatch.propTypes = {};

ColorMatch.defaultProps = {};

export default ColorMatch;
