"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image"; // Import next/image

export default function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var" containerClassName="py-10"> {/* Added padding to container for demo visibility */}
      <CardBody className="bg-card relative group/card hover:shadow-2xl hover:shadow-primary/20 dark:hover:shadow-primary/10 border-border w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-foreground"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-muted-foreground text-sm max-w-sm mt-2"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image // Use next/image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
            data-ai-hint="forest path"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji" // Example link
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal text-foreground hover:text-primary"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90"
          >
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
