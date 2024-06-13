
import { signUpSchema } from "@/schemas/signUpSchema";
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
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import useDebounce from "@/lib/hooks/useDebounce";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [username, setUsername] = useState<string>("");
  const debouncedUsername = useDebounce<string>(username, 500);
  const [usernameMessage, setusernamemessage] = useState<string>("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmiting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUsername = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setusernamemessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          setusernamemessage(response.data.message);

          //setStatus(exists ? 'Username already taken' : 'Username available');
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setusernamemessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      } else {
        setusernamemessage("");
      }
    };

    checkUsername();
  }, [debouncedUsername]);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsSubmiting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", values);
      toast({
        title: "Success",
        description: response.data.message,
      });
      router.replace(`/verify/${username}`)
      setIsSubmiting(false)
    } catch (error) {
        console.error("Error in signup of user", error)
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message
        toast({
            title: "Sign-up failed",
            description: errorMessage,
            variant: "destructive"
        })
        setIsSubmiting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle> Start your Whisper-Box</CardTitle>
        <CardDescription>Signup to your anonymous messenger</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription
                      className={`mt-2 ${
                        usernameMessage === "Username is unique"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {usernameMessage}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="mail@example.com" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter>
        Already have an account?
        <Link className="underline pl-2" href={"/sign-in"}>
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
