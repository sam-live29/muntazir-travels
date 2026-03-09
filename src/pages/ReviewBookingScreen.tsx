import React from 'react';
import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { ChevronLeft, ArrowRight, Edit3 } from 'lucide-react';
import { packages } from '../data/packages';

const ReviewBookingScreen: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const packageData = packages.find(p => p.id === Number(id)) || packages[0];
    const { state } = location;

    if (!state) {
        return <Navigate to={`/checkout/${id}`} replace />;
    }

    const { contactInfo, tourDetails, travelers, accommodation, mealPref, specialRequests, emergencyContact } = state;

    const sectionClass = "mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100";
    const sectionTitleClass = "text-sm font-black text-slate-800 mb-4 uppercase tracking-widest border-b border-slate-200 pb-2";
    const itemClass = "mb-3";
    const labelClass = "text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1";
    const valueClass = "text-sm font-medium text-slate-900";
    const grid2Class = "grid grid-cols-1 md:grid-cols-2 gap-4";

    return (
        <div className="bg-white min-h-screen">
            <header className="px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-50">
                <div>
                    <h1 className="text-lg font-black text-slate-900">Review Booking Details</h1>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{packageData.title}</p>
                </div>
            </header>

            <main className="w-full max-w-full lg:max-w-4xl mx-auto p-4 md:p-8 pb-32">

                {/* Billing Details */}
                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Billing Details</h2>
                    <div className={grid2Class}>
                        <div className={itemClass}><span className={labelClass}>Full Name</span><span className={valueClass}>{contactInfo.fullName}</span></div>
                        <div className={itemClass}><span className={labelClass}>Mobile Number</span><span className={valueClass}>{contactInfo.mobile}</span></div>
                        <div className={`${itemClass} md:col-span-2`}><span className={labelClass}>Email Address</span><span className={valueClass}>{contactInfo.email}</span></div>
                    </div>
                </section>

                {/* Tour Details */}
                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Tour Details</h2>
                    <div className={grid2Class}>
                        <div className={itemClass}><span className={labelClass}>Package</span><span className={valueClass}>{packageData.title}</span></div>
                        <div className={itemClass}><span className={labelClass}>Destination</span><span className={valueClass}>{packageData.location}</span></div>
                        <div className={itemClass}><span className={labelClass}>Travel Dates</span><span className={valueClass}>{tourDetails.departureDate} to {tourDetails.returnDate}</span></div>
                    </div>
                </section>

                {/* Guest Details */}
                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Guest Details</h2>
                    <div className="space-y-4">
                        {travelers.map((traveler: any, idx: number) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100">
                                <h3 className="text-xs font-bold text-slate-800 mb-3">Traveler {idx + 1} {traveler.sameAsPrimary && idx > 0 ? '(Address same as Primary)' : ''}</h3>
                                <div className={grid2Class}>
                                    <div className={itemClass}><span className={labelClass}>Full Name</span><span className={valueClass}>{traveler.fullName}</span></div>
                                    <div className={itemClass}><span className={labelClass}>DOB & Gender</span><span className={valueClass}>{traveler.dob} | {traveler.gender}</span></div>
                                    <div className={itemClass}><span className={labelClass}>Nationality</span><span className={valueClass}>{traveler.nationality}</span></div>
                                    <div className={itemClass}><span className={labelClass}>ID Detail ({traveler.idType})</span><span className={valueClass}>{traveler.idNumber}</span></div>
                                </div>
                                <div className={`pt-3 mt-3 border-t border-slate-50 ${grid2Class}`}>
                                    <div className={itemClass}><span className={labelClass}>Photo Upload</span><span className={valueClass}>{traveler.photoPath ? `Uploaded: ${traveler.photoPath}` : 'Not Uploaded'}</span></div>
                                    <div className={itemClass}><span className={labelClass}>ID Upload</span><span className={valueClass}>{traveler.idPath ? `Uploaded: ${traveler.idPath}` : 'Not Uploaded'}</span></div>
                                </div>
                                <div className="mt-2">
                                    <div className={itemClass}><span className={labelClass}>Address</span><span className={valueClass}>{traveler.address ? `${traveler.address}, ${traveler.city}, ${traveler.state} - ${traveler.zipCode}` : 'Not Provided'}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Additional Preferences */}
                <section className={sectionClass}>
                    <h2 className={sectionTitleClass}>Preferences & Contacts</h2>
                    <div className={grid2Class}>
                        <div className={itemClass}><span className={labelClass}>Accommodation</span><span className={valueClass}>{accommodation.roomType} | {accommodation.bedPreference}</span></div>
                        <div className={itemClass}><span className={labelClass}>Meal Preference</span><span className={valueClass}>{mealPref}</span></div>
                        {specialRequests && <div className={`${itemClass} md:col-span-2`}><span className={labelClass}>Special Requests</span><span className={valueClass}>{specialRequests}</span></div>}
                    </div>
                    <div className={`mt-6 pt-6 border-t border-slate-200 ${grid2Class}`}>
                        <div className={itemClass}><span className={labelClass}>Emergency Contact Name</span><span className={valueClass}>{emergencyContact.name} ({emergencyContact.relationship})</span></div>
                        <div className={itemClass}><span className={labelClass}>Emergency Phone</span><span className={valueClass}>{emergencyContact.phone}</span></div>
                    </div>
                </section>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-end">
                    <button
                        onClick={() => navigate(`/checkout/${id}`, { state })}
                        className="bg-white border-2 border-slate-200 text-slate-700 font-bold py-3 px-6 rounded-full shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                        <Edit3 size={18} /> Edit Form
                    </button>

                    <button
                        onClick={() => navigate(`/booking-payment/${id}`, { state })}
                        className="bg-slate-900 text-white font-black py-3 px-8 rounded-full shadow-lg hover:bg-primary transition-all flex items-center justify-center gap-2 text-sm md:text-base group"
                    >
                        Submit & Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </main>
        </div>
    );
};

export default ReviewBookingScreen;
