import React, { useRef } from "react";
import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import Image from "next/image";

const urlEndpoint: string = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const publicKey: string = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

const authenticator = async (): Promise<{
  signature: string;
  expire: number;
  token: string;
}> => {
  try {
    const response = await fetch("/api/v1/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface UploadImageProps {
  setImg: React.Dispatch<
    React.SetStateAction<{
      isLoading: boolean;
      error?: string;
      dbData?: any;
      aiData?: any;
    }>
  >;
}

const UploadImage: React.FC<UploadImageProps> = ({ setImg }) => {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const onError = (err: any): void => {
    if (err instanceof Error) {
      console.log("Error:", err.message);
    } else {
      console.log("Upload Error:", err);
    }
  };

  const onSuccess = (res: any): void => {
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadProgress = (progress: ProgressEvent): void => {
    console.log("Progress", progress);
  };

  const onUploadStart = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const base64Data = reader.result.split(",")[1];
        setImg((prev) => ({
          ...prev,
          isLoading: true,
          aiData: {
            inlineData: {
              data: base64Data,
              mimeType: file.type,
            },
          },
        }));
      } else {
        console.error("File reading failed or the result is not a string.");
      }
    };
    console.log('console here')

    reader.readAsDataURL(file);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      {
        <label
          onClick={() => ikUploadRef.current?.click()}
          className="rounded-full bg-[#605e68] border-none p-2.5 flex items-center justify-center cursor-pointer"
        >
          <Image src="/attachment.png" alt="Upload" width={16} height={16} />
        </label>
      }
    </IKContext>
  );
};

export default UploadImage;
