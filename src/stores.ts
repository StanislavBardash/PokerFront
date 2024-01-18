import { writable } from 'svelte/store';

type DictType = { [key: number]: string[] }; // Adjust 'string' to the actual type of your array elements
type RoomType = { [key: number]: string };
export const dict = writable<DictType>({});
export const counter = writable<number>(0);
type InfType = { [key: number]: string[] };
export const information = writable<InfType>({});
export const addKeyWithValue = (key: number, value: string[]) => {
  dict.update((dictionary) => {
    return { ...dictionary, [key]: value };
  });
};
export const addInformationWithValue = (key: number, value: string[]) => {
  information.update((dictionary) => {
    return { ...dictionary, [key]: value };
  });
};
export const room_names = writable<RoomType>({});

export const addRoomNameWithValue = (key: number, value: string) => {
  room_names.update((dictionary) => {
    return { ...dictionary, [key]: value };
  });
};