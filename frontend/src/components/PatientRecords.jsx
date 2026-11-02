function PatientRecords({ patients, error }) {
  return (
    <section className="card" id="records">
      <h2>Patient Records</h2>

      {error && <p className="msg msg-error">{error}</p>}

      {!error && patients.length === 0 && (
        <p className="hint">No patient records saved yet.</p>
      )}

      <div className="records">
        {patients.map((p) => (
          <article className="record" key={p.id}>
            <h3>{p.patient_name}</h3>
            <p><strong>Age:</strong> {p.age ?? "-"}</p>
            <p><strong>Visit Date:</strong> {p.visit_date ?? "-"}</p>
            <p><strong>Diagnosis:</strong> {p.diagnosis ?? "-"}</p>
            <p><strong>Symptoms:</strong> {p.symptoms ?? "-"}</p>
            <p><strong>Medication:</strong> {p.medication ?? "-"}</p>
            <p><strong>Doctor's Advice:</strong> {p.doctors_advice ?? "-"}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PatientRecords;