import React from 'react';

const FilePreview = ({ file }) => {
    if (!file) return null;

    const fileURL = URL.createObjectURL(file);

    if (file.type.startsWith('image/')) {
        return (
            <div className="mt-4">
                <img src={fileURL} alt="File Preview" className="max-w-xs rounded-lg shadow-md" />
            </div>
        );
    }

    if (file.type === 'application/pdf') {
        return (
            <div className="mt-4">
                <embed src={fileURL} type="application/pdf" width="400" height="400" className="border rounded-lg" />
            </div>
        );
    }

    return (
        <div className="mt-4">
            <p className="text-gray-500">Preview not available for this file type.</p>
        </div>
    );
};

export default FilePreview;
