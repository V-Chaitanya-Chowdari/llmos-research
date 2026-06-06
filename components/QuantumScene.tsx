/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Environment, Stars, Box, Line } from '@react-three/drei';
import * as THREE from 'three';

// Float Neural Node Component representing a single concept cluster in the LLMOS memory space
const CognitiveNode = ({ position, color, scale = 1, speed = 1 }: { position: [number, number, number]; color: string; scale?: number; speed?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * speed + position[0]) * 0.15;
      ref.current.rotation.y = t * 0.4;
      ref.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 16, 16]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.25}
        flatShading
      />
    </Sphere>
  );
};

// Flowing boundary rings symbolizing physical hardware execution of the AI operating system
const OSKernelRing = ({ radius, speed, color = "#C5A059" }: { radius: number; speed: number; color?: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.1) * 0.1;
       ref.current.rotation.y = t * speed;
       ref.current.rotation.z = Math.cos(t * 0.1) * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[radius, 0.03, 8, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.6} 
        transparent 
        opacity={0.55} 
        wireframe 
      />
    </Torus>
  );
}

// Glowing data flow packet flowing between GNN vertices
const DataPacket = ({ start, end, speed = 1.5, delay = 0 }: { start: THREE.Vector3; end: THREE.Vector3; speed?: number; delay?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.getElapsedTime() * speed + delay) % 1.0;
      ref.current.position.lerpVectors(start, end, t);
    }
  });

  return (
    <Sphere ref={ref} args={[0.07, 8, 8]}>
      <meshBasicMaterial color="#C5A059" />
    </Sphere>
  );
};

export const HeroScene: React.FC = () => {
  // Define positions for GNN node graph vertices to draw connecting lines
  const vertices: [number, number, number][] = [
    [0, 1.5, 0],
    [-2, 0, -1],
    [2, 0.5, -2],
    [-1, -1.8, -1.5],
    [1.8, -1.2, -1],
    [0.2, -0.2, 1]
  ];

  const nodePositions = vertices.map(v => new THREE.Vector3(...v));

  return (
    <div className="absolute inset-0 z-0 opacity-55 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
          {/* Main system kernel visual representation */}
          <CognitiveNode position={vertices[0]} color="#C5A059" scale={0.4} speed={1.2} />
          <CognitiveNode position={vertices[1]} color="#70706a" scale={0.3} speed={0.9} />
          <CognitiveNode position={vertices[2]} color="#C5A059" scale={0.35} speed={1.4} />
          <CognitiveNode position={vertices[3]} color="#555552" scale={0.25} speed={0.8} />
          <CognitiveNode position={vertices[4]} color="#C5A059" scale={0.3} speed={1.1} />
          <CognitiveNode position={vertices[5]} color="#eae9e5" scale={0.5} speed={1.5} />

          {/* Connect node dependencies using fine line markers */}
          <Line points={[vertices[0], vertices[1]]} color="#C5A059" lineWidth={1} opacity={0.25} transparent />
          <Line points={[vertices[0], vertices[2]]} color="#C5A059" lineWidth={1} opacity={0.25} transparent />
          <Line points={[vertices[1], vertices[3]]} color="#C5A059" lineWidth={1} opacity={0.2} transparent />
          <Line points={[vertices[2], vertices[4]]} color="#C5A059" lineWidth={1} opacity={0.2} transparent />
          <Line points={[vertices[5], vertices[0]]} color="#C5A059" lineWidth={1.5} opacity={0.35} transparent />
          <Line points={[vertices[5], vertices[3]]} color="#C5A059" lineWidth={1} opacity={0.2} transparent />
          <Line points={[vertices[5], vertices[4]]} color="#C5A059" lineWidth={1} opacity={0.2} transparent />

          {/* Golden Orbit bounds representing agent boundaries */}
          <OSKernelRing radius={2.5} speed={0.2} />
          <OSKernelRing radius={3.8} speed={-0.1} color="#60605d" />

          {/* Moving packet loops */}
          <DataPacket start={nodePositions[1]} end={nodePositions[0]} speed={1.2} delay={0} />
          <DataPacket start={nodePositions[5]} end={nodePositions[0]} speed={1.8} delay={0.35} />
          <DataPacket start={nodePositions[2]} end={nodePositions[4]} speed={1.0} delay={0.7} />
        </Float>

        <Environment preset="city" />
        <Stars radius={120} depth={40} count={1200} factor={4} saturation={0} fade speed={1.2} />
      </Canvas>
    </div>
  );
};

export const QuantumComputerScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} color="#C5A059" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Environment preset="studio" />
        
        <Float rotationIntensity={0.3} floatIntensity={0.2} speed={1.2}>
          <group rotation={[0, 0, 0]} position={[0, 0.4, 0]}>
            {/* Visual representing the multi-tier MemGPT / Letta core storage structure */}
            
            {/* Top Plate symbolizing Primary Active RAM Context (Tier 1) */}
            <Box args={[1.5, 0.08, 1.5]} position={[0, 0.9, 0]}>
              <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.1} />
            </Box>
            
            {/* Translucent Middle Core showing LLM + GNN reasoning activity inside */}
            <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#C5A059" transparent opacity={0.3} roughness={0.0} wireframe />
            </Sphere>
            <Box args={[0.3, 0.3, 0.3]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#eae9e5" metalness={0.9} roughness={0.1} />
            </Box>

            {/* Bottom Plate representing Secondary Infinite Persistent Database (Tier 2) */}
            <Box args={[1.8, 0.12, 1.8]} position={[0, -0.9, 0]}>
              <meshStandardMaterial color="#30302e" metalness={0.9} roughness={0.3} />
            </Box>

            {/* Inter-tier routing pillars */}
            <CylinderPillar position={[0.6, 0, 0.6]} />
            <CylinderPillar position={[-0.6, 0, 0.6]} />
            <CylinderPillar position={[0.6, 0, -0.6]} />
            <CylinderPillar position={[-0.6, 0, -0.6]} />

            {/* Flowing golden data loops between active & passive plates */}
            <OSKernelRing radius={1.1} speed={0.4} color="#C5A059" />
            <OSKernelRing radius={1.4} speed={-0.35} color="#eae9e5" />
          </group>
        </Float>
      </Canvas>
    </div>
  );
};

// Helper cylinder components for connecting structures
const CylinderPillar = ({ position }: { position: [number, number, number] }) => (
  <Sphere position={position} scale={0.08}>
    <meshStandardMaterial color="#70706c" metalness={0.8} roughness={0.2} />
  </Sphere>
);
