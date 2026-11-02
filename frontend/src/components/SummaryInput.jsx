import { useEffect, useRef, useState } from "react";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const ERROR_TEXT = {
  "not-allowed": "Microphone access is blocked. Click the lock icon in the address bar and allow the microphone.",
  "service-not-allowed": "Microphone access is blocked. Click the lock icon in the address bar and allow the microphone.",
  "no-speech": "No speech was heard. Click the mic and try again.",
  "audio-capture": "No microphone was found. Check that one is connected.",
  network: "Speech recognition needs an internet connection.",
};

function SummaryInput({ summary, onChange, onProcess, processing }) {
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const recognitionRef = useRef(null);
  const baseTextRef = useRef("");

  // Stop the microphone if the component is removed
  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
    };
  }, []);

  function startListening() {
    if (!SpeechRecognition) {
      setVoiceError("Voice input is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    setVoiceError("");
    baseTextRef.current = summary.trim();

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let spoken = "";
      for (let i = 0; i < event.results.length; i++) {
        spoken += event.results[i][0].transcript;
      }
      const base = baseTextRef.current;
      onChange(base ? `${base} ${spoken.trim()}` : spoken.trim());
    };

    recognition.onerror = (event) => {
      setVoiceError(ERROR_TEXT[event.error] || `Voice error: ${event.error}`);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  function stopListening() {
    if (recognitionRef.current) recognitionRef.current.stop();
    setListening(false);
  }

  return (
    <section className="card" id="summary">
      <h2>Patient Summary</h2>
      <p className="hint">
        Click the microphone and speak the visit details, or type them. Use
        fictional patients only.
      </p>

      <textarea
        rows="5"
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Click 'Start Speaking' and say: Today patient Neha Har, age 19, visited the hospital. She was diagnosed with fever and headache. The doctor prescribed medication and advised her to take rest."
      />

      {voiceError && <p className="msg msg-error">{voiceError}</p>}

      <div className="btn-row">
        <button
          className={`btn btn-mic ${listening ? "listening" : ""}`}
          onClick={listening ? stopListening : startListening}
          disabled={processing}
        >
          {listening ? "⏹ Stop Speaking" : "🎤 Start Speaking"}
        </button>

        <button
          className="btn btn-primary"
          onClick={onProcess}
          disabled={processing || listening}
        >
          {processing ? "Processing..." : "Process with AI"}
        </button>
      </div>

      {listening && <p className="hint">Listening... speak now.</p>}
    </section>
  );
}

export default SummaryInput;