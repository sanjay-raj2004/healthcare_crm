from sqlalchemy import text

from database import engine

with engine.begin() as conn:
    result = conn.execute(
        text("DELETE FROM patients WHERE patient_name = 'Test Patient One'")
    )
    print(f"Deleted {result.rowcount} test record(s)")