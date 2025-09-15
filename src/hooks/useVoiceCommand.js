import { useEffect, useState } from "react";

export default function useVoiceCommand() {
  const [command, setCommand] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toUpperCase();

      if (transcript.includes("YES")) {
        setCommand("YES");
      } else if (transcript.includes("NO")) {
        setCommand("NO");
      }
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
    };

    recognition.onend = () => {
      recognition.start(); // restart automatically
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  return command;
}
