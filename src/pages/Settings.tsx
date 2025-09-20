import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Shield, Bell, Users, FileText } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'Geral', icon: SettingsIcon },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'documents', label: 'Documentos', icon: FileText },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Configurações Gerais</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    defaultValue="Empresa XYZ Ltda"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CNPJ
                  </label>
                  <input
                    type="text"
                    defaultValue="12.345.678/0001-90"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    defaultValue="Rua das Empresas, 123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuso Horário
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="America/Sao_Paulo">América/São Paulo</option>
                    <option value="America/Manaus">América/Manaus</option>
                    <option value="America/Fortaleza">América/Fortaleza</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Configurações de Segurança</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Autenticação de Dois Fatores</h3>
                    <p className="text-sm text-gray-500">Adiciona uma camada extra de segurança</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Log de Auditoria</h3>
                    <p className="text-sm text-gray-500">Registra todas as ações dos usuários</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Criptografia de Dados Sensíveis</h3>
                    <p className="text-sm text-gray-500">Criptografa CPF e dados médicos</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tempo de Sessão (minutos)
                  </label>
                  <input
                    type="number"
                    defaultValue="480"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Configurações de Notificações</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Exames Próximos ao Vencimento</h3>
                    <p className="text-sm text-gray-500">Notifica 30 dias antes do vencimento</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Falhas no eSocial</h3>
                    <p className="text-sm text-gray-500">Notifica quando há erros no envio</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Relatórios Semanais</h3>
                    <p className="text-sm text-gray-500">Envia resumo semanal por email</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email para Notificações
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@empresa.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Gestão de Usuários</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Função
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Dr. Maria Silva
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        maria.silva@empresa.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Médico do Trabalho
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Ativo
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        João Santos
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        joao.santos@empresa.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Gestor RH
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Ativo
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Configurações de Documentos</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template ASO
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Template Padrão</option>
                    <option>Template Personalizado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificado Digital (ICP-Brasil)
                  </label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Assinatura Digital Automática</h3>
                    <p className="text-sm text-gray-500">Assina automaticamente os documentos ASO</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diretório de Armazenamento
                  </label>
                  <input
                    type="text"
                    defaultValue="/var/documents/sst/"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
