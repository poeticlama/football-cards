import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-center space-x-12">
          <Link
            to="/"
            className="px-4 py-2 text-lg font-light uppercase tracking-wider hover:text-green-200 transition-colors hover:underline"
          >
            Players
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 text-lg font-light uppercase tracking-wider hover:text-green-200 transition-colors hover:underline"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;