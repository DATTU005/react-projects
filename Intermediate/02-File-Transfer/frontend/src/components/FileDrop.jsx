import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDrop = ({ onFileSelect }) => {
    const onDrop = useCallback(acceptedFiles => {
        onFileSelect(acceptedFiles[0]);
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className="dropzone p-6 border-2 border-dashed border-gray-300 text-center cursor-pointer">
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the file here...</p> :
                    <p>Drag 'n' drop a file here, or click to select a file</p>
            }
        </div>
    );
};

export default FileDrop;
