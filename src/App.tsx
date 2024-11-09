import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function validateSIN(input: string): boolean {
    if (isNaN(parseInt(input)))
        return false;

    return input.length == 9 && luhnChecksum(input)
}

function luhnChecksum(cardNumber: string): boolean {
    let sum = 0;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let n = parseInt(cardNumber[i]);
        if (i % 2 == 1) {
            n *= 2;
            if (n > 9) n -= 9;
        }
        sum += n;
    }
    return (sum % 10 == 0);
}

function App() {
  const [sin, setSin] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSin(event.target.value);
  };

  const handleValidate = () => {
      const isValid = validateSIN(sin);
      setMessage(sin + ' ' + (isValid ? 'is Valid' : 'is not Valid'));
  };

  return (
    <div className="container-fluid">
          <div className="row align-items-center">
              <div className="col">
                  <header className="h1 text-center">
                      SIN Validator
                  </header>
              </div>
          </div>
        <div className="container">

        <div className="row align-items-center">
            <div className="input-group col-2">
                <input type="number" maxLength={9} className="form-control"
                       value={sin}
                       onChange={handleSinChange}
                       placeholder="Please enter 9 Digit SIN to verify"
                       aria-label="SIN Number"
                       aria-describedby="basic-addon1"/>
                <button className="btn btn-primary" type="submit" onClick={handleValidate}>Validate</button>
            </div>
        </div>
        <div className="row tex align-items-center">
            <p className="text-center">{message}</p>
        </div>
        </div>

    </div>
  );
}

export default App;
