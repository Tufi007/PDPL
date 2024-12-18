import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, Users, FileText, 
  Database, Shield, FileDigit
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/organization', icon: Building2, label: 'Organization' },
  { path: '/teams', icon: Users, label: 'Teams' },
  { path: '/consent', icon: FileText, label: 'Consent Management' },
  { path: '/data', icon: Database, label: 'Data Collection' },
  { path: '/guardians', icon: Shield, label: 'Legal Guardians' },
  { path: '/audit', icon: FileDigit, label: 'Audit Logs' },
];

function Sidebar() {
  return (<>
    <div className="fixed left-0 top-0 w-64 h-full bg-white border-r border-gray-200">
      <div className="p-6 text-2xl font-bold text-primary">
        PDPL Manager
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center p-3 rounded-lg mb-2
              ${isActive 
                ? 'bg-primary-light text-primary' 
                : 'text-gray-text hover:bg-gray-sidebar'}
            `}
          >
            <item.icon className="mr-3" size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
    <div></div></>
  );
}

export default Sidebar;