import React, { Suspense, useMemo, useRef } from 'react';
import {
    BufferGeometry,
    MeshBasicMaterial,
    DoubleSide,
    TextureLoader,
} from 'three';
import {
    FaceTracker,
    ZapparCamera,
    ZapparCanvas,
    Loader,
    Pipeline,
    Types,
} from '@zappar/zappar-react-three-fiber';

function FaceImage() {
    const faceTexture = '../public/assets/face.png';

    const faceTrackerGroup = useRef<Types.FaceAnchorGroup>();
    const pipeline = useMemo(() => new Pipeline(), []);

    const texture = useMemo(() => new TextureLoader().load(faceTexture), []);

    return (
        <ZapparCanvas>
            <ZapparCamera pipeline={pipeline} rearCameraMirrorMode="css" />
            <FaceTracker ref={faceTrackerGroup} pipeline={pipeline}>
                <Suspense fallback={null}>
                    <mesh>
                        <planeBufferGeometry args={[1, 1]} />
                        <meshBasicMaterial map={texture} side={DoubleSide} />
                    </mesh>
                </Suspense>
            </FaceTracker>
            <ambientLight intensity={0.6} />
            <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
            <Loader />
        </ZapparCanvas>
    );
}

export default FaceImage;
