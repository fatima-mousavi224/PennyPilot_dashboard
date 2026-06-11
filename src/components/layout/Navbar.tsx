"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const LinkItems = [
  { name: "Dashboard", href: "/" },
  { name: "Expenses", href: "/expenses" },
  { name: "Budget", href: "/budget" },
  { name: "AI Coach", href: "/coach" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string>("/images/avatar.jpg");

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.avatar_url) {
        setAvatarUrl(user.user_metadata.avatar_url);
      }
    };

    fetchUserAvatar();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.user_metadata?.avatar_url) {
        setAvatarUrl(session.user.user_metadata.avatar_url);
      } else {
        setAvatarUrl("/images/avatar.jpg");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14  py-6">
        
        <Link href="/" className="z-50">
          <Image src="/dark-logo/dark-logo-2.svg" alt="logo" width={35} height={35} />
        </Link>

        <div className="hidden md:flex flex-1 justify-center items-center gap-10">
          {LinkItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "body text-primary",
                pathname === item.href ? "text-secondary" : "text-primary hover:text-secondary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 relative">
          <button
            onClick={handleSignOut}
            className="text-red-500 hover:text-red-400 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-all active:scale-95 flex items-center justify-center focus:outline-none"
            title="Sign Out"
          >
            <LogOut size={15} />
          </button>
          
          <Image 
            src={avatarUrl} 
            alt="avatar" 
            width={35} 
            height={35} 
            className="rounded-full border border-gray-700 object-cover aspect-square shrink-0" 
          />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="focus:outline-none p-2">
                <Menu className="h-6 w-8 text-primary" />
              </button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-70 bg-background border-l border-gray-800 p-0 pt-16 text-primary"
            >
              <div className="pl-8 mb-10">
               <Image src="/dark-logo/dark-logo-1.svg" alt="logo 1" width={120} height={120}/>
              </div>

              <div className="flex flex-col">
                {LinkItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "px-8 py-5 body transition-all border-l-4",
                          isActive 
                            ? "text-white border-secondary" 
                            : "text-primary border-transparent hover:text-secondary"
                        )}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>

              <button 
                onClick={handleSignOut}
                className="absolute bottom-10 left-8 flex items-center justify-between border-t border-gray-800 pt-8 w-52.5 text-left focus:outline-none hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center gap-4">
                  <Image 
                    src={avatarUrl} 
                    alt="avatar" 
                    width={40} 
                    height={40} 
                    className="rounded-full object-cover aspect-square" 
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">My Account</span>
                    <span className="text-xs text-gray-500">Sign Out</span>
                  </div>
                </div>
                <LogOut size={16} className="text-red-500 mr-2" />
              </button>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;