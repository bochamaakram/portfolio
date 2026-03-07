import React, { useMemo, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

// Import Icons
import { FaReact, FaNodeJs, FaPython, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiPostgresql, SiTailwindcss, SiMongodb, SiNextdotjs, SiRedis, SiPrisma, SiRedux, SiMysql } from 'react-icons/si';
import { BiLogoGit } from 'react-icons/bi';

// 1. Individual Skill Item Component
const SkillItem = ({ position, name, IconComponent, color }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                {/* HTML Icon Representation - sprite={true} keeps it facing the camera */}
                <Html transform sprite center style={{ pointerEvents: 'auto' }}>
                    <div
                        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
                        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); }}
                        style={{
                            color: color,
                            fontSize: hovered ? '1.8rem' : '1.4rem',
                            filter: hovered ? `drop-shadow(0 0 15px ${color})` : `drop-shadow(0 0 10px ${color}80)`,
                            transform: hovered ? 'scale(1.1)' : 'scale(1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}>
                        <IconComponent />
                        {/* Hover Label */}
                        <div style={{
                            position: 'absolute',
                            top: '120%',
                            opacity: hovered ? 1 : 0,
                            transform: hovered ? 'translateY(0)' : 'translateY(-10px)',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#1e3a8a', // matches secondary navy color
                            border: `2px solid ${color}`,
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            fontFamily: 'Outfit, sans-serif',
                            whiteSpace: 'nowrap',
                            letterSpacing: '1px',
                            boxShadow: `0 4px 10px rgba(0,0,0,0.5)`,
                            textTransform: 'uppercase',
                            pointerEvents: 'none' // allow hovering the icon cleanly
                        }}>
                            {name}
                        </div>
                    </div>
                </Html>
            </Float>
        </group>
    );
};

// 2. The Cloud Logic (Distributing items on a sphere)
const Cloud = ({ skills }) => {
    const count = skills.length;
    // Increase radius slightly to push icons outside the main wireframe sphere
    const radius = 5.5;
    const meshRef = useRef();
    const groupRef = useRef();
    const controlsRef = useRef();

    const skillPoints = useMemo(() => {
        const points = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
            const currentRadius = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * currentRadius;
            const z = Math.sin(theta) * currentRadius;

            points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
        }
        return points;
    }, [count, radius]);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Spin the inner globe explicitly around its own axis
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.002;
            groupRef.current.rotation.x += 0.001;
        }

        // 1. Get current scroll and viewport metrics
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        // 2. Calculate progress (0 to 1) over a specific range (top 80% of the screen)
        const transitionStart = 0;
        const transitionEnd = vh * 0.8;
        const progress = Math.min(Math.max((scrollY - transitionStart) / (transitionEnd - transitionStart), 0), 1);

        // 3. Define target values based on progress
        // Moves from x: 8.5 (further right) to x: 0 | Scales from 0.5x to 1.8x
        const targetX = 8.5 - (progress * 8.5);
        const targetScale = 0.6 + (progress * 1);

        // 4. Smooth Interpolation (Lerping)
        // 0.04 is the smoothing factor; lower is "laggier/smoother", higher is snappier
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.04);
        meshRef.current.position.lerp(new THREE.Vector3(targetX, 0, 0), 0.04);

        // Ensure controls follows the exact mesh center at all times!
        if (controlsRef.current) {
            controlsRef.current.target.copy(meshRef.current.position);
            controlsRef.current.update();
        }
    });

    // OrbitControls autoRotate takes care of rotating the scene!
    return (
        <group ref={meshRef}>
            <group ref={groupRef}>
                {/* Remove central wireframe sphere */}

                {skills.map((skill, idx) => (
                    <SkillItem
                        key={skill.name}
                        position={skillPoints[idx]}
                        name={skill.name}
                        IconComponent={skill.icon}
                        color={skill.color}
                    />
                ))}
            </group>

            {/* Added OrbitControls directly in the Cloud so it targets the moving meshRef */}
            <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                autoRotate
                autoRotateSpeed={0.5}
                makeDefault
            />
        </group>
    );
};

// 3. Main Scene Export
const Globe3D = () => {
    // We map icons explicitly
    const mySkills = [
        { name: 'React', color: '#61DAFB', icon: FaReact },
        { name: 'TypeScript', color: '#3178C6', icon: SiTypescript },
        { name: 'Node.js', color: '#339933', icon: FaNodeJs },
        { name: 'Next.js', color: '#ffffff', icon: SiNextdotjs },
        { name: 'PostgreSQL', color: '#4169E1', icon: SiPostgresql },
        { name: 'Python', color: '#3776AB', icon: FaPython },
        { name: 'Git', color: '#F05032', icon: BiLogoGit },
        { name: 'MongoDB', color: '#47A248', icon: SiMongodb },
        { name: 'Tailwind', color: '#06B6D4', icon: SiTailwindcss },
        { name: 'Docker', color: '#2496ED', icon: FaDocker },
        { name: 'AWS', color: '#FF9900', icon: FaAws },
        { name: 'Redux', color: '#764ABC', icon: SiRedux },
        { name: 'Redis', color: '#ff0000ff', icon: SiRedis },
        { name: 'Prisma', color: '#6DB33F', icon: SiPrisma },
        { name: 'mysql', color: '#3f7fb3ff', icon: SiMysql }
    ];

    return (
        <div
            className="globe-container-wrapper"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100dvh',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Canvas
                    camera={{ position: [0, 0, 16], fov: 45 }}
                    style={{ background: 'transparent', pointerEvents: 'auto' }}
                >
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />

                    <Cloud skills={mySkills} />
                </Canvas>
            </div>
        </div>
    );
}

export default Globe3D;
