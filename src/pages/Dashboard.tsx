import React from 'react';
import { Users, Calendar, Shield, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import { mockDashboardStats, mockExams, mockRisks } from '../services/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;

  // Mock data for charts
  const examsTrendData = [
    { month: 'Jan', completed: 25, scheduled: 30 },
    { month: 'Fev', completed: 32, scheduled: 28 },
    { month: 'Mar', completed: 28, scheduled: 35 },
    { month: 'Abr', completed: 35, scheduled: 32 },
    { month: 'Mai', completed: 38, scheduled: 30 },
    { month: 'Jun', completed: 30, scheduled: 25 },
  ];

  const risksByDepartment = [
    { department: 'Produção', high: 3, medium: 5, low: 2 },
    { department: 'Manutenção', high: 2, medium: 3, low: 4 },
    { department: 'Administrativo', high: 0, medium: 2, low: 6 },
    { department: 'TI', high: 0, medium: 1, low: 3 },
  ];

  const examTypeDistribution = [
    { name: 'Audiometria', value: 35, color: '#3B82F6' },
    { name: 'Clínico', value: 25, color: '#10B981' },
    { name: 'Visão', value: 20, color: '#F59E0B' },
    { name: 'Laboratorial', value: 15, color: '#EF4444' },
    { name: 'Raio-X', value: 5, color: '#8B5CF6' },
  ];

  const recentExams = mockExams.slice(0, 5);
  const highRisks = mockRisks.filter(risk => risk.level === 'high');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard SST</h1>
        <div className="text-sm text-gray-500">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Funcionários"
          value={stats.totalEmployees}
          icon={Users}
          change="+5% este mês"
          changeType="positive"
          color="blue"
        />
        <StatsCard
          title="Exames Pendentes"
          value={stats.pendingExams}
          icon={Calendar}
          change="-2 esta semana"
          changeType="positive"
          color="yellow"
        />
        <StatsCard
          title="Riscos Altos"
          value={stats.highRisks}
          icon={AlertTriangle}
          change="Sem alteração"
          changeType="neutral"
          color="red"
        />
        <StatsCard
          title="Taxa de Conformidade"
          value={`${stats.complianceRate}%`}
          icon={Shield}
          change="+2.5% este mês"
          changeType="positive"
          color="green"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exams Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendência de Exames</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={examsTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#10B981" name="Realizados" />
              <Line type="monotone" dataKey="scheduled" stroke="#3B82F6" name="Agendados" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Riscos por Departamento</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={risksByDepartment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="high" fill="#EF4444" name="Alto" />
              <Bar dataKey="medium" fill="#F59E0B" name="Médio" />
              <Bar dataKey="low" fill="#10B981" name="Baixo" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exam Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Exames</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={examTypeDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {examTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Exams */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Exames Recentes</h3>
          <div className="space-y-3">
            {recentExams.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{exam.employeeName}</p>
                  <p className="text-xs text-gray-600 capitalize">{exam.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  exam.status === 'completed' ? 'bg-green-100 text-green-800' :
                  exam.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {exam.status === 'completed' ? 'Concluído' :
                   exam.status === 'in-progress' ? 'Em andamento' : 'Agendado'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* High Priority Risks */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Riscos Prioritários</h3>
          <div className="space-y-3">
            {highRisks.map((risk) => (
              <div key={risk.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-red-900">{risk.name}</p>
                    <p className="text-xs text-red-700">{risk.department}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                    Alto
                  </span>
                </div>
                <p className="text-xs text-red-600 mt-2">{risk.employees.length} funcionários expostos</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
