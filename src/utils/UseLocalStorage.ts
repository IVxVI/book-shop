'use client'

import { CartItem } from "@/types/CartItem";
import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: CartItem[] | []) => {
  const [value, setValue] = useState(() => {
    try {
      const data = localStorage.getItem(key);

      return data ? JSON.parse(data) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (currentValue: CartItem[]) => {
    setValue(currentValue);
    localStorage.setItem(key, JSON.stringify(currentValue));
  };

  return [value, save];
};