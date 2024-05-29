import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileDrop from './FileDrop';
import FilePreview from './FilePreview';
import FileSearch from './FileSearch';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const filesPerPage = 5;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchFiles();
            toast.success('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file');
        }
    };

    const handleFileDelete = async (filename) => {
        try {
            await axios.delete(`http://localhost:5000/files/${filename}`);
            fetchFiles();
            toast.success('File deleted successfully');
        } catch (error) {
            console.error('Error deleting file:', error);
            toast.error('Error deleting file');
        }
    };

    const fetchFiles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/files');
            setFiles(response.data);
            setFilteredFiles(response.data);
            setTotalPages(Math.ceil(response.data.length / filesPerPage));
        } catch (error) {
            console.error('Error fetching files:', error);
            toast.error('Error fetching files');
        }
    };

    useEffect(() => {
        fetchFiles();
    }, [page]);

    const handleSearch = (query) => {
        const filtered = files.filter(file =>
            file.originalname.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFiles(filtered);
        setTotalPages(Math.ceil(filtered.length / filesPerPage));
        setPage(1); // Reset to first page on search
    };

    const displayedFiles = filteredFiles.slice((page - 1) * filesPerPage, page * filesPerPage);

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 min-h-screen">
            <ToastContainer />
            <div className="bg-white shadow-md rounded p-6 w-full max-w-lg mx-auto">
                <h1 className="text-2xl font-bold mb-4 text-center">File Upload</h1>

                <div className="bg-white shadow-md rounded p-6 w-full max-w-lg mx-auto mt-4">
                    <h2 className="text-2xl font-bold mb-4 text-center">Drag and Drop File Upload</h2>
                    <FileDrop onFileSelect={setFile} />
                </div>
                <button
                    onClick={handleFileUpload}
                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Upload File
                </button>
                <FilePreview file={file} />
            </div>


            <div className="mt-8 w-full max-w-lg mx-auto">
                <h2 className="text-xl font-bold mb-2 text-center">Uploaded Files</h2>
                <FileSearch onSearch={handleSearch} />
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Name</th>
                                <th className="py-2 px-4 border-b text-left">Status</th>
                                <th className="py-2 px-4 border-b text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedFiles.map((file, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{file.originalname}</td>
                                    <td className="py-2 px-4 border-b">File uploaded</td>
                                    <td>
                                        <a
                                            href={`http://localhost:5000/${file.filename}`}
                                            download={file.originalname}
                                            className="text-blue-500 underline mr-4"
                                        >
                                            <IconButton color='inherit'>
                                                <DownloadIcon />
                                            </IconButton>
                                        </a>
                                        <button
                                            onClick={() => handleFileDelete(file.filename)}
                                            className="text-red-500 underline"
                                        >
                                            <IconButton color='inherit'>
                                                <DeleteIcon />
                                            </IconButton>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
