"use client";

import CopyUrlComponent from "@/components/CustomUrl";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import AcceptMessage from "@/components/AcceptMessage";
import Messsage from "@/components/Messages";
import RestrictedWordsCard from "@/components/RestrictedWordsCard";
import UserAccountDropDown from "@/components/UserAccountDropDown";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { data: session } = useSession();
  const user: any = session?.user;
  const username = user?.username;

  const customUrl = `http://localhost:3000/send-message/${username}`
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="bg-[#3b82f6] dark:bg-gray-800 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">Whisper Box</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {!user ? (
                <Button
                  variant={"outline"}
                  className="text-blue-500"
                  onClick={async () => {
                    await signIn();
                  }}
                >
                  Login
                </Button>
              ) : (
                ""
              )}

              <ModeToggle />
              <UserAccountDropDown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8">
        <div className="text-center mb-3">
          <h2 className="text-4xl font-bold">
            Welcome, <span className="capitalize">{username}</span>!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your anonymous messages with ease
          </p>
        </div>
        <Card>
          <CardHeader>
          <CardTitle className="text-2xl">
               Your Personal Whisper URL
          </CardTitle>
          </CardHeader>
         <CardContent>
         <div className="flex justify-between items-center gap-4">
            <CopyUrlComponent url={customUrl} />
            <AcceptMessage />
          </div>
         </CardContent>
        </Card>

        {/* Messages Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-md">
          <Messsage />
        </div>

        {/* Restricted Words Section */}
        <div className="mt-8 bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-md">
          <RestrictedWordsCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#3b82f6] dark:bg-gray-800 text-white text-center py-4 mt-10">
        <p className="text-sm">© 2024 Whisper Box. Built with ❤️ by C&Cs.</p>
      </footer>
    </div>
  );
}
