import { useEffect, useState } from 'react'
import { getAvailableWatchProviders } from '../services/movieApi.js'
import './ProviderSelector.css'

function ProviderSelector({ mediaType, selectedProvider, onSelectProvider }) {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let active = true

    async function loadProviders() {
      setLoading(true)
      setError('')

      try {
        const data = await getAvailableWatchProviders(mediaType, 'SE')
        if (!data || !Array.isArray(data.results)) {
          throw new Error('Invalid streaming platform data.')
        }

        if (active) {
          setProviders([...data.results].sort(
            (first, second) => first.display_priority - second.display_priority
          ))
        }
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProviders()
    return () => { active = false }
  }, [mediaType, retryCount])

  const providerLimit = 11
  const selectedProviderItem = providers.find(
    provider => String(provider.provider_id) === selectedProvider
  )
  const visibleProviders = showAll
    ? providers
    : providers.slice(0, providerLimit)
  const displayedProviders = !showAll &&
    selectedProviderItem &&
    !visibleProviders.some(provider => provider.provider_id === selectedProviderItem.provider_id)
    ? [...visibleProviders, selectedProviderItem]
    : visibleProviders

  return (
    <section className="provider-selector" aria-labelledby="provider-selector-title">
      <div className="provider-selector-heading">
        <div>
          <p className="provider-selector-eyebrow">Sweden</p>
          <h2 id="provider-selector-title">Browse by streaming platform</h2>
        </div>
        {loading && <span role="status">Loading platforms…</span>}
      </div>

      {error ? (
        <div className="provider-selector-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setRetryCount(count => count + 1)}>
            Try again
          </button>
        </div>
      ) : (
        <div className="provider-list-scroll" role="group" aria-label="Streaming platforms in Sweden">
          <button
            className={`provider-option provider-option-all ${selectedProvider === '' ? 'provider-option-active' : ''}`}
            type="button"
            onClick={() => onSelectProvider('')}
            aria-pressed={selectedProvider === ''}
          >
            All Platforms
          </button>

          {displayedProviders.map(provider => (
            <button
              className={`provider-option ${selectedProvider === String(provider.provider_id) ? 'provider-option-active' : ''}`}
              type="button"
              key={provider.provider_id}
              onClick={() => onSelectProvider(String(provider.provider_id))}
              aria-pressed={selectedProvider === String(provider.provider_id)}
              title={provider.provider_name}
            >
              {provider.logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                  alt=""
                  loading="lazy"
                />
              )}
              <span>{provider.provider_name}</span>
            </button>
          ))}
        </div>
      )}

      {!error && providers.length > providerLimit && (
        <button
          className="provider-show-more"
          type="button"
          onClick={() => setShowAll(value => !value)}
          aria-expanded={showAll}
        >
          {showAll ? 'Show fewer platforms' : `Show all ${providers.length} platforms`}
        </button>
      )}
    </section>
  )
}

export default ProviderSelector
