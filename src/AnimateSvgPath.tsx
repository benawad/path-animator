import React, { useMemo } from "react";
import { interpolatePath } from "d3-interpolate-path";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import { Circle, Path, Ellipse } from "react-native-svg";

interface AnimatedPathProps {
  path0: any;
  path1: any;
  numFrames: number;
  progress: SharedValue<number>;
}

type FrameData = {
  cx?: number;
  cy?: number;
  rx?: number;
  ry?: number;
  r?: number;
  d?: string;
};

export const AnimatedCircle = Animated.createAnimatedComponent(Circle);
export const AnimatedPath = Animated.createAnimatedComponent(Path);
export const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

export const AnimateSvgPath = ({
  path0: {
    tagName,
    props: { transform: _, ...frameProps },
  },
  path1,
  progress,
  numFrames,
}: AnimatedPathProps) => {
  const frames = useMemo(() => {
    const frameDatas: FrameData[] = [];
    let step = 0;
    const stepSize = 1 / numFrames;
    const fn = frameProps.d
      ? interpolatePath(frameProps.d, path1.props.d)
      : () => "";
    for (let i = 0; i < numFrames; i++) {
      const frameData: FrameData = {};
      if (frameProps.d) {
        frameData.d = fn(step);
      }
      if (typeof frameProps.cx === "number") {
        frameData.cx = lerp(frameProps.cx, path1.props.cx, step);
      }
      if (typeof frameProps.cy === "number") {
        frameData.cy = lerp(frameProps.cy, path1.props.cy, step);
      }
      if (typeof frameProps.rx === "number") {
        frameData.rx = lerp(frameProps.rx, path1.props.rx, step);
      }
      if (typeof frameProps.ry === "number") {
        frameData.ry = lerp(frameProps.ry, path1.props.ry, step);
      }
      if (typeof frameProps.r === "number") {
        frameData.r = lerp(frameProps.r, path1.props.r, step);
      }
      frameDatas.push(frameData);
      step += stepSize;
    }

    return frameDatas;
  }, [path1]);

  const props = useAnimatedProps(() => {
    const f = frames[Math.floor(progress.value / (1 / numFrames))];

    if (!f) {
      return {};
    }

    return f;
  }, [frames]);

  if (tagName === "circle") {
    return <AnimatedCircle {...frameProps} animatedProps={props} />;
  } else if (tagName === "ellipse") {
    return <AnimatedEllipse {...frameProps} animatedProps={props} />;
  }

  return <AnimatedPath {...frameProps} animatedProps={props} />;
};
