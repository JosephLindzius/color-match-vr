import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import styles from './GamePiece.module.css';
import {gsap, Sine} from "gsap";
import {Color} from "three";
import {Interactive} from "@react-three/xr";
import {generateUUID} from "three/src/math/MathUtils";
import {Box} from "@react-three/drei";

const secretColors = [0x37a6ae, 0x67ae37, 0xae8b37, 0xae37aa, 0xfff]


function showSecretColor(e){
    e.intersection.object.material.color = e.intersection.object.secretColor
    e.intersection.object.geometry.colorsNeedUpdate = true;
}

function GamePiece(props){
    const ref = useRef();
    const color = 0x123456
    const onSelectStart = (e) => {
        showSecretColor(e)
        props.gamePieceSelected(e)
        gsap.to(e.intersection.object.rotation, { x: Math.PI/2, duration: 1,  ease:Sine.easeIn });
    }

    const onSelect = (e) => {

    }

    const onSelectEnd = (e) => {
        gsap.to(e.intersection.object.rotation, { x: -Math.PI/2, duration: 1,  ease:Sine.easeIn });
        e.intersection.object.material.color = new Color(color)
        e.intersection.object.geometry.colorsNeedUpdate = true;
    }

    return (
        <Interactive onSelectStart={onSelectStart} onSelect={onSelect} onSelectEnd={onSelectEnd} ref={ref} key={(generateUUID())}>
            <Box secretColor={new Color(secretColors[props.j])} indexkeys={[props.i, props.j]} key={(generateUUID())} args={[0.3, 0.3, 0.3]} position={[1.5-0.5 * props.i, -1 + 0.5 * props.j, -0.5]} rotation={[0, 0, 0]} castShadow vertexColors>
                <meshLambertMaterial color={color}/>
            </Box>
        </Interactive>
    )
}

GamePiece.propTypes = {};

GamePiece.defaultProps = {};

export default GamePiece;
