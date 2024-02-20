import { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './App.css';
import { LinearProgress } from '@mui/material';
import api from './api/api';

function App() {
  const [value, setValue] = useState('');
  const [progress, setProgress] = useState(1);
  const [total, setTotal] = useState(100);
  const [fields, setFields] = useState(null);

  const [formData, setFormData] = useState({});

  const [openForm, setOpenForm] = useState(false);

  const [error, setError] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const getFormDataHandler = async () => {
    const response = await api.getFormData();
    setFormSubmitted(false);

    if (response) {
      setFields(response.data.fields);
      setTotal(response.data.fields.length);
      setProgress(1);
      setOpenForm(true);
    }
  };

  useEffect(() => {
    if (progress > total) {
      setProgress(-1);
      console.log('Form Data:', formData);
    }
  }, [progress]);

  const handleEmailChange = (e, type) => {
    if (type === 'email') {
      if (e.target.value.includes('@')) {
        setError(false);
      } else {
        setError(true);
      }
    }

    setValue(e.target.value);
  };

  return (
    <div className="App">
      <div className="open_form_group">
        {!openForm && (
          <button onClick={() => getFormDataHandler()}>Open Form</button>
        )}
      </div>

      {fields &&
        fields.map((field, index) => {
          if (index + 1 === progress) {
            return (
              <div className="form_container">
                <label>{field.label}</label>

                {(field.type === 'text' || field.type === 'email') && (
                  <div class="search">
                    <ArrowForwardIcon
                      onClick={() => {
                        if (!error && value !== '') {
                          setProgress(progress + 1);
                          setFormData({ ...formData, [field.name]: value });
                          if (progress === total) {
                            setProgress(-1);
                            console.log('Form Data:', formData);
                          }
                          setValue('');
                        }
                      }}
                    />
                    <input
                      value={value}
                      onChange={(e) => {
                        handleEmailChange(e, field.type);
                      }}
                      placeholder={field.placeholder}
                      type={field.type}
                      required={field.required}
                      name={field.name}
                    />
                  </div>
                )}

                {field.type === 'select' && (
                  <div className="form_select">
                    <select
                      value={''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        });
                        setProgress(progress + 1);
                      }}
                      required={field.required}
                      name={field.name}
                    >
                      <option value="" disabled>
                        {field.label}
                      </option>
                      {field.options.map((option) => (
                        <option value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                )}
                {field.type === 'radio' && (
                  <div className="form_radio">
                    {field.options.map((option) => (
                      <div className="form_radio_section">
                        <label>
                          <input
                            type="radio"
                            value={option}
                            name={field.name}
                            onChange={(e) => {
                              setProgress(progress + 1);
                              setFormData({
                                ...formData,
                                [field.name]: e.target.value,
                              });

                              setValue('');
                            }}
                          />
                          <span className="radio_label"> {option}</span>
                          <span class="checkmark"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {field.type === 'checkbox' && (
                  <>
                    <label>
                      {field.label}{' '}
                      <input
                        type="checkbox"
                        name={field.name}
                        onChange={(e) => {
                          setValue(e.target.value);
                        }}
                      />
                    </label>
                    <button
                      className="submit"
                      onClick={() => {
                        console.log('Form Data:', formData);
                        setValue('');
                        setProgress(-1);
                        setOpenForm(false);
                        setFormSubmitted(true);
                      }}
                    >
                      Submit
                    </button>
                  </>
                )}

                <div class="progress_bar">
                  <LinearProgress
                    className="progressbar"
                    variant="determinate"
                    value={(progress * 100) / total}
                  />
                </div>
                <div class="progress_value">
                  <span>
                    {progress}/{total}
                  </span>
                </div>
              </div>
            );
          }
        })}

      {error && <span className="error">Enter Valid Mail</span>}

      {formSubmitted && (
        <div className="form_submitted">
          <h1>Form Submitted</h1>
          <h3>Form Data:</h3>
          <div>
            {Object.keys(formData).map((key) => (
              <div>
                <span>{key}:</span>
                <span>{formData[key]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
