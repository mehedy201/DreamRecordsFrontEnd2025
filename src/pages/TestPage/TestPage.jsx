import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';

const TestPage = () => {
  
  return (
    <div>
      <input type="file" accept=".xls, .xlsx" id="fileInput" name='image' onChange={e => analyticsUplaod(e.target.files)} />
    </div>
  );
};

export default TestPage;