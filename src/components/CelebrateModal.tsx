import React, { useState } from 'react'
import { X, Smile, MessageCircle } from 'lucide-react'

interface CelebrateModalProps {
    isOpen: boolean
    onClose: () => void
    onCelebrationCreate: (celebrationText: string) => void
}

export const CelebrateModal: React.FC<CelebrateModalProps> = ({ isOpen, onClose, onCelebrationCreate }) => {
    const [celebration, setCelebration] = useState('')
    const [celebrationMessage, setCelebrationMessage] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!celebration.trim()) return

        const celebrationText = `🎊 Celebrating: ${celebration}!${celebrationMessage ? `\n\n${celebrationMessage}` : ''}`
        onCelebrationCreate(celebrationText)

        // Reset form
        setCelebration('')
        setCelebrationMessage('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Share a Celebration</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Celebration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            What are you celebrating? *
                        </label>
                        <div className="relative">
                            <Smile className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={celebration}
                                onChange={(e) => setCelebration(e.target.value)}
                                placeholder="e.g., New job, graduation, birthday..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Celebration Message */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Add a message (optional)
                        </label>
                        <div className="relative">
                            <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <textarea
                                value={celebrationMessage}
                                onChange={(e) => setCelebrationMessage(e.target.value)}
                                placeholder="Share more details about your celebration..."
                                rows={3}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent resize-none"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!celebration.trim()}
                            className="flex-1 px-4 py-2 bg-[#0a66c2] text-white rounded-md hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Share Celebration
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 