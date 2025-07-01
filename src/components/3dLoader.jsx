import { Canvas } from '@react-three/fiber';
import { OrbitControls, useFBX } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
//import '../styles/3dLoader.css';

const Model = () => {
  return (
    <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="#3a86ff" roughness={0.2} metalness={0.8} />
    </mesh>
  );
};

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-text">Loading...</div>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Model />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Loader;