import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { PrismaClient } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export default function InactiveNukeIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 100 100">
      <circle
        cx="49.737"
        cy="50.368"
        strokeWidth="3.5"
        stroke="#333"
        fill="#CCC"
        strokeMiterlimit="10"
        r="39"
      />
      <path
        d="M57.319 40.823l11.069-19.172-1.513-.875C61.757 17.815 55.922 16.25 50 16.25s-11.757 1.565-16.875 4.526l-1.513.875 11.069 19.172c2.01-1.606 4.552-2.573 7.319-2.573s5.309.967 7.319 2.573z"
        fill="#333"
      />
      <path
        d="M61.605 48.25c.086.573.145 1.154.145 1.75 0 4.965-3.1 9.21-7.461 10.928l11.07 19.173 1.516-.877C77.284 73.201 83.75 62.003 83.75 50v-1.75H61.605z"
        fill="#333"
      />
      <path
        d="M38.25 50c0-.596.059-1.177.145-1.75H16.25V50c0 12.003 6.466 23.201 16.875 29.224l1.516.877 11.07-19.173C41.35 59.21 38.25 54.965 38.25 50z"
        fill="#333"
      />
      <path
        d="M58.059 48.25a8.237 8.237 0 0 0-2.519-4.345c-1.466-1.334-3.406-2.155-5.54-2.155s-4.074.821-5.54 2.155A8.245 8.245 0 0 0 41.75 50c0 3.672 2.413 6.789 5.736 7.855a8.196 8.196 0 0 0 5.028 0c3.323-1.066 5.736-4.183 5.736-7.855a8.21 8.21 0 0 0-.191-1.75z"
        fill="#333"
      />
    </svg>
  );
}
