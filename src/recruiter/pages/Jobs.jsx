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
  const BASE_URL = "https://agentic-v2-0.onrender.com"

  const [jdFile, setJdFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const [salary, setSalary] = useState([6, 10])

  const [form, setForm] = useState({
    companyName: "",
    companyDescription: "",
    role: "",
    location: "",
    experience: "",
    employmentType: "Full-time",
  })

 const experienceOptions = [
  { label: "Fresher (0–1 year)", value: 0 },
  { label: "Junior (1–3 years)", value: 2 },
  { label: "Mid-Level (3–5 years)", value: 4 },
  { label: "Senior (5–8 years)", value: 6 },
  { label: "Lead / Expert (8+ years)", value: 8 },
]

  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Internship",
    "Remote",
  ]

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const allFieldsFilled =
    jdFile &&
    Object.values(form).every(v => v !== "")

  const handleCreateJob = async () => {
    if (!allFieldsFilled) {
      alert("Please fill all fields and upload JD")
      return
    }

    setLoading(true)

    try {
      const fd = new FormData()

      // Company
      fd.append("company_name", form.companyName)
      fd.append("company_description", form.companyDescription)

      // Job
      fd.append("role", form.role)
      fd.append("location", form.location || "")
      fd.append(
        "salary",
        `₹${salary[0]} – ₹${salary[1]} LPA`
      )
      fd.append("employment_type", form.employmentType)
      fd.append(
        "required_experience",
        Number(form.experience)
      )

      // JD PDF
      fd.append("jd_pdf", jdFile)

      const res = await fetch(
        `${BASE_URL}/job/create-with-company`,
        {
          method: "POST",
          body: fd,
        }
      )

      // ✅ SUCCESS CONDITION (FIXED)
      if (res.status >= 200 && res.status < 300) {
        alert("✅ Job created successfully")

        // reset
        setForm({
          companyName: "",
          companyDescription: "",
          role: "",
          location: "",
          experience: "",
          employmentType: "Full-time",
        })
        setSalary([6, 10])
        setJdFile(null)
        return
      }

      // ❌ real failure
      throw new Error(`API failed: ${res.status}`)

    } catch (err) {
      console.error("Create Job Error:", err)
      alert("❌ Failed to create job")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5 max-w-3xl ml-6">

      <div>
        <h1 className="text-base font-semibold">
          Create Job
        </h1>
        <p className="text-xs text-slate-500">
          Company & Job in one step
        </p>
      </div>

      <div className="rounded-xl border bg-white shadow-sm">
        <div className="p-5 space-y-6">

          {/* JD Upload */}
          <div className="space-y-1.5">
            <Label className="text-xs">Job Description *</Label>

            <label className="flex justify-between items-center border border-dashed rounded-lg px-4 py-3 cursor-pointer">
              <div className="flex items-center gap-3">
                <Upload className="h-4 w-4 text-indigo-600" />
                <span className="text-sm truncate">
                  {jdFile ? jdFile.name : "Upload JD (PDF)"}
                </span>
              </div>
              <span className="text-xs text-indigo-600">
                Browse
              </span>
              <Input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={e => setJdFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <InputField
              label="Company Name"
              value={form.companyName}
              onChange={v => handleChange("companyName", v)}
            />

            <InputField
              label="Company Description"
              value={form.companyDescription}
              onChange={v => handleChange("companyDescription", v)}
            />

            <InputField
              label="Job Role"
              value={form.role}
              onChange={v => handleChange("role", v)}
            />

            <InputField
              label="Location"
              value={form.location}
              onChange={v => handleChange("location", v)}
            />

            <SelectField
              label="Experience"
              value={form.experience}
              options={experienceOptions}
              onChange={v => handleChange("experience", v)}
            />

            <SelectField
              label="Employment Type"
              value={form.employmentType}
              options={employmentTypes.map(t => ({
                label: t,
                value: t,
              }))}
              onChange={v => handleChange("employmentType", v)}
            />

            {/* Salary */}
            <div className="md:col-span-2 space-y-2">
              <Label className="text-xs">Salary (LPA)</Label>
              <Slider
                value={salary}
                onValueChange={setSalary}
                min={2}
                max={50}
                step={0.5}
              />
              <p className="text-xs">
                ₹{salary[0]} – ₹{salary[1]} LPA
              </p>
            </div>
          </div>

          <div className="flex justify-end border-t pt-4">
            <Button
              onClick={handleCreateJob}
              disabled={loading}
              className="flex gap-2"
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

/* --------- Reusable --------- */

function InputField({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label} *</Label>
      <Input
        className="h-9"
        value={value}
        onChange={e => onChange(e.target.value)}
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
            <SelectItem
              key={opt.value}
              value={String(opt.value)}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
