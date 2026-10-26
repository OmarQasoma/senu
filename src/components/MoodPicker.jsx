import { moods } from './moods.js'
import './MoodPicker.css'

export default function MoodPicker({ selectedMood, onSelectMood }) {
  return (
    <section className="mood-picker" aria-labelledby="mood-title" id="moods">
      <div className="section-heading mood-heading">
        <div>
          <span className="section-eyebrow">Less scrolling. More watching.</span>
          <h2 id="mood-title">What’s your mood tonight?</h2>
        </div>
        <p>A feeling is a good place to start.</p>
      </div>
      <div className="mood-options">
        {moods.map(mood => (
          <button key={mood.id} type="button" className={`mood-option mood-${mood.color} ${selectedMood === mood.id ? 'mood-option-active' : ''}`} aria-pressed={selectedMood === mood.id} onClick={() => onSelectMood(selectedMood === mood.id ? '' : mood.id)}>
            <span className="mood-icon" aria-hidden="true">{mood.icon}</span>
            <span className="mood-name">{mood.name}</span>
            <span className="mood-description">{mood.description}</span>
            <span className="mood-indicator" aria-hidden="true">{selectedMood === mood.id ? '✓' : '↗'}</span>
          </button>
        ))}
      </div>
      <p className="mood-hint">Picks based on genres that match your mood.</p>
    </section>
  )
}
