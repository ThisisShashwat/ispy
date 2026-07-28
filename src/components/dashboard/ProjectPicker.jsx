'use client'

import { useMemo, useState } from 'react'

const TOP_N = 10

function formatHours(totalSeconds) {
  return (totalSeconds / 3600).toFixed(1)
}

export default function ProjectPicker({ projects, selectedProjects, onSelect }) {
  const [query, setQuery] = useState('')

  const sortedProjects = useMemo(
    () => [...(projects ?? [])].sort((a, b) => b.total_seconds - a.total_seconds),
    [projects],
  )

  const visibleProjects = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return sortedProjects.slice(0, TOP_N)
    return sortedProjects.filter((project) => project.name.toLowerCase().includes(trimmed))
  }, [sortedProjects, query])

  if (!projects || projects.length === 0) {
    return (
      <div className="border border-outline-variant border-dashed px-4 py-6 text-center">
        <p className="font-mono text-sm text-on-surface-variant">
          No Hackatime projects found for your account yet. Log some time on a project
          in Hackatime, then come back here to submit it.
        </p>
      </div>
    )
  }

  return (
    <div>
      {projects.length > TOP_N && (
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search all ${projects.length} projects…`}
          className="w-full border border-outline-variant bg-surface-container-low px-3 py-2 text-sm text-on-background mb-3 focus:outline-none focus:border-primary-container"
        />
      )}

      {!query.trim() && projects.length > TOP_N && (
        <p className="font-mono text-[10px] tracking-widest text-on-surface-variant uppercase mb-3">
          Showing top {TOP_N} by tracked hours — search to find others
        </p>
      )}

      {visibleProjects.length === 0 ? (
        <p className="font-mono text-sm text-on-surface-variant">
          No projects match "{query}".
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {visibleProjects.map((project) => {
            const selected = selectedProjects.some((p) => p.name === project.name)
            return (
              <button
                key={project.name}
                type="button"
                onClick={() => onSelect(project)}
                className={`text-left border px-4 py-3 transition-colors ${
                  selected
                    ? 'border-primary-container bg-surface-container-high'
                    : 'border-outline bg-surface-container-low hover:border-primary-container'
                }`}
              >
                <p className="font-mono uppercase tracking-widest text-sm text-on-background font-bold">
                  {project.name}
                </p>
                <p className="text-on-surface-variant text-sm mt-1">
                  {formatHours(project.total_seconds)} hrs
                  {project.languages?.length ? ` · ${project.languages.join(', ')}` : ''}
                </p>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
