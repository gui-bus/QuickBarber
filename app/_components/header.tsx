"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ImEnter, ImExit } from "react-icons/im";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IoCalendarOutline } from "react-icons/io5";
import { HiMoon, HiScissors, HiSun } from "react-icons/hi";
import { RiPagesLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { ClipLoader } from "react-spinners";
import Search from "../(home)/_components/search";
import { useTheme } from "next-themes";
import { useState } from "react";

const Header = () => {
  const { setTheme, theme } = useTheme();
  const { data, status } = useSession();
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const sheetButtonClick = () => {
    setSheetIsOpen(false);
  };

  const handleLoginClick = async () => {
    await signIn("google");
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <header>
      <Card className="border-b-primary rounded-b-none">
        <CardContent className="mx-auto flex w-full max-w-7xl items-center justify-around p-3">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Image
                src="/icon.png"
                alt="Quick Barber"
                height={0}
                width={0}
                sizes="100vw"
                priority
                className="h-auto w-14 object-cover"
              />

              <div className="flex flex-col items-center">
                <p className="text-xl font-black text-black dark:text-white">
                  QUICK
                </p>
                <p className="-mt-2 font-light text-black dark:text-white">
                  BARBER
                </p>
              </div>
            </div>
          </Link>

          <div className="hidden w-full max-w-xl lg:block">
            <Search />
          </div>

          {status === "loading" ? (
            <ClipLoader color="#3B82F6" size={20} />
          ) : (
            <div>
              <div className="hidden items-center justify-center gap-4 md:flex">
                {!data?.user && status === "unauthenticated" ? (
                  <div className="flex items-center gap-5">
                    <Button variant="ghost" onClick={toggleTheme} size={"icon"}>
                      {theme === "dark" ? (
                        <HiSun size={20} className="text-white" />
                      ) : (
                        <HiMoon size={20} />
                      )}
                    </Button>

                    <Button
                      onClick={handleLoginClick}
                      variant={"default"}
                      className="flex items-center justify-center gap-2 text-white"
                    >
                      Login <ImEnter size={20} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="flex cursor-pointer items-center gap-4">
                          <Avatar className="h-12 w-12 select-none border-2 border-primary">
                            <AvatarImage src={data?.user?.image as string} />
                            <AvatarFallback>
                              <FaUser />
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm">{data?.user?.name}</p>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel className="text-sm font-light text-muted-foreground">
                          {data?.user?.email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {data?.user && status === "authenticated" && (
                          <DropdownMenuItem>
                            <Button variant={"default"} asChild>
                              <Link href="/bookings" className="text-white">
                                Agendamentos{" "}
                                <IoCalendarOutline className="ml-2" size={20} />
                              </Link>
                            </Button>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Button
                            onClick={handleLogoutClick}
                            variant={"default"}
                            className="flex w-full items-center justify-center gap-2 text-white"
                          >
                            Logout <ImExit size={20} />
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost" onClick={toggleTheme} size={"icon"}>
                      {theme === "dark" ? (
                        <HiSun size={20} className="text-white" />
                      ) : (
                        <HiMoon size={20} />
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-5 md:hidden">
                <Button variant="ghost" onClick={toggleTheme} size={"icon"}>
                  {theme === "dark" ? (
                    <HiSun size={20} className="text-white" />
                  ) : (
                    <HiMoon size={20} />
                  )}
                </Button>

                <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant={"outline"} size={"icon"}>
                      <MenuIcon />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                      <SheetDescription className="flex flex-col items-center justify-center">
                        <Separator className="my-2" />
                        {status === "authenticated" ? (
                          <Card className="mt-5 flex w-full items-center justify-center bg-[url('/capa.png')] bg-cover bg-center bg-no-repeat">
                            <CardHeader className="flex flex-col gap-2">
                              <div className="flex cursor-pointer items-center gap-4">
                                <Avatar className="select-none">
                                  <AvatarImage
                                    src={data?.user?.image as string}
                                  />
                                  <AvatarFallback>
                                    <FaUser />
                                  </AvatarFallback>
                                </Avatar>
                                <p className="text-sm text-white">
                                  {data?.user?.name}
                                </p>
                              </div>

                              <p className="text-sm text-white/70 dark:text-muted-foreground">
                                {data?.user?.email}
                              </p>
                            </CardHeader>
                          </Card>
                        ) : (
                          <Button
                            onClick={handleLoginClick}
                            variant={"default"}
                            className="mt-4 flex w-full items-center justify-center gap-2 dark:text-white"
                          >
                            Login <ImEnter size={20} />
                          </Button>
                        )}

                        <Separator className="my-5" />

                        <div className="flex w-full flex-col gap-2">
                          <Button
                            variant={"outline"}
                            className=" dark:text-white"
                            asChild
                            onClick={sheetButtonClick}
                          >
                            <Link
                              href="/"
                              className="flex w-full items-center justify-center gap-2"
                            >
                              Página Inicial <RiPagesLine size={20} />
                            </Link>
                          </Button>

                          <Button
                            variant={"outline"}
                            className=" dark:text-white"
                            asChild
                            onClick={sheetButtonClick}
                          >
                            <Link
                              href="/bookings"
                              className="flex w-full items-center justify-center gap-2"
                            >
                              Agendamentos <IoCalendarOutline size={20} />
                            </Link>
                          </Button>

                          {status === "authenticated" && (
                            <Button
                              onClick={handleLogoutClick}
                              variant={"outline"}
                              className="flex items-center justify-center gap-2 dark:text-white"
                            >
                              Logout <ImExit size={20} />
                            </Button>
                          )}
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
