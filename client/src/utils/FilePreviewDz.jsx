import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FilePreviewDz = ({open, imageFiles, images, setImages, setDzPreviewOpen, filesSelected, setFilesSelected}) => {
    const deleteFile = (index) => {
        let newFiles = [...images];
        let filesNew = [...filesSelected];
        newFiles.splice(index, 1);
        filesNew.splice(index, 1);
        setFilesSelected(filesNew);
    }

    return (
        <div>
            <div className={`dz-preview ${open ? 'open' : ''}`}>
                {
                    filesSelected?.length > 0 ?
                        filesSelected?.map((image, index) => {
                            return <div className="theme-file-preview position-relative mx-2" key={index}>
                                <div className="avatar-lg dropzone-image-preview">
                                    <img src={URL.createObjectURL(image)} className='avatar-img rounded file-title' alt="" />
                                </div>
                                <button className="position-absolute top-0 end-0 background-transparent border-0">
                                    <i className="fa-solid fa-xmark image-remove" onClick={() => deleteFile(index)}></i>
                                </button>
                            </div>
                        })
                    : null
                }
            </div>
        </div>
    )
}

export default FilePreviewDz
