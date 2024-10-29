import React from 'react'

const Stats = ({title, value, description}) => {
    return (
        <div className="stat w-8">
            <div className="stat-figure text-primary hidden lg:block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
            </div>
            <div className="stat-title xs:text-sm">{title}</div>
            <div className="stat-value text-primary text-xl lg:text-4xl">{value}</div>
            <div className="stat-desc">{description}</div>
        </div>
    )
}

export default Stats