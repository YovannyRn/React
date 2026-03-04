import axios from 'axios';

import * as url from './urlHelper';

/**
 * Upload a single file to the backend.
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} - Returns the ID of the uploaded file.
 */
export const uploadSingleFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const requestUrl = `${url.API_BASE_URL}${url.API_FILE_UPLOAD_SINGLE}`;

    console.log('Uploading file:', file);
    console.log('Request URL:', requestUrl);

    try {
        const response = await axios.post(requestUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; // Return the ID of the uploaded file
    } catch (error) {
        console.error('Error uploading single file:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Single file upload failed');
    }
};

/**
 * Upload multiple files to the backend.
 * @param {FileList} files - The list of files to upload.
 * @returns {Promise<Array<string>>} - Returns an array of IDs of the uploaded files.
 */
export const uploadMultipleFiles = async (files) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    const requestUrl = `${url.API_BASE_URL}${url.API_FILE_UPLOAD_MULTIPLE}`;

    try {
        const response = await axios.post(requestUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.files; // Return the IDs of the uploaded files
    } catch (error) {
        console.error('Error uploading multiple files:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Multiple file upload failed');
    }
};