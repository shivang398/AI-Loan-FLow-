import React, { useState, useEffect, useRef } from 'react';
import { Typography, Space, Button, Input, Modal, Breadcrumb, message } from 'antd';
import {
  Search, Download, Folder, FileText, FileImage, FileCode,
  Upload as UploadIcon, ChevronRight, Home, Users, FolderOpen, Briefcase, Shield,
} from 'lucide-react';
import apiClient from '../../../shared/services/apiClient';

const { Text, Title } = Typography;

// Virtual folder structure — Loan Applications removed
const fileSystem: any = {
  '/': {
    type: 'folder',
    children: ['Internal Employees', 'Partner Network']
  },
  '/Internal Employees': {
    type: 'folder',
    children: ['Management', 'Operations Team', 'RM Team', 'Team Leader']
  },
  '/Internal Employees/Management':      { type: 'folder', children: [] },
  '/Internal Employees/Operations Team': { type: 'folder', children: [] },
  '/Internal Employees/RM Team':         { type: 'folder', children: [] },
  '/Internal Employees/Team Leader':     { type: 'folder', children: [] },
  '/Partner Network':                    { type: 'folder', children: [] },
};

const DocumentLibrary: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [previewFile, setPreviewFile] = useState<any>(null);
  const [realFiles, setRealFiles] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchRealFiles = async (path: string) => {
    try {
      const res = await apiClient.get('/documents/folder', { params: { path } });
      setRealFiles(res.data?.data || []);
    } catch (err) {
      console.error('Failed to load live documents', err);
    }
  };

  useEffect(() => {
    fetchRealFiles(currentPath);
  }, [currentPath]);

  const getCurrentItems = () => {
    const node = fileSystem[currentPath];
    const staticFolders = (node && node.type === 'folder')
      ? node.children
          .filter((childName: string) => {
            const childPath = currentPath === '/' ? `/${childName}` : `${currentPath}/${childName}`;
            return fileSystem[childPath]?.type !== 'file';
          })
          .map((childName: string) => {
            const childPath = currentPath === '/' ? `/${childName}` : `${currentPath}/${childName}`;
            return {
              name: childName,
              path: childPath,
              type: 'folder',
              children: fileSystem[childPath]?.children || []
            };
          })
      : [];

    const dynamicFiles = realFiles.map((f: any) => ({
      id: f.id,
      name: f.fileName,
      path: f.folderPath === '/' ? `/${f.fileName}` : `${f.folderPath}/${f.fileName}`,
      type: 'file',
      mime: f.mimeType,
      size: f.fileSizeBytes ? `${(f.fileSizeBytes / (1024 * 1024)).toFixed(2)} MB` : '0 MB',
      date: f.createdAt ? new Date(f.createdAt).toISOString().split('T')[0] : '',
      isReal: true
    }));

    return [...staticFolders, ...dynamicFiles];
  };

  const handleNavigate = (item: any) => {
    if (item.type === 'folder') {
      setCurrentPath(item.path);
    } else {
      setPreviewFile(item);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', 'OTHER');
    formData.append('folderPath', currentPath);

    try {
      message.loading({ content: 'Uploading to secure institutional library...', key: 'upload' });
      await apiClient.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success({ content: 'File uploaded successfully and synced with platform storage.', key: 'upload' });
      fetchRealFiles(currentPath);
    } catch (err: any) {
      message.error({ content: err.response?.data?.message || err.message || 'Upload failed', key: 'upload' });
    }
  };

  const handleDownload = async () => {
    if (!previewFile) return;
    if (!previewFile.isReal) {
      message.info('Mock download initiated.');
      return;
    }

    try {
      const urlRes = await apiClient.get(`/documents/${previewFile.id}/presigned-url`);
      const downloadUrl = urlRes.data?.data || urlRes.data;
      if (downloadUrl) {
        window.open(downloadUrl, '_blank');
        message.success('Download link generated successfully.');
      } else {
        throw new Error('No URL returned');
      }
    } catch (err) {
      message.error('Failed to generate secure download URL.');
    }
  };

  const items = getCurrentItems();

  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [{ title: <Home size={14} className="cursor-pointer" onClick={() => setCurrentPath('/')} />, path: '/' }];
    let builtPath = '';
    parts.forEach(p => {
      builtPath += `/${p}`;
      const pCopy = builtPath;
      breadcrumbs.push({
        title: <span className="cursor-pointer font-medium hover:text-blue-600" onClick={() => setCurrentPath(pCopy)}>{p}</span>,
        path: builtPath
      });
    });
    return breadcrumbs;
  };

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 24, height: 'calc(100vh - 100px)' }}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 800 }}>Document Explorer</Title>
          <Text style={{ color: 'var(--text-muted)' }}>Secure institutional file system for internal employees and operations.</Text>
        </div>
        <Space>
          <Button icon={<UploadIcon size={16} />} type="primary" onClick={handleUploadClick} style={{ borderRadius: 8, fontWeight: 600 }}>
            Upload Files
          </Button>
          <Button icon={<Folder size={16} />} style={{ borderRadius: 8, fontWeight: 600 }} onClick={() => message.info('Folder creation handled via admin structures.')}>
            New Folder
          </Button>
        </Space>
      </div>

      <div style={{ display: 'flex', gap: 24, flex: 1, overflow: 'hidden' }}>
        {/* Left Sidebar */}
        <div style={{ width: 250, background: 'white', borderRadius: 16, border: '1px solid var(--surface-3)', padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', padding: '0 12px', marginBottom: 8 }}>Quick Access</Text>
          {[
            { label: 'All Documents',     path: '/',                             icon: Home },
            { label: 'Employee Records',  path: '/Internal Employees',           icon: Users },
            { label: 'Management',        path: '/Internal Employees/Management',icon: Shield },
            { label: 'Operations Team',   path: '/Internal Employees/Operations Team', icon: Briefcase },
            { label: 'RM Team',           path: '/Internal Employees/RM Team',   icon: Users },
            { label: 'Team Leader',       path: '/Internal Employees/Team Leader', icon: Users },
            { label: 'Partner Network',   path: '/Partner Network',              icon: FolderOpen },
          ].map(({ label, path, icon: Icon }) => (
            <div
              key={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${currentPath === path ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'}`}
              style={{ paddingLeft: path.split('/').length > 2 ? 28 : undefined }}
              onClick={() => setCurrentPath(path)}
            >
              <Icon size={path.split('/').length > 2 ? 14 : 18} />
              <span className={`font-semibold ${path.split('/').length > 2 ? 'text-xs' : 'text-sm'}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* Main Explorer */}
        <div style={{ flex: 1, background: 'white', borderRadius: 16, border: '1px solid var(--surface-3)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Toolbar */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--surface-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Breadcrumb items={getBreadcrumbs()} separator={<ChevronRight size={14} className="text-slate-400" />} />
            </div>
            <Input 
              placeholder="Search in folder..." 
              prefix={<Search size={16} className="text-slate-400" />}
              style={{ width: 250, borderRadius: 8 }}
            />
          </div>

          {/* File Grid */}
          <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                <FolderOpen size={48} strokeWidth={1} />
                <span className="font-medium">This folder is empty</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {items.map((item: any, i: number) => (
                  <div 
                    key={i}
                    className="group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-200"
                    onClick={() => handleNavigate(item)}
                  >
                    <div className="relative">
                      {item.type === 'folder' ? (
                        <Folder size={64} className="text-blue-500 fill-blue-100" strokeWidth={1.5} />
                      ) : item.mime?.includes('pdf') ? (
                        <FileText size={64} className="text-red-500 fill-red-50" strokeWidth={1.5} />
                      ) : (
                        <FileImage size={64} className="text-emerald-500 fill-emerald-50" strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="text-center w-full">
                      <div className="font-semibold text-slate-700 text-sm truncate w-full" title={item.name}>{item.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {item.type === 'folder' ? `${item.children?.length || 0} items` : item.size}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCode size={16} color="#3b82f6" />
            </div>
            <div className="font-bold text-slate-800">{previewFile?.name}</div>
          </div>
        }
        open={!!previewFile}
        onCancel={() => setPreviewFile(null)}
        width={800}
        footer={[
          <Button key="close" style={{ borderRadius: 8 }} onClick={() => setPreviewFile(null)}>Close</Button>,
          <Button key="download" type="primary" icon={<Download size={16} />} style={{ borderRadius: 8, background: '#2563eb' }} onClick={handleDownload}>Download File</Button>,
        ]}
        centered
        styles={{
          mask: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.4)' },
          body: { padding: 0 }
        }}
      >
        <div style={{ background: '#f8fafc', height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <FileText size={64} className="text-slate-300 mb-4" strokeWidth={1} />
          <h3 className="font-bold text-slate-700 text-lg mb-2">No Preview Available</h3>
          <p className="text-slate-500 text-sm max-w-sm text-center">
            This file type cannot be previewed directly in the browser. Please download the file to view its contents securely.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentLibrary;
