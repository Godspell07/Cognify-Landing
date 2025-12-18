import { useProgress } from "@react-three/drei";

export function useThreeLoading() {
  const { active, progress } = useProgress();

  return {
    loading: active || progress < 100,
    progress: Math.floor(progress),
  };
}
