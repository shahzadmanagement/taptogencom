export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean';
  description: string;
  required: boolean;
}

export interface ToolDef {
  name: string;
  description: string;
  parameters: ToolParameter[];
  handler: (args: Record<string, any>) => Promise<any>;
}
