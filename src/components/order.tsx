import { useState } from 'react';
import './order.scss'

const Order = () => {

    const [formState, setFormState] = useState({
        imie: '',
        nazwisko: '',
        ulica: '',
        email: ''
      });
    
      const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
      };
    
      const handleSubmit = (event: any) => {
        event.preventDefault();
        // Tutaj możesz dodać kod obsługujący zatwierdzenie formularza, np. wysłanie danych na serwer
        console.log(formState);
      };

return(
    <div className='order'>
          <form className="form-container" onSubmit={handleSubmit}>
      <label className="form-label">
        Imię:
        <input
          type="text"
          name="imie"
          value={formState.imie}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <br />
      <label className="form-label">
        Nazwisko:
        <input
          type="text"
          name="nazwisko"
          value={formState.nazwisko}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <br />
      <label className="form-label">
        Ulica:
        <input
          type="text"
          name="ulica"
          value={formState.ulica}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <br />
      <label className="form-label">
        Email:
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          className="form-input"
        />
      </label>
      <br />
      <button type="submit" className="form-button">Wyślij</button>
    </form>
    </div>
)
}

export default Order