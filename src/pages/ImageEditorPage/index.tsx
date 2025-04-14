import React, { useState } from "react";
import ImageEditor from "@/components/ImageEditor";

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
    <div className="container mx-auto p-4">
      <ImageEditor 
        eventTitle={eventData.eventTitle}
        speakerName={eventData.speakerName}
        eventDate={eventData.eventDate}
        onClose={handleClose}
      />
    </div>
  );
}