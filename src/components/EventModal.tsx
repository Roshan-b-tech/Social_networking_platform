import React, { useState } from 'react'
import { X, Calendar, MapPin, FileText } from 'lucide-react'

interface EventModalProps {
    isOpen: boolean
    onClose: () => void
    onEventCreate: (eventText: string) => void
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onEventCreate }) => {
    const [eventName, setEventName] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [eventDescription, setEventDescription] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!eventName.trim()) return

        const eventText = `🎉 I'm hosting an event: ${eventName}${eventDate ? ` on ${eventDate}` : ''}${eventLocation ? ` at ${eventLocation}` : ''}${eventDescription ? `\n\n${eventDescription}` : ''}`
        onEventCreate(eventText)

        // Reset form
        setEventName('')
        setEventDate('')
        setEventLocation('')
        setEventDescription('')
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Create Event</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Event Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Event Name *
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                placeholder="Enter event name"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Event Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Event Date
                        </label>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                        />
                    </div>

                    {/* Event Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={eventLocation}
                                onChange={(e) => setEventLocation(e.target.value)}
                                placeholder="Enter event location"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0a66c2] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Event Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <textarea
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                                placeholder="Enter event description"
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
                            disabled={!eventName.trim()}
                            className="flex-1 px-4 py-2 bg-[#0a66c2] text-white rounded-md hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Create Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
} 