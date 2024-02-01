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
import { HiScissors } from "react-icons/hi";
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

const Header = () => {
  const { data, status } = useSession();

  const handleLoginClick = async () => {
    await signIn("google");
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <Card>
      <CardContent className="mx-auto flex w-full max-w-7xl items-center justify-around p-3">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Quick Barber"
            height={0}
            width={0}
            sizes="100vw"
            priority
            className="h-auto w-32 object-cover"
          />
        </Link>

        {status === "loading" ? (
          <ClipLoader color="#3B82F6" size={20} />
        ) : (
          <div>
            <div className="hidden items-center justify-center gap-4 md:flex">
              {data?.user && status === "authenticated" && (
                <Button variant={"ghost"} asChild>
                  <Link href="/bookings">
                    Agendamentos{" "}
                    <IoCalendarOutline className="ml-2" size={20} />
                  </Link>
                </Button>
              )}
              {!data?.user && status === "unauthenticated" ? (
                <Button
                  onClick={handleLoginClick}
                  variant={"default"}
                  className="flex items-center justify-center gap-2 text-white"
                >
                  Login <ImEnter size={20} />
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex cursor-pointer items-center gap-4">
                      <Avatar className="h-9 w-9 select-none">
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
              )}
            </div>

            <div className="md:hidden">
              <Sheet>
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
                      <Card className="mt-5 bg-[url('/capa.png')] bg-cover bg-center bg-no-repeat">
                        <CardHeader className="flex flex-col gap-2">
                          <div className="flex cursor-pointer items-center gap-4">
                            <Avatar className="select-none">
                              <AvatarImage src={data?.user?.image as string} />
                              <AvatarFallback>
                                <FaUser />
                              </AvatarFallback>
                            </Avatar>
                            <p className="text-sm">{data?.user?.name}</p>
                          </div>

                          <p className="text-sm text-muted-foreground">
                            {data?.user?.email}
                          </p>
                        </CardHeader>
                      </Card>

                      <Separator className="my-5" />

                      <div className="flex w-full flex-col gap-2">
                        <Button
                          variant={"outline"}
                          className=" text-white"
                          asChild
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
                          className=" text-white"
                          asChild
                        >
                          <Link
                            href="/bookings"
                            className="flex w-full items-center justify-center gap-2"
                          >
                            Agendamentos <IoCalendarOutline size={20} />
                          </Link>
                        </Button>

                        <Button
                          onClick={handleLogoutClick}
                          variant={"outline"}
                          className="flex items-center justify-center gap-2 text-white"
                        >
                          Logout <ImExit size={20} />
                        </Button>
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
  );
};

export default Header;
