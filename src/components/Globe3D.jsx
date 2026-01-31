import React, { useRef, useMemo, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Skills to display on the ring with descriptions
const skillsList = [
    { name: 'React', desc: 'UI Library' },
    { name: 'Next.js', desc: 'React Framework' },
    { name: 'Node.js', desc: 'Runtime' },
    { name: 'Laravel', desc: 'PHP Framework' },
    { name: 'MongoDB', desc: 'NoSQL DB' },
    { name: 'MySQL', desc: 'Relational DB' },
    { name: 'Docker', desc: 'Containerization' },
    { name: 'AWS', desc: 'Cloud Services' },
    { name: 'Redux', desc: 'State Management' },
    { name: 'Express', desc: 'Node Framework' },
    { name: 'HTML/CSS', desc: 'Web Fundamentals' },
    { name: 'Tailwind', desc: 'CSS Framework' },
    { name: 'NestJS', desc: 'Node Framework' },
    { name: 'CI/CD', desc: 'DevOps' }
];

const SkillsRing = ({ radius = 2.8, onHoverSkill }) => {
    const ringRef = useRef();
    const [hoveredSkillIndex, setHoveredSkillIndex] = React.useState(null);

    useFrame(() => {
        if (ringRef.current && hoveredSkillIndex === null) {
            ringRef.current.rotation.y += 0.003;
        }
    });

    const handleHover = (index) => {
        setHoveredSkillIndex(index);
        onHoverSkill(true);
    };

    const handleLeave = () => {
        setHoveredSkillIndex(null);
        onHoverSkill(false);
    };

    return (
        <group ref={ringRef}>
            {/* Ring circle */}
            {/* Ring circle removed as per request */}

            {/* Skills labels around the ring */}
            {skillsList.map((skill, i) => {
                const angle = (i / skillsList.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                    <group
                        key={skill.name}
                        position={[x, 0, z]}
                        rotation={[0, -angle + Math.PI / 2, 0]} // Rotate to face outward
                    >
                        <Text
                            color={hoveredSkillIndex === i ? 'white' : '#cba6f7'}
                            fontSize={0.2}
                            maxWidth={2}
                            lineHeight={1}
                            letterSpacing={0.05}
                            textAlign="center"
                            anchorX="center"
                            anchorY="middle"
                            onPointerOver={() => handleHover(i)}
                            onPointerOut={handleLeave}
                        >
                            {skill.name}
                        </Text>

                        {/* Description below title (only visible on hover for cleaner Look) */}
                        {hoveredSkillIndex === i && (
                            <Text
                                position={[0, -0.2, 0]}
                                color="#a6adc8"
                                fontSize={0.12}
                                anchorX="center"
                                anchorY="top"
                            >
                                {skill.desc}
                            </Text>
                        )}
                    </group>
                );
            })}
        </group>
    );
};

const Globe = ({ setContainerOpacity }) => {
    const meshRef = useRef();
    const pointsRef = useRef(); // InstancedMesh ref
    const [isHoveringSkill, setIsHoveringSkill] = React.useState(false);

    // Create points on the globe surface
    const points = useMemo(() => {
        const pts = [];
        const numPoints = 120;

        for (let i = 0; i < numPoints; i++) {
            const phi = Math.acos(-1 + (2 * i) / numPoints);
            const theta = Math.sqrt(numPoints * Math.PI) * phi;

            const x = Math.cos(theta) * Math.sin(phi);
            const y = Math.sin(theta) * Math.sin(phi);
            const z = Math.cos(phi);

            pts.push(new THREE.Vector3(x * 1.5, y * 1.5, z * 1.5));
        }
        return pts;
    }, []);

    // Create connections between nearby points
    const lines = useMemo(() => {
        const lineGeometries = [];
        const threshold = 0.6;

        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dist = points[i].distanceTo(points[j]);
                if (dist < threshold) {
                    lineGeometries.push([points[i], points[j]]);
                }
            }
        }
        return lineGeometries;
    }, [points]);

    // Update InstancedMesh matrices
    useLayoutEffect(() => {
        if (pointsRef.current) {
            const tempObject = new THREE.Object3D();
            points.forEach((point, i) => {
                tempObject.position.copy(point);
                tempObject.scale.set(1, 1, 1);
                tempObject.updateMatrix();
                pointsRef.current.setMatrixAt(i, tempObject.matrix);
            });
            pointsRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [points]);

    useFrame((state) => {
        if (meshRef.current) {
            // --- Animation & Scroll Logic inside useFrame ---

            // Rotation
            if (!isHoveringSkill) {
                meshRef.current.rotation.y += 0.002;
            }

            // Scroll Calculations
            const scrollY = window.scrollY;
            const vh = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Transition logic
            const transitionStart = 0;
            const transitionEnd = vh * 0.8;
            const progress = Math.min(Math.max((scrollY - transitionStart) / (transitionEnd - transitionStart), 0), 1);

            // Target X and Scale
            const targetX = 2.5 - (progress * 2.5);
            const targetScale = 1 + (progress * 0.8);

            // Smooth Interpolation
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.04);
            meshRef.current.position.lerp(new THREE.Vector3(targetX, 0, 0), 0.04);

            // Footer Fade Overlay (Communicating back to parent container via ref/callback would be react-y, 
            // but for performance we can control it here or just assume the parent handles it. 
            // Better: update the REF to the container directly if passed, or use state responsibly.
            // Since we want to AVOID state updates that trigger re-renders of the whole tree, 
            // we should probably just animate the Opacity of the Group itself!)

            const distFromBottom = docHeight - (scrollY + vh);
            const fadeThreshold = 1200;
            let opacity = 1;
            if (distFromBottom < fadeThreshold) {
                opacity = Math.min(Math.max(distFromBottom / 800, 0), 1);
            }

            // Apply opacity to the whole group? Or just pass it to setContainerOpacity if provided?
            // Actually, scaling opacity on the mesh materials is cleaner than DOM opacity updates which cause reflows.
            // But the container opacity was used to hide it.

            // Let's use a callback Ref approach or just simpler:
            if (setContainerOpacity) {
                setContainerOpacity(opacity);
            }
        }
    });

    return (
        <group ref={meshRef} rotation={[0, 0.7, 0]}>
            {/* Main sphere wireframe */}
            <Sphere args={[1.5, 32, 32]}>
                <meshBasicMaterial
                    color="#cba6f7"
                    wireframe
                    transparent
                    opacity={0.12} // Start opacity, can be modulated if needed
                />
            </Sphere>

            {/* Skills Ring - Radius adjusted for balance */}
            <SkillsRing radius={2.5} onHoverSkill={setIsHoveringSkill} />

            {/* Points on the globe - InstancedMesh */}
            <instancedMesh ref={pointsRef} args={[null, null, points.length]}>
                <sphereGeometry args={[0.02, 6, 6]} />
                <meshBasicMaterial color="#cba6f7" transparent opacity={0.6} />
            </instancedMesh>

            {/* Connection lines */}
            {lines.map((line, i) => (
                <line key={`line-${i}`}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([
                                line[0].x, line[0].y, line[0].z,
                                line[1].x, line[1].y, line[1].z
                            ])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#cba6f7" transparent opacity={0.2} />
                </line>
            ))}

            {/* Inner core */}
            <Sphere args={[1.3, 32, 32]}>
                <meshBasicMaterial
                    color="#1e1e2e"
                    transparent
                    opacity={0.7}
                />
            </Sphere>
        </group>
    );
};

const Globe3D = () => {
    // We keep one bit of state just for the container opacity if effectively inexpensive,
    // OR we can use a ref to the container div to avoid re-rendering the Canvas.
    const containerRef = useRef();

    const setContainerOpacity = (opacity) => {
        if (containerRef.current) {
            containerRef.current.style.opacity = opacity * 0.5; // * 0.5 because original was 0.5
            // Also pointer events logic could go here if needed
        }
    };

    return (
        <div ref={containerRef} className="globe-container" style={{ pointerEvents: 'none', opacity: 0.5, transition: 'opacity 0.1s linear' }}>
            <Canvas
                camera={{ position: [0, 4, 7], fov: 50 }}
                style={{ background: 'transparent', pointerEvents: 'auto' }} // Always auto, we control occlusion in CSS or components
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />

                <Suspense fallback={null}>
                    <Globe setContainerOpacity={setContainerOpacity} />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    autoRotate={false}
                    enableDamping={true}
                    dampingFactor={0.05}
                    rotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
};

export default Globe3D;
