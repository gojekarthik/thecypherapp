"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const topics = [
  "Triangles with Feet",
  "Trianngles with Chest",
  "Traingles with Knees",
  "Triangles with Hands",
  "Directions of Head",
  "ABCs with Hand",
  "Rectangles with Feet",
  "Rectangles with Chest",
  "Reactangles with Knees",
  "Reactangles with Hands",
  "Circles with Feet",
  "Circles with Chest",
  "Circles with Knees",
  "Circles with Hands",
  "Circles with Hips",
  "Draw Symentrical Shapes with hands and Legs on floor",
  "Play with Heal-Toe in All 8 Directions",
];

export default function TrainingGenerator() {
  const [currentTopic, setCurrentTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateTopic = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * topics.length);
      setCurrentTopic(topics[randomIndex]);
      setIsLoading(false);
    }, 1000); // Simulating a delay for effect
  };

  return (
    <Card className="w-48 max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-[#8661C1] text-2xl font-bold text-center">
          Generate
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          key={currentTopic}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[100px] flex items-center justify-center text-center"
        >
          {currentTopic ? (
            <p className="text-lg font-medium">{currentTopic}</p>
          ) : (
            <p className="text-gray-500 italic">
              Click the button to generate a topic
            </p>
          )}
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button className="bg-[#8661C1]" onClick={generateTopic} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Topic"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
