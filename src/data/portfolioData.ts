import { ServiceItem, StrengthItem, WorkflowStep, ToolItem, ProjectItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Mustapha Zainab Olabimpe',
  preferredName: 'Zainab',
  title: 'Certified Virtual Assistant | Administrative Support | Data Entry',
  email: 'mustaphazainab186@gmail.com',
  location: 'Lagos State, Nigeria (Available Globally / Remote)',
  university: 'Lagos State University (LASU)',
  major: 'Linguistics',
  socials: {
    linkedin: 'https://www.linkedin.com/in/zainab-mustapha-b94018378',
    instagram: 'https://www.instagram.com/yourgirlbimpe/',
    facebook: 'https://www.facebook.com/share/1DXuh9BVgD/',
  },
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'admin-support',
    title: 'Administrative Support',
    tag: 'Core Support',
    description: 'Providing seamless operational assistance to keep routine business processes running smoothly and reliably.',
    iconName: 'ClipboardCheck',
    tasks: [
      'Managing routine administrative tasks',
      'Organizing digital files and documents',
      'Maintaining spreadsheets and records',
      'Assisting with day-to-day business organization',
    ],
  },
  {
    id: 'email-management',
    title: 'Email Management',
    tag: 'Communication',
    description: 'Bringing order to busy inboxes through structured triage, prioritization, and timely professional responses.',
    iconName: 'Mail',
    tasks: [
      'Organizing and managing inboxes',
      'Sorting and prioritizing emails',
      'Drafting professional responses',
      'Following up on routine correspondence',
    ],
  },
  {
    id: 'calendar-management',
    title: 'Calendar & Appointment Management',
    tag: 'Scheduling',
    description: 'Ensuring your schedule is conflicts-free, well-coordinated, and optimized for your most productive hours.',
    iconName: 'CalendarCheck2',
    tasks: [
      'Scheduling appointments and meetings',
      'Managing calendars across timezones',
      'Setting reminders and meeting briefings',
      'Coordinating schedules and cancellations',
    ],
  },
  {
    id: 'data-entry',
    title: 'Data Entry & Organization',
    tag: 'Data Accuracy',
    description: 'Meticulous data handling with zero compromises on accuracy, consistency, and data formatting.',
    iconName: 'Table2',
    tasks: [
      'Accurate data entry and verification',
      'Spreadsheet creation and updating',
      'Data cleaning and organization',
      'Transferring information between documents and platforms',
    ],
  },
  {
    id: 'online-research',
    title: 'Online Research',
    tag: 'Analysis',
    description: 'Leveraging investigative linguistics and academic research methods to synthesize actionable insights.',
    iconName: 'SearchCode',
    tasks: [
      'Finding and organizing relevant information online',
      'Compiling research into clear documents or spreadsheets',
      'Researching companies, products, services, and market information',
    ],
  },
  {
    id: 'general-va',
    title: 'General Virtual Assistance',
    tag: 'Operations',
    description: 'Dependable day-to-day coordination to free up founders, executives, and business owners to focus on growth.',
    iconName: 'Workflow',
    tasks: [
      'Internet and administrative research',
      'Document preparation and formatting',
      'Task organization and backlog tracking',
      'Basic customer support and inquiries',
      'Other routine tasks that keep daily operations running',
    ],
  },
];

export const STRENGTHS: StrengthItem[] = [
  {
    id: 'organized',
    title: 'Organized',
    description: 'I bring structure to tasks, information, documents, and schedules.',
    iconName: 'FolderTree',
  },
  {
    id: 'detail-oriented',
    title: 'Detail-Oriented',
    description: 'I pay close attention to accuracy and consistency.',
    iconName: 'Eye',
  },
  {
    id: 'clear-communicator',
    title: 'Clear Communicator',
    description: 'My background in Linguistics strengthens my ability to communicate information clearly and professionally.',
    iconName: 'MessageSquare',
  },
  {
    id: 'fast-learner',
    title: 'Fast Learner',
    description: 'I adapt quickly to new tools, workflows, and responsibilities.',
    iconName: 'Zap',
  },
  {
    id: 'dependable-support',
    title: 'Dependable Support',
    description: 'I focus on helping clients and teams keep everyday operations running smoothly.',
    iconName: 'ShieldCheck',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Understand',
    description: 'I learn about your needs, priorities, workflow, and expectations.',
    details: 'Initial onboarding to understand your preferred communication channels, tool preferences, and goals.',
  },
  {
    step: '02',
    title: 'Organize',
    description: 'I structure tasks, information, documents, schedules, and priorities.',
    details: 'Creating clean folders, scheduling queues, task boards, or spreadsheets to eliminate operational clutter.',
  },
  {
    step: '03',
    title: 'Execute',
    description: 'I complete assigned tasks carefully and efficiently.',
    details: 'Hands-on task completion with careful double-checking for accuracy, clarity, and deadlines.',
  },
  {
    step: '04',
    title: 'Support',
    description: 'I communicate progress and help keep your workflow moving.',
    details: 'Clear status updates, prompt answers, and ongoing assistance so your workday stays calm and aligned.',
  },
];

export const TOOLS: ToolItem[] = [
  {
    name: 'Google Workspace',
    category: 'Productivity & Collaboration',
    description: 'Google Docs, Sheets, Drive, Gmail, and Forms for centralized office communication and document control.',
    iconType: 'google',
    proficiency: 'Daily Driver',
  },
  {
    name: 'Microsoft Excel',
    category: 'Data & Spreadsheets',
    description: 'Data entry, spreadsheet formatting, filtering, cleaning records, and administrative calculations.',
    iconType: 'excel',
    proficiency: 'Data Operations',
  },
  {
    name: 'Canva',
    category: 'Visual & Document Design',
    description: 'Creating clean visual assets, presentations, social media templates, and branded business collateral.',
    iconType: 'canva',
    proficiency: 'Content & Layouts',
  },
  {
    name: 'Asana',
    category: 'Task & Project Management',
    description: 'Managing task dependencies, delegating deliverables, setting milestones, and tracking team progress.',
    iconType: 'asana',
    proficiency: 'Task Tracking',
  },
  {
    name: 'Trello',
    category: 'Kanban Workflow',
    description: 'Organizing visual workflow boards, order pipelines, priority lists, and stage-by-stage task tracking.',
    iconType: 'trello',
    proficiency: 'Workflow Boards',
  },
  {
    name: 'Calendly',
    category: 'Appointment Scheduling',
    description: 'Automating meeting bookings, setting buffer times, coordinating client calls, and managing time zones.',
    iconType: 'calendly',
    proficiency: 'Calendar Coordination',
  },
];

export const SELECTED_PROJECTS: ProjectItem[] = [
  {
    id: 'bimpes-bakery',
    name: "Bimpe's Bakery Order & Workflow Board",
    category: 'Project Management & Workflow Organization',
    description: 'An interactive Trello board designed to organize daily bakery operations, track pending custom orders, manage baking workflows, and maintain status updates from order intake to packaging and fulfillment.',
    tools: ['Trello', 'Workflow Design', 'Status Tracking'],
    url: 'https://trello.com/invite/b/6a7639e763fe9134602e78df/ATTIf1102650f586ca7fb0c42df31d2c6b185610EB83/bimpes-bakery',
    highlights: [
      'Visual order pipeline categorized into Pending, In-Progress, Baked, and Dispatched',
      'Card labels for special dietary requests, payment statuses, and deadlines',
      'Standardized card checklists for recipe prep and packaging requirements',
    ],
    accessNote: 'Live public Trello board link',
  },
  {
    id: 'client-intake-form',
    name: 'Client Intake & Service Inquiry System',
    category: 'Form Creation & Client Onboarding',
    description: 'A structured Google Form created to streamline incoming customer service requests, gather essential project requirements, and standardize customer communication for fast turnaround.',
    tools: ['Google Forms', 'Customer Intake', 'Process Standardization'],
    url: 'https://forms.gle/NdrWjyhVfotbJng98',
    highlights: [
      'Required fields structured to capture project scope and timelines upfront',
      'User-friendly question branching to categorize customer needs',
      'Automated submission collection for administrative tracking',
    ],
    accessNote: 'Interactive Google Form',
  },
  {
    id: 'admin-doc-repository',
    name: 'Administrative Documentation & File Repository',
    category: 'Document Preparation & File Organization',
    description: 'A structured Google Drive workspace establishing categorized folder hierarchies for business documents, client files, and administrative records to ensure easy access and confidentiality.',
    tools: ['Google Drive', 'Google Docs', 'Information Architecture'],
    url: 'https://drive.google.com/drive/folders/1G4NwEU20hPHsJzTz_UOIcdyfa_QObHiI',
    highlights: [
      'Standardized folder naming conventions and sub-category sorting',
      'Logical classification designed for rapid retrieval by team members',
      'Structured permissions and document filing protocols',
    ],
    accessNote: 'Google Drive Repository',
  },
  {
    id: 'data-records-archive',
    name: 'Business Data & Operational Spreadsheets',
    category: 'Data Organization & Records',
    description: 'A dedicated spreadsheet and document archive designed for managing administrative records, cross-referencing information, and maintaining organized business data.',
    tools: ['Google Drive', 'Google Sheets', 'Data Cleaning'],
    url: 'https://drive.google.com/drive/folders/1aj9REZNu9xP7dJ6xnhqD9qDHwADuYTBd',
    highlights: [
      'Clean data categorization preventing duplicated records',
      'Formulas and formatted headers for readability and verification',
      'Organized reference materials for daily operations',
    ],
    accessNote: 'Google Drive Repository',
  },
];

export const CURRENTLY_OPEN_TO = [
  'Internships',
  'Entry-Level Opportunities',
  'Freelance Projects',
  'Virtual Assistance',
  'Administrative Support',
  'Research',
  'Digital Marketing',
  'Content Creation',
];

export const LINGUISTICS_ADVANTAGES = [
  {
    title: 'Strong Communication',
    desc: 'Trained to analyze tone, clarity, and register to write professional, courteous correspondence.',
  },
  {
    title: 'Research & Synthesis',
    desc: 'Skilled in academic inquiry, cross-referencing sources, and summarizing complex data succinctly.',
  },
  {
    title: 'Attention to Detail',
    desc: 'Phonetic and structural linguistic analysis builds a sharp eye for typos, consistency, and formatting.',
  },
  {
    title: 'Information Analysis',
    desc: 'Natural ability to organize unstructured data, identify patterns, and build logical systems.',
  },
  {
    title: 'Clear Written Expression',
    desc: 'Producing concise emails, client briefs, process documents, and reports that leave zero ambiguity.',
  },
  {
    title: 'Understanding People & Culture',
    desc: 'Sociolinguistic foundation enables empathetic collaboration across diverse multilingual teams.',
  },
];
