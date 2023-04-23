import React, { useEffect } from "react";
import Svg from "react-native-svg";
import { AnimateSvgPath } from "./AnimateSvgPath";
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SvgPathAnimatorProps {
  startingPaths: any[];
  endingPaths: any[];
  size: number;
  speed?: number;
}

const defaultFrameDuration = 30;

export const SvgAnimator: React.FC<SvgPathAnimatorProps> = ({
  size,
  startingPaths,
  endingPaths,
  speed = 2,
}) => {
  const progress = useSharedValue(0);

  const tweenDuration = speed * 1000;
  const numFrames = Math.max(
    Math.ceil(tweenDuration / defaultFrameDuration),
    2
  );

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: tweenDuration, easing: Easing.linear }),
      Infinity,
      true
    );
  }, []);

  return (
    <Svg viewBox="0 0 200 200" width={size} height={size}>
      {startingPaths.map((startingPath, i) => {
        const endingPath = endingPaths[i];
        return (
          <AnimateSvgPath
            key={i}
            numFrames={numFrames}
            progress={progress}
            path0={startingPath}
            path1={endingPath}
          />
        );
      })}
    </Svg>
  );
};
