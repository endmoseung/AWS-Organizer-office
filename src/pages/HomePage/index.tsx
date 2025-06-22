import { Link } from "react-router-dom";
import { ROUTE_PATH } from "../../constants/route";
import { Button } from "../../components/ui/button";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="mb-8 text-4xl font-bold">AWS Organizer</h1>

      <p className="mb-12 max-w-lg text-lg text-muted-foreground">
        A comprehensive platform for managing presentations and events for AWS
        organizers.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col items-center p-6 text-center rounded-lg border shadow-sm bg-card border-border">
          <h2 className="mb-2 text-xl font-semibold">Presentation Form</h2>
          <p className="mb-6 text-muted-foreground">
            Submit presentations with all required information.
          </p>
          <Link to={ROUTE_PATH.PRESENT_FORM}>
            <Button size="lg">Access Form</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center p-6 text-center rounded-lg border shadow-sm bg-card border-border">
          <h2 className="mb-2 text-xl font-semibold">Image Editor</h2>
          <p className="mb-6 text-muted-foreground">
            Create and edit presentation cover images.
          </p>
          <Link to={ROUTE_PATH.IMAGE_EDITOR}>
            <Button size="lg">Open Editor</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center p-6 text-center rounded-lg border shadow-sm bg-card border-border">
          <h2 className="mb-2 text-xl font-semibold">Management</h2>
          <p className="mb-6 text-muted-foreground">
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
