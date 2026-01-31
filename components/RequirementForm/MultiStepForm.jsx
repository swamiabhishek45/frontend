'use client';
import { useState } from 'react';
import EventDetailsStep from './EventDetailsStep';
import HireTypeStep from './HireTypeStep';
import PlannerDetailsStep from './PlannerDetailsStep';
import PerformerDetailsStep from './PerformerDetailsStep';
import CrewDetailsStep from './CrewDetailsStep';
import ReviewStep from './ReviewStep';

const STEPS = {
  EVENT_DETAILS: 0,
  HIRE_TYPE: 1,
  TYPE_SPECIFIC: 2,
  REVIEW: 3,
};

const initialFormData = {
  // Event details
  eventName: '',
  eventType: '',
  eventDate: '',
  eventEndDate: '',
  location: '',
  venue: '',
  
  // Hire type
  hireType: '',
  
  // Planner details
  plannerDetails: {
    budget: '',
    guestCount: '',
    specialRequirements: '',
  },
  
  // Performer details
  performerDetails: {
    performerType: '',
    duration: '',
    equipment: '',
  },
  
  // Crew details
  crewDetails: {
    crewType: '',
    crewSize: '',
    shiftDuration: '',
  },
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(STEPS.EVENT_DETAILS);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedFormData = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.REVIEW));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, STEPS.EVENT_DETAILS));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const payload = {
        eventName: formData.eventName,
        eventType: formData.eventType,
        eventDate: formData.eventDate,
        eventEndDate: formData.eventEndDate || null,
        location: formData.location,
        venue: formData.venue || '',
        hireType: formData.hireType,
      };

      // Add type-specific details
      if (formData.hireType === 'planner') {
        payload.plannerDetails = {
          budget: Number(formData.plannerDetails.budget) || 0,
          guestCount: Number(formData.plannerDetails.guestCount) || 0,
          specialRequirements: formData.plannerDetails.specialRequirements || '',
        };
      } else if (formData.hireType === 'performer') {
        payload.performerDetails = {
          performerType: formData.performerDetails.performerType,
          duration: Number(formData.performerDetails.duration) || 0,
          equipment: formData.performerDetails.equipment || '',
        };
      } else if (formData.hireType === 'crew') {
        payload.crewDetails = {
          crewType: formData.crewDetails.crewType,
          crewSize: Number(formData.crewDetails.crewSize) || 0,
          shiftDuration: Number(formData.crewDetails.shiftDuration) || 0,
        };
      }

      const response = await fetch('http://localhost:5000/api/requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({ success: true, message: 'Requirement posted successfully!' });
        setFormData(initialFormData);
        setCurrentStep(STEPS.EVENT_DETAILS);
      } else {
        setSubmitResult({ success: false, message: data.message || 'Failed to post requirement' });
      }
    } catch (error) {
      setSubmitResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepLabel = (step) => {
    switch (step) {
      case STEPS.EVENT_DETAILS: return 'Event Details';
      case STEPS.HIRE_TYPE: return 'Hire Type';
      case STEPS.TYPE_SPECIFIC: 
        if (formData.hireType === 'planner') return 'Planner Details';
        if (formData.hireType === 'performer') return 'Performer Details';
        if (formData.hireType === 'crew') return 'Crew Details';
        return 'Details';
      case STEPS.REVIEW: return 'Review';
      default: return '';
    }
  };

  const renderTypeSpecificStep = () => {
    switch (formData.hireType) {
      case 'planner':
        return (
          <PlannerDetailsStep
            data={formData.plannerDetails}
            updateData={(field, value) => updateNestedFormData('plannerDetails', field, value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'performer':
        return (
          <PerformerDetailsStep
            data={formData.performerDetails}
            updateData={(field, value) => updateNestedFormData('performerDetails', field, value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 'crew':
        return (
          <CrewDetailsStep
            data={formData.crewDetails}
            updateData={(field, value) => updateNestedFormData('crewDetails', field, value)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.EVENT_DETAILS:
        return (
          <EventDetailsStep
            data={formData}
            updateData={updateFormData}
            onNext={nextStep}
          />
        );
      case STEPS.HIRE_TYPE:
        return (
          <HireTypeStep
            selectedType={formData.hireType}
            updateData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case STEPS.TYPE_SPECIFIC:
        return renderTypeSpecificStep();
      case STEPS.REVIEW:
        return (
          <ReviewStep
            formData={formData}
            onSubmit={handleSubmit}
            onBack={prevStep}
            onEdit={goToStep}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[0, 1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    currentStep === step
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                      : currentStep > step
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {currentStep > step ? '✓' : step + 1}
                </div>
                <span className={`mt-2 text-xs font-medium ${
                  currentStep >= step ? 'text-white' : 'text-gray-500'
                }`}>
                  {getStepLabel(step)}
                </span>
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                    currentStep > step ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Success/Error Message */}
      {submitResult && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitResult.success
              ? 'bg-green-500/20 border border-green-500 text-green-400'
              : 'bg-red-500/20 border border-red-500 text-red-400'
          }`}
        >
          {submitResult.message}
        </div>
      )}

      {/* Form Card */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700/50 shadow-xl">
        {renderCurrentStep()}
      </div>
    </div>
  );
}
