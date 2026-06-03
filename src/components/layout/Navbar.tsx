"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const LinkItems = [
  { name: "Dashboard", href: "/" },
  { name: "Expenses", href: "/expenses" },
  { name: "Budget", href: "/budget" },
  { name: "AI Coach", href: "/ai-coach" },
];

const Navbar = () => {
  const pathname = usePathname();

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

        <div className="hidden md:block">
          <Image 
            src="/images/avatar.jpg" 
            alt="avatar" 
            width={35} 
            height={35} 
            className="rounded-full border border-gray-700" 
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

              <div className="absolute bottom-10 left-8 flex items-center gap-4 border-t border-gray-800 pt-8 w-52.5">
                <Image src="/images/avatar.jpg" alt="avatar" width={40} height={40} className="rounded-full" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">My Account</span>
                  <span className="text-xs text-gray-500">Settings</span>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;