import { Upload, FileText, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResumeUploadModal({ open, onClose }) {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    email: "",
    linkedin: "",
    github: "",
  })

  // Prevent background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => (document.body.style.overflow = "")
  }, [open])

  if (!open) return null

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    if (!file || !form.full_name || !form.email || !form.mobile) {
      alert("Please fill all required fields and upload resume")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("full_name", form.full_name)
      formData.append("mobile", form.mobile)
      formData.append("email", form.email)
      formData.append("linkedin", form.linkedin)
      formData.append("github", form.github)

      const response = await fetch(
        "http://localhost:5000/api/upload-and-store",
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      alert("Application submitted successfully 🎉")
      onClose()

      // Reset form
      setFile(null)
      setFileName(null)
      setForm({
        full_name: "",
        mobile: "",
        email: "",
        linkedin: "",
        github: "",
      })

    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again.")
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
        <div
          className="
            relative border-b
            bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50
            px-4 sm:px-6 py-4
          "
        >
          <h2 className="text-base sm:text-xl font-semibold text-gray-800">
            Submit Your Application
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Upload your resume and provide your professional details
          </p>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="
              absolute top-3 right-3
              h-10 w-10 sm:h-8 sm:w-8
              rounded-full
              flex items-center justify-center
              bg-white/70 backdrop-blur
              text-gray-600
              hover:bg-gray-200
              active:bg-gray-300
            "
          >
            <X className="h-5 w-5 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Body */}
        <div
          className="
            flex-1 overflow-y-auto
            px-4 sm:px-6 py-6
            grid grid-cols-1 lg:grid-cols-2 gap-6
          "
        >
          {/* LEFT: Resume Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Resume (PDF only) <span className="text-red-500">*</span>
            </Label>

            <Label
              htmlFor="resume"
              className="
                flex flex-col items-center justify-center
                rounded-xl border border-dashed
                bg-gradient-to-br from-gray-50 to-slate-50
                p-8 sm:p-10
                text-center cursor-pointer
                hover:border-indigo-400 transition
              "
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Upload className="h-6 w-6 text-indigo-600" />
              </div>

              <p className="text-sm font-medium text-gray-800">
                Drag & drop your resume
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                PDF only • Max 5MB
              </p>
            </Label>

            <Input
              id="resume"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files[0]
                if (selectedFile) {
                  setFile(selectedFile)
                  setFileName(selectedFile.name)
                }
              }}
            />

            {fileName && (
              <p className="text-sm font-medium text-indigo-600 break-all text-center">
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
                  placeholder="John Doe"
                  value={form.full_name}
                  onChange={(e) =>
                    handleChange("full_name", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Mobile Number *</Label>
                <Input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.mobile}
                  onChange={(e) =>
                    handleChange("mobile", e.target.value)
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>LinkedIn</Label>
                <Input
                  placeholder="linkedin.com/in/username"
                  value={form.linkedin}
                  onChange={(e) =>
                    handleChange("linkedin", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>GitHub</Label>
                <Input
                  placeholder="github.com/username"
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
