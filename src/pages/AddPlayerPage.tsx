import { Link } from 'react-router-dom';
import CustomInput from '../components/add_player/CustomInput';

const AddPlayerPage = () => {
  const handleFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-green-700">Add New Player</h1>
          <form onSubmit={handleFormSubmission} className="bg-transparent p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-6">
                <CustomInput
                  id="name"
                  label="Player name"
                  placeholder="Enter player name"
                  type="text"
                />

                <CustomInput
                  id="age"
                  label="Age"
                  placeholder="Enter age"
                  type="number"
                />

                <CustomInput
                  id="club"
                  label="Club"
                  placeholder="Enter club name"
                  type="text"
                />

                <CustomInput
                  id="position"
                  label="Position"
                  placeholder="Enter position"
                  type="text"
                />
              </div>

              <div className="space-y-6">
                <CustomInput
                  id="image"
                  label="Image URL"
                  placeholder="Enter URL for image"
                  type="url"
                />

                <CustomInput
                  id="rating"
                  label="Rating (0-100)"
                  placeholder="Enter rating"
                  type="number"
                />

                <CustomInput
                  id="matches"
                  label="Matches played"
                  placeholder="Enter matches count"
                  type="number"
                />

                <div className="flex space-x-4">
                  <div className="flex-1">
                    <CustomInput
                      id="goals"
                      label="Goals"
                      placeholder="Enter goals"
                      type="number"
                    />
                  </div>
                  <div className="flex-1">
                    <CustomInput
                      id="assists"
                      label="Assists"
                      placeholder="Enter assists"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                to="/"
                className="px-6 py-2 border border-gray-500 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Player
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlayerPage;
