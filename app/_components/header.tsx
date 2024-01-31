import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="mx-auto flex w-full max-w-7xl items-center justify-around p-5">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Quick Barber"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-44 object-cover"
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>TODO: Add menu items</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
