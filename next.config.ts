import type { NextConfig } from "next";
import { execSync } from "child_process";

let gitCommit = "unknown";
let upstreamBase = "unknown";
try {
  gitCommit = execSync("git rev-parse --short HEAD").toString().trim();
} catch {}
try {
  upstreamBase = execSync('git merge-base HEAD upstream/main').toString().trim().slice(0, 7);
} catch {}

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['better-sqlite3'],
  devIndicators: false,
  env: {
    NEXT_PUBLIC_GIT_COMMIT: gitCommit,
    NEXT_PUBLIC_UPSTREAM_BASE: upstreamBase,
  },
};

export default nextConfig;
