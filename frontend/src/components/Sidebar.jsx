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
        className="fixed top-4 left-4 z-50 p-2 rounded-lg text-white md:hidden"
        style={{ backgroundColor: 'var(--sidebar-active)' }}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static flex flex-col`}
        style={{ backgroundColor: 'var(--sidebar-bg)' }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex-shrink-0">
          <h1 className="text-2xl font-bold font-serif tracking-tight" style={{ color: 'var(--surface)' }}>EcoSphere</h1>
          <p className="text-sm font-sans tracking-wide" style={{ color: 'var(--muted)' }}>ESG Platform</p>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-white/10 flex-shrink-0">
          <p className="text-sm font-sans uppercase tracking-widest text-[10px]" style={{ color: 'var(--muted)' }}>Logged in as</p>
          <p className="font-semibold text-sm mt-1">{user?.name || 'User'}</p>
          <p className="text-xs mt-0.5 opacity-80">{user?.role || 'Admin'}</p>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-1 flex-grow overflow-y-auto pb-24 font-sans">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isMenuExpanded = expandedMenus[item.path] || isActive(item.path);
            const isCurrentActive = isActive(item.path);

            return (
              <div key={item.path} className="flex flex-col">
                <button
                  onClick={() => {
                    if (hasSubItems) {
                      toggleMenu(item.path);
                      if (!isMenuExpanded && !isCurrentActive) {
                        navigate(item.path);
                      }
                    } else {
                      navigate(item.path);
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                    isCurrentActive
                      ? 'text-white border-l-4'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
                  }`}
                  style={{ 
                    backgroundColor: isCurrentActive ? 'var(--sidebar-active)' : 'transparent',
                    borderLeftColor: isCurrentActive ? 'var(--surface)' : 'transparent'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} strokeWidth={isCurrentActive ? 2.5 : 2} />
                    {item.label}
                  </div>
                  {hasSubItems && (
                    isMenuExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                  )}
                </button>

                {/* Sub Items */}
                {hasSubItems && isMenuExpanded && (
                  <div className="mt-1 space-y-1 relative before:content-[''] before:absolute before:left-[1.35rem] before:top-0 before:bottom-0 before:w-[1px] before:bg-white/10">
                    {item.subItems.map((subItem) => {
                      const isSubActive = isExactActive(subItem.path);
                      return (
                        <button
                          key={subItem.path}
                          onClick={() => {
                            navigate(subItem.path);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left pl-11 pr-4 py-2 text-[13px] transition-colors relative flex items-center ${
                            isSubActive
                              ? 'text-white font-medium'
                              : 'text-gray-400 font-normal hover:text-white'
                          }`}
                        >
                          {/* Accent bar for active sub item */}
                          {isSubActive && (
                            <span className="absolute left-[1.35rem] w-[2px] h-4 -translate-x-1/2 rounded-full" style={{ backgroundColor: 'var(--surface)' }}></span>
                          )}
                          {subItem.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout Button (Ghost Text Link) */}
        <div className="p-4 border-t border-white/10 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-gray-400 hover:text-white font-medium text-sm transition-colors rounded-lg hover:bg-white/5"
          >
            <LogOut size={18} />
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
