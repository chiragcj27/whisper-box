"use client";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifySchema } from "@/schemas/verifySchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export default function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof verifySchema>) {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code
      });
      toast({
        title: "Succeessfull",
        description: response.data.message
        
      })

      router.replace(`/sign-in`)
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message
        toast({
            title: "failes",
            description: errorMessage,
            variant: "destructive"
        })
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardDescription>Verify your Email</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to on your email.
                      {/* <div className="pt-1 text-zinc-600 text-xs">Check spam folder too</div> */}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
