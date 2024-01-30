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

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-around p-5">
        <Image
          src="/logo.png"
          alt="Quick Barber"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-44 object-cover"
        />

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
