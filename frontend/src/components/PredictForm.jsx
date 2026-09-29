import { useState } from "react"
import "./PredictForm.css"

const GENDERS   = [["male","Male"],["female","Female"]]
const GROUPS    = ["group A","group B","group C","group D","group E"]
const EDUCATION = [
  ["some high school","Some High School"],
  ["high school","High School"],
  ["some college","Some College"],
  ["associate''s degree","Associate''s Degree"],
  ["bachelor''s degree","Bachelor''s Degree"],
  ["master''s degree","Master''s Degree"],
]
const LUNCH   = [["standard","Standard"],["free/reduced","Free / Reduced"]]
const COURSES = [["completed","Completed"],["none","Not Completed"]]

export default function PredictForm({ onSubmit, loading }) {
  const [reading, setReading] = useState(50)
  const [writing, setWriting] = useState(50)

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(new FormData(e.target))
  }

  return (
    <form onSubmit={handleSubmit} className="form">

      <div className="section-label">Student Profile</div>
      <div className="grid">

        <div className="field">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" required defaultValue="">
            <option value="" disabled>Select</option>
            {GENDERS.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <div className="field">
          <label htmlFor="ethnicity">Race / Ethnicity</label>
          <select id="ethnicity" name="ethnicity" required defaultValue="">
            <option value="" disabled>Select</option>
            {GROUPS.map(g => <option key={g} value={g}>{g.charAt(0).toUpperCase()+g.slice(1)}</option>)}
          </select>
        </div>

        <div className="field full">
          <label htmlFor="parental_level_of_education">Parental Level of Education</label>
          <select id="parental_level_of_education" name="parental_level_of_education" required defaultValue="">
            <option value="" disabled>Select</option>
            {EDUCATION.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <div className="field">
          <label htmlFor="lunch">Lunch Type</label>
          <select id="lunch" name="lunch" required defaultValue="">
            <option value="" disabled>Select</option>
            {LUNCH.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <div className="field">
          <label htmlFor="test_preparation_course">Test Prep Course</label>
          <select id="test_preparation_course" name="test_preparation_course" required defaultValue="">
            <option value="" disabled>Select</option>
            {COURSES.map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

      </div>

      <div className="divider" />

      <div className="section-label">Other Subject Scores</div>
      <div className="sliders">

        <div className="slider-field">
          <div className="slider-header">
            <span className="slider-name">Reading Score</span>
            <span className="slider-val">{reading}</span>
          </div>
          <input type="range" id="reading_score" name="reading_score"
            min="0" max="100" value={reading}
            onChange={e => setReading(Number(e.target.value))}
            style={{"--pct":`${reading}%`}} />
          <div className="slider-ticks"><span>0</span><span>50</span><span>100</span></div>
        </div>

        <div className="slider-field">
          <div className="slider-header">
            <span className="slider-name">Writing Score</span>
            <span className="slider-val">{writing}</span>
          </div>
          <input type="range" id="writing_score" name="writing_score"
            min="0" max="100" value={writing}
            onChange={e => setWriting(Number(e.target.value))}
            style={{"--pct":`${writing}%`}} />
          <div className="slider-ticks"><span>0</span><span>50</span><span>100</span></div>
        </div>

      </div>

      <button type="submit" className={`btn${loading?" loading":""}`} disabled={loading}>
        {loading ? <span className="spinner" /> : "Run Prediction"}
      </button>

    </form>
  )
}
