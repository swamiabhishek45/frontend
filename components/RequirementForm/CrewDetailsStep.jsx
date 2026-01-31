'use client';

const crewTypes = [
  { value: 'security', label: 'Security' },
  { value: 'catering', label: 'Catering Staff' },
  { value: 'av_tech', label: 'AV Technician' },
  { value: 'decoration', label: 'Decoration Team' },
  { value: 'photography', label: 'Photography/Videography' },
  { value: 'cleaning', label: 'Cleaning Staff' },
  { value: 'other', label: 'Other' },
];

export default function CrewDetailsStep({ data, updateData, onNext, onBack }) {
  const isValid = data.crewType && data.crewSize;

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleNext}>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">👥</span>
        <div>
          <h2 className="text-2xl font-bold text-white">Crew Details</h2>
          <p className="text-gray-400">Tell us about the crew you need</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Crew Type */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Type of Crew <span className="text-pink-500">*</span>
          </label>
          <select
            value={data.crewType}
            onChange={(e) => updateData('crewType', e.target.value)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Select crew type</option>
            {crewTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Crew Size */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Crew Size <span className="text-pink-500">*</span>
          </label>
          <input
            type="number"
            value={data.crewSize}
            onChange={(e) => updateData('crewSize', e.target.value)}
            placeholder="Number of crew members needed"
            min="1"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Shift Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Shift Duration (hours) <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="number"
            value={data.shiftDuration}
            onChange={(e) => updateData('shiftDuration', e.target.value)}
            placeholder="Duration of work shift"
            min="1"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
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
          className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-orange-500/25"
        >
          Review →
        </button>
      </div>
    </form>
  );
}
