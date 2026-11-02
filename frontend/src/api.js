const API_BASE = "http://localhost:8000";

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (err) {
    throw new Error("Cannot reach the backend server. Is it running on port 8000?");
  }

  if (!response.ok) {
    let detail = `Request failed (${response.status})`;
    try {
      const data = await response.json();
      if (typeof data.detail === "string") detail = data.detail;
    } catch (e) {
      // ignore JSON parse errors
    }
    throw new Error(detail);
  }
  return response.json();
}

export function processSummary(summary) {
  return request("/api/process-summary", {
    method: "POST",
    body: JSON.stringify({ summary }),
  });
}

export function savePatient(patient) {
  return request("/api/patients", {
    method: "POST",
    body: JSON.stringify(patient),
  });
}

export function getPatients() {
  return request("/api/patients");
}