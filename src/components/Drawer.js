import { useTheme } from '../context/ThemeContext';

const Drawer = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="drawer-content">
        <nav className="drawer-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div className="theme-toggle-section">
          <label className="theme-switch">
            <input 
              type="checkbox" 
              checked={theme === 'dark'} 
              onChange={toggleTheme} 
            />
            <span className="slider round"></span>
          </label>
          <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        </div>
      </div>
    </div>
  );
};

export default Drawer;