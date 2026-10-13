import './LoadingSpinner.css'

function LoadingSpinner({ message = 'Loading movies...' }) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <span className="loading-spinner-circle" aria-hidden="true" />
      <p>{message}</p>
    </div>
  )
}

export default LoadingSpinner
