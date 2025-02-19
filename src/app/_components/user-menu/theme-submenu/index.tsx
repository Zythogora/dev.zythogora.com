"use client";

import { CheckIcon, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { availableThemes } from "@/app/_components/providers/theme-provider";
import {
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/app/_components/ui/dropdown-menu";

const ThemeSubMenu = () => {
  const t = useTranslations();

  const { theme: selectedTheme, setTheme } = useTheme();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        {selectedTheme === "dark" ? (
          <Moon className="mr-2 h-4 w-4" />
        ) : (
          <Sun className="mr-2 h-4 w-4" />
        )}

        <span>Theme</span>
      </DropdownMenuSubTrigger>

      <DropdownMenuSubContent>
        {["system" as const, ...availableThemes].map((theme) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => setTheme(theme)}
            disabled={theme === selectedTheme}
          >
            <span>{t(`theme.${theme}`)}</span>

            {theme === selectedTheme && (
              <DropdownMenuShortcut className="ml-auto size-4">
                <CheckIcon />
              </DropdownMenuShortcut>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default ThemeSubMenu;
