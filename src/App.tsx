import { useMemo, useState } from "react";
import "./App.css";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";

function App() {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        alert("コピーしました");
      })
      .catch(() => {
        alert("コピーに失敗しました");
      });
  };

  const [rawText, setRawText] = useState(`丸亀製麺は

全ての店で

池の水から作る

そう

しなければ

こんなにも

すぐに

作れない

うどんで

あなたを

驚かせたい`);

  // テキストを2次元配列に変換
  const textArray = useMemo(() => {
    let maxLineLength = 0;
    const lines = rawText.split("\n");
    const textArray = lines.map((line) => {
      maxLineLength = Math.max(maxLineLength, line.length);
      return line.split("");
    });
    return textArray.map((line) => {
      const padding = maxLineLength - line.length;
      return [...line, ...Array(padding).fill("　")];
    });
  }, [rawText]);

  // 縦書きに回転
  const rotatedTextArray = useMemo(() => {
    const rotatedText = [];
    for (let i = 0; i < textArray[0].length; i++) {
      const line = [];
      for (let j = textArray.length - 1; j >= 0; j--) {
        line.push(textArray[j][i]);
      }
      rotatedText.push(line);
    }
    return rotatedText;
  }, [textArray]);

  // 2次元配列をテキストに変換
  const rotatedText = useMemo(() => {
    return rotatedTextArray.map((line) => line.join("")).join("\n");
  }, [rotatedTextArray]);

  return (
    <>
      <h1>縦書きするやつ</h1>
      <h2
        style={{
          fontFamily: "sans-serif",
          fontSize: "24px",
        }}
      >
        入力
      </h2>
      <textarea
        defaultValue={rawText}
        onChange={(e) => setRawText(e.target.value)}
        style={{ width: "400px", height: "200px" }}
      />

      <h2>
        <pre
          style={{
            fontFamily: "sans-serif",
            fontSize: "24px",
          }}
        >{`結
果`}</pre>
      </h2>
      <pre
        style={{
          fontFamily: "sans-serif",
          fontSize: "16px",
        }}
      >
        {rotatedText}
      </pre>
      <button onClick={handleCopy(rotatedText)}>コピー</button>
    </>
  );
}

export default App;
