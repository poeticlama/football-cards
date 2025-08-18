import { useParams } from 'react-router-dom';
import { players } from '../mock-players';
import StatCard from '../components/player/StatCard';
import DetailItem from '../components/player/DetailItem';
import PlayerProfile from '../components/player/PlayerProfile';

const PlayerPage = () => {
  const { id } = useParams<{ id: string }>();
  const player = players.find(p => p.id === parseInt(id || '0'));

  if (!player) {
    return <div className="text-center py-20 text-2xl">Player not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <PlayerProfile
          imageURL={player.image}
          position={player.position}
          name={player.name}
          club={player.club}
          rating={player.rating}
        />

        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Matches" value={player.matches} />
            <StatCard label="Goals" value={player.goals} />
            <StatCard label="Assists" value={player.assists} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Details</h2>
          <div className="space-y-3">
            <DetailItem label="Age" value={String(player.age)} />
            <DetailItem label="Club" value={player.club} />
            <DetailItem label="Rating" value={`${player.rating}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;