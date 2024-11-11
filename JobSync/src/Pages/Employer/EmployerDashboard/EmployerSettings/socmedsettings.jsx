import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function SocmedSettings() {
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ facebookLink, instagramLink, youtubeLink, twitterLink });
  };

  return (
    <>
      <Container
        fluid
        className="text-start"
        style={{
          margin: '0',
          padding: '0',
          width: '100%',
          paddingTop: '56px',
        }}
      >
        <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%', marginBottom: '222px' }}>
          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="formFacebookLink">
                <Form.Label>
                  Facebook Link <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter Facebook link"
                  value={facebookLink}
                  onChange={(e) => setFacebookLink(e.target.value)}
                  style={{ padding: '10px', width: '100%' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="formInstagramLink">
                <Form.Label>
                  Instagram Link <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter Instagram link"
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                  style={{ padding: '10px', width: '100%' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="formYoutubeLink">
                <Form.Label>
                  YouTube Link <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter YouTube link"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  style={{ padding: '10px', width: '100%' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="formTwitterLink">
                <Form.Label>
                  Twitter Link <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter Twitter link"
                  value={twitterLink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                  style={{ padding: '10px', width: '100%' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
  <Col className="d-flex justify-content-center">
    <Button variant="primary" type="submit" style={{ width: '200px' }}>
      Save Changes
    </Button>
  </Col>
</Row>

        </Form>
      </Container>
    </>
  );
}
