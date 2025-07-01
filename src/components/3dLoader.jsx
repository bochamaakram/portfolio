import { Canvas } from '@react-three/fiber';
import { OrbitControls, useFBX } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import '../styles/3dLoader.css';
import { div } from 'framer-motion/client';

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
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;