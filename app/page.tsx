'use client'
import {redirect} from "next/navigation";

export default function Home() {
  redirect('/streamers');
  return null; // 不需要渲染内容，重定向会自动发生
}