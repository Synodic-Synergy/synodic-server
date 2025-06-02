declare module '#imports' {
  export const useHead: (head: any) => void;
  export const useNuxtApp: () => {
    $fetch: typeof $fetch;
    $state: any;
    $config: any;
    [key: string]: any;
  };
}

declare module '#app/nuxt' {
  export const useNuxtApp: () => {
    $fetch: typeof $fetch;
    $state: any;
    $config: any;
    [key: string]: any;
  };
} 