
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";
import SuggestedMessages from "./SuggestedMessages";
import { CardTitle, CardDescription } from "./ui/card";
import { toast } from "./ui/use-toast";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
            } 
            else {
                toast({
                    title: "Failed !!",
                    description: "Something unexpected happened",
                    variant: "destructive",
                });
            }
        }
    }

    return (
        <div className="flex flex-col gap-2">
        <Card >
            <CardHeader>
                <CardTitle className="text-center">Send Message</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col relative">
                <Input
                    className="text-center min-h-20 "
                    type="text"
                    placeholder="Enter your message"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="grid grid-cols-7 gap-2 mt-4">
                    <Button className="grid col-span-4" onClick={onSend} variant="default">Send</Button>
                    <Button onClick={onGoBack} className="grid col-span-3 h-full" variant="outline">Go Back</Button>
                    
                </div>
            </CardContent>
        </Card>
        
        <SuggestedMessages />
        </div>
    );
}