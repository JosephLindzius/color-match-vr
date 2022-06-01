import React, {useCallback, useEffect, useState} from 'react';
import {VRCanvas, DefaultXRControllers, useXR} from "@react-three/xr";
import TitleScreen from "../TitleScreen/TitleScreen";
import ColorMatch from "../ColorMatch/ColorMatch";
import {useThree} from "@react-three/fiber";


const initialState = {
    //scene: 1,
   // paused: false
}

const Scene = () => {

    const [scene, setScene] = useState(1)

    useEffect(() => {
        getScene(scene)


    }, [scene]);


    function getScene(scene){
        console.log(scene, "getscene1")
        if(scene === 1){
            return (
                <TitleScreen setParentScene={setScene}/>
            )
        }
        console.log(scene, "getscene2")

        if(scene === 2) {
            return (
                <ColorMatch/>
            )
        }
    }

    return (getScene(scene))
}

const GameCanvas = () => {

    return (
        <VRCanvas vr="true">
            <Scene/>
        </VRCanvas>
    );}

GameCanvas.propTypes = {};

GameCanvas.defaultProps = {};

export default GameCanvas;
