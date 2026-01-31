'use client';

export default function PlannerDetailsStep({ data, updateData, onNext, onBack }) {
  const isValid = data.budget && data.guestCount;

  const handleNext = (e) => {
    e.preventDefault();
    if (isValid) onNext();
  };

  return (
    <form onSubmit={handleNext}>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📋</span>
        <div>
          <h2 className="text-2xl font-bold text-white">Event Planner Details</h2>
          <p className="text-gray-400">Tell us more about your planning requirements</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Budget (₹) <span className="text-pink-500">*</span>
          </label>
          <input
            type="number"
            value={data.budget}
            onChange={(e) => updateData('budget', e.target.value)}
            placeholder="Enter your budget"
            min="0"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Guest Count */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Expected Guest Count <span className="text-pink-500">*</span>
          </label>
          <input
            type="number"
            value={data.guestCount}
            onChange={(e) => updateData('guestCount', e.target.value)}
            placeholder="Number of guests"
            min="1"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Special Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Special Requirements <span className="text-gray-500">(Optional)</span>
          </label>
          <textarea
            value={data.specialRequirements}
            onChange={(e) => updateData('specialRequirements', e.target.value)}
            placeholder="Any specific requirements, themes, or preferences..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
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
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/25"
        >
          Review →
        </button>
      </div>
    </form>
  );
}
