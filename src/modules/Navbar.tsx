import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Land Details Form', path: '/land-details-form' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">Carbon Credit Form</div>
        <div className="space-x-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <a
                className={`text-gray-700 hover:text-blue-500 transition-colors duration-200 ${
                  router.pathname === item.path ? 'font-semibold' : ''
                }`}
              >
                {item.name}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
