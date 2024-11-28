import {
  Context,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";

export function useStrictContext<T>(context: Context<T | null>) {
  const value = useContext(context);

  if (value === null) throw new Error("Strict context not passed");
  return value as T;
}

export function createStrictContext<T>() {
  return createContext<T | null>(null);
}

export function useAppearanceDelay(
  show?: boolean,
  options = {} as {
    defaultValue?: boolean;
    appearanceDelay?: number;
    minDisplay?: number;
  },
) {
  const {
    minDisplay = 500,
    defaultValue = false,
    appearanceDelay = 500,
  } = options;

  const [delayShow, setDelayShow] = useState(defaultValue);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        startTransition(() => setDelayShow(true));
      }, appearanceDelay);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        startTransition(() => setDelayShow(true));
      }, minDisplay);

      return () => clearTimeout(timer);
    }
  }, [appearanceDelay, minDisplay, show]);

  return delayShow;
}
