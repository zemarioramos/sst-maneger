import React, { useState } from 'react';
import { Plus, Shield, AlertTriangle, Eye, Edit, Trash2, Users } from 'lucide-react';
import { mockRisks, mockEmployees } from '../services/mockData';

const Risks: React.FC = () => {
  const [risks] = useState(mockRisks);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Shield className="h-5 w-5 text-green-500" />;
    }
  };

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case 'high':
        return 'Alto';
      case 'medium':
        return 'Médio';
      default:
        return 'Baixo';
    }
  };

  const getTypeText = (type: string) => {
    const types = {
      physical: 'Físico',
      chemical: 'Químico',
      biological: 'Biológico',
      ergonomic: 'Ergonômico',
      accident: 'Acidente',
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Riscos Ocupacionais</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Novo Risco
        </button>
      </div>

      {/* Risk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Riscos Altos</p>
              <p className="text-2xl font-bold text-gray-900">
                {risks.filter(r => r.level === 'high').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Riscos Médios</p>
              <p className="text-2xl font-bold text-gray-900">
                {risks.filter(r => r.level === 'medium').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Riscos Baixos</p>
              <p className="text-2xl font-bold text-gray-900">
                {risks.filter(r => r.level === 'low').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Expostos</p>
              <p className="text-2xl font-bold text-gray-900">
                {risks.reduce((total, risk) => total + risk.employees.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Risks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {risks.map((risk) => (
          <div key={risk.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {getRiskIcon(risk.level)}
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{risk.name}</h3>
                  <p className="text-sm text-gray-600">{getTypeText(risk.type)}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getRiskBadgeColor(risk.level)}`}>
                {getRiskLevelText(risk.level)}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-4">{risk.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>{risk.department}</span>
              <span>{risk.employees.length} funcionários</span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedRisk(risk.id)}
                className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                Ver Detalhes
              </button>
              <button className="bg-gray-50 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-100">
                <Edit className="h-4 w-4" />
              </button>
              <button className="bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Risk Detail Modal */}
      {selectedRisk && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Detalhes do Risco</h2>
                <button
                  onClick={() => setSelectedRisk(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {(() => {
                const risk = risks.find(r => r.id === selectedRisk);
                if (!risk) return null;

                const exposedEmployees = mockEmployees.filter(emp => 
                  risk.employees.includes(emp.id)
                );

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nome do Risco</label>
                        <p className="mt-1 text-sm text-gray-900">{risk.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <p className="mt-1 text-sm text-gray-900">{getTypeText(risk.type)}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nível de Risco</label>
                        <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getRiskBadgeColor(risk.level)}`}>
                          {getRiskLevelText(risk.level)}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Departamento</label>
                        <p className="mt-1 text-sm text-gray-900">{risk.department}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descrição</label>
                      <p className="mt-1 text-sm text-gray-900">{risk.description}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Funcionários Expostos ({exposedEmployees.length})
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {exposedEmployees.map(employee => (
                          <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{employee.name}</p>
                              <p className="text-xs text-gray-600">{employee.position}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Risks;
