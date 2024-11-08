import React from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

export default function PostJobs() {
    return (
        <>
            <Form>
                <h2>Post a job</h2>

                {/* Job Title and Job Role */}
                <Row className="mb-3">
                    <Col md={8}>
                        <Form.Group controlId="jobTitle">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" placeholder="Add job title, role, vacancies etc" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="jobRole">
                            <Form.Label>Job Role</Form.Label>
                            <Form.Select>
                                <option>Select...</option>
                                {/* Add options here */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Tags */}
                <Row className="mb-3">
                    <Col md={8}>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder="Job keywords, tags etc." />
                        </Form.Group>
                    </Col>
                </Row>

                {/* Salary */}
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="minSalary">
                            <Form.Label>Min Salary</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" placeholder="Minimum salary..." />
                                <InputGroup.Text>USD</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="maxSalary">
                            <Form.Label>Max Salary</Form.Label>
                            <InputGroup>
                                <Form.Control type="number" placeholder="Maximum salary..." />
                                <InputGroup.Text>USD</InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="salaryType">
                            <Form.Label>Salary Type</Form.Label>
                            <Form.Select>
                                <option>Select...</option>
                                {/* Add options here */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Advance Information */}
                <h5>Advance Information</h5>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="education">
                            <Form.Label>Education</Form.Label>
                            <Form.Select>
                                <option>Select...</option>
                                {/* Add options here */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="experience">
                            <Form.Label>Experience</Form.Label>
                            <Form.Select>
                                <option>Select...</option>
                                {/* Add options here */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="jobType">
                            <Form.Label>Job Type</Form.Label>
                            <Form.Select>
                                <option>Select...</option>
                                {/* Add options here */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="vacancies">
                            <Form.Label>Vacancies</Form.Label>
                            <Form.Select>
                                <option>Select...</option>
                                {/* Add options here */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="expirationDate">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="jobLevel">
                            <Form.Label>Job Level</Form.Label>
                            <Form.Select>
                                <option>Select...</option>
                                {/* Add options here */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                {/* Location */}
                <h5>Location</h5>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="country">
                            <Form.Label>Country</Form.Label>
                            <Form.Select>
                                <option>Select...</option>
                                {/* Add options here */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Select>
                                <option>Select...</option>
                                {/* Add options here */}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Check
                    type="checkbox"
                    id="fullyRemote"
                    label="Fully Remote Position - Worldwide"
                    className="mb-3"
                />

                {/* Job Benefits */}
                <h5>Job Benefits</h5>
                <div className="mb-3">
                    {/* Each benefit could be added here as a button or badge */}
                    <Button variant="outline-primary" className="m-1">401k Salary</Button>
                    <Button variant="outline-primary" className="m-1">Distributed Team</Button>
                    {/* Add more benefits as needed */}
                </div>

                {/* Job Description */}
                <Form.Group controlId="jobDescription" className="mb-3">
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Add your job description..." />
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit">
                    Post Job
                </Button>
            </Form>
        </>
    );
}
