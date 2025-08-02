import React from 'react'

interface ProfileImageProps {
    profileImage?: string
    fullName: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
    profileImage,
    fullName,
    size = 'md',
    className = ''
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-base',
        lg: 'w-12 h-12 text-lg',
        xl: 'w-32 h-32 text-3xl'
    }

    const sizeClass = sizeClasses[size]

    // Debug logging
    console.log('ProfileImage component:', {
        fullName,
        hasProfileImage: !!profileImage,
        profileImageLength: profileImage ? profileImage.length : 0,
        size
    })

    return (
        <div className={`${sizeClass} rounded-full border-2 border-white shadow-sm overflow-hidden bg-[#0a66c2] flex items-center justify-center ${className}`}>
            {profileImage ? (
                <img
                    src={profileImage}
                    alt={`${fullName}'s profile`}
                    className="w-full h-full object-cover"
                    onError={(e) => console.error('ProfileImage failed to load:', e)}
                    onLoad={() => console.log('ProfileImage loaded successfully for:', fullName)}
                />
            ) : (
                <span className="text-white font-bold">
                    {fullName.charAt(0).toUpperCase()}
                </span>
            )}
        </div>
    )
} 