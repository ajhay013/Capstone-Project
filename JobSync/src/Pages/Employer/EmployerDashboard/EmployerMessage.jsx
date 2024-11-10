import React, { useState } from 'react';
import EmployerSidebar from '../../../components/EmployerSidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Message() {
    return (
        <div className="d-flex">

            <div className="content" style={{ width: '80%', marginTop: '60px', textAlign: 'left' }}>
                <h2 style={{
                    fontSize: '24px', color: '#333', fontWeight: 'bold',
                    marginBottom: '20px', marginTop: '25px', marginLeft: '20px'
                }}>
                  
                </h2>
                
            </div>
        </div>
    );
}
