import { Image, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiSticker({
  imageSize,
  stickerSource,
  onDelete,
}: {
  imageSize: number;
  stickerSource: { uri: string };
  onDelete: () => void;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const imageScaleRef = useSharedValue(imageSize);

  const scaleStyles = useAnimatedStyle(() => {
    return {
      width: withSpring(imageScaleRef.value),
      height: withSpring(imageScaleRef.value),
    };
  });

  const onDoubleTap = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onActive: () => {
      runOnJS(onDelete)();
    },
  });

  const onResize = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: (event) => {
      if (imageScaleRef.value) {
        imageScaleRef.value = imageScaleRef.value * (1 + event.velocity * 10);
      }
    },
  });

  const onDrag = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { translateX: number; translateY: number }>({
    onStart: (_event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { position: "absolute" }]}>
        <PinchGestureHandler onGestureEvent={onResize}>
          <AnimatedView>
            <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
              <AnimatedImage style={scaleStyles} source={stickerSource} resizeMode="contain" />
            </TapGestureHandler>
          </AnimatedView>
        </PinchGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
}
