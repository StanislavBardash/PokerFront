// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface Window {
		ethereum: import('ethers').providers.ExternalProvider;
	  }
	  export type Writable<T> = { -readonly [P in keyof T]: T[P] };
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
