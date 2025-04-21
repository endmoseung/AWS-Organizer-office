import { ImageEditor } from "../../components/ImageEditor";

export function ImageEditorPage() {
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