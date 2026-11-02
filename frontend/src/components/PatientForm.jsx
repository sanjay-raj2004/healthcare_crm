function PatientForm({ form, onChange, onSave, saving }) {
  const handle = (e) => onChange(e.target.name, e.target.value);

  return (
    <section className="card">
      <h2>Patient Details</h2>
      <p className="hint">Review and edit the extracted information before saving.</p>

      <div className="grid">
        <label>
          Patient Name
          <input name="patient_name" value={form.patient_name} onChange={handle} />
        </label>

        <label>
          Patient Age
          <input
            name="age"
            type="number"
            min="0"
            max="120"
            value={form.age}
            onChange={handle}
          />
        </label>

        <label>
          Visit Date
          <input
            name="visit_date"
            type="date"
            value={form.visit_date}
            onChange={handle}
          />
        </label>

        <label>
          Diagnosis
          <input name="diagnosis" value={form.diagnosis} onChange={handle} />
        </label>

        <label>
          Symptoms
          <input name="symptoms" value={form.symptoms} onChange={handle} />
        </label>

        <label>
          Medication
          <input name="medication" value={form.medication} onChange={handle} />
        </label>

        <label className="full">
          Doctor's Advice
          <textarea
            name="doctors_advice"
            rows="3"
            value={form.doctors_advice}
            onChange={handle}
          />
        </label>
      </div>

      <button className="btn btn-success" onClick={onSave} disabled={saving}>
        {saving ? "Saving..." : "Save Patient"}
      </button>
    </section>
  );
}

export default PatientForm;