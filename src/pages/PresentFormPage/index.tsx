import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatePicker } from "@/components/ui/DatePicker";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Controller, useForm } from "react-hook-form";

// Presentation types
const PRESENTATION_TYPES = [
  { value: "main", label: "메인 발표 (40분)" },
  { value: "lightning", label: "라이트닝 토크 (10분)" },
];

interface FormValues {
  name: string;
  affiliation: string;
  email: string;
  presentationType: string;
  title: string;
  description: string;
  firstChoice: Date | null;
  secondChoice: Date | null;
  thirdChoice: Date | null;
}

export function PresentFormPage() {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      affiliation: "",
      email: "",
      presentationType: "main",
      title: "",
      description: "",
      firstChoice: null,
      secondChoice: null,
      thirdChoice: null,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    alert("발표 신청이 완료되었습니다!");
    form.reset();
  };

  return (
    <div className="container max-w-3xl p-4 mx-auto">
      <Card className="shadow-aws-card">
        <CardHeader className="bg-secondary text-secondary-foreground">
          <CardTitle>AWS 밋업 발표 신청</CardTitle>
          <CardDescription className="text-secondary-foreground/80">
            여러분의 지식과 경험을 공유하세요
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="presenter" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="presenter">발표자 정보</TabsTrigger>
                  <TabsTrigger value="presentation">발표 내용</TabsTrigger>
                  <TabsTrigger value="schedule">일정 선택</TabsTrigger>
                </TabsList>

                <TabsContent value="presenter" className="pt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "이름을 입력해주세요" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름</FormLabel>
                        <FormControl>
                          <Input placeholder="홍길동" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="affiliation"
                    rules={{ required: "소속을 입력해주세요" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>소속</FormLabel>
                        <FormControl>
                          <Input placeholder="회사/단체 이름" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{
                      required: "이메일을 입력해주세요",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "유효한 이메일 주소를 입력해주세요",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="example@email.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          발표 승인 결과를 이메일로 안내해 드립니다.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="presentation" className="pt-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="presentationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>발표 유형</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="발표 유형을 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PRESENTATION_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    rules={{ required: "제목을 입력해주세요" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>발표 제목</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="발표의 주제를 잘 나타내는 제목을 입력해주세요"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    rules={{
                      required: "발표 내용을 입력해주세요",
                      minLength: {
                        value: 50,
                        message: "최소 50자 이상 입력해주세요",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>발표 내용</FormLabel>
                        <FormControl>
                          <textarea
                            className="flex min-h-[120px] w-full rounded-sm border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="발표 내용에 대한 요약과 주요 포인트를 작성해주세요"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          발표의 주요 내용, 대상 청중, 필요한 사전 지식 등을
                          포함해주세요.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="schedule" className="pt-4 space-y-4">
                  <p className="mb-4 text-sm text-muted-foreground">
                    선호하는 발표 날짜를 선택해주세요. 1~3지망까지 선택
                    가능합니다.
                  </p>

                  <FormField
                    control={form.control}
                    name="firstChoice"
                    rules={{ required: "1지망 날짜를 선택해주세요" }}
                    render={() => (
                      <FormItem className="flex flex-col">
                        <FormLabel>1지망</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Controller
                              control={form.control}
                              name="firstChoice"
                              render={({ field }) => (
                                <DatePicker
                                  value={field.value}
                                  onChange={(date) => field.onChange(date)}
                                />
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="secondChoice"
                    render={() => (
                      <FormItem className="flex flex-col">
                        <FormLabel>2지망 (선택사항)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Controller
                              control={form.control}
                              name="secondChoice"
                              render={({ field }) => (
                                <DatePicker
                                  value={field.value}
                                  onChange={(date) => field.onChange(date)}
                                />
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="thirdChoice"
                    render={() => (
                      <FormItem className="flex flex-col">
                        <FormLabel>3지망 (선택사항)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Controller
                              control={form.control}
                              name="thirdChoice"
                              render={({ field }) => (
                                <DatePicker
                                  value={field.value}
                                  onChange={(date) => field.onChange(date)}
                                />
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <CardFooter className="flex justify-end px-0 pt-4">
                <Button type="submit" className="w-full sm:w-auto">
                  발표 신청하기
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
