import { useState } from "react";
import { Button } from "./ui/button";

type Venue = "Carrot Market" | "Musinsa Seongsu";

interface EditorState {
  backgroundColor: string;
  titleTextColor: string;
  venue: Venue;
  title: string;
  date: string;
}

export function ImageEditor() {
  const [editorState, setEditorState] = useState<EditorState>({
    backgroundColor: "#000000",
    titleTextColor: "#ffffff",
    venue: "Carrot Market",
    title: "AWS Meetup Presentation",
    date: "2025-04-30",
  });

  const backgroundColors = [
    "#000000",
    "#121212",
    "#242424",
    "#363636",
    "#FFFFFF",
    "#F5F5F5",
    "#E0E0E0",
    "#CCCCCC",
  ];

  const textColors = [
    "#FFFFFF",
    "#F5F5F5",
    "#E0E0E0",
    "#CCCCCC",
    "#000000",
    "#121212",
    "#242424",
    "#363636",
  ];

  const handleChange = (key: keyof EditorState, value: string) => {
    setEditorState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDownload = () => {
    // In a real implementation, this would use canvas or a library like html2canvas
    // to capture the template preview and save it as an image
    alert("Image download functionality would be implemented here");
  };

  return (
    <div className="bg-background rounded-lg border border-border shadow-sm">
      <div className="relative">
        <div className="sticky top-0 z-10 bg-card p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-semibold">Cover Image Editor</h2>
          <Button onClick={handleDownload}>Download Image</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Template Preview */}
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-4">Preview</h3>
            <div
              className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: editorState.backgroundColor }}
            >
              <div className="p-6 text-center">
                <p
                  className="text-sm mb-2"
                  style={{ color: editorState.titleTextColor }}
                >
                  {editorState.venue}
                </p>
                <h1
                  className="text-2xl font-bold mb-2"
                  style={{ color: editorState.titleTextColor }}
                >
                  {editorState.title}
                </h1>
                <p
                  className="text-sm"
                  style={{ color: editorState.titleTextColor }}
                >
                  {editorState.date}
                </p>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="flex flex-col">
            <h3 className="text-lg font-medium mb-4">Edit Template</h3>

            <div className="space-y-6">
              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Background Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {backgroundColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded border ${
                        editorState.backgroundColor === color
                          ? "ring-2 ring-primary"
                          : "border-border"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleChange("backgroundColor", color)}
                      aria-label={`Select background color ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Text Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {textColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`w-8 h-8 rounded border ${
                        editorState.titleTextColor === color
                          ? "ring-2 ring-primary"
                          : "border-border"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleChange("titleTextColor", color)}
                      aria-label={`Select text color ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Venue */}
              <div>
                <label
                  htmlFor="venue"
                  className="block text-sm font-medium mb-2"
                >
                  Venue
                </label>
                <select
                  id="venue"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  value={editorState.venue}
                  onChange={(e) =>
                    handleChange("venue", e.target.value as Venue)
                  }
                >
                  <option value="Carrot Market">Carrot Market</option>
                  <option value="Musinsa Seongsu">Musinsa Seongsu</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2"
                >
                  Presentation Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  value={editorState.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>

              {/* Date */}
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium mb-2"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  value={editorState.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
