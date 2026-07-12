import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, X, LogOut, Home, Leaf, Heart, Scale, Zap, Trophy, Settings, 
  ChevronDown, ChevronRight, FileText 
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (path) => {
    setExpandedMenus(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { 
      label: 'Environmental', 
      path: '/environmental', 
      icon: Leaf,
      subItems: [
        { label: 'Emission Factors', path: '/environmental/emission-factors' },
        { label: 'Product ESG Profiles', path: '/environmental/product-esg-profiles' },
        { label: 'Carbon Transactions', path: '/environmental/carbon-transactions' },
        { label: 'Environmental Goals', path: '/environmental/goals' },
      ]
    },
    { 
      label: 'Social', 
      path: '/social', 
      icon: Heart,
      subItems: [
        { label: 'CSR Activities', path: '/social/csr-activities' },
        { label: 'Employee Participation', path: '/social/employee-participation' },
        { label: 'Diversity Dashboard', path: '/social/diversity-dashboard' },
      ]
    },
    { 
      label: 'Governance', 
      path: '/governance', 
      icon: Scale,
      subItems: [
        { label: 'Policies', path: '/governance/policies' },
        { label: 'Policy Acknowledgements', path: '/governance/policy-acknowledgements' },
        { label: 'Audits', path: '/governance/audits' },
        { label: 'Compliance Issues', path: '/governance/compliance-issues' },
      ]
    },
    { 
      label: 'Gamification', 
      path: '/gamification', 
      icon: Zap,
      subItems: [
        { label: 'Challenges', path: '/gamification/challenges' },
        { label: 'Challenge Participation', path: '/gamification/challenge-participation' },
        { label: 'Badges', path: '/gamification/badges' },
        { label: 'Rewards', path: '/gamification/rewards' },
        { label: 'Leaderboard', path: '/gamification/leaderboard' },
      ]
    },
    { 
      label: 'Reports', 
      path: '/reports', 
      icon: FileText,
      subItems: [
        { label: 'Environmental Report', path: '/reports/environmental' },
        { label: 'Social Report', path: '/reports/social' },
        { label: 'Governance Report', path: '/reports/governance' },
        { label: 'ESG Summary', path: '/reports/summary' },
        { label: 'Custom Report Builder', path: '/reports/builder' },
      ]
    },
    { 
      label: 'Settings', 
      path: '/settings', 
      icon: Settings,
      subItems: [
        { label: 'Departments', path: '/settings/departments' },
        { label: 'Categories', path: '/settings/categories' },
        { label: 'ESG Configuration', path: '/settings/esg-configuration' },
        { label: 'Notification Settings', path: '/settings/notification-settings' },
      ]
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);
  const isExactActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-600 text-white md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-green-700 to-green-800 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-green-600 flex-shrink-0">
          <h1 className="text-2xl font-bold text-white">EcoSphere</h1>
          <p className="text-green-200 text-sm">ESG Platform</p>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-green-600 flex-shrink-0">
          <p className="text-sm text-green-200">Logged in as</p>
          <p className="font-semibold">{user?.name || 'User'}</p>
          <p className="text-xs text-green-200">{user?.role || 'Admin'}</p>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1 flex-grow overflow-y-auto pb-24">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMenuExpanded = expandedMenus[item.path] || isActive(item.path);

            return (
              <div key={item.path} className="flex flex-col">
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleMenu(item.path);
                      if (!isMenuExpanded && !isActive(item.path)) {
                        navigate(item.path);
                      }
                    } else {
                      navigate(item.path);
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-white text-green-700 font-semibold'
                      : 'text-green-100 hover:bg-green-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    {item.label}
                  </div>
                  {hasSubItems && (
                    isMenuExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                  )}
                </button>

                {/* Sub Items */}
                {hasSubItems && isMenuExpanded && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-green-600 pl-2">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.path}
                        onClick={() => {
                          navigate(subItem.path);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                          isExactActive(subItem.path)
                            ? 'bg-green-600 text-white font-medium'
                            : 'text-green-200 hover:text-white hover:bg-green-600/50'
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-green-600 bg-green-800 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
