import { Button } from "@/components/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  dateRange: Date;
};

export function ManagementPage() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      dateRange: new Date(),
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data); // form 데이터 처리
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-bold">관리페이지</h1>

      <Controller
        name="dateRange"
        control={control}
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
            }}
          />
        )}
      />
      <Button>제출</Button>
    </form>
  );
}
