import { Link } from 'react-router-dom';
import CustomInput from '../components/add_player/CustomInput';
import { FormEvent } from 'react';

const LoginPage = () => {
  const handleFormSubmission = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-300 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">Log In</h1>
        </div>

        <form
          onSubmit={handleFormSubmission}
          className="bg-transparent p-8"
        >
          <div className="space-y-6">
            <CustomInput
              id="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />

            <CustomInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-xl font-medium text-white bg-green-600 hover:bg-green-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors mt-10"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
