import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PresentationForm } from "../../components/PresentationForm";
import { Toaster } from "react-hot-toast";

export function PresentFormPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uuid = queryParams.get("uuid");
  
  // For demonstration, log the UUID if present
  useEffect(() => {
    if (uuid) {
      console.log("Form loaded with UUID:", uuid);
    }
  }, [uuid]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-right" />
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Presentation Submission Form</h1>
        <p className="text-muted-foreground">
          Please fill out the form below to submit your presentation proposal.
        </p>
      </header>
      
      <PresentationForm />
    </div>
  );
}