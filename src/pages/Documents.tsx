import React, { useState } from 'react';
import { FileText, Download, Plus, Eye, Search } from 'lucide-react';
import { mockDocuments } from '../services/mockData';

const Documents: React.FC = () => {
  const [documents] = useState(mockDocuments);
  const [selectedType, setSelectedType] = useState('');

  const documentTypes = [
    { value: '', label: 'Todos os tipos' },
    { value: 'ASO', label: 'ASO - Atestado de Saúde Ocupacional' },
    { value: 'PCMSO', label: 'PCMSO - Programa de Controle Médico' },
    { value: 'PGR', label: 'PGR - Programa de Gerenciamento de Riscos' },
    { value: 'LTCAT', label: 'LTCAT - Laudo Técnico das Condições do Ambiente' },
  ];

  const filteredDocuments = documents.filter(doc => 
    !selectedType || doc.type === selectedType
  );

  const documentCounts = {
    ASO: documents.filter(d => d.type === 'ASO').length,
    PCMSO: documents.filter(d => d.type === 'PCMSO').length,
    PGR: documents.filter(d => d.type === 'PGR').length,
    LTCAT: documents.filter(d => d.type === 'LTCAT').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Documentos SST</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Gerar Documento
        </button>
      </div>

      {/* Document Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ASO</p>
              <p className="text-2xl font-bold text-gray-900">{documentCounts.ASO}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">PCMSO</p>
              <p className="text-2xl font-bold text-gray-900">{documentCounts.PCMSO}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">PGR</p>
              <p className="text-2xl font-bold text-gray-900">{documentCounts.PGR}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">LTCAT</p>
              <p className="text-2xl font-bold text-gray-900">{documentCounts.LTCAT}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Exibindo {filteredDocuments.length} de {documents.length} documentos
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">{document.type}</h3>
                  <p className="text-sm text-gray-600">{document.title}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Gerado em:</span>
                <span>{new Date(document.generatedAt).toLocaleDateString('pt-BR')}</span>
              </div>
              {document.signedAt && (
                <div className="flex justify-between">
                  <span>Assinado em:</span>
                  <span>{new Date(document.signedAt).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
              {document.doctorName && (
                <div className="flex justify-between">
                  <span>Médico:</span>
                  <span>{document.doctorName}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </button>
                <button className="bg-green-50 text-green-600 px-3 py-2 rounded-lg hover:bg-green-100 flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </button>
              </div>
              
              {document.signedAt ? (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Assinado
                </span>
              ) : (
                <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  Pendente
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
