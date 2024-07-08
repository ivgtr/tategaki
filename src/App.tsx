import { useMemo, useState } from "react";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import {
  Center,
  Text,
  Heading,
  Container,
  Button,
  Textarea,
  VStack,
  useNotice,
} from "@yamada-ui/react";

function App() {
  const [, copy] = useCopyToClipboard();
  const notice = useNotice();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        notice({ title: "コピーしました", status: "success" });
      })
      .catch(() => {
        notice({ title: "コピーに失敗しました", status: "error" });
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
    <Container>
      <VStack>
        <Heading as="h1">
          <Center>
            <i
              style={{
                color: "#C91333",
                fontSize: "1.5rem",
                marginRight: "0.5rem",
              }}
            >
              ■
            </i>
            縦書きするやつ
          </Center>
        </Heading>
        <Heading as="h2">
          <Center>入力</Center>
        </Heading>
        <Textarea
          autosize
          minRows={4}
          defaultValue={rawText}
          onChange={(e) => setRawText(e.target.value)}
        ></Textarea>
      </VStack>

      <VStack>
        <Heading as="h2">
          <Center>
            <Text
              as="pre"
              style={{
                fontFamily: "sans-serif",
              }}
            >{`結
果`}</Text>
          </Center>
        </Heading>
        <Center>
          <Text
            as="pre"
            style={{
              fontFamily: "sans-serif",
            }}
          >
            {rotatedText}
          </Text>
        </Center>
        <Center>
          <Button onClick={handleCopy(rotatedText)}>コピー</Button>
        </Center>
      </VStack>
    </Container>
  );
}

export default App;
