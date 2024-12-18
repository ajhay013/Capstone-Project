import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postToEndpoint } from '../../../components/apiService';
import { useAuth } from '../../../AuthContext';
import Swal from 'sweetalert2';
import { FaArrowLeft } from 'react-icons/fa';


export default function AddressInfo() {
  const [biography, setBiography] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [barangay, setBarangay] = useState('');
  const [postal, setPostal] = useState('');
  const [initialData, setInitialData] = useState(null); // To store the initial fetched data
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplicantInfo = async () => {
      if (user?.id) {
        try {
          const response = await postToEndpoint('/getApplicantinfo.php', {
            applicant_id: user.id,
          });

          if (response.data) {
            const {
              biography,
              city,
              address,
              barangay,
              postal,
            } = response.data;
            setBiography(biography || '');
            setCity(city || '');
            setAddress(address || '');
            setBarangay(barangay || '');
            setPostal(postal || '');

            setInitialData({
              biography,
              city,
              address,
              barangay,
              postal,
            });
          }
        } catch (error) {
          console.error('Error fetching applicant info:', error);
        }
      }
    };
    fetchApplicantInfo();
  }, [user]);

  const handleBiographyChange = (value) => {
    setBiography(value);
  };

  const isChanged = () => {
    if (!initialData) return false;
    return (
      biography !== initialData.biography ||
      city !== initialData.city ||
      address !== initialData.address ||
      barangay !== initialData.barangay ||
      postal !== initialData.postal
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.id) {
      try {
        const response = await postToEndpoint('/updateApplicantAddress.php', {
          applicant_id: user.id,
          biography,
          city,
          address,
          barangay,
          postal,
        });
  
        if (response.data.success) {
          Swal.fire({
            title: 'Success!',
            text: 'Your information has been updated successfully!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: response.data.message || 'Failed to update your information. Please try again.',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      } catch (error) {
        console.error('Error updating applicant info:', error);
        Swal.fire({
          title: 'Oops!',
          text: 'An error occurred. Please try again later.',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }
    }
  };
  return (
    <Container
      fluid="md"
      className="pb-5"
      style={{
        maxWidth: '1200px',
        background: 'transparent',
        borderRadius: '8px',
        padding: '2rem',
        paddingLeft: '10px',
        paddingTop: '16px',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <h4 style={{ marginBottom: '30px', fontSize: '28px', textAlign: 'left' }}>Address Information</h4>

        {/* Address and City Fields */}
        <Row className="gy-3 mb-4">
          <Col md={6}>
            <Form.Label style={{ textAlign: 'left', display: 'block' }}>Address</Form.Label>
            <Form.Control
              className="register1"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label style={{ textAlign: 'left', display: 'block' }}>City</Form.Label>
            <Form.Control
              className="register1"
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Col>
        </Row>

        {/* Barangay and Postcode Fields */}
        <Row className="gy-3 mb-4">
          <Col md={6}>
            <Form.Label style={{ textAlign: 'left', display: 'block' }}>Barangay</Form.Label>
            <Form.Control
              className="register1"
              type="text"
              placeholder="Enter your barangay"
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label style={{ textAlign: 'left', display: 'block' }}>Postcode</Form.Label>
            <Form.Control
              className="register1"
              type="text"
              placeholder="Enter your postcode"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
            />
          </Col>
        </Row>

        {/* Biography Field */}
        <hr className="my-4" />
        <Row>
          <Col md={12}>
            <Form.Label
              style={{
                textAlign: 'left',
                display: 'block',
                fontSize: '24px',
                fontWeight: '500',
              }}
            >
              Biography
            </Form.Label>
            <div style={{ textAlign: 'left', textWrap: 'balance', marginBottom: '10px' }}>
              <small style={{ fontStyle: 'italic' }}>
                Note: Make sure to include a well-written biography that showcases your unique abilities, experiences,
                and accomplishments, offering prospective employers a compelling reason to consider you for the position.
              </small>
            </div>
            <ReactQuill
              value={biography}
              onChange={handleBiographyChange}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                ],
              }}
              style={{ minHeight: '150px', textAlign: 'left' }}
              placeholder="Enter your biography..."
            />
          </Col>
        </Row>

        {/* Save Changes Button */}
        <Row className="mt-5">
          <Col md={12} className="d-flex" style={{justifyContent: 'space-between'}}>
          <Button variant="primary"  onClick={() => {
                window.history.back();
                window.scrollTo({ top: 0});
            }} className="mt-3" style={{width: '185px', height: '55px', color: '#0d6efd', background: 'transparent'}}>
          <FaArrowLeft style={{fontSize: '14px', marginRight: '12px'}}/> Back
        </Button>
            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              style={{ width: '185px', height: '55px' }}
              disabled={!isChanged()}
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
