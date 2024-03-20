import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@material-ui/core';
import axios from 'axios';

const AccountForm = () => {
  // Use consistent naming for properties (all lowercase)
  const [formData, setFormData] = useState({
    account_name: '',
    accoun_number: '',
    account_type: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7001/create-accounts', formData);
      console.log('Account created:', response.data);
      // Reset form fields after successful submission
      setFormData({
        account_name: '',
        account_number: '',
        account_type: '',
        description: '',
      });
    } catch (error) {
      console.error('Error creating account:', error);
      // Reset formData only if the request was unsuccessful (not a 201 Created response)
      if (error.response && error.response.status !== 201) {
        setFormData({
            account_name: '',
            account_number: '',
            account_type: '',
            description: '',
        });
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Account Name"
              name="account_name"
              value={formData.account_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Account Number"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Account Type"
              name="account_type"
              value={formData.account_type}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AccountForm;
