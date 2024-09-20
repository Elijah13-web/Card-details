import React, { useState } from 'react';
import desktop from "../assets/images/bg-main-desktop.png";
import front from "../assets/images/bg-card-front.png";
import logo from "../assets/images/card-logo.svg";
import back from "../assets/images/bg-card-back.png";
import mobile from "../assets/images/bg-main-mobile.png";
import complete from "../assets/images/icon-complete.svg";

const Home = () => {
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [errors, setErrors] = useState({ name: '', number: '', expMonth: '', expYear: '', cvc: '' });
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to handle submission

  const validateForm = () => {
    let hasErrors = false;
    const newErrors = { name: '', number: '', expMonth: '', expYear: '', cvc: '' };

    if (!cardholderName) {
      newErrors.name = 'Name cannot be empty';
      hasErrors = true;
    }else if (!/^[a-zA-Z\s]*$/.test(cardholderName)) {
      newErrors.name = 'Wrong format, letters only';
      hasErrors = true;
    }

    if (!cardNumber) {
      newErrors.number = 'Card number cannot be empty';
      hasErrors = true;
    } else if (cardNumber.length < 16) {
      newErrors.number = 'Card number must be 16 digits';
      hasErrors = true;
    } else if (!/^\d+$/.test(cardNumber)) {
      newErrors.number = 'Wrong format, numbers only';
      hasErrors = true;
    }

    if (!expMonth || expMonth.length !== 2) {
      newErrors.expMonth = "Can't be blank";
      hasErrors = true;
    }

    if (!expYear || expYear.length !== 2) {
      newErrors.expYear = "Can't be blank";
      hasErrors = true;
    }

    if (!cvc) {
      newErrors.cvc = "Can't be blank";
      hasErrors = true;
    } else if (cvc.length !== 3 || !/^\d+$/.test(cvc)) {
      newErrors.cvc = 'CVC must be 3 digits';
      hasErrors = true;
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true); // Show the thank you message upon successful form submission
    }
  };

  return (
    <div className=''>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-40">
        {/* Left section: Card display */}
        <div className="">
          <div className="absolute">
            <img src={desktop} alt='background' className='max-h-[775px] w-[500px] hidden lg:block'/>
            <img src={mobile} alt='mobile' className='lg:hidden w-[500px] h-[350px]'/>
          </div>
          
          {/* Front card */}
          <div className="absolute hidden lg:block" style={{ top: '150px', left: '200px' }}>
            <div>
              <img src={front} alt='card' className='max-h-60' />
              <img src={logo} alt='logo' className='absolute top-6 left-6' />
            </div>
            <div className="absolute top-40 left-7 text-white">
              <div className="text-3xl font-medium tracking-widest pb-3">
                {cardNumber || '0000 0000 0000 0000'} {/* Dynamic card number */}
              </div>
              <div className="flex justify-between space-x-48">
                <div className="text-1xl">{cardholderName || 'JANE APPLESEED'}</div> {/* Dynamic cardholder name */}
                <div className="text-1xl">{(expMonth || '00') + '/' + (expYear || '00')}</div> {/* Dynamic expiration date */}
              </div>
            </div>
            {/* Back card */}
            <div className='py-8 px-20 relative w-[500px] lg:w-[800px]'>
              <img src={back} alt='back card' />
              <h2 className='absolute text-black text-1xl top-28 right-80 py-6 px-3'>{cvc || '000'}</h2> {/* Dynamic CVC */}
            </div>
          </div>

          {/* Mobile cards */}
          <div className="absolute lg:hidden w-full p-2 pt-16" style={{ top: '50px', left: '' }}>
            <div className='h-28 mx-8 w-[350px]'>
              <img src={back} alt='back card' />
              <h2 className='absolute text-black text-1xl bottom-48 right-10 '>{cvc || '000'}</h2> {/* Dynamic CVC */}
            </div>
            <div className='w-[330px] '>
              <div>
                <img src={front} alt='card' />
                <img src={logo} alt='logo' className='absolute top-48 left-6 w-[80px]'/>
              </div>
              <div className="absolute top-64 left-7 text-white">
                <div className="text-2xl tracking-widest pt-3">
                  {cardNumber || '0000 0000 0000 0000'} {/* Dynamic card number */}
                </div>
                <div className="flex justify-between pt-5">
                  <div className="text-1xl">{cardholderName || 'JANE APPLESEED'}</div> {/* Dynamic cardholder name */}
                  <div className="text-1xl">{(expMonth || '00') + '/' + (expYear || '00')}</div> {/* Dynamic expiration date */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: Form */}
        <div className='lg:my-56 my-72 px-8 lg:w-full '>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className='items-center justify-center'>
                <h1 className='font-mono'>CARDHOLDER NAME</h1>
                <input
                  type="text"
                  className='py-1 pl-2 w-80 my-2 border rounded-lg'
                  placeholder='e.g. Jane Appleseed'
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
                {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
              </div>

              <div className='items-center justify-center py-3'>
                <h1 className='font-mono'>CARD NUMBER</h1>
                <input
                  type="text"
                  className='py-1 pl-2 w-80 my-2 border rounded-lg'
                  placeholder='e.g. 1234 5678 9123 0000'
                  maxLength={16}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                {errors.number && <p className='text-red-500 text-sm'>{errors.number}</p>}
              </div>

              <div className='flex gap-6'>
                <div>
                  <h1>EXP. DATE [MM/YY]</h1>
                  <div className='flex gap-2'>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder='MM'
                      maxLength={2}
                      value={expMonth}
                      onChange={(e) => setExpMonth(e.target.value)}
                      className='border rounded-lg p-1 px-3 w-16'
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder='YY'
                      maxLength={2}
                      value={expYear}
                      onChange={(e) => setExpYear(e.target.value)}
                      className='border rounded-lg p-1 px-3 w-16'
                    />
                  </div>
                  {errors.expMonth && <p className='text-red-500 text-sm'>{errors.expMonth}</p>}
                </div>

                <div>
                  <h1>CVC</h1>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder='e.g. 123'
                    maxLength={3}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className='border rounded-lg p-1 px-4 w-40'
                  />
                  {errors.cvc && <p className='text-red-500 text-sm'>{errors.cvc}</p>}
                </div>
              </div>

              <button type="submit" className="bg-black text-white py-2 w-80 rounded-lg my-6">
                Confirm
              </button>
            </form>
          ) : (
            <div className='text-center'>
              <img src={complete} alt='complete' className='mx-auto'/>
              <h1 className='text-2xl font-medium'>THANK YOU!</h1>
              <h2>We've added your card details</h2>
              <button
                type="button"
                className="bg-black text-white py-2 w-80 rounded-lg my-6"
                onClick={() => setIsSubmitted(false)} // Reset form upon clicking Continue
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
