"use client";
import axios from "axios";
import { useSession} from "next-auth/react";
import { use, useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { Card } from "@mui/material";
import { Button} from "@react-email/components";
import { TagsInput } from "react-tag-input-component";

export default function RestrictedWordsCard() {
    const { data: session ,update} = useSession();
    const user: any = session?.user;
    const [RestrictedWords, setRestrictedWords] = useState<string[]>([]);
    useEffect(() => {
        if (user) {
            if(user.restrictedKeywords==""){
                console.log("Restricted Words:", user.restrictedKeywords);
                setRestrictedWords([]);
                return;
            }
            setRestrictedWords(user.restrictedKeywords?.split(",") ?? []);
        }
    }, [user]);
    const handleRestrictedWords = async () => {
        if (!user) return;
        try {
            const response = await axios.post("/api/add-restricted-words", {
                userId: user._id,
                restrictedWords: RestrictedWords.join(),
            });
            await update({...session, user: {...user, restrictedKeywords: RestrictedWords.join()}});
            console.log("Response from server:", response.data);
            toast({
                title: response.data?.success ? "Success" : "Failed",
                description: response.data?.message,
            });
        } catch (error) {
            console.error("Failed to update restricted words:", error);
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
    };
    
    
    return (
        <>
            <div>
                <Card>
                    <div className="m-2 flex items-center space-x-2">
                        
                        <TagsInput value={RestrictedWords} separators={["Enter", " "]} onChange={setRestrictedWords} name="restrictedWords" onExisting={(tag) => {}} onBlur={() => {
          const s1 = RestrictedWords
            .map((s) => s.trim())
            .filter((s2) => s2.length !== 0);
          setRestrictedWords(s1);
        }} isEditOnRemove={true}/>
                        <Button onClick={handleRestrictedWords}>Add Restricted Words</Button>
                    </div>
                </Card>
            </div>
        </>
    )
}