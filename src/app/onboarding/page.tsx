'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, ArrowRight, ArrowLeft, Building, MapPin, Briefcase, CreditCard, 
  Clock, ShieldAlert, Image as ImageIcon, Sparkles, Plus, Trash2, 
  Map, DollarSign, Dumbbell, ShieldCheck, FileCheck, Phone, Mail, Globe, MapPinned
} from 'lucide-react';

// Definitions for the Onboarding Form State
interface OnboardingData {
  // Step 1: Gym Profile & Owner Information
  gymName: string;
  gymLogo: string;
  gymDescription: string;
  ownerName: string;
  ownerMobile: string;
  ownerEmail: string;
  gymPhone: string;
  gymEmail: string;
  website: string;
  instagram: string;

  // Step 2: Location Information
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  latitude: string;
  longitude: string;

  // Step 3: Business Information
  businessName: string;
  gstNumber: string;
  panNumber: string;
  businessType: 'Proprietorship' | 'Partnership' | 'Private Limited' | 'LLP' | '';

  // Step 4: Bank Details (Payout)
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  upiId: string;

  // Step 5: Gym Operations
  openingTime: string;
  closingTime: string;
  weeklyOff: string;
  maxCapacity: string;
  peakHours: string;

  // Step 6: Amenities
  amenities: {
    parking: boolean;
    locker: boolean;
    shower: boolean;
    steam: boolean;
    sauna: boolean;
    personalTrainer: boolean;
    groupClasses: boolean;
    womenOnlyArea: boolean;
    ac: boolean;
    wifi: boolean;
    water: boolean;
  };

  // Step 7: Media
  coverImage: string;
  gymPhotos: string[];
  videos: string[];

  // Step 8: Membership Integration
  creditsPerVisit: number;
  peakHourCredits: number;
  offPeakCredits: number;

  // Step 9: KYC Verification
  kycOwnerAadhaar: string; // file name or status
  kycPanCard: string;
  kycGstCertificate: string;
  kycCancelledCheque: string;
  kycStatus: 'Pending' | 'Approved' | 'Rejected';

  // Step 10: Contract Information
  agreementSigned: boolean;
  startDate: string;
  endDate: string;
  commissionPercent: number;
  revenueSharePercent: number;
}

const initialData: OnboardingData = {
  gymName: '',
  gymLogo: '',
  gymDescription: '',
  ownerName: '',
  ownerMobile: '',
  ownerEmail: '',
  gymPhone: '',
  gymEmail: '',
  website: '',
  instagram: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: 'India',
  pincode: '',
  latitude: '',
  longitude: '',
  businessName: '',
  gstNumber: '',
  panNumber: '',
  businessType: '',
  accountHolderName: '',
  accountNumber: '',
  ifscCode: '',
  bankName: '',
  upiId: '',
  openingTime: '06:00',
  closingTime: '22:00',
  weeklyOff: 'None',
  maxCapacity: '100',
  peakHours: '06:00 AM - 09:00 AM, 06:00 PM - 09:00 PM',
  amenities: {
    parking: false,
    locker: false,
    shower: false,
    steam: false,
    sauna: false,
    personalTrainer: false,
    groupClasses: false,
    womenOnlyArea: false,
    ac: false,
    wifi: false,
    water: false,
  },
  coverImage: '',
  gymPhotos: [],
  videos: [],
  creditsPerVisit: 5,
  peakHourCredits: 8,
  offPeakCredits: 4,
  kycOwnerAadhaar: '',
  kycPanCard: '',
  kycGstCertificate: '',
  kycCancelledCheque: '',
  kycStatus: 'Pending',
  agreementSigned: false,
  startDate: '',
  endDate: '',
  commissionPercent: 15,
  revenueSharePercent: 85,
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(initialData);
  const [activeTab, setActiveTab] = useState<'card' | 'details'>('details');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [errors, setErrors] = useState<string>('');

  // Load saved state if any
  useEffect(() => {
    const saved = localStorage.getItem('flexpass-gym-onboarding');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse onboarding data', e);
      }
    }
  }, []);

  // Save state on change
  const updateFormData = (fields: Partial<OnboardingData>) => {
    const updated = { ...formData, ...fields };
    setFormData(updated);
    localStorage.setItem('flexpass-gym-onboarding', JSON.stringify(updated));
  };

  const updateAmenities = (key: keyof OnboardingData['amenities']) => {
    const updatedAmenities = {
      ...formData.amenities,
      [key]: !formData.amenities[key],
    };
    updateFormData({ amenities: updatedAmenities });
  };

  // Mock File Upload Handler
  const handleFileUpload = (field: string, isMultiple = false) => {
    // Generate simulated file upload
    setUploadProgress(prev => ({ ...prev, [field]: 10 }));
    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        setUploadProgress(prev => {
          const updated = { ...prev };
          delete updated[field];
          return updated;
        });

        // Set value
        if (field === 'gymLogo') {
          updateFormData({ gymLogo: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=80&h=80&fit=crop' });
        } else if (field === 'coverImage') {
          updateFormData({ coverImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&fit=crop' });
        } else if (field === 'gymPhotos') {
          const mockPhotos = [
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&fit=crop',
            'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&fit=crop',
            'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&fit=crop',
            'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&fit=crop',
            'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=400&fit=crop'
          ];
          updateFormData({ gymPhotos: [...formData.gymPhotos, mockPhotos[formData.gymPhotos.length % mockPhotos.length]] });
        } else if (field === 'videos') {
          updateFormData({ videos: [...formData.videos, 'Gym Promo Video.mp4'] });
        } else if (field === 'kycOwnerAadhaar') {
          updateFormData({ kycOwnerAadhaar: 'Aadhaar_Card_Owner.pdf' });
        } else if (field === 'kycPanCard') {
          updateFormData({ kycPanCard: 'PAN_Card_Owner.pdf' });
        } else if (field === 'kycGstCertificate') {
          updateFormData({ kycGstCertificate: 'GST_Registration.pdf' });
        } else if (field === 'kycCancelledCheque') {
          updateFormData({ kycCancelledCheque: 'Cancelled_Cheque_Bank.pdf' });
        }
      } else {
        setUploadProgress(prev => ({ ...prev, [field]: progress }));
      }
    }, 150);
  };

  const removePhoto = (index: number) => {
    const updated = [...formData.gymPhotos];
    updated.splice(index, 1);
    updateFormData({ gymPhotos: updated });
  };

  const removeVideo = (index: number) => {
    const updated = [...formData.videos];
    updated.splice(index, 1);
    updateFormData({ videos: updated });
  };

  const fillMockLocation = () => {
    updateFormData({
      addressLine1: '4th Floor, Sector 62',
      addressLine2: 'H-15, Near Stellar IT Park',
      city: 'Noida',
      state: 'Uttar Pradesh',
      country: 'India',
      pincode: '201301',
      latitude: '28.6273',
      longitude: '77.3725',
    });
  };

  const validateStep = () => {
    setErrors('');
    if (step === 1) {
      if (!formData.gymName) return 'Gym Name is required';
      if (!formData.ownerName) return 'Owner Name is required';
      if (!formData.ownerMobile) return 'Owner Mobile is required';
      if (!formData.ownerEmail) return 'Owner Email is required';
    }
    if (step === 2) {
      if (!formData.addressLine1) return 'Address Line 1 is required';
      if (!formData.city) return 'City is required';
      if (!formData.state) return 'State is required';
      if (!formData.pincode) return 'Pincode is required';
      if (!formData.latitude || !formData.longitude) return 'Latitude and Longitude are required for search';
    }
    if (step === 3) {
      if (!formData.businessName) return 'Business Name is required';
      if (!formData.panNumber) return 'PAN Number is required';
      if (!formData.businessType) return 'Business Type is required';
    }
    if (step === 4) {
      if (!formData.accountHolderName) return 'Account Holder Name is required';
      if (!formData.accountNumber) return 'Account Number is required';
      if (!formData.ifscCode) return 'IFSC Code is required';
      if (!formData.bankName) return 'Bank Name is required';
    }
    if (step === 7) {
      if (formData.gymPhotos.length < 5) return 'Please upload at least 5 gym photos';
    }
    if (step === 9) {
      if (!formData.kycOwnerAadhaar || !formData.kycPanCard || !formData.kycGstCertificate || !formData.kycCancelledCheque) {
        return 'All KYC documents are required';
      }
    }
    if (step === 10) {
      if (!formData.agreementSigned) return 'Please accept and sign the agreement';
      if (!formData.startDate || !formData.endDate) return 'Agreement dates are required';
    }
    return '';
  };

  const handleNext = () => {
    const errorMsg = validateStep();
    if (errorMsg) {
      setErrors(errorMsg);
      return;
    }
    if (step < 10) {
      setStep(prev => prev + 1);
    } else {
      // Submit complete onboarding
      alert('Gym Onboarding application submitted successfully! It is under review.');
      localStorage.removeItem('flexpass-gym-onboarding');
      router.push('/superadmin/dashboard');
    }
  };

  const handleBack = () => {
    setErrors('');
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const stepsList = [
    { num: 1, label: 'Profile' },
    { num: 2, label: 'Location' },
    { num: 3, label: 'Business' },
    { num: 4, label: 'Bank' },
    { num: 5, label: 'Operations' },
    { num: 6, label: 'Amenities' },
    { num: 7, label: 'Media' },
    { num: 8, label: 'Credits' },
    { num: 9, label: 'KYC' },
    { num: 10, label: 'Contract' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column: Form Wizard */}
        <div className="lg:col-span-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-6 sm:p-10 shadow-2xl flex flex-col justify-between min-h-[720px] relative overflow-hidden">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider">
                Step {step} of 10
              </span>
              <span className="text-zinc-500 text-xs">Gym Partner Registration</span>
            </div>
            
            <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              {step === 1 && 'Basic Gym & Owner Information'}
              {step === 2 && 'Location & Search Coordinates'}
              {step === 3 && 'Business Legal Information'}
              {step === 4 && 'Payout Bank Details'}
              {step === 5 && 'Operations & Capacity'}
              {step === 6 && 'Amenities Selection'}
              {step === 7 && 'Cover & Gallery Media'}
              {step === 8 && 'Membership Credits Configuration'}
              {step === 9 && 'KYC Verification Uploads'}
              {step === 10 && 'Agreement Contract Setup'}
            </h1>
            <p className="text-sm text-zinc-400 mt-1.5">
              {step === 1 && 'Tell us the public profile details and how to reach the owner.'}
              {step === 2 && 'Help users find you nearby. Latitude and longitude are mandatory.'}
              {step === 3 && 'Provide your GST, PAN and legal entity type for verification.'}
              {step === 4 && 'Bank account details to process payouts and payouts schedule.'}
              {step === 5 && 'Configure your active times, peak periods and max checkin capacity.'}
              {step === 6 && 'Check all amenities available at your gym site.'}
              {step === 7 && 'Upload high-resolution images. A minimum of 5 photos are required.'}
              {step === 8 && 'Setup peak hours credits and off-peak checkin costs.'}
              {step === 9 && 'Provide legitimate verification document files.'}
              {step === 10 && 'Review contract terms and sign digitally to finalize onboarding.'}
            </p>
          </div>

          {/* Stepper Horizontal Progress for Mobile, Sidebar for Desktop */}
          <div className="flex flex-wrap items-center gap-2 py-4 my-4 border-b border-t border-zinc-800">
            {stepsList.map((s) => (
              <button
                key={s.num}
                onClick={() => {
                  if (s.num < step || validateStep() === '') {
                    setStep(s.num);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-brand-primary text-white shadow-[0_0_15px_rgba(225,29,72,0.4)] scale-105 border border-brand-primary/50'
                    : step > s.num
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                    : 'bg-zinc-800/40 text-zinc-500 hover:bg-zinc-800 border border-transparent'
                }`}
              >
                <span>{s.num}</span>
                <span className="hidden md:inline">{s.label}</span>
                {step > s.num && <Check className="h-3 w-3 inline" />}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {errors && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-xs text-red-400 font-semibold">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{errors}</span>
            </div>
          )}

          {/* Dynamic Step Forms */}
          <div className="flex-1 py-4 relative">
            <AnimatePresence mode="wait">
            
            {/* STEP 1: Gym Profile */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Gym Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Gold's Gym Sec 62"
                      value={formData.gymName}
                      onChange={(e) => updateFormData({ gymName: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Gym Logo</label>
                    <div className="flex items-center gap-4">
                      {formData.gymLogo ? (
                        <img src={formData.gymLogo} alt="Logo" className="w-12 h-12 rounded-xl object-cover border border-zinc-800" />
                      ) : (
                        <div className="w-12 h-12 bg-zinc-950 rounded-xl border border-dashed border-zinc-800 flex items-center justify-center text-zinc-600">
                          <Building className="h-5 w-5" />
                        </div>
                      )}
                      <button
                        onClick={() => handleFileUpload('gymLogo')}
                        disabled={!!uploadProgress.gymLogo}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-xs font-bold rounded-xl transition-all"
                      >
                        {uploadProgress.gymLogo ? `Uploading (${uploadProgress.gymLogo}%)` : 'Upload Logo'}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Gym Description</label>
                  <textarea
                    placeholder="Provide a detailed description of the gym, special equipment, ambiance, etc."
                    rows={3}
                    value={formData.gymDescription}
                    onChange={(e) => updateFormData({ gymDescription: e.target.value })}
                    className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                  />
                </div>

                <div className="border-t border-zinc-800/60 pt-4">
                  <h3 className="text-sm font-bold text-zinc-300 mb-3">Owner Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Owner Name *</label>
                      <input
                        type="text"
                        placeholder="Owner Full Name"
                        value={formData.ownerName}
                        onChange={(e) => updateFormData({ ownerName: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Owner Mobile *</label>
                      <input
                        type="text"
                        placeholder="10-digit mobile"
                        value={formData.ownerMobile}
                        onChange={(e) => updateFormData({ ownerMobile: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Owner Email *</label>
                      <input
                        type="email"
                        placeholder="owner@example.com"
                        value={formData.ownerEmail}
                        onChange={(e) => updateFormData({ ownerEmail: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-800/60 pt-4">
                  <h3 className="text-sm font-bold text-zinc-300 mb-3">Gym Contact & Social Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Gym Phone</label>
                      <input
                        type="text"
                        placeholder="Gym direct phone line"
                        value={formData.gymPhone}
                        onChange={(e) => updateFormData({ gymPhone: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Gym Email</label>
                      <input
                        type="email"
                        placeholder="gym@example.com"
                        value={formData.gymEmail}
                        onChange={(e) => updateFormData({ gymEmail: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Website Link</label>
                      <input
                        type="text"
                        placeholder="https://gymwebsite.com"
                        value={formData.website}
                        onChange={(e) => updateFormData({ website: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Instagram Handle</label>
                      <input
                        type="text"
                        placeholder="e.g. goldsgym_india"
                        value={formData.instagram}
                        onChange={(e) => updateFormData({ instagram: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Location Information */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-zinc-400">Fill address fields or import quick mock location coordinates.</span>
                  <button
                    onClick={fillMockLocation}
                    type="button"
                    className="px-3 py-1 bg-brand-primary/20 text-brand-primary text-[11px] font-bold rounded-lg border border-brand-primary/30 flex items-center gap-1 hover:bg-brand-primary hover:text-white transition-colors"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Auto-fill Delhi/Noida Mock Location</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Address Line 1 *</label>
                    <input
                      type="text"
                      placeholder="Flat/House No., Building, Area"
                      value={formData.addressLine1}
                      onChange={(e) => updateFormData({ addressLine1: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Address Line 2</label>
                    <input
                      type="text"
                      placeholder="Sector, Landmark, Street"
                      value={formData.addressLine2}
                      onChange={(e) => updateFormData({ addressLine2: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">City *</label>
                    <input
                      type="text"
                      placeholder="e.g. Noida"
                      value={formData.city}
                      onChange={(e) => updateFormData({ city: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">State *</label>
                    <input
                      type="text"
                      placeholder="e.g. Uttar Pradesh"
                      value={formData.state}
                      onChange={(e) => updateFormData({ state: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Country *</label>
                    <input
                      type="text"
                      placeholder="India"
                      value={formData.country}
                      onChange={(e) => updateFormData({ country: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Pincode *</label>
                    <input
                      type="text"
                      placeholder="201301"
                      value={formData.pincode}
                      onChange={(e) => updateFormData({ pincode: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="bg-zinc-950/60 p-4 border border-zinc-800 rounded-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPinned className="h-4.5 w-4.5 text-brand-primary" />
                    <span className="text-xs font-bold text-zinc-300 uppercase">Search Geolocation Coordinates (Mandatory)</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-zinc-500 mb-1.5 uppercase">Latitude *</label>
                      <input
                        type="text"
                        placeholder="e.g. 28.6273"
                        value={formData.latitude}
                        onChange={(e) => updateFormData({ latitude: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-zinc-500 mb-1.5 uppercase">Longitude *</label>
                      <input
                        type="text"
                        placeholder="e.g. 77.3725"
                        value={formData.longitude}
                        onChange={(e) => updateFormData({ longitude: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-2 block">
                    * Coordinates are required to enable nearby user searches on the FlexPass mobile app.
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Business Information */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Registered Business Name *</label>
                  <input
                    type="text"
                    placeholder="Legal Entity Name (e.g. Fitness Hub Private Limited)"
                    value={formData.businessName}
                    onChange={(e) => updateFormData({ businessName: e.target.value })}
                    className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">GST Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 09AAAAA0000A1Z5"
                      value={formData.gstNumber}
                      onChange={(e) => updateFormData({ gstNumber: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">PAN Number *</label>
                    <input
                      type="text"
                      placeholder="Business / Owner PAN Card Number"
                      value={formData.panNumber}
                      onChange={(e) => updateFormData({ panNumber: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Business Type *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Proprietorship', 'Partnership', 'Private Limited', 'LLP'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => updateFormData({ businessType: t as any })}
                        className={`px-4 py-3 border text-xs font-bold rounded-xl transition-all ${
                          formData.businessType === t
                            ? 'border-brand-primary bg-brand-primary/10 text-white'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Bank Details */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <div className="bg-brand-primary/5 border border-brand-primary/10 p-3.5 rounded-2xl flex gap-2 mb-2 text-xs text-zinc-400">
                  <CreditCard className="h-4.5 w-4.5 text-brand-primary shrink-0" />
                  <span>Your payouts will be credited to this bank account on a bi-weekly basis.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Account Holder Name *</label>
                    <input
                      type="text"
                      placeholder="Name on bank passbook"
                      value={formData.accountHolderName}
                      onChange={(e) => updateFormData({ accountHolderName: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Account Number *</label>
                    <input
                      type="text"
                      placeholder="Savings / Current Account Number"
                      value={formData.accountNumber}
                      onChange={(e) => updateFormData({ accountNumber: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">IFSC Code *</label>
                    <input
                      type="text"
                      placeholder="e.g. HDFC0001234"
                      value={formData.ifscCode}
                      onChange={(e) => updateFormData({ ifscCode: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Bank Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. HDFC Bank"
                      value={formData.bankName}
                      onChange={(e) => updateFormData({ bankName: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">UPI ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. gymname@okaxis"
                    value={formData.upiId}
                    onChange={(e) => updateFormData({ upiId: e.target.value })}
                    className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 5: Gym Operations */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Opening Time *</label>
                    <input
                      type="time"
                      value={formData.openingTime}
                      onChange={(e) => updateFormData({ openingTime: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Closing Time *</label>
                    <input
                      type="time"
                      value={formData.closingTime}
                      onChange={(e) => updateFormData({ closingTime: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Weekly Off *</label>
                    <select
                      value={formData.weeklyOff}
                      onChange={(e) => updateFormData({ weeklyOff: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    >
                      <option value="None">No Weekly Off</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Max Capacity (Simultaneous) *</label>
                    <input
                      type="number"
                      placeholder="e.g. 200"
                      value={formData.maxCapacity}
                      onChange={(e) => updateFormData({ maxCapacity: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Peak Hours description</label>
                    <input
                      type="text"
                      placeholder="e.g. 6 AM - 9 AM, 6 PM - 9 PM"
                      value={formData.peakHours}
                      onChange={(e) => updateFormData({ peakHours: e.target.value })}
                      className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Amenities */}
            {step === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <label className="block text-xs font-extrabold text-zinc-400 mb-2 uppercase">Check all facilities available at the gym location:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { key: 'parking', label: 'Parking Space' },
                    { key: 'locker', label: 'Locker / Storage' },
                    { key: 'shower', label: 'Shower Rooms' },
                    { key: 'steam', label: 'Steam Room' },
                    { key: 'sauna', label: 'Sauna bath' },
                    { key: 'personalTrainer', label: 'Personal Trainer' },
                    { key: 'groupClasses', label: 'Group Classes' },
                    { key: 'womenOnlyArea', label: 'Women Only Area' },
                    { key: 'ac', label: 'Central AC' },
                    { key: 'wifi', label: 'High-speed WiFi' },
                    { key: 'water', label: 'Drinking Water' },
                  ].map((amenity) => (
                    <button
                      key={amenity.key}
                      type="button"
                      onClick={() => updateAmenities(amenity.key as any)}
                      className={`flex items-center gap-2.5 px-4 py-3.5 border rounded-xl text-left text-xs font-semibold transition-all ${
                        formData.amenities[amenity.key as keyof OnboardingData['amenities']]
                          ? 'border-brand-primary bg-brand-primary/10 text-white'
                          : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                        formData.amenities[amenity.key as keyof OnboardingData['amenities']]
                          ? 'border-brand-primary bg-brand-primary text-white'
                          : 'border-zinc-700 bg-zinc-900'
                      }`}>
                        {formData.amenities[amenity.key as keyof OnboardingData['amenities']] && <Check className="h-3 w-3" />}
                      </div>
                      <span>{amenity.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 7: Media */}
            {step === 7 && (
              <motion.div
                key="step7"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Gym Cover Image *</label>
                    <div className="border border-dashed border-zinc-800 rounded-xl bg-zinc-950 p-4 flex flex-col items-center justify-center text-center">
                      {formData.coverImage ? (
                        <div className="space-y-2 w-full">
                          <img src={formData.coverImage} alt="Cover" className="w-full h-32 object-cover rounded-lg" />
                          <button
                            onClick={() => updateFormData({ coverImage: '' })}
                            className="text-xs text-red-400 hover:underline flex items-center gap-1 mx-auto"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Remove Cover
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <ImageIcon className="h-8 w-8 text-zinc-600 mx-auto" />
                          <span className="text-xs text-zinc-500 block">Recommended size: 1200x600</span>
                          <button
                            onClick={() => handleFileUpload('coverImage')}
                            disabled={!!uploadProgress.coverImage}
                            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-xs font-bold rounded-lg transition-all"
                          >
                            {uploadProgress.coverImage ? `Uploading (${uploadProgress.coverImage}%)` : 'Upload Cover Image'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Gym Photos (At least 5) *</label>
                    <div className="border border-dashed border-zinc-800 rounded-xl bg-zinc-950 p-4 flex flex-col items-center justify-center text-center">
                      <span className="text-xs text-zinc-500 mb-2">Uploaded: {formData.gymPhotos.length} / 5 photos minimum</span>
                      <button
                        onClick={() => handleFileUpload('gymPhotos')}
                        disabled={!!uploadProgress.gymPhotos}
                        className="px-4 py-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-white transition-all text-xs font-bold rounded-xl"
                      >
                        {uploadProgress.gymPhotos ? `Uploading (${uploadProgress.gymPhotos}%)` : 'Add Photo'}
                      </button>

                      {formData.gymPhotos.length > 0 && (
                        <div className="grid grid-cols-5 gap-2 mt-4 w-full">
                          {formData.gymPhotos.map((photo, index) => (
                            <div key={index} className="relative group rounded-lg overflow-hidden border border-zinc-800 h-10">
                              <img src={photo} alt={`Gym Photo ${index + 1}`} className="w-full h-full object-cover" />
                              <button
                                onClick={() => removePhoto(index)}
                                className="absolute inset-0 bg-red-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4.5 w-4.5 text-white" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Gym Videos (Optional)</label>
                  <div className="border border-dashed border-zinc-800 rounded-xl bg-zinc-950 p-4 flex flex-col items-center justify-center text-center">
                    <button
                      onClick={() => handleFileUpload('videos')}
                      disabled={!!uploadProgress.videos}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-xs font-bold rounded-lg transition-all"
                    >
                      {uploadProgress.videos ? `Uploading (${uploadProgress.videos}%)` : 'Upload Video File'}
                    </button>
                    {formData.videos.length > 0 && (
                      <div className="w-full text-left space-y-1.5 mt-3">
                        {formData.videos.map((vid, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-350">
                            <span>{vid}</span>
                            <button onClick={() => removeVideo(idx)} className="text-red-400 hover:text-red-300">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 8: Membership Integration */}
            {step === 8 && (
              <motion.div
                key="step8"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <div className="bg-zinc-900/40 p-5 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl">
                  <h3 className="text-sm font-bold text-zinc-300 mb-2">Configure Super Admin Credit Rule</h3>
                  <p className="text-xs text-zinc-500 mb-4">
                    The Super Admin reviews and sets credit weights. These credits will be deducted from members on checkin.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Standard Credits *</label>
                      <input
                        type="number"
                        value={formData.creditsPerVisit}
                        onChange={(e) => updateFormData({ creditsPerVisit: Number(e.target.value) })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Peak Hour Credits *</label>
                      <input
                        type="number"
                        value={formData.peakHourCredits}
                        onChange={(e) => updateFormData({ peakHourCredits: Number(e.target.value) })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-extrabold text-zinc-400 mb-2 uppercase tracking-wider">Off Peak Credits *</label>
                      <input
                        type="number"
                        value={formData.offPeakCredits}
                        onChange={(e) => updateFormData({ offPeakCredits: Number(e.target.value) })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 9: KYC Verification */}
            {step === 9 && (
              <motion.div
                key="step9"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <span className="text-xs text-zinc-400 block mb-2">Upload matching files for approval. KYC status will remain Pending initially.</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'kycOwnerAadhaar', label: "Owner's Aadhaar Card *" },
                    { key: 'kycPanCard', label: "Business/Owner PAN Card *" },
                    { key: 'kycGstCertificate', label: 'GST Registration Certificate *' },
                    { key: 'kycCancelledCheque', label: 'Cancelled Cheque Image *' },
                  ].map((doc) => (
                    <div key={doc.key} className="bg-zinc-900/40 p-5 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl flex flex-col justify-between h-32">
                      <div>
                        <span className="text-xs font-bold text-zinc-300 block">{doc.label}</span>
                        {formData[doc.key as 'kycOwnerAadhaar' | 'kycPanCard' | 'kycGstCertificate' | 'kycCancelledCheque'] ? (
                          <span className="text-[10px] text-emerald-400 block mt-1">✓ {formData[doc.key as 'kycOwnerAadhaar' | 'kycPanCard' | 'kycGstCertificate' | 'kycCancelledCheque']}</span>
                        ) : (
                          <span className="text-[10px] text-zinc-500 block mt-1">No file uploaded</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleFileUpload(doc.key)}
                        disabled={!!uploadProgress[doc.key]}
                        className="mt-2 w-full py-1.5 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-xs font-semibold rounded-lg text-white"
                      >
                        {uploadProgress[doc.key] ? `Uploading (${uploadProgress[doc.key]}%)` : 'Upload PDF / JPG'}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-zinc-950 p-3.5 border border-zinc-800 rounded-2xl flex justify-between items-center text-xs">
                  <span className="font-semibold text-zinc-400">KYC Status Mode:</span>
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full font-bold uppercase text-[10px]">
                    {formData.kycStatus}
                  </span>
                </div>
              </motion.div>
            )}

            {/* STEP 10: Contract Information */}
            {step === 10 && (
              <motion.div
                key="step10"
                initial={{ opacity: 0, x: 20, filter: 'blur(5px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-4"
              >
                <div className="bg-zinc-900/40 p-5 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl space-y-3">
                  <h3 className="text-sm font-bold text-zinc-300">Contract Agreement Terms</h3>
                  <div className="text-xs text-zinc-400 space-y-2 leading-relaxed max-h-48 overflow-y-auto pr-2">
                    <p>1. <strong>Platform Commission:</strong> The platform will charge a flat 15% commission on all payouts calculated based on credits scanned and checked in.</p>
                    <p>2. <strong>Revenue Share:</strong> The partner gym receives 85% revenue share of credit value payout.</p>
                    <p>3. <strong>Duration:</strong> This partner agreement contract begins on the designated Start Date and will auto-renew annually unless terminated with a 30-day notice.</p>
                    <p>4. <strong>Code of Conduct:</strong> The gym guarantees access to all valid FlexPass members and agrees to verify QR check-in status at the reception desk.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-extrabold text-zinc-500 mb-1.5 uppercase">Contract Start Date *</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateFormData({ startDate: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-zinc-500 mb-1.5 uppercase">Contract End Date *</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateFormData({ endDate: e.target.value })}
                        className="w-full px-4 py-3.5 bg-zinc-900/50 border border-zinc-800/80 rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 text-white transition-all backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 uppercase block font-bold">Platform Commission %</span>
                      <span className="text-sm font-bold text-white">{formData.commissionPercent}%</span>
                    </div>
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-[10px] text-zinc-500 uppercase block font-bold">Revenue Share %</span>
                      <span className="text-sm font-bold text-emerald-400">{formData.revenueSharePercent}%</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => updateFormData({ agreementSigned: !formData.agreementSigned })}
                  className={`w-full flex items-center gap-3 p-4 border rounded-2xl text-left transition-all ${
                    formData.agreementSigned
                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                    formData.agreementSigned
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-zinc-700 bg-zinc-900'
                  }`}>
                    {formData.agreementSigned && <Check className="h-4 w-4" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-white">I agree to the terms and sign the agreement digitally</span>
                    <span className="text-[10px] text-zinc-500">Check this box to authorize and complete the onboarding application.</span>
                  </div>
                </button>
              </motion.div>
            )}

            </AnimatePresence>
          </div>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-zinc-800 mt-6">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-5 py-3 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)] flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              <span>{step === 10 ? 'Submit Application' : 'Next Step'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

        {/* Right Column: Live Mobile Mockup Preview */}
        <div className="lg:col-span-4 mt-8 lg:mt-0 lg:sticky top-28 order-first lg:order-last">
          <div className="w-full max-w-[320px] mx-auto aspect-[9/19] max-h-[700px] bg-zinc-950 border-[8px] border-zinc-800 rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col justify-between ring-1 ring-white/10">
            {/* Phone Speaker & Camera Bar */}
            <div className="absolute top-0 inset-x-0 h-6 bg-zinc-950 flex justify-center items-center z-30 rounded-b-2xl">
              <div className="w-20 h-4 bg-zinc-900 rounded-full border border-zinc-800/50" />
            </div>

            {/* Live Mobile View Body */}
            <div className="flex-1 bg-zinc-950 pt-5 overflow-y-auto no-scrollbar text-zinc-100 text-xs flex flex-col justify-start">
              
              {/* Cover Image */}
              <div className="h-32 w-full bg-zinc-900 relative shrink-0">
                {formData.coverImage ? (
                  <img src={formData.coverImage} alt="Gym Cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-900/50">
                    <ImageIcon className="h-6 w-6 mb-1" />
                    <span className="text-[9px]">No Cover Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                
                {/* Logo badge overlay */}
                <div className="absolute -bottom-6 left-4 w-14 h-14 rounded-2xl overflow-hidden border-4 border-zinc-950 shadow-lg bg-zinc-900 z-10">
                  {formData.gymLogo ? (
                    <img src={formData.gymLogo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Building className="h-5 w-5 text-zinc-500" />
                    </div>
                  )}
                </div>
                {/* Standard Credit Costs Bubble */}
                <div className="absolute top-3 right-3 bg-brand-primary/90 backdrop-blur-md text-white font-bold px-2.5 py-1 rounded-full text-[10px] shadow-lg border border-white/10">
                  {formData.creditsPerVisit} Credits
                </div>
              </div>

              {/* Gym Info */}
              <div className="px-5 pt-8 pb-6 space-y-4 flex-1 flex flex-col justify-start">
                <div>
                  <h3 className="font-extrabold text-base text-white leading-tight">{formData.gymName || 'Your Gym Name'}</h3>
                  <p className="text-[10px] text-zinc-400 mt-1.5 flex items-start gap-1.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-primary mt-0.5" />
                    <span className="leading-snug">
                      {formData.addressLine1 ? `${formData.addressLine1}, ${formData.city}, ${formData.state}` : 'Gym Location details...'}
                    </span>
                  </p>
                  
                  {formData.gymDescription && (
                    <p className="text-[10px] text-zinc-500 mt-3 line-clamp-3 leading-relaxed">
                      {formData.gymDescription}
                    </p>
                  )}
                </div>

                {/* Operations & Peak Hours */}
                <div className="bg-zinc-900/50 border border-zinc-800/60 p-3.5 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-primary" />
                      <span>Hours</span>
                    </div>
                    <span className="font-bold text-white">{formData.openingTime} - {formData.closingTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-zinc-400">
                    <span className="ml-5">Weekly Off</span>
                    <span className="font-bold text-white">{formData.weeklyOff}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-zinc-400 border-t border-zinc-800/60 pt-2 mt-2">
                    <span className="ml-5">Peak Hour Credits</span>
                    <span className="font-bold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded text-[9px]">{formData.peakHourCredits} Credits</span>
                  </div>
                </div>

                {/* Amenities List */}
                <div className="pt-1">
                  <span className="text-[11px] font-bold text-white block mb-2">Amenities</span>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.entries(formData.amenities)
                      .filter(([_, value]) => value === true)
                      .map(([key]) => (
                        <span key={key} className="px-2.5 py-1 bg-zinc-800/80 text-[9px] rounded-lg text-zinc-300 font-semibold border border-zinc-700/50 capitalize">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </span>
                      ))}
                    {Object.values(formData.amenities).filter(Boolean).length === 0 && (
                      <span className="text-[10px] text-zinc-600 italic">No amenities selected</span>
                    )}
                  </div>
                </div>

                {/* Media gallery grid preview */}
                {formData.gymPhotos.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-white block mb-2">Photos ({formData.gymPhotos.length})</span>
                    <div className="grid grid-cols-4 gap-2">
                      {formData.gymPhotos.slice(0, 4).map((p, idx) => (
                        <div key={idx} className="h-12 rounded-xl overflow-hidden shadow-sm border border-zinc-800/50">
                          <img src={p} alt="Gallery preview" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Phone home indicator button */}
            <div className="h-8 bg-zinc-950 flex justify-center items-center pb-1">
              <div className="w-32 h-1.5 bg-zinc-800 rounded-full" />
            </div>
          </div>
          
          <div className="text-center mt-4 text-xs text-zinc-500 font-semibold flex items-center justify-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live app view preview
          </div>
        </div>

      </div>
    </div>
  );
}
