import { useNavigate, useParams } from "react-router-dom"
import StatCard from "../components/player/StatCard"
import DetailItem from "../components/player/DetailItem"
import PlayerProfile from "../components/player/PlayerProfile"
import { useEffect } from "react"
import { deletePlayer, fetchPlayerById } from "../store/players.slice"
import Loader from "../components/shared/Loader"
import { useAppDispatch, useAppSelector } from "../hooks"

const PlayerPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentPlayer, loading, error } = useAppSelector(
    state => state.players,
  )
  useEffect(() => {
    dispatch(fetchPlayerById(id))
  }, [dispatch])

  if (error) {
    return <div className="text-center py-20 text-2xl">Player not found</div>
  }

  if (loading) {
    return <Loader />
  }

  const handleDelete = () => {
    dispatch(deletePlayer(id as string))
    navigate("/")
  }

  return (
    currentPlayer && (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <PlayerProfile
            imageURL={currentPlayer.image}
            position={currentPlayer.position}
            name={currentPlayer.name}
            club={currentPlayer.club}
            rating={currentPlayer.rating}
          />

          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard label="Matches" value={currentPlayer.matches} />
              <StatCard label="Goals" value={currentPlayer.goals} />
              <StatCard label="Assists" value={currentPlayer.assists} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Details</h2>
            <div className="space-y-3">
              <DetailItem label="Age" value={String(currentPlayer.age)} />
              <DetailItem label="Club" value={currentPlayer.club} />
              <DetailItem label="Rating" value={`${currentPlayer.rating}`} />
            </div>
          </div>
          <div className="w-full flex justify-center mt-3">
            <button
              type="button"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 hover:cursor-pointer transition-colors"
              onClick={handleDelete}
            >
              Delete Player
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default PlayerPage
