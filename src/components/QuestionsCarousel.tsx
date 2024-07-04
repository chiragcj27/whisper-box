import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FiCopy } from "react-icons/fi"; // Import the copy icon from react-icons
import { Button } from "./ui/button";

type CarouselProps = {
  questions: string[];
};

const QuestionsCarousel: React.FC<CarouselProps> = ({ questions }) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full max-w-screen-sm"
      >
        <CarouselContent className="-mt-1 h-[200px]">
          {questions.map((question, index) => (
            <CarouselItem key={index} className="pt-1 md:basis-1/2">
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="text font-semibold">{question}</span>
                    <Button variant={"outline"} className="ml-2 p-2 " onClick={() => handleCopy(question)}>
                    <FiCopy />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default QuestionsCarousel;
