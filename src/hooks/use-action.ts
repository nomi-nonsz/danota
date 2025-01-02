import axios, { AxiosResponse, Method } from "axios";
import { useToast } from "./use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PostConfig {
  success?: {
    title: string,
    description?: React.ReactNode;
  };
  error?: {
    defaultDescription: string;
  };
  redirect?: (res: AxiosResponse<any, any>) => string;
  timeout?: number;
  refresh?: boolean;
}

export function useAction () {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, setPending] = useState<boolean>(false);

  async function action (req: () => Promise<AxiosResponse>, config?: PostConfig) {
    setPending(true);

    try {
      const res = await req();
      
      toast({
        title: config?.success?.title,
        description: config?.success?.description,
      })

      const redirectPath = config?.redirect?.(res);

      if (redirectPath)
        router.push(redirectPath);

      if (config?.refresh)
        router.refresh();
    }
    catch (err) {
      let message = config?.error?.defaultDescription ?? "Something went wrong";
      
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          message = "Request timeout, please try again"
        } else {
          message = err.response?.data?.message
        }
      }

      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    }
    finally {
      setPending(false);
    }
  }

  async function post (path: string, data: any, config?: PostConfig) {
    await action(
      () => axios.post(path, data, {
        timeout: config?.timeout ?? 10000
      }),
      config
    );
  }

  async function patch (path: string, data: any, config?: PostConfig) {
    await action(
      () => axios.patch(path, data, {
        timeout: config?.timeout ?? 10000
      }),
      config
    );
  }

  async function remove (path: string, config?: PostConfig, data?: any) {
    await action(
      () => axios.delete(path, {
        timeout: config?.timeout ?? 10000,
        data
      }),
      config
    );
  }
  
  return {
    pending: isPending,
    post,
    patch,
    remove
  };
}