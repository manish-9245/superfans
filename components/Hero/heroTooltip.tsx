"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
/**
 * Array of people objects.
 *
 * @typedef {Object} Person
 * @property {number} id - The unique identifier of the person.
 * @property {string} name - The name of the person.
 * @property {string} designation - The designation of the person.
 * @property {string} image - The image URL of the person.
 */

/**
 * Array of people.
 *
 * @type {Person[]}
 */
const people = [
  {
    id: 1,
    name: "Selena Gomez",
    designation: "Singer/Songwriter",
    image: "/images/hero/selena.jpeg",
  },
  {
    id: 2,
    name: "Shawn Mendes",
    designation: "Singer/Songwriter",
    image: "/images/hero/shawn.jpeg",
  },
  {
    id: 3,
    name: "Khaby Lame",
    designation: "Tiktok/Instagram creator",
    image: "/images/hero/khaby.jpeg",
  },
  {
    id: 4,
    name: "Maria Becerra",
    designation: "Singer/Songwriter",
    image: "/images/hero/maria.webp",
  },
  {
    id: 5,
    name: "Gustavo Lima",
    designation: "Singer/Songwriter",
    image: "/images/hero/gustavo.jpeg",
  },
  {
    id: 6,
    name: "Eminem",
    designation: "Rapper",
    image: "/images/hero/eminem.jpeg",
  },
];

export function AnimatedTooltipPreview() {
  return (
    <div className="mt-10 flex w-full flex-row items-center justify-center p-6">
      <AnimatedTooltip items={people} />
    </div>
  );
}
