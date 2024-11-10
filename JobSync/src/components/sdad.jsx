

const JobRow = ({ job }) => {
    const statusColor = job.status === 'Active' ? '#5bbc80' : '#dc3545';

    return (
        <tr key={job.id} className="border-bottom">
            <td>
                <div>
                    <h6 className="mb-0" 
                    style={{ padding: '5px', textAlign: 'left' }}>{job.name}</h6>
                    <small className="text-muted"
                    style={{marginLeft: '-252px'}}
                    >{job.jobType}</small>
                </div>
            </td>
            <td className="text-center">
                <span
                    style={{
                        color: statusColor,
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '700',
                        display: 'inline-block', 
                        marginTop: '5px',
                        textAlign: 'center', 
                    }}
                >
                    {job.status === 'Active' ? (
                        <FaCheck className="me-2" />
                    ) : (
                        <FaTimes className="me-2" />
                    )}
                    {job.status}
                </span>
            </td>
            <td className="text-center">
                <div className="d-flex justify-content-center align-items-center"
                                style={{
                                    marginTop: '15px',
                                    display: 'inline-block',
                                    color: '#656565',
                                    fontWeight: '600',
                                    fontSize: '14px'
                                }}
                >
                    <FaUsers className="me-2" />
                    {job.applications}<span className="ms-1">Applicants</span>
                </div>
            </td>
            <td className="text-center">
                <button className="btn btn-sm btn-light text-primary"
                                    style={{
                                        width: '60%',
                                        fontWeight: '500',
                                        marginTop: '5px',
                                        background: '#ddf2ff',
                                        padding: '10px',
                                        borderRadius: '6px'
                                    }}
                >View Details</button>
            </td>
        </tr>
    );
};