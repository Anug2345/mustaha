export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  iconName: string;
  tag: string;
}

export interface StrengthItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  details: string;
}

export interface ToolItem {
  name: string;
  category: string;
  description: string;
  iconType: string;
  proficiency: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  tools: string[];
  url: string;
  highlights: string[];
  accessNote?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}
