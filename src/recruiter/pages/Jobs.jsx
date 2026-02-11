import { useState } from "react"
import { Upload, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function Jobs() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const [jdFile, setJdFile] = useState(null)
  const [loading, setLoading] = useState(false)

  // ✅ Correct salary slider state
  const [salary, setSalary] = useState([6, 10])

  const [form, setForm] = useState({
    companyName: "",
    jobTitle: "",
    location: "",
    experience: "",
    employmentType: "",
    department: "",
  })

  const experienceOptions = [
    "Fresher (0–1 yrs)",
    "1–3 yrs",
    "3–5 yrs",
    "5–8 yrs",
    "8+ yrs",
  ]

  const employmentTypes = [
    "Full Time",
    "Part Time",
    "Contract",
    "Internship",
    "Remote",
  ]

  const departments = [
    "Engineering",
    "Product",
    "Design",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
  ]

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const allFieldsFilled =
    jdFile &&
    Object.values(form).every(v => v.trim() !== "") &&
    salary.length === 2

  const handleCreateJob = async () => {
    if (!allFieldsFilled) {
      alert("Please fill all fields and upload JD")
      return
    }

    try {
      setLoading(true)

      // 1️⃣ Upload JD
      const fd = new FormData()
      fd.append("file", jdFile)

      await fetch(
        "https://agentic-hiring-prototype.onrender.com/api/v1/upload-jd",
        { method: "POST", body: fd }
      )

      // 2️⃣ Save Job
      await fetch(`${API_BASE_URL}/api/recruiter/job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recruiterId: 1, // temp
          companyName: form.companyName,
          jobTitle: form.jobTitle,
          location: form.location,
          experience: form.experience,
          employmentType: form.employmentType,
          department: form.department,
          salaryRange: `₹${salary[0]} – ₹${salary[1]} LPA`,
          jdFileName: jdFile.name,
        }),
      })

      alert("Job created successfully")

      setForm({
        companyName: "",
        jobTitle: "",
        location: "",
        experience: "",
        employmentType: "",
        department: "",
      })
      setSalary([6, 10])
      setJdFile(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5 max-w-3xl ml-6">

      {/* HEADER */}
      <div>
        <h1 className="text-base font-semibold text-slate-900">
          Create Job
        </h1>
        <p className="text-xs text-slate-500">
          Upload JD and job details
        </p>
      </div>

      {/* FORM CARD */}
      <div className="rounded-xl border border-slate-300 bg-white shadow-sm">
        <div className="p-5 space-y-6">

          {/* ✅ JD UPLOAD — FIXED */}
          <div className="space-y-1.5">
            <Label htmlFor="jd-upload" className="text-xs font-medium">
              Job Description *
            </Label>

            <label
              htmlFor="jd-upload"
              className="flex items-center justify-between gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 cursor-pointer hover:border-indigo-500 transition"
            >
              <div className="flex items-center gap-3 pointer-events-none">
                <Upload className="h-4 w-4 text-indigo-600" />
                <p className="text-sm truncate">
                  {jdFile ? jdFile.name : "Upload JD (PDF, max 5MB)"}
                </p>
              </div>

              <span className="text-xs font-medium text-indigo-600 pointer-events-none">
                Browse
              </span>
            </label>

            <Input
              id="jd-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setJdFile(e.target.files[0])}
            />
          </div>

          {/* JOB INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <InputField
              label="Company Name"
              placeholder="e.g. Acme Technologies"
              value={form.companyName}
              onChange={(v) => handleChange("companyName", v)}
            />

            <InputField
              label="Job Title"
              placeholder="e.g. Frontend Developer"
              value={form.jobTitle}
              onChange={(v) => handleChange("jobTitle", v)}
            />

            <InputField
              label="Location"
              placeholder="e.g. Chennai / Remote"
              value={form.location}
              onChange={(v) => handleChange("location", v)}
            />

            <SelectField
              label="Experience"
              value={form.experience}
              options={experienceOptions}
              onChange={(v) => handleChange("experience", v)}
            />

            <SelectField
              label="Employment"
              value={form.employmentType}
              options={employmentTypes}
              onChange={(v) => handleChange("employmentType", v)}
            />

            <SelectField
              label="Department"
              value={form.department}
              options={departments}
              onChange={(v) => handleChange("department", v)}
            />

            {/* ✅ SALARY SLIDER — CORRECTED */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex justify-between">
                <Label className="text-xs">Salary Range (LPA) *</Label>
                <span className="text-xs font-semibold text-slate-700">
                  ₹{salary[0]} – ₹{salary[1]} LPA
                </span>
              </div>

              <Slider
                value={salary}
                onValueChange={(value) => {
                  if (value[0] <= value[1]) setSalary(value)
                }}
                min={2}
                max={50}
                step={0.5}
                minStepsBetweenThumbs={1}
              />

              <div className="flex justify-between text-[11px] text-slate-500">
                <span>₹2</span>
                <span>₹10</span>
                <span>₹20</span>
                <span>₹30</span>
                <span>₹40</span>
                <span>₹50</span>
              </div>
            </div>
          </div>

          {/* ACTION */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={handleCreateJob}
              disabled={loading || !allFieldsFilled}
              className="h-9 px-6 text-sm rounded-lg flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {loading ? "Creating..." : "Create Job"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ---------------- Reusable Fields ---------------- */

function InputField({ label, value, onChange, placeholder }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label} *</Label>
      <Input
        className="h-9"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function SelectField({ label, value, options, onChange }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label} *</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-9">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
