import React from 'react';

const SectionContainer = ({ sectionQuestions, handleSectionClick }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', // Automatically adjust columns
                gap: '20px',
                marginTop: '20px',
            }}
        >
            {Object.keys(sectionQuestions).map((section) => (
                <div
                    key={section}
                    onClick={() => handleSectionClick(section)}
                    style={{
                        padding: '15px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        border: '1px solid #ddd',
                        textAlign: 'center',
                        height: '25px', // Allow height to adjust based on content
                        width: 'auto',  // Allow width to adjust based on content
                        minWidth: '150px', // Minimum width to maintain consistency
                        minHeight: '45px', // Ensure some height even for short titles
                        display: 'flex', // Ensure the content is centered
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h3
                        style={{
                            fontSize: '15px',
                            fontWeight: '600',
                            color: '#333',
                            wordWrap: 'break-word', // Ensure the text wraps if it's too long
                            whiteSpace: 'normal',   // Allow text to wrap and not stay on a single line
                            textAlign: 'center', // Center the title
                        }}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </h3>
                </div>
            ))}
        </div>
    );
};

export default SectionContainer;
