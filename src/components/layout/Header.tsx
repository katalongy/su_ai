import { Link, useLocation } from 'react-router-dom';
import { Wrench, FileJson, QrCode, Fingerprint } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: 'JSON工具', path: '/json-formatter', icon: FileJson },
    { name: '二维码', path: '/qr-generator', icon: QrCode },
    { name: 'UUID', path: '/uuid-generator', icon: Fingerprint },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
          <Wrench className="w-6 h-6" />
          <span className="font-bold text-xl">DevTools</span>
        </Link>
        
        <nav className="flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
