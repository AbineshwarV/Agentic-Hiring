import { useEffect, useState } from "react"
import {
    ShieldAlert,
    CheckCircle,
    AlertTriangle,
} from "lucide-react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function FraudDetection() {
    const [candidates, setCandidates] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API_BASE_URL}/candidate/master/all`)
            .then(res => res.json())
            .then(data => {
                setCandidates(data.candidates || [])
                setLoading(false)
            })
            .catch(err => {
                console.error("Fraud fetch error:", err)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="p-6 text-muted-foreground">
                Loading fraud data…
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <ShieldAlert className="h-7 w-7 text-orange-500" />
                <h1 className="text-2xl font-bold">
                    Fraud Detection
                </h1>
            </div>

            <p className="text-muted-foreground max-w-3xl">
                Automated fraud analysis based on resume similarity and review signals.
            </p>

            {/* Table */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-[1000px] w-full text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 text-left w-[180px]">Candidate</th>
                                <th className="px-4 py-3 text-left w-[240px]">Email</th>
                                <th className="px-4 py-3 text-center w-[140px]">Similarity (%)</th>
                                <th className="px-4 py-3 text-center w-[140px]">Risk Level</th>
                                <th className="px-4 py-3 text-center w-[160px]">Review Needed</th>
                                <th className="px-4 py-3 text-center w-[180px]">Fraud Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {candidates.map(candidate => {
                                const profile = candidate.candidate_profile

                                const fraudDetection =
                                    candidate.applications?.[0]?.fraud_detection

                                const fraudDetails = fraudDetection?.fraud_details

                                const similarity =
                                    fraudDetection?.similarity_index ?? 0

                                const riskLevel =
                                    fraudDetails?.overall_risk || "low"

                                const needsReview =
                                    fraudDetails?.requires_review || false

                                const fraudFlag =
                                    fraudDetails?.fraud_flag || false

                                return (
                                    <tr
                                        key={profile.candidate_id}
                                        className="border-t hover:bg-muted/50 transition"
                                    >
                                        <td className="px-4 py-3 font-medium">
                                            {profile.name}
                                        </td>

                                        <td className="px-4 py-3 text-muted-foreground">
                                            {profile.email}
                                        </td>

                                        <td className="px-4 py-3 text-center font-semibold">
                                            {(similarity * 100).toFixed(1)}%
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            <RiskBadge level={riskLevel} />
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {needsReview ? (
                                                <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                                                    Yes
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                                                    No
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {fraudFlag ? (
                                                <StatusBadge
                                                    icon={AlertTriangle}
                                                    text="Fraud Detected"
                                                    color="text-red-600"
                                                />
                                            ) : (
                                                <StatusBadge
                                                    icon={CheckCircle}
                                                    text="Clean"
                                                    color="text-green-600"
                                                />
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}

                            {candidates.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        No fraud data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

/* -------------------- */
/* Helper Components    */
/* -------------------- */

function RiskBadge({ level }) {
    const styles = {
        low: "bg-green-100 text-green-700",
        medium: "bg-yellow-100 text-yellow-700",
        high: "bg-red-100 text-red-700",
    }

    return (
        <span
            className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                styles[level] || styles.low
            }`}
        >
            {level}
        </span>
    )
}

function StatusBadge({ icon: Icon, text, color }) {
    return (
        <div className={`flex items-center justify-center gap-1 font-medium ${color}`}>
            <Icon className="h-4 w-4" />
            {text}
        </div>
    )
}
