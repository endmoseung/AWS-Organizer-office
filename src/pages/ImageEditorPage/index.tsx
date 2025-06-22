import { ImageEditor } from "../../components/ImageEditor";

export function ImageEditorPage() {
  const handleClose = () => {
    // In a real app, this would navigate back to the previous page
    console.log("Editor closed");
  };

  // Sample data - in a real app, this would come from props or a data store
  const eventData = {
    eventTitle: "AWS 밋업: 서버리스 아키텍처와 마이크로서비스",
    speakerName: "김철수 (테크놀로지)",
    eventDate: new Date(2025, 3, 15),
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Image Editor</h1>
        <p className="text-muted-foreground">
          Create and customize cover images for your AWS meetup presentations.
        </p>
      </header>

      <ImageEditor />
    </div>
  );
}
