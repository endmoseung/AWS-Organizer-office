import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/DatePicker";
import toast from "react-hot-toast";
import { addDays, format } from "date-fns";

interface PresentationFormData {
  name: string;
  position: string;
  phone: string;
  presentationType: "lightning" | "main";
  keywords: string[];
  title: string;
  description: string;
  choice1: Date | null;
  choice2: Date | null;
  choice3: Date | null;
  image: FileList;
  agreeToTerms: boolean;
}

// Available keywords for the form
const availableKeywords = [
  "AWS", "Cloud Computing", "DevOps", "Serverless", 
  "Frontend", "Backend", "Mobile", "Machine Learning",
  "Big Data", "Security", "IoT", "Blockchain"
];

export function PresentationForm() {
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<PresentationFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  
  const today = new Date();
  const twoWeeksFromNow = addDays(today, 14);
  const twoMonthsFromNow = addDays(today, 60);
  
  const watchChoice1 = watch("choice1");
  const watchChoice2 = watch("choice2");
  const watchChoice3 = watch("choice3");
  
  const onSubmit = async (data: PresentationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to submit the form
      console.log("Form submitted:", data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success("Form submitted successfully!");
      
      // Reset form
      reset();
      setSelectedKeywords([]);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeywordChange = (keyword: string) => {
    setSelectedKeywords(prev => {
      // If already selected, remove it
      if (prev.includes(keyword)) {
        return prev.filter(k => k !== keyword);
      }
      
      // If trying to add more than 3, prevent it
      if (prev.length >= 3) {
        toast.error("You can select maximum 3 keywords");
        return prev;
      }
      
      // Add the new keyword
      return [...prev, keyword];
    });
    
    // Update the form value
    setValue("keywords", selectedKeywords);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Basic Information</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name <span className="text-destructive">*</span>
            </label>
            <input
              id="name"
              placeholder="Enter your name"
              className="w-full p-2 rounded-md border border-input bg-background"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium mb-1">
              Position <span className="text-destructive">*</span>
            </label>
            <input
              id="position"
              placeholder="Enter your position"
              className="w-full p-2 rounded-md border border-input bg-background"
              {...register("position", { required: "Position is required" })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your position (student, freelancer, job seeker, etc.)
            </p>
            {errors.position && (
              <p className="text-destructive text-sm mt-1">{errors.position.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full p-2 rounded-md border border-input bg-background"
              {...register("phone", { 
                required: "Phone number is required",
                pattern: {
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: "Phone format: 010-1234-5678"
                }
              })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              We'll contact you to coordinate schedules.
            </p>
            {errors.phone && (
              <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold border-b pb-2">Presentation Information</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="presentationType" className="block text-sm font-medium mb-1">
              Presentation Type <span className="text-destructive">*</span>
            </label>
            <select
              id="presentationType"
              className="w-full p-2 rounded-md border border-input bg-background"
              {...register("presentationType", { required: "Presentation type is required" })}
            >
              <option value="">Select presentation type</option>
              <option value="lightning">Lightning Talk</option>
              <option value="main">Main Presentation</option>
            </select>
            {errors.presentationType && (
              <p className="text-destructive text-sm mt-1">{errors.presentationType.message}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Keywords <span className="text-destructive">*</span> (Select up to 3)
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableKeywords.map(keyword => (
                <button
                  key={keyword}
                  type="button"
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedKeywords.includes(keyword)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  onClick={() => handleKeywordChange(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Select topics closest to your presentation (max 3)
            </p>
            {errors.keywords && (
              <p className="text-destructive text-sm mt-1">{errors.keywords.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              placeholder="Enter presentation title"
              className="w-full p-2 rounded-md border border-input bg-background"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-destructive text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              placeholder="Describe your presentation in detail"
              className="w-full p-2 rounded-md border border-input bg-background min-h-32"
              {...register("description", { 
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters"
                }
              })}
            />
            {errors.description && (
              <p className="text-destructive text-sm mt-1">{errors.description.message}</p>
            )}
          </div>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Preferred Dates <span className="text-destructive">*</span>
            </label>
            <p className="text-xs text-muted-foreground">
              Please select three preferred dates for your presentation. We'll try to accommodate your preferences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">First Choice</p>
                <DatePicker
                  selected={watchChoice1}
                  onSelect={(date) => setValue("choice1", date)}
                  fromDate={twoWeeksFromNow}
                  toDate={twoMonthsFromNow}
                />
                {errors.choice1 && (
                  <p className="text-destructive text-sm mt-1">{errors.choice1.message}</p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Second Choice</p>
                <DatePicker
                  selected={watchChoice2}
                  onSelect={(date) => setValue("choice2", date)}
                  fromDate={twoWeeksFromNow}
                  toDate={twoMonthsFromNow}
                />
                {errors.choice2 && (
                  <p className="text-destructive text-sm mt-1">{errors.choice2.message}</p>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Third Choice</p>
                <DatePicker
                  selected={watchChoice3}
                  onSelect={(date) => setValue("choice3", date)}
                  fromDate={twoWeeksFromNow}
                  toDate={twoMonthsFromNow}
                />
                {errors.choice3 && (
                  <p className="text-destructive text-sm mt-1">{errors.choice3.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Cover Image <span className="text-destructive">*</span>
            </label>
            <input
              type="file"
              className="w-full p-2 rounded-md border border-input bg-background"
              accept=".jpg,.jpeg,.png"
              {...register("image", { required: "Cover image is required" })}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Upload an image that best represents you (max 5MB)
            </p>
            {errors.image && (
              <p className="text-destructive text-sm mt-1">{errors.image.message}</p>
            )}
          </div>
          
          <div className="flex items-start space-x-2">
            <input
              id="agreeToTerms"
              type="checkbox"
              className="mt-1"
              {...register("agreeToTerms", { 
                required: "You must agree to the terms" 
              })}
            />
            <label htmlFor="agreeToTerms" className="text-sm">
              I agree to the processing of my personal information for the purpose of coordinating this presentation.
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-destructive text-sm">{errors.agreeToTerms.message}</p>
          )}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Presentation"}
      </Button>
    </form>
  );
}