import MultiStepForm from '@/components/RequirementForm/MultiStepForm';

export default function PostRequirementPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Post Your Requirement
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tell us about your event and who you want to hire. We'll connect you with the perfect professionals.
          </p>
        </div>

        {/* Multi-Step Form */}
        <MultiStepForm />
      </div>
    </main>
  );
}
