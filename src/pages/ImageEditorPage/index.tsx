import ImageEditor from "../../components/ImageEditor";

export function ImageEditorPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <header className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Image Editor</h1>
        <p className="text-muted-foreground">
          Create and customize cover images for your AWS meetup presentations.
        </p>
      </header>

      <ImageEditor
        eventTitle="AWS 밋업: 클라우드 네이티브 애플리케이션 개발"
        speakerName="홍길동"
        eventDate={new Date()}
        onClose={() => {}}
      />
    </div>
  );
}
