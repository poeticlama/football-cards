import { useEffect, useState } from 'react';
import PlayerCard from '../components/home/PlayerCard';
import Header from '../components/shared/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchPlayers, setSortBy } from '../store/players.slice';
import Loader from '../components/shared/Loader';

const ITEMS_PER_PAGE = 6;

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const { players, loading } = useSelector((state: RootState) => state.players);

  useEffect(() => {
    dispatch(fetchPlayers());
  }, [dispatch]);

  if (loading) return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-300">
        <Loader />
      </div>
    </>
  );

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

        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-3 bg-white rounded-lg shadow-sm px-6 py-3">
            <label htmlFor="sort" className="text-sm font-medium text-green-700 whitespace-nowrap">
              Sort by:
            </label>
            <div className="relative">
              <select
                id="sort"
                className="appearance-none bg-transparent border-0 py-2 pl-3 pr-8 focus:ring-0 focus:outline-none cursor-pointer text-gray-700"
                onChange={(e) => dispatch(setSortBy(e.target.value))}
              >
                <option value="default">Default</option>
                <option value="rating">Rating</option>
                <option value="matches">Matches</option>
                <option value="goals">Goals</option>
                <option value="assists">Assists</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
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