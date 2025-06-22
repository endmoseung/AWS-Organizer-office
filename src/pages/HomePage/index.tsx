import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../constants/route";
import { Button } from "../../components/ui/button";

export function HomePage() {
  const navigate = useNavigate();

  const navigateToForm = () => {
    navigate(ROUTE_PATH.PRESENT_FORM);
  };

  const navigateToManagement = () => {
    navigate(ROUTE_PATH.MANAGEMENT);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-8">AWS Organizer</h1>

      <p className="text-lg text-muted-foreground max-w-lg mb-12">
        A comprehensive platform for managing presentations and events for AWS
        organizers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold mb-2">Presentation Form</h2>
          <p className="text-muted-foreground mb-6">
            Submit presentations with all required information.
          </p>
          <Link to={ROUTE_PATH.PRESENT_FORM}>
            <Button size="lg">Access Form</Button>
          </Link>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold mb-2">Image Editor</h2>
          <p className="text-muted-foreground mb-6">
            Create and edit presentation cover images.
          </p>
          <Link to={ROUTE_PATH.IMAGE_EDITOR}>
            <Button size="lg">Open Editor</Button>
          </Link>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm border border-border flex flex-col items-center text-center">
          <h2 className="text-xl font-semibold mb-2">Management</h2>
          <p className="text-muted-foreground mb-6">
            Review and manage presentation submissions.
          </p>
          <Link to={ROUTE_PATH.MANAGEMENT}>
            <Button size="lg">Manage Events</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
