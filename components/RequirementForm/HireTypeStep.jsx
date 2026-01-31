'use client';

const hireTypes = [
  {
    value: 'planner',
    label: 'Event Planner',
    description: 'Professional to plan and coordinate your entire event',
    icon: '📋',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    value: 'performer',
    label: 'Performer',
    description: 'Entertainment like DJ, band, singer, dancer, or comedian',
    icon: '🎤',
    color: 'from-purple-500 to-pink-500',
  },
  {
    value: 'crew',
    label: 'Crew',
    description: 'Support staff like security, catering, AV tech, or photography',
    icon: '👥',
    color: 'from-orange-500 to-red-500',
  },
];

export default function HireTypeStep({ selectedType, updateData, onNext, onBack }) {
  const handleSelect = (type) => {
    updateData('hireType', type);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (selectedType) onNext();
  };

  return (
    <form onSubmit={handleNext}>
      <h2 className="text-2xl font-bold text-white mb-6">Who Do You Want to Hire?</h2>
      <p className="text-gray-400 mb-8">Select the type of professional you need for your event</p>

      <div className="space-y-4">
        {hireTypes.map((type) => (
          <div
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
              selectedType === type.value
                ? `border-transparent bg-gradient-to-r ${type.color} shadow-lg scale-[1.02]`
                : 'border-gray-700 bg-gray-900/50 hover:border-gray-600 hover:bg-gray-800/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{type.icon}</span>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${
                  selectedType === type.value ? 'text-white' : 'text-gray-200'
                }`}>
                  {type.label}
                </h3>
                <p className={`text-sm ${
                  selectedType === type.value ? 'text-white/80' : 'text-gray-400'
                }`}>
                  {type.description}
                </p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedType === type.value
                    ? 'border-white bg-white'
                    : 'border-gray-600'
                }`}
              >
                {selectedType === type.value && (
                  <div className="w-3 h-3 rounded-full bg-purple-600" />
                )}
              </div>
            </div>
          </div>
        ))}
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
          disabled={!selectedType}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25"
        >
          Next Step →
        </button>
      </div>
    </form>
  );
}
