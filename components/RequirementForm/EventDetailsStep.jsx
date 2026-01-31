'use client';

const eventTypes = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'birthday', label: 'Birthday Party' },
  { value: 'concert', label: 'Concert' },
  { value: 'conference', label: 'Conference' },
  { value: 'festival', label: 'Festival' },
  { value: 'private_party', label: 'Private Party' },
  { value: 'other', label: 'Other' },
];

export default function EventDetailsStep({ data, updateData, onNext }) {
  const isValid = data.eventName && data.eventType && data.eventDate && data.location;

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleNext}>
      <h2 className="text-2xl font-bold text-white mb-6">Event Details</h2>
      <p className="text-gray-400 mb-8">Tell us about your event</p>

      <div className="space-y-6">
        {/* Event Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Name <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            value={data.eventName}
            onChange={(e) => updateData('eventName', e.target.value)}
            placeholder="Enter event name"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Event Type <span className="text-pink-500">*</span>
          </label>
          <select
            value={data.eventType}
            onChange={(e) => updateData('eventType', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Select event type</option>
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Start Date <span className="text-pink-500">*</span>
            </label>
            <input
              type="date"
              value={data.eventDate}
              onChange={(e) => updateData('eventDate', e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              End Date <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="date"
              value={data.eventEndDate}
              onChange={(e) => updateData('eventEndDate', e.target.value)}
              min={data.eventDate}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location <span className="text-pink-500">*</span>
          </label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData('location', e.target.value)}
            placeholder="City, State"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Venue */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Venue <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="text"
            value={data.venue}
            onChange={(e) => updateData('venue', e.target.value)}
            placeholder="Venue name or address"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={!isValid}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25"
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}
