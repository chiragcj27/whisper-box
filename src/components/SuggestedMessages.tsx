"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import { CommandList } from "cmdk";
import { BsChevronDoubleRight } from "react-icons/bs";
import axios from "axios";
import QuestionsCarousel from "./QuestionsCarousel";
import { CardTitle } from "./ui/card";
import { FaRedo } from "react-icons/fa";
import { ReloadIcon } from "@radix-ui/react-icons"
interface SuggestedMessagesProps {

  className?: string;

}
type Category = {
  value: string;
  label: string;
};

type Question = {
  text: string;
};

const categories: Category[] = [
  {
    value: "relationships",
    label: "Relationships",
  },
  {
    value: "movies",
    label: "Movies",
  },
  {
    value: "food",
    label: "Food",
  },
  {
    value: "travel",
    label: "Travel",
  },
  {
    value: "hobbies",
    label: "Hobbies",
  },
  {
    value: "daily-life",
    label: "Daily Life",
  },
];

export default function SuggestedMessages({className}: SuggestedMessagesProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);
  const [isShowingMessage, setIsShowingMessage] = useState<boolean>(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleGo() {
    const category = selectedCategory;
    setSelectedCategory(null);
    setIsLoading(true);
    try {
      const res = await axios.post("/api/suggest-messages", { category });
      setQuestions(res.data.questions);
      setIsShowingMessage(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function onSelectAgain() {
    setIsShowingMessage(false);
  }

  if (!isShowingMessage) {
    return (
      <Dialog>
        <DialogTrigger asChild>
        {isLoading ? (
    <Button disabled>
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <Button className="border-2xl border-yellow-800 dark:border-white" variant="outline">Get AI Suggestions!</Button>
  )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Category</DialogTitle>
            <DialogDescription>
              Get questions suggested by GPT of the choosen category.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">Category</p>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start">
                  {selectedCategory ? (
                    <>{selectedCategory.label}</>
                  ) : (
                    <>Set category</>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="right" align="start">
                <Command>
                  <CommandInput placeholder="Choose Category" />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.value}
                          value={category.value}
                          onSelect={(value) => {
                            setSelectedCategory(
                              categories.find(
                                (priority) => priority.value === value
                              ) || null
                            );
                            setOpen(false);
                          }}
                        >
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter className="sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleGo}>
                <BsChevronDoubleRight />
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <div className="flex flex-col mt-16">
         <div className="text-2xl font-semibold text-center text-white py-3 px-6 rounded-lg shadow-md 
                  bg-gradient-to-r from-blue-500 to-blue-600 ">
    Here are some Suggestions
  </div>
        <div className="flex my-4 h-100 justify-center">
          <QuestionsCarousel questions={questions} />
        </div>
        <Button className="mt-2" variant={"secondary"} onClick={onSelectAgain}>
          {" "}
          <FaRedo />
          <span className="ml-2">Select again </span>
        </Button>
      </div>
    );
  }
}
