export interface Employee {
  id: string;
  name: string;
  cpf: string;
  email: string;
  department: string;
  position: string;
  admissionDate: string;
  status: 'active' | 'inactive';
}

export interface Risk {
  id: string;
  type: 'physical' | 'chemical' | 'biological' | 'ergonomic' | 'accident';
  name: string;
  description: string;
  level: 'low' | 'medium' | 'high';
  department: string;
  employees: string[];
  createdAt: string;
}

export interface Exam {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'audiometry' | 'clinical' | 'vision' | 'laboratory' | 'x-ray';
  scheduledDate: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  results?: ExamResult;
  observations?: string;
  createdAt: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  data: Record<string, any>;
  conclusion: string;
  restrictions?: string;
  nextExamDate?: string;
  completedAt: string;
  doctorName: string;
}

export interface Document {
  id: string;
  type: 'ASO' | 'PCMSO' | 'PGR' | 'LTCAT';
  employeeId?: string;
  title: string;
  filePath: string;
  generatedAt: string;
  signedAt?: string;
  doctorName?: string;
}

export interface ESocialEvent {
  id: string;
  eventType: string;
  employeeId: string;
  xmlContent: string;
  status: 'pending' | 'sent' | 'error';
  sentAt?: string;
  errorMessage?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalEmployees: number;
  pendingExams: number;
  completedExams: number;
  highRisks: number;
  documentsGenerated: number;
  complianceRate: number;
}
