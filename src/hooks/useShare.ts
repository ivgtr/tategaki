import { useCallback, useState } from "react";

type SaredValue = string | null;

type ShareFn = (text: string) => Promise<boolean>;

const baseShareX = "http://twitter.com/share";

export function useShare(): [SaredValue, ShareFn] {
  const [sharedText, setSharedText] = useState<SaredValue>(null);

  const shareX: ShareFn = useCallback(async (text) => {
    const url = `${baseShareX}?url=&text=${encodeURIComponent(text)}`;
    try {
      window.open(url, "_blank");
      setSharedText(text);
      return true;
    } catch (error) {
      console.warn("Share failed", error);
      setSharedText(null);
      return false;
    }
  }, []);

  return [sharedText, shareX];
}
