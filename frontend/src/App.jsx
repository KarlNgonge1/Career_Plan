import { useState } from "react"
import { CHARACTERS } from "./data/characters"
import CharacterCard from "./components/CharacterCard"

const API_URL = "http://localhost:8000"

const EXERCISE_NAMES = {
  "pushup": "Push-ups",
  "ohp-db": "DB Shoulder Press",
  "bench": "Bench Press",
  "row": "DB Row",
  "pullup": "Pull-ups",
  "squat-bw": "Bodyweight Squat",
  "goblet": "Goblet Squat",
  "backsquat": "Back Squat",
  "plank": "Plank",
  "hkr": "Hanging Knee Raise",
}

export default function App() {
  const [characterId, setCharacterId] = useState("goku")
  const [days, setDays] = useState(3)
  const [level, setLevel] = useState("beginner")
  const [goal, setGoal] = useState("hypertrophy")
  const [equipment, setEquipment] = useState("bodyweight")
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function generate() {
    setLoading(true)
    setError("")
    setPlan(null)
    try {
      const resp = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character_id: characterId,
          days_per_week: Number(days),
          level,
          goal,
          equipment,
        }),
      })
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      const data = await resp.json()
      setPlan(data)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg text-text relative overflow-x-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-10 border-b border-white/10 bg-[rgba(10,10,10,0.6)] backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            <span className="text-text">Find Your </span>
            <span className="text-accent drop-shadow-[0_0_8px_rgba(229,9,20,0.6)]">Anime Physique</span>
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Two-column layout */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* LEFT: Characters + Controls */}
          <div className="space-y-6">
            {/* Panel: character selection */}
            <div className="rounded-2xl border border-white/10 bg-[rgba(20,20,20,0.6)] backdrop-blur-md p-5 shadow-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Choose your character</h2>
              <div className="grid grid-cols-2 gap-5">
                {CHARACTERS.map(c => (
                  <CharacterCard
                    key={c.id}
                    character={c}
                    selected={characterId === c.id}
                    onSelect={setCharacterId}
                  />
                ))}
              </div>
            </div>

            {/* Panel: controls */}
            <div className="rounded-2xl border border-white/10 bg-[rgba(20,20,20,0.6)] backdrop-blur-md p-5 shadow-lg">
              <h3 className="font-semibold mb-4">Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-subtle">Days per week</span>
                  <input
                    className="mt-1 w-full bg-surface border border-red-700/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    type="number"
                    min="1"
                    max="6"
                    value={days}
                    onChange={e => setDays(e.target.value)}
                  />
                </label>

                <label className="block">
                  <span className="text-sm text-subtle">Level</span>
                  <select
                    className="mt-1 w-full bg-surface border border-red-700/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm text-subtle">Goal</span>
                  <select
                    className="mt-1 w-full bg-surface border border-red-700/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    value={goal}
                    onChange={e => setGoal(e.target.value)}
                  >
                    <option>Strength</option>
                    <option>Hypertrophy</option>
                    <option>Athletic</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm text-subtle">Equipment</span>
                  <select
                    className="mt-1 w-full bg-surface border border-red-700/40 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-accent"
                    value={equipment}
                    onChange={e => setEquipment(e.target.value)}
                  >
                    <option>Bodyweight</option>
                    <option>Dumbbells</option>
                    <option>Gym</option>
                  </select>
                </label>
              </div>

              <div className="mt-5">
                <button
                  onClick={generate}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-lg bg-accent hover:bg-red-600 text-white font-semibold shadow-md hover:shadow-red-700/30 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="animate-spin inline-block h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full" />
                      Generating…
                    </span>
                  ) : (
                    "Generate Plan"
                  )}
                </button>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </div>
            </div>
          </div>

          {/* RIGHT: Plan preview */}
          <div className="rounded-2xl border border-red-700/40 bg-[rgba(20,20,20,0.6)] backdrop-blur-md p-5 shadow-xl md:sticky md:top-6 md:h-[calc(100vh-6rem)] md:overflow-auto">
            <h3 className="font-semibold mb-4">Workout Plan</h3>

            {!plan && <p className="text-subtle">Your plan will appear here.</p>}

            {plan && (
              <div className="space-y-4">
                <p className="text-sm text-subtle">Weeks: {plan.weeks}</p>

                {plan.schedule.map((d, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-bg/70 border border-white/10">
                    <div className="text-sm text-subtle mb-2">
                      Week {d.week} — Day {d.day_index + 1} — <span className="uppercase text-text">{d.focus}</span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      {d.items.map((it, j) => (
                        <li
                          key={j}
                          className="flex items-center justify-between gap-2 bg-surface rounded-lg px-3 py-2 border border-white/10"
                        >
                          <span>
                            {(EXERCISE_NAMES[it.exercise_id] ?? it.exercise_id)} — {it.sets} x {it.reps}
                          </span>
                        </li>
                      ))}
                      {d.items.length === 0 && (
                        <li className="text-subtle">Rest / Mobility</li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-subtle pt-36">
          Build Power.
        </footer>
      </main>
    </div>
  )
}
