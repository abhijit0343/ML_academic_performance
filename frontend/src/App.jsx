import { useState } from "react"
import PredictForm from "./components/PredictForm"
import ResultCard from "./components/ResultCard"
import "./App.css"

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(formData) {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setResult({ score: data.score })
      } else {
        setError("Prediction failed. Please try again.")
      }
    } catch {
      setError("Cannot reach the Flask server. Make sure it is running on port 5000.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <header className="header">
        <span className="header-tag">ML / Regression</span>
        <h1 className="title">Math Score Predictor</h1>
        <p className="subtitle">
          Enter student information to predict the expected math exam score using a trained regression model.
        </p>
      </header>

      <main className="card">
        <PredictForm onSubmit={handleSubmit} loading={loading} />
        {error && <div className="error-box">{error}</div>}
        {result && <ResultCard score={result.score} />}
      </main>
    </div>
  )
}
