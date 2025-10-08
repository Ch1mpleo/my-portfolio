/* eslint-disable react/no-unknown-property */
/// <reference path="../global.d.ts" />
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import {
    BallCollider,
    CuboidCollider,
    Physics,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
    RigidBodyProps
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Import asset
import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
    position?: [number, number, number];
    gravity?: [number, number, number];
    fov?: number;
    transparent?: boolean;
}

export default function Lanyard({
    position = [0, 0, 30],
    gravity = [0, -40, 0],
    fov = 20
}: LanyardProps) {
    const [dragCount, setDragCount] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    
    const handleDragCount = (count: number) => {
        console.log(`Main component: Drag count updated to ${count}`);
        setDragCount(count);
        setShowCelebration(true);
        
        // Hide celebration after animation
        setTimeout(() => {
            setShowCelebration(false);
        }, 1000);
    };
    return (
        <div className="relative z-0 w-full h-full flex justify-center items-center transform scale-100 origin-center">
            <Canvas
                camera={{ position, fov }}
                gl={{ alpha: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color(0x000000), 0);
                }}
            >
                <ambientLight intensity={Math.PI} />
                <Suspense fallback={null}>
                    <Physics gravity={gravity} timeStep={1 / 60}>
                        <Band onDragCount={handleDragCount} />
                    </Physics>
                    <Environment blur={0.75}>
                        <Lightformer
                            intensity={2}
                            color="white"
                            position={[0, -1, 5]}
                            rotation={[0, 0, Math.PI / 3]}
                            scale={[100, 0.1, 1]}
                        />
                        <Lightformer
                            intensity={3}
                            color="white"
                            position={[-1, -1, 1]}
                            rotation={[0, 0, Math.PI / 3]}
                            scale={[100, 0.1, 1]}
                        />
                        <Lightformer
                            intensity={3}
                            color="white"
                            position={[1, 1, 1]}
                            rotation={[0, 0, Math.PI / 3]}
                            scale={[100, 0.1, 1]}
                        />
                        <Lightformer
                            intensity={10}
                            color="white"
                            position={[-10, 0, 14]}
                            rotation={[0, Math.PI / 2, Math.PI / 3]}
                            scale={[100, 10, 1]}
                        />
                    </Environment>
                </Suspense>
            </Canvas>
            {/* Drag Counter Display */}
            <div className={`absolute top-4 right-4 text-terminal-text font-mono text-lg transition-all duration-300 ${
                showCelebration ? 'scale-110 text-terminal-secondary' : ''
            }`}>
                <div className="text-xs text-terminal-text/60 tracking-wider">DRAGS</div>
                <div className="text-2xl font-bold tracking-wider">{dragCount}</div>
            </div>
            
            {/* Celebration Effect */}
            {showCelebration && (
                <>
                    {/* Main +1 Text */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <div className="text-6xl animate-bounce text-terminal-text font-mono font-bold tracking-wider drop-shadow-lg">
                            +1
                        </div>
                    </div>
                    
                    {/* Particle Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-terminal-text rounded-full animate-ping"
                                style={{
                                    left: `${50 + Math.cos(i * 45 * Math.PI / 180) * 100}px`,
                                    top: `${50 + Math.sin(i * 45 * Math.PI / 180) * 100}px`,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: '1s'
                                }}
                            />
                        ))}
                    </div>
                    
                    {/* Confetti Effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={`confetti-${i}`}
                                className="absolute w-3 h-3 animate-bounce"
                                style={{
                                    backgroundColor: ['#00ff00', '#00cc00', '#00aa00', '#008800', '#006600', '#004400'][i % 6],
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 0.05}s`,
                                    animationDuration: `${0.5 + Math.random() * 0.5}s`
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

interface BandProps {
    maxSpeed?: number;
    minSpeed?: number;
    onDragCount?: (count: number) => void;
}

function Band({ maxSpeed = 50, minSpeed = 0, onDragCount }: BandProps) {
    // Using "any" for refs since the exact types depend on Rapier's internals
    const band = useRef<any>(null);
    const fixed = useRef<any>(null);
    const j1 = useRef<any>(null);
    const j2 = useRef<any>(null);
    const j3 = useRef<any>(null);
    const card = useRef<any>(null);

    const vec = new THREE.Vector3();
    const ang = new THREE.Vector3();
    const rot = new THREE.Vector3();
    const dir = new THREE.Vector3();

    const segmentProps: any = {
        type: 'dynamic' as RigidBodyProps['type'],
        canSleep: true,
        colliders: false,
        angularDamping: 4,
        linearDamping: 4
    };

    const { nodes, materials } = useGLTF(cardGLB) as any;
    const texture = useTexture(lanyard);
    const [curve] = useState(
        () =>
            new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
    );
    const [dragged, drag] = useState<false | THREE.Vector3>(false);
    const [hovered, hover] = useState(false);
    const [dragCount, setDragCount] = useState(0);
    const [hasStartedDrag, setHasStartedDrag] = useState(false);
    const [isCounting, setIsCounting] = useState(false);

    const [isSmall, setIsSmall] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 1024;
        }
        return false;
    });

    useEffect(() => {
        const handleResize = (): void => {
            setIsSmall(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return (): void => window.removeEventListener('resize', handleResize);
    }, []);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.45, 0]
    ]);

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab';
            return () => {
                document.body.style.cursor = 'auto';
            };
        }
    }, [hovered, dragged]);

    useFrame((state, delta) => {
        if (dragged && typeof dragged !== 'boolean') {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z
            });
            // Count each drag start with delay
            if (!hasStartedDrag && !isCounting) {
                console.log('Started dragging lanyard');
                setHasStartedDrag(true);
                setIsCounting(true);
                
                // Delay the count by 500ms
                setTimeout(() => {
                    const newCount = dragCount + 1;
                    setDragCount(newCount);
                    onDragCount?.(newCount);
                    console.log(`Drag count updated to: ${newCount}`);
                }, 500);
            }
        } else if (hasStartedDrag && !dragged) {
            // User just released the card, reset the drag flag
            console.log('Released lanyard');
            setHasStartedDrag(false);
            setIsCounting(false);
        }
        
        if (fixed.current) {
            [j1, j2].forEach(ref => {
                if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
                const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
                ref.current.lerped.lerp(
                    ref.current.translation(),
                    delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                );
            });
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.lerped);
            curve.points[2].copy(j1.current.lerped);
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(32));
            ang.copy(card.current.angvel());
            rot.copy(card.current.rotation());
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
        }
    });

    curve.curveType = 'chordal';
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    return (
        <>
            <group position={[0, 4, 0]}>
                <RigidBody ref={fixed} {...segmentProps} type={'fixed' as RigidBodyProps['type']} />
                <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={'dynamic' as RigidBodyProps['type']}>
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[2, 0, 0]}
                    ref={card}
                    {...segmentProps}
                    type={dragged ? ('kinematicPosition' as RigidBodyProps['type']) : ('dynamic' as RigidBodyProps['type'])}
                >
                    <CuboidCollider args={[0.8, 1.125, 0.01]} />
                    <group
                        scale={2.25}
                        position={[0, -1.2, -0.05]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e: any) => {
                            e.target.releasePointerCapture(e.pointerId);
                            console.log('Pointer up on lanyard');
                            drag(false);
                        }}
                        onPointerDown={(e: any) => {
                            e.target.setPointerCapture(e.pointerId);
                            console.log('Pointer down on lanyard');
                            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
                        }}
                    >
                        <mesh geometry={nodes.card.geometry}>
                            <meshPhysicalMaterial
                                map={materials.base.map}
                                map-anisotropy={16}
                                clearcoat={1}
                                clearcoatRoughness={0.15}
                                roughness={0.9}
                                metalness={0.8}
                            />
                        </mesh>
                        <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
                        <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
                    </group>
                </RigidBody>
            </group>
            <mesh ref={band}>
                {/* @ts-expect-error - meshLineGeometry is extended from meshline */}
                <meshLineGeometry />
                {/* @ts-expect-error - meshLineMaterial is extended from meshline */}
                <meshLineMaterial
                    color="white"
                    depthTest={false}
                    resolution={isSmall ? [1000, 2000] : [1000, 1000]}
                    useMap
                    map={texture}
                    repeat={[-4, 1]}
                    lineWidth={1}
                />
            </mesh>
        </>
    );
}

