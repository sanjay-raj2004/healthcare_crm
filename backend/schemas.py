from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class SummaryRequest(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    summary: str = Field(..., min_length=1, max_length=5000)


class ExtractedPatient(BaseModel):
    patient_name: Optional[str] = None
    age: Optional[int] = None
    visit_date: Optional[date] = None
    diagnosis: Optional[str] = None
    symptoms: Optional[str] = None
    medication: Optional[str] = None
    doctors_advice: Optional[str] = None


class PatientCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    patient_name: str = Field(..., min_length=1, max_length=100)
    age: Optional[int] = Field(None, ge=0, le=120)
    visit_date: Optional[date] = None
    diagnosis: Optional[str] = Field(None, max_length=2000)
    symptoms: Optional[str] = Field(None, max_length=2000)
    medication: Optional[str] = Field(None, max_length=2000)
    doctors_advice: Optional[str] = Field(None, max_length=2000)


class PatientOut(PatientCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime