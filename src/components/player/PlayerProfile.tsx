type PlayerProfileProps = {
  imageURL: string
  position: string
  name: string
  club: string
  rating: number
  onChange: (field: string, val: string) => void
}

const PlayerProfile = ({
                         imageURL,
                         position,
                         name,
                         club,
                         rating,
                         onChange,
                       }: PlayerProfileProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="w-full h-auto max-h-48 md:w-48 md:h-48 object-contain"
            src={imageURL}
            alt={name}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">
            {position}
          </div>
          <h1 className="block mt-1 text-2xl font-bold text-gray-900">
            {name}
          </h1>
          <div
            className="mt-2 text-gray-600 font-medium focus:outline-none"

          >
            {club}
          </div>
          <div className="mt-4 flex">
            <span
              className="text-3xl font-bold text-green-600 focus:outline-none"
              contentEditable={!!onChange}
              suppressContentEditableWarning
              onBlur={e =>
                onChange?.("rating", e.currentTarget.textContent || "")
              }
            >
              {rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerProfile
