import React, { useEffect } from "react";
import useVoiceCommand from "../hooks/useVoiceCommand";

export default function VoiceRecorder({ onResult }) {
  const command = useVoiceCommand();

  useEffect(() => {
    if (command) {
      onResult(command);
    }
  }, [command, onResult]);

  return (
    <p className="text-sm text-gray-500">
      🎤 Speak "YES" or "NO"
    </p>
  );
}
