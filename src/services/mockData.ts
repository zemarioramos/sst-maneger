import { faker } from '@faker-js/faker';
import { Employee, Risk, Exam, Document, ESocialEvent, DashboardStats } from '../types';

faker.locale = 'pt_BR';

// Mock employees data
export const mockEmployees: Employee[] = Array.from({ length: 50 }, (_, i) => ({
  id: `emp-${i + 1}`,
  name: faker.person.fullName(),
  cpf: faker.helpers.replaceSymbols('###.###.###-##'),
  email: faker.internet.email(),
  department: faker.helpers.arrayElement(['Produção', 'Administrativo', 'Vendas', 'TI', 'RH', 'Manutenção']),
  position: faker.person.jobTitle(),
  admissionDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
  status: faker.helpers.arrayElement(['active', 'inactive']) as 'active' | 'inactive',
}));

// Mock risks data
export const mockRisks: Risk[] = [
  {
    id: 'risk-1',
    type: 'physical',
    name: 'Ruído Excessivo',
    description: 'Exposição a níveis de ruído superiores a 85 dB',
    level: 'high',
    department: 'Produção',
    employees: ['emp-1', 'emp-2', 'emp-3'],
    createdAt: '2024-01-15',
  },
  {
    id: 'risk-2',
    type: 'chemical',
    name: 'Vapores Químicos',
    description: 'Exposição a vapores de solventes orgânicos',
    level: 'medium',
    department: 'Produção',
    employees: ['emp-4', 'emp-5'],
    createdAt: '2024-01-20',
  },
  {
    id: 'risk-3',
    type: 'ergonomic',
    name: 'Postura Inadequada',
    description: 'Trabalho prolongado em posição inadequada',
    level: 'low',
    department: 'Administrativo',
    employees: ['emp-6', 'emp-7', 'emp-8'],
    createdAt: '2024-02-01',
  },
];

// Mock exams data
export const mockExams: Exam[] = Array.from({ length: 30 }, (_, i) => ({
  id: `exam-${i + 1}`,
  employeeId: `emp-${Math.floor(Math.random() * 50) + 1}`,
  employeeName: faker.person.fullName(),
  type: faker.helpers.arrayElement(['audiometry', 'clinical', 'vision', 'laboratory', 'x-ray']) as any,
  scheduledDate: faker.date.future().toISOString().split('T')[0],
  status: faker.helpers.arrayElement(['scheduled', 'in-progress', 'completed', 'cancelled']) as any,
  observations: faker.lorem.sentence(),
  createdAt: faker.date.recent().toISOString(),
}));

// Mock documents data
export const mockDocuments: Document[] = Array.from({ length: 20 }, (_, i) => ({
  id: `doc-${i + 1}`,
  type: faker.helpers.arrayElement(['ASO', 'PCMSO', 'PGR', 'LTCAT']) as any,
  employeeId: Math.random() > 0.3 ? `emp-${Math.floor(Math.random() * 50) + 1}` : undefined,
  title: `Documento ${faker.helpers.arrayElement(['ASO', 'PCMSO', 'PGR', 'LTCAT'])} - ${faker.date.recent().toLocaleDateString('pt-BR')}`,
  filePath: `/documents/${faker.system.fileName()}.pdf`,
  generatedAt: faker.date.recent().toISOString(),
  signedAt: Math.random() > 0.5 ? faker.date.recent().toISOString() : undefined,
  doctorName: 'Dr. Maria Silva',
}));

// Mock eSocial events
export const mockESocialEvents: ESocialEvent[] = Array.from({ length: 15 }, (_, i) => ({
  id: `event-${i + 1}`,
  eventType: 'S-2220',
  employeeId: `emp-${Math.floor(Math.random() * 50) + 1}`,
  xmlContent: '<xml>evento exemplo</xml>',
  status: faker.helpers.arrayElement(['pending', 'sent', 'error']) as any,
  sentAt: Math.random() > 0.5 ? faker.date.recent().toISOString() : undefined,
  errorMessage: Math.random() > 0.7 ? 'Erro na validação do XML' : undefined,
  createdAt: faker.date.recent().toISOString(),
}));

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalEmployees: 50,
  pendingExams: 12,
  completedExams: 38,
  highRisks: 3,
  documentsGenerated: 20,
  complianceRate: 92.5,
};
