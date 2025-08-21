import { Link, useNavigate, useParams } from "react-router-dom"
import StatCard from "../components/player/StatCard"
import DetailItem from "../components/player/DetailItem"
import PlayerProfile from "../components/player/PlayerProfile"
import { useEffect, useState } from "react"
import {
  deletePlayer,
  fetchPlayerById,
  updatePlayer,
} from "../store/players.slice"
import Loader from "../components/shared/Loader"
import { useAppDispatch, useAppSelector } from "../hooks"
import type { PlayerType } from "../types"
import * as Sentry from "@sentry/react"

const PlayerPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentPlayer, loading, error } = useAppSelector(
    state => state.players,
  )

  const [editable, setEditable] = useState<PlayerType | null>(null)

  useEffect(() => {
    dispatch(fetchPlayerById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (currentPlayer) setEditable(currentPlayer)
  }, [currentPlayer])

  if (error) {
    return <div className="text-center py-20 text-2xl">Player not found</div>
  }

  if (loading || !editable) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-300 py-8">
        <Loader />
      </div>
    )
  }

  const handleDelete = () => {
    dispatch(deletePlayer(id as string))
    navigate("/")
  }

  const handleSave = () => {
    dispatch(updatePlayer(editable))
  }

  const handleChange = (field: string, value: string) => {
    setEditable(prev => {
      if (!prev) return prev

      if (field === "club") {
        return { ...prev, [field]: value }
      }

      const parsed = Number(value)
      if (isNaN(parsed)) {
        Sentry.captureException(new Error("Update is not valid"))
        return prev
      }

      return { ...prev, [field]: parsed }
    })
  }

  return (
    editable && (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-300 py-8">
        <div className="flex justify-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to players page
          </Link>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <PlayerProfile
            imageURL={editable.image}
            position={editable.position}
            name={editable.name}
            club={editable.club}
            rating={editable.rating}
            onChange={handleChange}
          />

          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                label="Matches"
                value={editable.matches}
                onChange={val => handleChange("matches", val)}
              />
              <StatCard
                label="Goals"
                value={editable.goals}
                onChange={val => handleChange("goals", val)}
              />
              <StatCard
                label="Assists"
                value={editable.assists}
                onChange={val => handleChange("assists", val)}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Details</h2>
            <div className="space-y-3">
              <DetailItem
                label="Age"
                value={String(editable.age)}
                onChange={val => handleChange("age", val)}
              />
              <DetailItem
                label="Club"
                value={editable.club}
                onChange={val => handleChange("club", val)}
              />
            </div>
          </div>

          <div className="w-full flex justify-center gap-4 mt-3">
            <button
              type="button"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
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
