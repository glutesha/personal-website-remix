import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { Suspense } from "react";
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import type { GLTF } from "three-stdlib";

import avatar_transparent from "../../../assets/images/avatar_transparent.png";

class ModelErrorBoundary extends React.Component<{ fallback: React.ReactNode }, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: unknown) {
        console.error("GLTF load error:", error);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

function Scene() {
    const gltf = useGLTF('/gluten.glb') as GLTF;
    const { camera, raycaster, gl } = useThree();

    const container = gl.domElement.parentElement as HTMLElement;

    const modelRef = useRef<THREE.Object3D | null>(null);
    const headRef = useRef<THREE.Object3D | null>(null);

    const target = useRef(new THREE.Vector3(0, camera.position.y, camera.position.z + 3));
    const plane = useRef(new THREE.Plane());
    const mouse = useRef(new THREE.Vector2());
    const intersection = useRef(new THREE.Vector3(0, 0, camera.position.z + 3));

    useEffect(() => {
        const object = gltf.scene;
        modelRef.current = object;

        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());

        object.position.sub(center);
        object.position.y += 0.1;

        headRef.current = object.getObjectByName("Bone003") || null;
    }, [gltf])

    useEffect(() => {
        const handleMove = (event: MouseEvent) => {
            const rect = container.getBoundingClientRect();

            let X = event.clientX;
            let Y = event.clientY;

            if (X < rect.left - 90) X = rect.left - 90;
            else if (X > rect.right + 90) X = rect.right + 90;

            if (Y > rect.bottom) Y = rect.bottom;

            mouse.current.x = ((X - rect.left) / rect.width) * 2 - 1;
            mouse.current.y = -((Y - rect.top) / rect.height) * 2 + 1;

            if (!modelRef.current) return;

            plane.current.setFromNormalAndCoplanarPoint(
                camera.position.clone().normalize(),
                modelRef.current.position
            );

            raycaster.setFromCamera(mouse.current, camera);
            raycaster.ray.intersectPlane(plane.current, intersection.current);

            intersection.current.z = camera.position.z;
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [camera, container, raycaster]);

    useFrame(() => {
        if (!headRef.current) return;

        target.current.lerp(intersection.current, 0.1);
        headRef.current.lookAt(target.current);
    });

    return <primitive object={gltf.scene} />;
}

useGLTF.preload("/src/assets/gluten.glb");

const Placeholder = () => {
    return (
        <img src={avatar_transparent.src} width="300" height="300" alt="placeholder"/>
    );
}
export const Chuvirla = () => {
    return (
        <div className="flex justify-center items-center aspect-square h-100 mdx:h-110 shrink-0 -m-5" id="glutesha">
            <ModelErrorBoundary fallback={<Placeholder />}>
                <Suspense fallback={<Placeholder />}>
                    <Canvas camera={{ position: [0, -0.1, 3.3], fov: 40 }}>
                        <hemisphereLight args={[0xffffff, 0x080820, 2]} position={[0, 3, 3]} />
                            <Scene/>
                    </Canvas>
                </Suspense>
            </ModelErrorBoundary>
        </div>
    );
}