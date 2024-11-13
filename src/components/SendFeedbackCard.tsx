import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input"; // Assuming you have an Input component in the ui folder
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { toast } from "./ui/use-toast";
import { feedbackSchema } from "@/schemas/feedbackSchema";
import Rating from '@mui/material/Rating';
import React from 'react';
import axios from "axios";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";

export default function SendFeedbackCard({ onSend, onGoBack }: { onSend: () => void, onGoBack: () => void }) {
    const form = useForm<z.infer<typeof feedbackSchema>>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            content: "",
            stars: 0
        },
    });

    const params = useParams<{ username: string }>();
    const username = params.username;

    async function onSubmit(values: z.infer<typeof feedbackSchema>) {
        const result = { username: username, content: values.content, stars: values.stars };

        try {
            console.log(result)
            const response = await axios.post("/api/send-message", result);
            toast({
                title: response.data?.success ? "Success" : "Failed",
                description: response.data?.message,
            });
            onSend();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 403) {
                    toast({
                        title: "Failed !!",
                        description: error.response.data?.message,
                        variant: "destructive",
                    });
                }
            } else {
                toast({
                    title: "Failed !!",
                    description: "Something unexpected happened",
                    variant: "destructive",
                });
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send Feedback</CardTitle>
                <CardDescription>Whisper your feedback along with a rating!</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Feedback</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Write your feedback" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="stars"
                            render={({ field }) => (
                                <Rating
                                    name="simple-controlled"
                                    value={field.value}
                                    onChange={(event, newValue) => {
                                        field.onChange(newValue);
                                    }}
                                />
                            )}
                        />
                        <Button type="submit">Submit</Button>
                        <Button onClick={onGoBack} >Go Back</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
