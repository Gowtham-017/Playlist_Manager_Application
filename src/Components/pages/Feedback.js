import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Feedback.css'
const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    id: '',
    name: '',
    email: '',
    message: ''
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8084/postfeedb', feedbackData);
      alert('Feedback saved successfully');
      setFeedbackData({
        id: '',
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      alert('Error saving feedback');
    }
  };
  return (
    <div className='feedbody'>
      <div className='feedback-form-container'>
        <h2>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="id" placeholder='Id' value={feedbackData.id} onChange={handleInputChange} />
            <input type="text" name="name" placeholder='Name' value={feedbackData.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder='Email' value={feedbackData.email} onChange={handleInputChange} />
            <textarea name="message"  placeholder='Your feedback here...' value={feedbackData.message} onChange={handleInputChange} />
            <center><button type="submit">Submit Feedback</button></center>
        </form>
      </div>
    </div>
  );
};
export default Feedback;