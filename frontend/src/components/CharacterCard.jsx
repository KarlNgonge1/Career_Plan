
export default function CharacterCard({ character, selected, onSelect }) {
  const ring = selected ? "ring-2 ring-accent shadow-[0_0_35px_rgba(229,9,20,0.25)]" : "ring-1 ring-white/10"

  return (
    <button
      onClick={() => onSelect(character.id)}
      className={`text-left rounded-xl bg-surface hover:bg-bg border border-white/10 transition-transform duration-150 hover:-translate-y-[2px] ${ring}`}
    >
      <div className="relative">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-44 object-cover rounded-t-xl"
          loading="lazy"
        />
        <div className="absolute inset-0 rounded-t-xl bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute top-2 left-2 text-xs px-2 py-1 rounded bg-accent/90 text-white shadow">
          {character.archetype}
        </span>
      </div>

      <div className="p-3">
        <div className="font-semibold text-lg">{character.name}</div>
      </div>
    </button>
  )
}
