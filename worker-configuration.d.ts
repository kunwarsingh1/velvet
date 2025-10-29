/// <reference lib="webworker" />

declare module '*?worker' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

declare module '*?worker&inline' {
  const workerConstructor: {
    new (): Worker;
  };
  export default workerConstructor;
}

// Make Env globally available
declare global {
  interface Env {
    // Add your environment variables here if needed
    // mple: API_KEY?: string;
  }
}

export {};