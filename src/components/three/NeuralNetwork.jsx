import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Node({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" />
    </mesh>
  );
}

export default function NeuralNetwork() {
  const nodes = [
    [-2, 0, 0],
    [0, 1, 0],
    [2, 0, 0],
    [-1, -1, 0],
    [1, -1, 0],
  ];

  return (
    <div className="h-[500px] w-full rounded-3xl overflow-hidden border border-white/10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />

        <OrbitControls enableZoom={false} />

        {nodes.map((pos, i) => (
          <Node key={i} position={pos} />
        ))}
      </Canvas>
    </div>
  );
}