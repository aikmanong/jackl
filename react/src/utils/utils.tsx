import { FormEvent } from "react";

export const convertImgToBase64String = (
  event: FormEvent<HTMLInputElement> | undefined,
  callback: (param: string) => void
): void => {
  const files = event?.currentTarget.files;
  if (files && files.length) {
    const file = files.item(0);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      callback(base64String);
    };
    reader.readAsDataURL(file as Blob);
  }
};

export const getBase64FromUrl = async (url: string) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};
