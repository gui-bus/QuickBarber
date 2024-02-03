"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const searchSchema = z.object({
  search: z
    .string({
      required_error: "Campo obrigatório!",
    })
    .trim()
    .min(1, "Campo obrigatório!"),
});

const Search = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  const handleSubmit = (data: z.infer<typeof searchSchema>) => {
    router.push(`/barbershops?search=${data.search}`);
  };
  return (
    <div className="flex items-center gap-2">
      <Form {...form}>
        <form
          className="flex w-full gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Busque por uma barbearia..."
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <Button variant={"default"} type="submit" className="rounded-full">
            <SearchIcon size={20} className="text-white" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Search;
