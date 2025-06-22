import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  error: string;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <p
      className={cn(
        "mt-1 text-sm text-destructive h-0 overflow-hidden",
        error && "h-auto"
      )}
    >
      {error}
    </p>
  );
};

export default ErrorMessage;
