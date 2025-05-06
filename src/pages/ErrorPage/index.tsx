import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../constants/route";
import { Button } from "../../components/ui/button";

export function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      
      <p className="text-muted-foreground max-w-lg mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      
      <Link to={ROUTE_PATH.HOME}>
        <Button size="lg">
          Return Home
        </Button>
      </Link>
    </div>
  );
}