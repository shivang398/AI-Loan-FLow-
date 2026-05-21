import React, { useState } from 'react';
import { Upload, message, Progress, Card, Typography, List, Button, Space } from 'antd';
import { 
  UploadCloud, 
  File, 
  CheckCircle, 
  X, 
  AlertCircle,
  FileText,
  FileImage,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import api from '../../../shared/services/apiClient';

const { Dragger } = Upload;
const { Text, Title } = Typography;

interface UploadStatus {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'done' | 'error';
  type: string;
}

const FileUploadZone: React.FC<{ loanId?: string }> = ({ loanId }) => {
  const [uploads, setUploads] = useState<UploadStatus[]>([]);

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError, onProgress } = options;
    const uploadId = Math.random().toString(36).substring(7);

    setUploads(prev => [...prev, {
      id: uploadId,
      name: file.name,
      progress: 0,
      status: 'uploading',
      type: file.type
    }]);

    try {
      // 1. Get Pre-signed URL from Backend
      const { data } = await api.post('/messaging/attachments/presigned-url', {
        fileName: file.name,
        contentType: file.type,
        loanId
      });

      const { uploadUrl, fileKey } = data.data;

      // 2. Upload directly to S3
      await axios.put(uploadUrl, file, {
        headers: { 'Content-Type': file.type },
        onUploadProgress: (event) => {
          const percent = Math.floor((event.loaded / (event.total || 1)) * 100);
          onProgress({ percent });
          setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, progress: percent } : u));
        }
      });

      // 3. Notify backend of completion
      await api.post('/messaging/attachments/confirm', {
        fileKey,
        loanId,
        fileName: file.name,
        contentType: file.type
      });

      onSuccess('ok');
      setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'done', progress: 100 } : u));
      message.success(`${file.name} uploaded successfully.`);
    } catch (err) {
      onError(err);
      setUploads(prev => prev.map(u => u.id === uploadId ? { ...u, status: 'error' } : u));
      message.error(`${file.name} upload failed.`);
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <FileImage size={24} className="text-blue-500" />;
    if (type.includes('pdf')) return <FileText size={24} className="text-red-500" />;
    return <File size={24} className="text-slate-400" />;
  };

  return (
    <div className="space-y-6">
      <Dragger
        customRequest={handleUpload}
        showUploadList={false}
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl hover:bg-blue-50/50 hover:border-blue-400 transition-all p-8"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <UploadCloud size={32} />
          </div>
          <Title level={4} className="m-0 text-slate-800">Click or drag to upload</Title>
          <Text className="text-slate-500 mt-2">Support for PDF, JPG, PNG (Max 10MB per file)</Text>
        </div>
      </Dragger>

      {uploads.length > 0 && (
        <Card className="shadow-sm border-none rounded-2xl overflow-hidden">
          <List
            dataSource={uploads}
            renderItem={item => (
              <List.Item className="px-6 py-4">
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <Space>
                      {getFileIcon(item.type)}
                      <Text strong className="text-slate-700">{item.name}</Text>
                    </Space>
                    <Space>
                      {item.status === 'uploading' && <Loader2 size={16} className="animate-spin text-blue-500" />}
                      {item.status === 'done' && <CheckCircle size={16} className="text-emerald-500" />}
                      {item.status === 'error' && <AlertCircle size={16} className="text-red-500" />}
                      <Button type="text" size="small" icon={<X size={14} />} className="text-slate-400" />
                    </Space>
                  </div>
                  <Progress 
                    percent={item.progress} 
                    status={item.status === 'error' ? 'exception' : 'active'} 
                    size="small"
                    strokeColor={item.status === 'done' ? '#10b981' : '#3b82f6'}
                    showInfo={false}
                  />
                  <div className="flex justify-between mt-1">
                    <Text className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                      {item.status}
                    </Text>
                    <Text className="text-[10px] text-slate-400 font-bold">
                      {item.progress}%
                    </Text>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default FileUploadZone;
