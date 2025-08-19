import { Link } from "react-router-dom"
import StatItem from "./StatItem"
import type { PlayerType } from "../../types"

type PlayerCardProps = {
  player: PlayerType
}

const PlayerCard = ({ player }: PlayerCardProps) => {
  return (
    <Link
      to={`player/${player.id}`}
      className="block w-full p-4 bg-green-700 rounded-lg shadow-md hover:shadow-lg transition-shadow hover:bg-green-800"
    >
      <div className="flex items-center gap-4">
        <img
          src={player.image}
          alt={player.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-white"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg truncate">
            {player.name}
          </h3>
          <p className="text-green-200 text-sm truncate">{player.club}</p>
        </div>
        <div className="text-right">
          <div className="text-white font-bold text-xl">{player.rating}</div>
          <div className="text-green-200 text-xs">rating</div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-green-600">
        <div className="grid grid-cols-3 gap-2 text-center">
          <StatItem value={player.matches} label="Matches" />
          <StatItem value={player.goals} label="Goals" />
          <StatItem value={player.assists} label="Assists" />
        </div>
      </div>
    </Link>
  )
}

export default PlayerCard
