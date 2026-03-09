import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, ArrowRight, UserPlus, Trash2, Calendar } from 'lucide-react';
import { packages } from '../data/packages';
import { indianStates } from '../data/indianStates';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CheckoutScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const packageData = packages.find(p => p.id === Number(id)) || packages[0];

  // Form State
  const [contactInfo, setContactInfo] = useState(location.state?.contactInfo || {
    fullName: '', mobile: '', email: ''
  });

  const [tourDetails, setTourDetails] = useState(location.state?.tourDetails || {
    departureDate: '', returnDate: '', adults: 1, children: 0, infants: 0
  });

  const [travelers, setTravelers] = useState(location.state?.travelers || [{
    fullName: '', dob: '', gender: 'Male', nationality: 'Indian', idType: 'Aadhar Card', idNumber: '',
    address: '', city: '', state: '', zipCode: '', sameAsPrimary: false,
    photoPath: '', idPath: ''
  }]);

  // Sync total guests numbers when adults/children/infants change manually
  const totalExpectedGuests = Number(tourDetails.adults) + Number(tourDetails.children) + Number(tourDetails.infants);

  // Date parsing utilities for DatePicker
  const parseDateString = (dateStr: string) => {
    if (!dateStr) return null;
    const parts = dateStr.includes('/') ? dateStr.split('/') : dateStr.split('-');
    if (parts.length !== 3) return null;
    const [d, m, y] = parts;
    const parsed = new Date(Number(y), Number(m) - 1, Number(d));
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const formatDateObj = (date: Date) => {
    if (!date || isNaN(date.getTime())) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${d}/${m}/${y}`;
  };

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'booking' | 'dob') => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);

    let res = '';
    if (val.length > 0) {
      let dd = val.slice(0, 2);
      if (dd.length === 2 && parseInt(dd) > 31) dd = '31';
      if (dd === '00') dd = '01';
      res += dd;
    }
    if (val.length >= 3) {
      let mm = val.slice(2, 4);
      if (mm.length === 2 && parseInt(mm) > 12) mm = '12';
      if (mm === '00') mm = '01';
      res += '/' + mm;
    }
    if (val.length >= 5) {
      let yyyy = val.slice(4, 8);
      if (yyyy.length === 4) {
        if (type === 'booking') {
          const currentYear = new Date().getFullYear();
          if (parseInt(yyyy) < currentYear) yyyy = currentYear.toString();
        }
      }
      res += '/' + yyyy;
    }

    e.target.value = res;
  };

  useEffect(() => {
    setTravelers(prev => {
      const newTravelers = [...prev];
      if (newTravelers.length < totalExpectedGuests) {
        for (let i = newTravelers.length; i < totalExpectedGuests; i++) {
          newTravelers.push({
            fullName: '', dob: '', gender: 'Male', nationality: 'Indian', idType: 'Aadhar Card', idNumber: '',
            address: '', city: '', state: '', zipCode: '', sameAsPrimary: false,
            photoPath: '', idPath: ''
          });
        }
      } else if (newTravelers.length > totalExpectedGuests) {
        newTravelers.splice(totalExpectedGuests);
      }
      return newTravelers;
    });
  }, [totalExpectedGuests]);

  const handleTravelerChange = (index: number, field: string, value: string | boolean) => {
    const newTravelers = [...travelers];

    if (field === 'sameAsPrimary' && value === true && index > 0) {
      newTravelers[index] = {
        ...newTravelers[index],
        sameAsPrimary: true,
        address: travelers[0].address,
        city: travelers[0].city,
        state: travelers[0].state,
        zipCode: travelers[0].zipCode,
      };
    } else {
      newTravelers[index] = { ...newTravelers[index], [field]: value };
    }

    setTravelers(newTravelers);
  };

  // Dummy file upload handler to simulate file selection
  const handleFileUpload = (index: number, field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleTravelerChange(index, field, e.target.files[0].name);
    }
  };

  const handlePincodeChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const pin = e.target.value;
    handleTravelerChange(index, 'zipCode', pin);

    if (pin.length === 6) {
      const isIndia = true; // Hardcoded true since traveler address UI is generally India-focused right now
      if (isIndia) {
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
          const data = await res.json();
          if (data && data[0] && data[0].Status === 'Success') {
            const po = data[0].PostOffice[0];
            const newState = po.State;
            const newDistrict = po.District;

            let stateObj = indianStates.find((s: any) => s.state.toLowerCase() === newState.toLowerCase() || s.state.toLowerCase().includes(newState.toLowerCase()) || newState.toLowerCase().includes(s.state.toLowerCase()));
            let finalState = stateObj ? stateObj.state : newState;

            const newTravelers = [...travelers];
            newTravelers[index] = { ...newTravelers[index], zipCode: pin, state: finalState, city: newDistrict };
            setTravelers(newTravelers);
          }
        } catch (err) {
          console.error('Pincode fetch error', err);
        }
      }
    }
  };

  const addMoreGuests = () => {
    setTourDetails(prev => ({ ...prev, adults: prev.adults + 1 }));
  };

  const removeGuest = (index: number) => {
    if (travelers.length <= 1) return;
    // We strictly decrease adults for simplicity, prioritizing adult removal
    setTourDetails(prev => {
      if (prev.adults > 0) return { ...prev, adults: prev.adults - 1 };
      if (prev.children > 0) return { ...prev, children: prev.children - 1 };
      if (prev.infants > 0) return { ...prev, infants: prev.infants - 1 };
      return prev;
    });
  };

  const [accommodation, setAccommodation] = useState(location.state?.accommodation || { roomType: 'Double Room', bedPreference: 'Double Bed' });
  const [mealPref, setMealPref] = useState(location.state?.mealPref || 'Vegetarian');
  const [specialRequests, setSpecialRequests] = useState(location.state?.specialRequests || '');
  const [emergencyContact, setEmergencyContact] = useState(location.state?.emergencyContact || { name: '', relationship: '', phone: '' });

  // Calculation (Simplified for this flow)
  const durationOption = { multiplier: 1 };
  const guestsCount = travelers.length > 0 ? travelers.length : 1;
  const subtotal = Math.floor(packageData.price * guestsCount * durationOption.multiplier);
  const tax = 1250 * guestsCount;
  const discount = 4800;
  const totalAmount = subtotal + tax - discount;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/review-booking/${id}`, {
      state: {
        totalAmount,
        contactInfo,
        tourDetails,
        travelers,
        accommodation,
        mealPref,
        specialRequests,
        emergencyContact
      }
    });
  };

  const sectionClass = "mb-8";
  const sectionTitleClass = "text-base font-black text-slate-800 mb-4 uppercase tracking-widest";
  const inputClass = "w-full bg-slate-50 border-2 border-slate-300 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-800";
  const labelClass = "block text-xs font-bold text-slate-500 mb-2 pointer-events-none tracking-wide";
  const grid2Class = "grid grid-cols-1 md:grid-cols-2 gap-5 mb-5";

  return (
    <div className="bg-white min-h-screen">
      <header className="px-6 py-4 bg-white border-b border-slate-100 relative">
        <div>
          <h1 className="text-lg font-black text-slate-900">Guest Information</h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{packageData.title}</p>
        </div>
      </header>

      <main className="w-full max-w-full mx-auto pb-16">
        {/* Selected Package Info (Outside Form) */}
        <div className="bg-slate-50 border-b border-slate-100 p-4 md:p-8 lg:px-12">
          <div
            onClick={() => navigate(`/package/${packageData.id}`)}
            className="bg-white border-2 border-primary/20 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:shadow-md hover:border-primary/40 transition-all group"
            title="Click to view full package details"
          >
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">{packageData.title}</h2>
              <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 justify-start">
                <span className="w-2 h-2 rounded-full bg-primary/60"></span>
                {packageData.location}
              </p>
            </div>
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-sm text-center flex items-center justify-center gap-2">
              Selected Package
              <ArrowRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </div>
          </div>
        </div>

        <form onSubmit={handleProceedToPayment} className="bg-white p-4 md:p-8 lg:p-12 pt-8">

          {/* 1. Billing Details */}
          <section className={sectionClass}>
            <h2 className={sectionTitleClass}>1. Billing Details</h2>
            <div className={grid2Class}>
              <div>
                <label className={labelClass}>Full Name</label>
                <input type="text" className={inputClass} value={contactInfo.fullName} onChange={e => setContactInfo({ ...contactInfo, fullName: e.target.value })} placeholder="As per ID" />
              </div>
              <div>
                <label className={labelClass}>Mobile Number</label>
                <div className="flex bg-slate-50 border-2 border-slate-300 rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <span className="bg-slate-100 border-r-2 border-slate-300 px-4 py-3 text-sm font-medium text-slate-800 flex items-center justify-center">
                    +91
                  </span>
                  <input type="tel" maxLength={10} className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-slate-400 font-medium text-slate-800" value={contactInfo.mobile.replace(/^\+91\s*/, '')} onChange={e => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setContactInfo({ ...contactInfo, mobile: '+91 ' + val });
                  }} placeholder="XXXXX XXXXX" />
                </div>
              </div>
            </div>
            <div className={grid2Class}>
              <div><label className={labelClass}>Email Address</label><input type="email" className={inputClass} value={contactInfo.email} onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })} placeholder="your@email.com" /></div>
              <div className="hidden md:block"></div>
            </div>
          </section>

          <hr className="border-slate-100 my-8" />

          {/* 2. Tour Details */}
          <section className={sectionClass}>
            <h2 className={sectionTitleClass}>2. Tour Dates</h2>
            <div className={grid2Class}>
              <div>
                <label className={labelClass}>Departure Date</label>
                <div className="relative">
                  <DatePicker
                    id="departure-date"
                    selected={parseDateString(tourDetails.departureDate)}
                    onChange={date => setTourDetails({ ...tourDetails, departureDate: date ? formatDateObj(date) : '' })}
                    onChangeRaw={e => handleDateInput(e as any, 'booking')}
                    className={`${inputClass} pl-10`}
                    wrapperClassName="w-full"
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    placeholderText="dd/mm/yyyy"
                  />
                  <label htmlFor="departure-date" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-primary transition-colors">
                    <Calendar size={18} />
                  </label>
                </div>
              </div>
              <div>
                <label className={labelClass}>Return Date</label>
                <div className="relative">
                  <DatePicker
                    id="return-date"
                    selected={parseDateString(tourDetails.returnDate)}
                    onChange={date => setTourDetails({ ...tourDetails, returnDate: date ? formatDateObj(date) : '' })}
                    onChangeRaw={e => handleDateInput(e as any, 'booking')}
                    className={`${inputClass} pl-10`}
                    wrapperClassName="w-full"
                    dateFormat="dd/MM/yyyy"
                    minDate={parseDateString(tourDetails.departureDate) || new Date()}
                    placeholderText="dd/mm/yyyy"
                  />
                  <label htmlFor="return-date" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-primary transition-colors">
                    <Calendar size={18} />
                  </label>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-slate-100 my-8" />

          {/* 3. Guest Details */}
          <section className={sectionClass}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-black text-slate-800 uppercase tracking-widest">3. Guest Details</h2>
              <button type="button" onClick={addMoreGuests} className="text-xs font-bold text-primary flex items-center gap-1 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                <UserPlus size={14} /> Add More Guests
              </button>
            </div>

            {travelers.map((traveler, idx) => (
              <div key={idx} className="mb-8 last:mb-0 relative group">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-700">Traveler {idx + 1} {idx === 0 && '(Primary)'}</h3>
                  {idx > 0 && (
                    <button type="button" onClick={() => removeGuest(idx)} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-rose-50" title="Remove Guest">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
                {/* Basic Details */}
                <div className={grid2Class}>
                  <div><label className={labelClass}>Full Name</label><input type="text" className={inputClass} value={traveler.fullName} onChange={e => handleTravelerChange(idx, 'fullName', e.target.value)} placeholder="Full Name (As per ID)" /></div>
                  <div>
                    <label className={labelClass}>Date of Birth</label>
                    <div className="relative">
                      <DatePicker
                        id={`dob-${idx}`}
                        selected={parseDateString(traveler.dob)}
                        onChange={date => handleTravelerChange(idx, 'dob', date ? formatDateObj(date) : '')}
                        onChangeRaw={e => handleDateInput(e as any, 'dob')}
                        className={`${inputClass} pl-10`}
                        wrapperClassName="w-full"
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="dd/mm/yyyy"
                      />
                      <label htmlFor={`dob-${idx}`} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-primary transition-colors">
                        <Calendar size={18} />
                      </label>
                    </div>
                  </div>
                </div>
                <div className={grid2Class}>
                  <div>
                    <label className={labelClass}>Gender</label>
                    <select className={inputClass} value={traveler.gender} onChange={e => handleTravelerChange(idx, 'gender', e.target.value)}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>Nationality</label><input type="text" className={`${inputClass} bg-slate-50 text-slate-500`} value="Indian" readOnly /></div>
                </div>

                {/* ID Details */}
                <div className={grid2Class}>
                  <div>
                    <label className={labelClass}>ID Proof Type</label>
                    <select className={inputClass} value={traveler.idType} onChange={e => handleTravelerChange(idx, 'idType', e.target.value)}>
                      <option value="Aadhar Card">Aadhar Card</option>
                      <option value="Passport">Passport</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Voter ID">Voter ID</option>
                    </select>
                  </div>
                  <div><label className={labelClass}>{traveler.idType} Number</label><input type="text" className={inputClass} value={traveler.idNumber} onChange={e => handleTravelerChange(idx, 'idNumber', e.target.value)} placeholder={`Enter your ${traveler.idType} number`} /></div>
                </div>

                {/* Documents Upload */}
                <div className={grid2Class}>
                  <div>
                    <label className={labelClass}>Upload Photo</label>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(idx, 'photoPath', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className={`${inputClass} flex items-center justify-between text-slate-500 overflow-hidden`}>
                        <span className="truncate">{traveler.photoPath || 'Choose photo...'}</span>
                        <div className="bg-slate-200 text-xs px-2 py-1 rounded">Browse</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Upload ID Document</label>
                    <div className="relative">
                      <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileUpload(idx, 'idPath', e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <div className={`${inputClass} flex items-center justify-between text-slate-500 overflow-hidden`}>
                        <span className="truncate">{traveler.idPath || 'Choose document...'}</span>
                        <div className="bg-slate-200 text-xs px-2 py-1 rounded">Browse</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Details */}
                <div className="mt-6 mb-2 flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest">Address Information</h4>
                  {idx > 0 && (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-primary rounded border-slate-300" checked={traveler.sameAsPrimary} onChange={(e) => handleTravelerChange(idx, 'sameAsPrimary', e.target.checked)} />
                      <span className="text-xs font-bold text-slate-500">Same as Primary Guest</span>
                    </label>
                  )}
                </div>

                <div className="space-y-5 opacity-100 transition-opacity" style={{ opacity: traveler.sameAsPrimary ? 0.6 : 1, pointerEvents: traveler.sameAsPrimary ? 'none' : 'auto' }}>
                  <div className={grid2Class}>
                    <div><label className={labelClass}>Address</label><input type="text" className={inputClass} value={traveler.address} onChange={e => handleTravelerChange(idx, 'address', e.target.value)} placeholder="Street Address" /></div>
                    <div><label className={labelClass}>Postal / ZIP Code</label><input type="number" className={inputClass} value={traveler.zipCode} onChange={e => handlePincodeChange(idx, e)} placeholder="Enter 6-digit PIN" /></div>
                  </div>
                  <div className={grid2Class}>
                    <div>
                      <label className={labelClass}>State</label>
                      <select className={inputClass} value={traveler.state} onChange={e => { handleTravelerChange(idx, 'state', e.target.value); handleTravelerChange(idx, 'city', ''); }}>
                        <option value="">Select State</option>
                        {indianStates.map((s: any) => <option key={s.state} value={s.state}>{s.state}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>City / District</label>
                      {traveler.state ? (
                        <select className={inputClass} value={traveler.city} onChange={e => handleTravelerChange(idx, 'city', e.target.value)}>
                          <option value="">Select City / District</option>
                          {indianStates.find((s: any) => s.state === traveler.state)?.districts?.map((d: any) => <option key={d} value={d}>{d}</option>)}
                        </select>
                      ) : (
                        <input type="text" className={inputClass} value={traveler.city} onChange={e => handleTravelerChange(idx, 'city', e.target.value)} placeholder="Select a state first" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <hr className="border-slate-100 my-8" />

          {/* 4. Accommodation Preference */}
          <section className={sectionClass}>
            <h2 className={sectionTitleClass}>4. Accommodation Preference</h2>
            <div className={grid2Class}>
              <div>
                <label className={labelClass}>Room Type</label>
                <select className={inputClass} value={accommodation.roomType} onChange={e => setAccommodation({ ...accommodation, roomType: e.target.value })}>
                  <option value="Single Room">Single Room</option>
                  <option value="Double Room">Double Room</option>
                  <option value="Triple Room">Triple Room</option>
                  <option value="Family Room">Family Room</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Bed Preference</label>
                <select className={inputClass} value={accommodation.bedPreference} onChange={e => setAccommodation({ ...accommodation, bedPreference: e.target.value })}>
                  <option value="Twin Bed">Twin Bed</option>
                  <option value="Double Bed">Double Bed</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="border-slate-100 my-8" />

          {/* 5. Meal Preference */}
          <section className={sectionClass}>
            <h2 className={sectionTitleClass}>5. Meal Preference</h2>
            <div className="flex flex-wrap gap-6">
              {['Vegetarian', 'Non-Vegetarian', 'Jain Meal', 'Other'].map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="mealPref" value={type} checked={mealPref === type} onChange={e => setMealPref(e.target.value)} className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-slate-700">{type}</span>
                </label>
              ))}
            </div>
          </section>

          <hr className="border-slate-100 my-8" />

          {/* 6. Special Requests */}
          <section className={sectionClass}>
            <h2 className={sectionTitleClass}>6. Special Requests (Optional)</h2>
            <div>
              <label className={labelClass}>Additional Notes / Requests</label>
              <textarea
                className={`${inputClass} min-h-[80px] resize-y`}
                placeholder="Any special needs, medical conditions, or requests..."
                value={specialRequests}
                onChange={e => setSpecialRequests(e.target.value)}
              ></textarea>
            </div>
          </section>

          <hr className="border-slate-100 my-8" />

          {/* 7. Emergency Contact */}
          <section className={sectionClass}>
            <h2 className={sectionTitleClass}>7. Emergency Contact</h2>
            <div className={grid2Class}>
              <div><label className={labelClass}>Emergency Contact Name</label><input type="text" className={inputClass} value={emergencyContact.name} onChange={e => setEmergencyContact({ ...emergencyContact, name: e.target.value })} placeholder="Emergency Contact Name" /></div>
              <div>
                <label className={labelClass}>Relationship</label>
                <input type="text" list="relationship-suggestions" className={inputClass} value={emergencyContact.relationship} onChange={e => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })} placeholder="e.g. Father, Spouse" />
                <datalist id="relationship-suggestions">
                  <option value="Father" />
                  <option value="Mother" />
                  <option value="Spouse" />
                  <option value="Brother" />
                  <option value="Sister" />
                  <option value="Son" />
                  <option value="Daughter" />
                  <option value="Friend" />
                </datalist>
              </div>
            </div>
            <div>
              <label className={labelClass}>Emergency Contact Phone Number</label>
              <div className="flex bg-slate-50 border-2 border-slate-300 rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <span className="bg-slate-100 border-r-2 border-slate-300 px-4 py-3 text-sm font-medium text-slate-800 flex items-center justify-center">
                  +91
                </span>
                <input type="tel" maxLength={10} className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-slate-400 font-medium text-slate-800" value={emergencyContact.phone.replace(/^\+91\s*/, '')} onChange={e => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setEmergencyContact({ ...emergencyContact, phone: '+91 ' + val });
                }} placeholder="XXXXX XXXXX" />
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-end mt-12">
            <button type="submit" className="bg-slate-900 text-white font-black py-3 px-8 rounded-full shadow-lg hover:bg-primary hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm md:text-base group">
              Submit & Continue
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutScreen;
