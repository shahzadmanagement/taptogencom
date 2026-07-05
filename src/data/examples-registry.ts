export interface ExampleItem {
  input: string;
  output: string;
}

export const reusableExamples: Record<string, ExampleItem[]> = {
  general: [
    { input: "Hello World", output: "Hello World" },
    { input: "TapToGen Generator", output: "TapToGen Generator" },
    { input: "Modern Web Design", output: "Modern Web Design" }
  ],
  social: [
    { input: "Check out this link", output: "Check out this link" },
    { input: "Special discount code", output: "Special discount code" },
    { input: "New video tomorrow", output: "New video tomorrow" }
  ]
};
