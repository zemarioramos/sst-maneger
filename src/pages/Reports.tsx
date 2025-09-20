import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('exams');

  // Mock data for reports
  const examsByMonthData = [
    { month: 'Jan', realizados: 25, agendados: 30, cancelados: 3 },
    { month: 'Fev', realizados: 32, agendados: 28, cancelados: 2 },
    { month: 'Mar', realizados: 28, agendados: 35, cancelados: 5 },
    { month: 'Abr', realizados: 35, agendados: 32, cancelados: 4 },
    { month: 'Mai', realizados: 38, agendados: 30, cancelados: 2 },
    { month: 'Jun', realizados: 30, agendados: 25, cancelados: 3 },
  ];

  const risksByDepartmentData = [
    { department: 'Produção', alto: 3, medio: 5, baixo: 2 },
    { department: 'Manutenção', alto: 2, medio: 3, baixo: 4 },
    { department: 'Administrativo', alto: 0, medio: 2, baixo: 6 },
    { department: 'TI', alto: 0, medio: 1, baixo: 3 },
    { department: 'Vendas', alto: 1, medio: 2, baixo: 4 },
  ];

  const complianceData = [
    { month: 'Jan', taxa: 88.5 },
    { month: 'Fev', taxa: 90.2 },
    { month: 'Mar', taxa: 87.8 },
    { month: 'Abr', taxa: 92.1 },
    { month: 'Mai', taxa: 94.3 },
    { month: 'Jun', taxa: 92.5 },
  ];

  const documentTypeData = [
    { name: 'ASO', value: 45, color: '#3B82F6' },
    { name: 'PCMSO', value: 20, color: '#10B981' },
    { name: 'PGR', value: 25, color: '#F59E0B' },
    { name: 'LTCAT', value: 10, color: '#EF4444' },
  ];

  const reportTypes = [
    { value: 'exams', label: 'Relatório de Exames' },
    { value: 'risks', label: 'Relatório de Riscos' },
    { value: 'compliance', label: 'Relatório de Conformidade' },
    { value: 'documents', label: 'Relatório de Documentos' },
  ];

  const periodOptions = [
    { value: 'monthly', label: 'Mensal' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' },
  ];

  const renderChart = () => {
    switch (selectedReport) {
      case 'exams':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={examsByMonthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="realizados" fill="#10B981" name="Realizados" />
              <Bar dataKey="agendados" fill="#3B82F6" name="Agendados" />
              <Bar dataKey="cancelados" fill="#EF4444" name="Cancelados" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'risks':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={risksByDepartmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="alto" fill="#EF4444" name="Alto" />
              <Bar dataKey="medio" fill="#F59E0B" name="Médio" />
              <Bar dataKey="baixo" fill="#10B981" name="Baixo" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'compliance':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={complianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[80, 100]} />
              <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conformidade']} />
              <Legend />
              <Line type="monotone" dataKey="taxa" stroke="#3B82F6" strokeWidth={3} name="Taxa de Conformidade (%)" />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'documents':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={documentTypeData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {documentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const getReportTitle = () => {
    const report = reportTypes.find(r => r.value === selectedReport);
    return report?.label || 'Relatório';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Relatórios e Dashboards</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Exportar PDF
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Exames Este Mês</p>
              <p className="text-2xl font-bold text-gray-900">38</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taxa Conformidade</p>
              <p className="text-2xl font-bold text-gray-900">92.5%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Riscos Ativos</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Documentos Gerados</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {reportTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {periodOptions.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>

          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtros Avançados
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{getReportTitle()}</h2>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            Período: {selectedPeriod === 'monthly' ? 'Últimos 6 meses' : selectedPeriod === 'quarterly' ? 'Últimos 4 trimestres' : 'Últimos 3 anos'}
          </div>
        </div>
        {renderChart()}
      </div>

      {/* Report Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Relatório</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Principais Indicadores</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Total de exames realizados no período: 189</li>
              <li>• Taxa média de comparecimento: 94.2%</li>
              <li>• Documentos ASO gerados: 45</li>
              <li>• Funcionários com restrições: 8</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Observações</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Aumento de 12% nos exames realizados</li>
              <li>• Redução de 5% nos cancelamentos</li>
              <li>• Conformidade acima da meta (90%)</li>
              <li>• Todos os riscos altos estão sendo monitorados</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
