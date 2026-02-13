import { Upload, FileText, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function ResumeUploadModal({ open, onClose, jobId }) {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    email: "",
    linkedin: "",
    github: "",
    experience: "", // ✅ added
  })

  // Prevent background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => (document.body.style.overflow = "")
  }, [open])

  if (!open) return null

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!jobId) {
      alert("Job ID missing. Please try again.")
      return
    }

    if (
      !file ||
      !form.full_name ||
      !form.email ||
      !form.mobile ||
      form.experience === ""
    ) {
      alert("Please fill all required fields")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", form.full_name)
      formData.append("email", form.email)
      formData.append("mobile", form.mobile)
      formData.append("linkedin", form.linkedin)
      formData.append("github", form.github)
      formData.append("experience", Number(form.experience))
      formData.append("resume_pdf", file)

      console.log("Applying for jobId:", jobId)

      const res = await fetch(
        `${API_BASE_URL}/apply/${jobId}`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!res.ok) {
        throw new Error(`Apply failed: ${res.status}`)
      }

      alert("✅ Application submitted successfully")
      onClose()

    } catch (err) {
      console.error("Apply error:", err)
      alert("❌ Failed to submit application")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className="
          relative z-10
          w-[95vw] max-w-4xl
          max-h-[95vh]
          bg-white rounded-xl
          shadow-xl
          flex flex-col
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative border-b bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 px-4 sm:px-6 py-4">
          <h2 className="text-base sm:text-xl font-semibold text-gray-800">
            Submit Your Application
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Upload your resume and provide your professional details
          </p>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 h-10 w-10 sm:h-8 sm:w-8 rounded-full flex items-center justify-center bg-white/70"
          >
            <X className="h-5 w-5 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Resume Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Resume (PDF only) <span className="text-red-500">*</span>
            </Label>

            <Label
              htmlFor="resume"
              className="flex flex-col items-center justify-center rounded-xl border border-dashed p-8 sm:p-10 cursor-pointer"
            >
              <Upload className="h-6 w-6 mb-2 text-indigo-600" />
              <p className="text-sm font-medium">Drag & drop your resume</p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF only • Max 5MB
              </p>
            </Label>

            <Input
              id="resume"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files[0]
                if (f) {
                  setFile(f)
                  setFileName(f.name)
                }
              }}
            />

            {fileName && (
              <p className="text-sm text-indigo-600 text-center">
                Selected file: {fileName}
              </p>
            )}
          </div>

          {/* RIGHT: Candidate Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <FileText className="h-4 w-4" />
              Candidate Information
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={form.full_name}
                  onChange={(e) =>
                    handleChange("full_name", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Mobile Number *</Label>
                <Input
                  value={form.mobile}
                  onChange={(e) =>
                    handleChange("mobile", e.target.value)
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <Label>Email *</Label>
                <Input
                  value={form.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                />
              </div>

              {/* ✅ EXPERIENCE FIELD (added, same grid) */}
              <div>
                <Label>Experience (Years) *</Label>
                <Input
                  type="number"
                  min="0"
                  placeholder="e.g. 2"
                  value={form.experience}
                  onChange={(e) =>
                    handleChange("experience", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>LinkedIn</Label>
                <Input
                  value={form.linkedin}
                  onChange={(e) =>
                    handleChange("linkedin", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>GitHub</Label>
                <Input
                  value={form.github}
                  onChange={(e) =>
                    handleChange("github", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 bg-indigo-600 hover:bg-indigo-700"
              >
                {loading ? "Submitting..." : "Apply Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
