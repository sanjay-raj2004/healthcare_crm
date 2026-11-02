import { useEffect, useState } from "react";
import Header from "./components/Header";
import SummaryInput from "./components/SummaryInput";
import PatientForm from "./components/PatientForm";
import PatientRecords from "./components/PatientRecords";
import { processSummary, savePatient, getPatients } from "./api";

const EMPTY_FORM = {
  patient_name: "",
  age: "",
  visit_date: "",
  diagnosis: "",
  symptoms: "",
  medication: "",
  doctors_advice: "",
};

// Convert whatever the backend returns (null, string, list) into a form string
function toText(value) {
  if (value === null || value === undefined) return "";
  if (Array.isArray(value)) return value.join(", ");
  return String(value);
}

function App() {
  const [summary, setSummary] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [patients, setPatients] = useState([]);
  const [recordsError, setRecordsError] = useState("");
  const [message, setMessage] = useState(null); // { type: "success" | "error", text }
  const [processing, setProcessing] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadPatients() {
    try {
      const data = await getPatients();
      setPatients(data);
      setRecordsError("");
    } catch (err) {
      setRecordsError(err.message);
    }
  }

  useEffect(() => {
    loadPatients();
  }, []);

  function handleFieldChange(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleProcess() {
    if (!summary.trim()) {
      setMessage({ type: "error", text: "Please enter a patient summary first." });
      return;
    }
    setProcessing(true);
    setMessage(null);
    try {
      const data = await processSummary(summary);
      setForm({
        patient_name: toText(data.patient_name),
        age: toText(data.age),
        visit_date: toText(data.visit_date),
        diagnosis: toText(data.diagnosis),
        symptoms: toText(data.symptoms),
        medication: toText(data.medication),
        doctors_advice: toText(data.doctors_advice),
      });
      setMessage({
        type: "success",
        text: "Details extracted. Please review and edit before saving.",
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setProcessing(false);
    }
  }

  async function handleSave() {
    if (!form.patient_name.trim()) {
      setMessage({ type: "error", text: "Patient name is required." });
      return;
    }
    if (form.age !== "" && (Number(form.age) < 0 || Number(form.age) > 120)) {
      setMessage({ type: "error", text: "Age must be between 0 and 120." });
      return;
    }

    const payload = {
      patient_name: form.patient_name.trim(),
      age: form.age === "" ? null : Number(form.age),
      visit_date: form.visit_date || null,
      diagnosis: form.diagnosis.trim() || null,
      symptoms: form.symptoms.trim() || null,
      medication: form.medication.trim() || null,
      doctors_advice: form.doctors_advice.trim() || null,
    };

    setSaving(true);
    setMessage(null);
    try {
      await savePatient(payload);
      setMessage({ type: "success", text: "Patient saved successfully!" });
      setForm(EMPTY_FORM);
      setSummary("");
      await loadPatients();
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="container">
        {message && (
          <p className={`msg msg-${message.type}`}>{message.text}</p>
        )}
        <SummaryInput
          summary={summary}
          onChange={setSummary}
          onProcess={handleProcess}
          processing={processing}
        />
        <PatientForm
          form={form}
          onChange={handleFieldChange}
          onSave={handleSave}
          saving={saving}
        />
        <PatientRecords patients={patients} error={recordsError} />
      </main>
    </div>
  );
}

export default App;