'use client';

const performerTypes = [
  { value: 'dj', label: 'DJ' },
  { value: 'band', label: 'Live Band' },
  { value: 'singer', label: 'Singer' },
  { value: 'dancer', label: 'Dancer' },
  { value: 'comedian', label: 'Comedian' },
  { value: 'magician', label: 'Magician' },
  { value: 'other', label: 'Other' },
];

export default function PerformerDetailsStep({ data, updateData, onNext, onBack }) {
  const isValid = data.performerType && data.duration;

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleNext}>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🎤</span>
        <div>
          <h2 className="text-2xl font-bold text-white">Performer Details</h2>
          <p className="text-gray-400">Tell us about the performer you need</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Performer Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Type of Performer <span className="text-pink-500">*</span>
          </label>
          <select
            value={data.performerType}
            onChange={(e) => updateData('performerType', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Select performer type</option>
            {performerTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Performance Duration (hours) <span className="text-pink-500">*</span>
          </label>
          <input
            type="number"
            value={data.duration}
            onChange={(e) => updateData('duration', e.target.value)}
            placeholder="Duration in hours"
            min="0.5"
            step="0.5"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Equipment */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Equipment Requirements <span className="text-gray-500">(Optional)</span>
          </label>
          <textarea
            value={data.equipment}
            onChange={(e) => updateData('equipment', e.target.value)}
            placeholder="Any specific equipment needs (sound system, lighting, instruments...)"
            rows={4}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-gray-400 font-medium hover:text-white transition-colors"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={!isValid}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25"
        >
          Review →
        </button>
      </div>
    </form>
  );
}
