import { Link, useLocation } from "react-router-dom";
import { ROUTE_PATH } from "../constants/route";

export function Sidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-sidebar border-r border-sidebar-border p-4">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-sidebar-foreground">AWS Organizer</h2>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link 
                to={ROUTE_PATH.HOME}
                className={`flex items-center p-2 rounded-md w-full transition-colors ${
                  isActive(ROUTE_PATH.HOME) 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to={ROUTE_PATH.PRESENT_FORM}
                className={`flex items-center p-2 rounded-md w-full transition-colors ${
                  isActive(ROUTE_PATH.PRESENT_FORM) 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <span>Presentation Form</span>
              </Link>
            </li>
            <li>
              <Link 
                to={ROUTE_PATH.IMAGE_EDITOR}
                className={`flex items-center p-2 rounded-md w-full transition-colors ${
                  isActive(ROUTE_PATH.IMAGE_EDITOR) 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <span>Image Editor</span>
              </Link>
            </li>
            <li>
              <Link 
                to={ROUTE_PATH.MANAGEMENT}
                className={`flex items-center p-2 rounded-md w-full transition-colors ${
                  isActive(ROUTE_PATH.MANAGEMENT) 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <span>Management</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}