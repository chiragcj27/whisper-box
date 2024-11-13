import { Button, Card, CardContent, CardHeader, Input } from "@mui/material";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import SuggestedMessages from "./SuggestedMessages";
import { CardTitle, CardDescription } from "./ui/card";
import { toast } from "./ui/use-toast";

export default function SendMessageCard({ onSubmit, onGoBack }: { onSubmit: () => void, onGoBack: () => void }) {
    const params = useParams<{ username: string }>();
    const username = params.username;
    const [content, setContent] = useState("");

    async function onSend() {
        try {
            const response = await axios.post("/api/send-message", {
                username,
                content,
            });
            toast({
                title: response.data?.success ? "Success" : "Failed",
                description: response.data?.message,
            });
            setContent(""); // Clear the text field
            onSubmit();
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
                <CardTitle>Send Message</CardTitle>
                <CardDescription>Whisper your message!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full max-w-screen-md space-x-2">
                    <Input
                        type="text"
                        placeholder="Enter your message"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <Button onClick={onSend} className="mr-2">Send</Button>
                    <Button onClick={onGoBack} variant="outlined">Go Back</Button>
                    <SuggestedMessages />
                </div>
            </CardContent>
        </Card>
    );
}