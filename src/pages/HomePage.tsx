import { useState } from 'react';
import PlayerCard from '../components/home/PlayerCard';
import { players } from '../mock-players';
import Header from '../components/shared/Header';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(players.length / ITEMS_PER_PAGE);

  const currentPlayers = players.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-300">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-green-700">MY PLAYERS</h1>
          <Link to='new' className="rounded-xl bg-green-700 text-xl text-white py-3 px-7 hover:bg-green-800">
            + Add new player
          </Link>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPlayers.map((player) => (
              <PlayerCard player={player} key={player.id} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded-lg ${currentPage === page ? 'bg-green-600 text-white' : 'hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
              >
                &gt;
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default HomePage;