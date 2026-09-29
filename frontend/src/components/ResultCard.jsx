import "./ResultCard.css"

function getLabel(score) {
  if (score >= 90) return "Excellent"
  if (score >= 75) return "Good"
  if (score >= 60) return "Average"
  return "Needs Improvement"
}

export default function ResultCard({ score }) {
  const label = getLabel(score)
  const pct = Math.round(score)
  const circumference = 2 * Math.PI * 44  // 276.46

  return (
    <div className="result-card">
      <div className="result-divider" />

      <div className="result-row">
        <div className="result-left">
          <p className="result-label">Predicted Score</p>
          <p className="result-score">{score}</p>
          <p className="result-outof">out of 100</p>
        </div>

        <div className="result-right">
          <svg className="ring-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" className="ring-track" />
            <circle cx="50" cy="50" r="44" className="ring-fill"
              strokeDasharray={`${(circumference * pct) / 100} ${circumference}`} />
          </svg>
          <span className="ring-pct">{pct}%</span>
        </div>
      </div>

      <div className="grade-row">
        <span className="grade-dot" />
        <span className="grade-text">{label}</span>
      </div>
    </div>
  )
}
