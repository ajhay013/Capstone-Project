import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo3.png';
import { useAuth } from '../AuthContext'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { postToEndpoint } from '../components/apiService';

function HeaderProgress() {
    const { user } = useAuth();
    const [progress, setProgress] = useState(0); 

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const userId = user?.id;
                if (!userId) return;
        
                const response = await postToEndpoint(`/checkingProgress.php?employer_id=${userId}`);
                const data = response.data;
        
                let newProgress = 0;
                if (data.companyInfo) newProgress += 25;
                if (data.foundingInfo) newProgress += 25;
                if (data.socialMedia) newProgress += 25;
                if (data.companyContact) newProgress += 25;
        
                setProgress(newProgress);
            } catch (error) {
                console.error("Error fetching progress data:", error);
            }
        };

        fetchProgress();

        const interval = setInterval(fetchProgress, 10);

        return () => clearInterval(interval);
    }, [user]);
    

    return (
        <header className="job-sync-header p-3 border-bottom" style={{ top: '0' }}>
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    {/* Logo */}
                    <div className="logo d-flex align-items-center mb-2 mb-md-0" style={{ paddingRight: '15px' }}>
                        <img src={logo} alt="JobSync Logo" width="58" height="50" />
                        <span className="ms-2 fw-bold fs-4">JobSync</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-container" style={{ width: '25%' }}>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <span style={{ fontSize: '13px', fontWeight: '500', color: '#949090' }}>Setup Progress</span>
                            <span style={{ fontSize: '13px', color: '#277ef1', fontWeight: '500' }}>
                                {progress > 0 ? `${progress}% Completed` : null}
                            </span>
                        </div>
                        <ProgressBar style={{ borderRadius: '2rem', height: '0.7rem' }} now={progress} />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderProgress;
