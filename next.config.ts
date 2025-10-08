import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Permite importar archivos .glb/.gltf como recursos estáticos desde el frontend
    config.module.rules.push({
      test: /\.(glb|gltf)$/i,
      type: 'asset/resource',
    })
    return config
  },
};

export default nextConfig;
