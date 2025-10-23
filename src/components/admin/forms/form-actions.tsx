"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save } from "lucide-react";

interface FormActionsProps {
  isSubmitting: boolean;
  submitLabel?: string;
}

export function FormActions({ isSubmitting, submitLabel = "Create Post" }: FormActionsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-4 justify-end">
      <button
        type="button"
        onClick={() => router.back()}
        className="px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
      >
        Cancel
      </button>
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Save size={16} />
        {isSubmitting ? 'Creating...' : submitLabel}
      </motion.button>
    </div>
  );
}
