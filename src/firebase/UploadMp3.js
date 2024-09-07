import React, {useEffect, useState} from 'react';
import { storage, database } from './firebaseConfig';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';
import {Input} from "lvq";

export const UploadMp3 = ({ onMp3UrlChange , className}) => {
    const [mp3, setMp3] = useState(null);

    const handleChange = (e) => {
        if ( e.target.files[0]) {
            setMp3(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!mp3) return; // Đảm bảo đã chọn ít nhất một ảnh

        try {
            const storageReference = storageRef(storage, `audios/${mp3.name}`);

            // Tải lên vào Firebase Storage
            const snapshot = await uploadBytes(storageReference, mp3);
            console.log('Uploaded a blob or file!', snapshot);

            // Lấy URL để hiển thị ảnh
            const url = await getDownloadURL(storageReference);

            // Lưu URL vào Firebase Realtime Database
            const dbImagesRef = dbRef(database, 'audios');
            const newImageRef = push(dbImagesRef);
            await set(newImageRef, {
                imageUrl: url,
                imageName: mp3.name,
                // Các thông tin ảnh bổ sung nếu cần
            });
            console.log('Image information saved to Realtime Database');

            // Gọi callback để trả về URL của các ảnh đã tải lên thành công
            onMp3UrlChange(url);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    useEffect(() => {
        // Auto upload when mp3 state changes
        if (mp3) {
            handleUpload().then().catch();
        }
    }, [mp3]);

    return (
        <Input type="file" accept="audio/*" size={4} className={className} onChange={handleChange} />
    );
};