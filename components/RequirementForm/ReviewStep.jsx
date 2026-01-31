'use client';

const STEPS = {
  EVENT_DETAILS: 0,
  HIRE_TYPE: 1,
  TYPE_SPECIFIC: 2,
};

const eventTypeLabels = {
  wedding: 'Wedding',
  corporate: 'Corporate Event',
  birthday: 'Birthday Party',
  concert: 'Concert',
  conference: 'Conference',
  festival: 'Festival',
  private_party: 'Private Party',
  other: 'Other',
};

const hireTypeLabels = {
  planner: 'Event Planner',
  performer: 'Performer',
  crew: 'Crew',
};

const performerTypeLabels = {
  dj: 'DJ',
  band: 'Live Band',
  singer: 'Singer',
  dancer: 'Dancer',
  comedian: 'Comedian',
  magician: 'Magician',
  other: 'Other',
};

const crewTypeLabels = {
  security: 'Security',
  catering: 'Catering Staff',
  av_tech: 'AV Technician',
  decoration: 'Decoration Team',
  photography: 'Photography/Videography',
  cleaning: 'Cleaning Staff',
  other: 'Other',
};

const hireTypeColors = {
  planner: 'from-blue-500 to-cyan-500',
  performer: 'from-purple-500 to-pink-500',
  crew: 'from-orange-500 to-red-500',
};

export default function ReviewStep({ formData, onSubmit, onBack, onEdit, isSubmitting }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderTypeSpecificDetails = () => {
    switch (formData.hireType) {
      case 'planner':
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Budget</span>
              <span className="text-white">₹{Number(formData.plannerDetails.budget).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Guest Count</span>
              <span className="text-white">{formData.plannerDetails.guestCount}</span>
            </div>
            {formData.plannerDetails.specialRequirements && (
              <div className="pt-2">
                <span className="text-gray-400 block mb-1">Special Requirements</span>
                <span className="text-white text-sm">{formData.plannerDetails.specialRequirements}</span>
              </div>
            )}
          </div>
        );
      case 'performer':
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Performer Type</span>
              <span className="text-white">{performerTypeLabels[formData.performerDetails.performerType]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration</span>
              <span className="text-white">{formData.performerDetails.duration} hours</span>
            </div>
            {formData.performerDetails.equipment && (
              <div className="pt-2">
                <span className="text-gray-400 block mb-1">Equipment</span>
                <span className="text-white text-sm">{formData.performerDetails.equipment}</span>
              </div>
            )}
          </div>
        );
      case 'crew':
        return (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Crew Type</span>
              <span className="text-white">{crewTypeLabels[formData.crewDetails.crewType]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Crew Size</span>
              <span className="text-white">{formData.crewDetails.crewSize} members</span>
            </div>
            {formData.crewDetails.shiftDuration && (
              <div className="flex justify-between">
                <span className="text-gray-400">Shift Duration</span>
                <span className="text-white">{formData.crewDetails.shiftDuration} hours</span>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Review Your Requirement</h2>
      <p className="text-gray-400 mb-8">Please review all the details before submitting</p>

      <div className="space-y-6">
        {/* Event Details Section */}
        <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              📅 Event Details
            </h3>
            <button
              onClick={() => onEdit(STEPS.EVENT_DETAILS)}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium"
            >
              Edit
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Event Name</span>
              <span className="text-white">{formData.eventName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Event Type</span>
              <span className="text-white">{eventTypeLabels[formData.eventType]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date</span>
              <span className="text-white">
                {formatDate(formData.eventDate)}
                {formData.eventEndDate && ` - ${formatDate(formData.eventEndDate)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Location</span>
              <span className="text-white">{formData.location}</span>
            </div>
            {formData.venue && (
              <div className="flex justify-between">
                <span className="text-gray-400">Venue</span>
                <span className="text-white">{formData.venue}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hire Type Section */}
        <div className={`rounded-xl p-5 bg-gradient-to-r ${hireTypeColors[formData.hireType]}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              {formData.hireType === 'planner' && '📋'}
              {formData.hireType === 'performer' && '🎤'}
              {formData.hireType === 'crew' && '👥'}
              {hireTypeLabels[formData.hireType]} Details
            </h3>
            <button
              onClick={() => onEdit(STEPS.TYPE_SPECIFIC)}
              className="text-white/80 hover:text-white text-sm font-medium"
            >
              Edit
            </button>
          </div>
          {renderTypeSpecificDetails()}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 text-gray-400 font-medium hover:text-white transition-colors disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-green-500/25 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            'Submit Requirement ✓'
          )}
        </button>
      </div>
    </div>
  );
}
